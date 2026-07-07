import express from 'express';
import cors from 'cors';
import http from 'http';
import pool from './db.js';
import { initWebSocket, broadcast } from './websocket.js';
import { getChatbotResponse } from './chatbot.js';

const app = express();
const PORT = 5000;

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

const server = http.createServer(app);
initWebSocket(server);

// ─── Simple in-memory rate limiter for auth endpoints ─────────────────────
const authAttempts = new Map();
function authRateLimit(req, res, next) {
  const key = req.ip;
  const now = Date.now();
  const entry = authAttempts.get(key) || { count: 0, resetAt: now + 60_000 };
  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + 60_000;
  }
  entry.count++;
  authAttempts.set(key, entry);
  if (entry.count > 20) {
    return res.status(429).json({ message: 'Too many requests. Please try again later.' });
  }
  next();
}

// ─── Helper: map snake_case DB column names to camelCase ───────────────────
function toCamel(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(toCamel);
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [
      k.replace(/_([a-z])/g, (_, c) => c.toUpperCase()),
      v,
    ])
  );
}

// ─── Auth ──────────────────────────────────────────────────────────────────
app.post('/api/auth/login', authRateLimit, async (req, res) => {
  const { email, password } = req.body;
  const { rows } = await pool.query(
    'SELECT * FROM users WHERE email = $1 AND password = $2',
    [email, password]
  );
  if (!rows.length) return res.status(401).json({ message: 'Invalid credentials' });
  const { password: _, ...safeUser } = toCamel(rows[0]);
  res.json({ user: safeUser, token: 'mock_jwt_' + Date.now() });
});

app.post('/api/auth/register', authRateLimit, async (req, res) => {
  const { email, name, role, password } = req.body;
  const { rows: exists } = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
  if (exists.length) return res.status(400).json({ message: 'Email already registered' });
  const newId = 'U' + Date.now();
  const { rows } = await pool.query(
    'INSERT INTO users (id, email, name, role, password, facility) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
    [newId, email, name, role, password, 'City General Hospital']
  );
  const { password: _, ...safeUser } = toCamel(rows[0]);
  res.json({ user: safeUser, token: 'mock_jwt_' + Date.now() });
});

// ─── Patients ──────────────────────────────────────────────────────────────
app.get('/api/patients', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM patients ORDER BY name');
  res.json(rows.map(toCamel));
});

app.post('/api/patients/scan', async (req, res) => {
  const { patientId, scannedBy, geolocation, timestamp } = req.body;
  const { rows } = await pool.query('SELECT * FROM patients WHERE id = $1', [patientId]);
  if (!rows.length) return res.status(404).json({ message: 'Patient not found' });
  const patient = toCamel(rows[0]);

  const [labRows, rxRows, apptRows] = await Promise.all([
    pool.query('SELECT * FROM lab_tests WHERE patient_id = $1 ORDER BY date DESC', [patientId]),
    pool.query('SELECT * FROM prescriptions WHERE patient_id = $1 ORDER BY date DESC', [patientId]),
    pool.query('SELECT * FROM appointments WHERE patient_id = $1 ORDER BY date DESC', [patientId]),
  ]);

  patient.labTests = labRows.rows.map(toCamel);
  patient.prescriptions = rxRows.rows.map(toCamel);
  patient.appointments = apptRows.rows.map(toCamel);

  console.log(`Patient scanned: ${patientId} by ${scannedBy} at ${timestamp} (${JSON.stringify(geolocation)})`);
  broadcast('PATIENT_SCANNED', { patientId, scannedBy, timestamp, geolocation });
  res.json({ success: true, patient });
});

app.get('/api/patients/:id', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM patients WHERE id = $1', [req.params.id]);
  if (!rows.length) return res.status(404).json({ message: 'Patient not found' });
  const patient = toCamel(rows[0]);

  const [labRows, rxRows, apptRows, vitalsRows] = await Promise.all([
    pool.query('SELECT * FROM lab_tests WHERE patient_id = $1 ORDER BY date DESC', [req.params.id]),
    pool.query('SELECT * FROM prescriptions WHERE patient_id = $1 ORDER BY date DESC', [req.params.id]),
    pool.query('SELECT * FROM appointments WHERE patient_id = $1 ORDER BY date DESC', [req.params.id]),
    pool.query('SELECT * FROM vitals WHERE patient_id = $1 ORDER BY timestamp DESC', [req.params.id]),
  ]);

  patient.labTests = labRows.rows.map(toCamel);
  patient.prescriptions = rxRows.rows.map(toCamel);
  patient.appointments = apptRows.rows.map(toCamel);
  patient.vitalsHistory = vitalsRows.rows.map(toCamel);
  res.json(patient);
});

// ─── Appointments ─────────────────────────────────────────────────────────
app.get('/api/appointments', async (req, res) => {
  const { patientId, doctorId } = req.query;
  let query = 'SELECT * FROM appointments WHERE 1=1';
  const params = [];
  if (patientId) { params.push(patientId); query += ` AND patient_id = $${params.length}`; }
  if (doctorId) { params.push(doctorId); query += ` AND doctor_id = $${params.length}`; }
  query += ' ORDER BY date DESC';
  const { rows } = await pool.query(query, params);
  res.json(rows.map(toCamel));
});

app.post('/api/appointments', async (req, res) => {
  const { patientId, patientName, doctorId, doctorName, department, date, time, type } = req.body;
  const newId = 'A' + Date.now();
  const { rows } = await pool.query(
    `INSERT INTO appointments (id, patient_id, patient_name, doctor_id, doctor_name, department, date, time, type, status)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'Pending') RETURNING *`,
    [newId, patientId, patientName, doctorId, doctorName, department, date, time, type]
  );
  const appt = toCamel(rows[0]);
  broadcast('NEW_APPOINTMENT', appt);
  res.json(appt);
});

// ─── Lab Tests ────────────────────────────────────────────────────────────
app.get('/api/lab-tests', async (req, res) => {
  const { status, patientId } = req.query;
  let query = 'SELECT * FROM lab_tests WHERE 1=1';
  const params = [];
  if (status) { params.push(status); query += ` AND status = $${params.length}`; }
  if (patientId) { params.push(patientId); query += ` AND patient_id = $${params.length}`; }
  query += ' ORDER BY date DESC';
  const { rows } = await pool.query(query, params);
  res.json(rows.map(toCamel));
});

app.post('/api/lab-tests', async (req, res) => {
  const { patientId, patientName, test, priority, orderedBy } = req.body;
  if (!patientId || !test) return res.status(400).json({ message: 'patientId and test are required' });
  const newId = 'LAB' + Date.now();
  const timeOrdered = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
  const date = new Date().toISOString().split('T')[0];
  const { rows } = await pool.query(
    `INSERT INTO lab_tests (id, patient_id, patient_name, test, ordered_by, priority, status, time_ordered, date, results)
     VALUES ($1,$2,$3,$4,$5,$6,'Pending',$7,$8,NULL) RETURNING *`,
    [newId, patientId, patientName || 'Unknown', test, orderedBy || 'Unknown Doctor', priority || 'Routine', timeOrdered, date]
  );
  const labTest = toCamel(rows[0]);
  broadcast('NEW_LAB_TEST', labTest);
  res.json(labTest);
});

app.post('/api/lab-tests/:id/results', async (req, res) => {
  const { rows: existing } = await pool.query('SELECT id FROM lab_tests WHERE id = $1', [req.params.id]);
  if (!existing.length) return res.status(404).json({ message: 'Test not found' });
  const { rows } = await pool.query(
    `UPDATE lab_tests SET results = $1, status = 'Complete' WHERE id = $2 RETURNING *`,
    [JSON.stringify(req.body), req.params.id]
  );
  const labTest = toCamel(rows[0]);
  broadcast('LAB_RESULTS_READY', labTest);
  res.json(labTest);
});

// ─── Vitals ───────────────────────────────────────────────────────────────
app.get('/api/vitals/:patientId', async (req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM vitals WHERE patient_id = $1 ORDER BY timestamp DESC',
    [req.params.patientId]
  );
  res.json(rows.map(toCamel));
});

app.post('/api/vitals', async (req, res) => {
  const { patientId, bp, hr, spo2, temp, rr, pain, notes, nurse } = req.body;
  const newId = 'V' + Date.now();
  const timestamp = new Date().toISOString();
  const { rows } = await pool.query(
    `INSERT INTO vitals (id, patient_id, bp, hr, spo2, temp, rr, pain, notes, timestamp, nurse)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
    [newId, patientId, bp, hr, spo2, temp, rr, pain, notes, timestamp, nurse]
  );
  const vital = toCamel(rows[0]);
  broadcast('NEW_VITALS', vital);
  res.json(vital);
});

// ─── Prescriptions ────────────────────────────────────────────────────────
app.get('/api/prescriptions', async (req, res) => {
  const { status, patientId } = req.query;
  let query = 'SELECT * FROM prescriptions WHERE 1=1';
  const params = [];
  if (status) { params.push(status); query += ` AND status = $${params.length}`; }
  if (patientId) { params.push(patientId); query += ` AND patient_id = $${params.length}`; }
  query += ' ORDER BY date DESC';
  const { rows } = await pool.query(query, params);
  res.json(rows.map(toCamel));
});

app.post('/api/prescriptions', async (req, res) => {
  const { patientId, patientName, doctorId, doctorName, drug, dosage, qty } = req.body;
  const newId = 'RX' + Date.now();
  const date = new Date().toISOString().split('T')[0];
  const { rows } = await pool.query(
    `INSERT INTO prescriptions (id, patient_id, patient_name, doctor_id, doctor_name, drug, dosage, qty, status, date)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'Pending',$9) RETURNING *`,
    [newId, patientId, patientName, doctorId, doctorName, drug, dosage, qty, date]
  );
  const rx = toCamel(rows[0]);
  broadcast('NEW_PRESCRIPTION', rx);
  res.json(rx);
});

app.patch('/api/prescriptions/:id/dispense', async (req, res) => {
  const { rows: existing } = await pool.query('SELECT id FROM prescriptions WHERE id = $1', [req.params.id]);
  if (!existing.length) return res.status(404).json({ message: 'Prescription not found' });
  const dispensedAt = new Date().toISOString();
  const { rows } = await pool.query(
    `UPDATE prescriptions SET status = 'Dispensed', dispensed_at = $1 WHERE id = $2 RETURNING *`,
    [dispensedAt, req.params.id]
  );
  const rx = toCamel(rows[0]);
  broadcast('PRESCRIPTION_DISPENSED', rx);
  res.json(rx);
});

// Backward-compatible GET alias for dispense (deprecated — prefer PATCH above)
app.get('/api/prescriptions/:id/dispense', async (req, res) => {
  const { rows: existing } = await pool.query('SELECT id FROM prescriptions WHERE id = $1', [req.params.id]);
  if (!existing.length) return res.status(404).json({ message: 'Prescription not found' });
  const dispensedAt = new Date().toISOString();
  const { rows } = await pool.query(
    `UPDATE prescriptions SET status = 'Dispensed', dispensed_at = $1 WHERE id = $2 RETURNING *`,
    [dispensedAt, req.params.id]
  );
  const rx = toCamel(rows[0]);
  broadcast('PRESCRIPTION_DISPENSED', rx);
  res.json(rx);
});

// ─── Inventory ────────────────────────────────────────────────────────────
app.get('/api/inventory', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM inventory ORDER BY drug');
  res.json(rows.map(toCamel));
});

app.post('/api/inventory/alert', async (req, res) => {
  const { drugId } = req.body;
  const { rows } = await pool.query('SELECT * FROM inventory WHERE id = $1', [drugId]);
  if (!rows.length) return res.status(404).json({ message: 'Item not found' });
  res.json({ success: true, message: `Restock request sent for ${rows[0].drug}` });
});

// ─── Staff ────────────────────────────────────────────────────────────────
app.get('/api/staff', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM staff');
  res.json(rows.map(toCamel));
});

// ─── Beds ─────────────────────────────────────────────────────────────────
app.get('/api/beds', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM beds');
  res.json(rows.map(toCamel));
});

// ─── Compliance ───────────────────────────────────────────────────────────
app.get('/api/compliance', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM compliance');
  res.json(rows.map(toCamel));
});

// ─── Surveillance ─────────────────────────────────────────────────────────
app.get('/api/surveillance', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM surveillance_cases');
  res.json(rows.map(toCamel));
});

app.get('/api/surveillance/cases', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM surveillance_cases');
  res.json(rows.map(toCamel));
});

app.get('/api/surveillance/hotspots', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM hotspots');
  res.json(rows.map(toCamel));
});

app.get('/api/hotspots', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM hotspots');
  res.json(rows.map(toCamel));
});

app.get('/api/surveillance/forecast', (req, res) => {
  const { R0 = 2.5, gamma = 0.1, sigma = 0.2 } = req.query;
  const S0 = 950000, I0 = 1000, E0 = 5000;
  const FORECAST_DAYS = 180, STEP_DAYS = 5;
  const data = [];
  let S = S0, I = I0, recovered = 0, E = E0;
  const r0 = parseFloat(R0), g = parseFloat(gamma), s = parseFloat(sigma);
  for (let day = 0; day <= FORECAST_DAYS; day += STEP_DAYS) {
    data.push({ day, susceptible: Math.round(S), exposed: Math.round(E), infected: Math.round(I), recovered: Math.round(recovered) });
    const beta = r0 * g;
    const N = S + E + I + recovered;
    const newExposed = beta * S * I / N;
    const newInfected = s * E;
    const newRecovered = g * I;
    S -= newExposed;
    E += newExposed - newInfected;
    I += newInfected - newRecovered;
    recovered += newRecovered;
    if (S < 0) S = 0;
    if (E < 0) E = 0;
    if (I < 0) I = 0;
  }
  res.json(data);
});

// ─── Chatbot ─────────────────────────────────────────────────────────────
app.post('/api/chatbot', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ message: 'Message required' });
  const response = getChatbotResponse(message);
  res.json(response);
});

// ─── Notifications ────────────────────────────────────────────────────────
app.get('/api/notifications', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM notifications');
  res.json(rows.map(toCamel));
});

app.get('/api/notifications/:userId', async (req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM notifications WHERE user_id = $1',
    [req.params.userId]
  );
  res.json(rows.map(toCamel));
});

// ─── Drug Interactions ────────────────────────────────────────────────────
app.get('/api/drug-interactions', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM drug_interactions');
  res.json(rows.map(toCamel));
});

server.listen(PORT, '0.0.0.0', () => console.log(`OmniShield server running on port ${PORT}`));
