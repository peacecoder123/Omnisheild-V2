-- OmniShield Demo Data Seeder
-- Run AFTER schema.sql: psql -U postgres -d omnishield -f seed.sql

-- ─── Users ────────────────────────────────────────────────────────────────
-- NOTE: Passwords are plain text for demo only. Use bcrypt in production.
INSERT INTO users (id, email, password, role, name, facility, abha_id) VALUES
  ('U001', 'doctor@demo.com',  'demo', 'doctor',      'Dr. Ananya Desai',  'City General Hospital', NULL),
  ('U002', 'patient@demo.com', 'demo', 'patient',     'Amit Sharma',       'City General Hospital', 'ABHA-12345-67890'),
  ('U003', 'nurse@demo.com',   'demo', 'nurse',       'Sr. Neha Sharma',   'City General Hospital', NULL),
  ('U004', 'labtech@demo.com', 'demo', 'lab_tech',    'Ramesh Verma',      'City General Hospital', NULL),
  ('U005', 'pharma@demo.com',  'demo', 'pharmacist',  'Kavita Patel',      'City General Hospital', NULL),
  ('U006', 'admin@demo.com',   'demo', 'admin',       'Suresh Kumar',      'City General Hospital', NULL),
  ('U007', 'govt@demo.com',    'demo', 'government',  'IAS Rajesh Mehta',  'Ministry of Health',    NULL);

-- ─── Patients ─────────────────────────────────────────────────────────────
INSERT INTO patients (id, name, age, gender, blood, abha_id, phone, condition, status, allergies, emergency_contact, address, vitals, history) VALUES
  ('P001', 'Amit Sharma',   42, 'Male',   'B+',  'ABHA-12345-67890', '+91-9876543210', 'Hypertension',          'Stable',     '["Penicillin","Sulfa"]',     'Reena Sharma (+91-9876543211)',  '12, MG Road, Bengaluru',    '{"bp":"138/88","hr":76,"spo2":97,"temp":98.4,"rr":16}', '[{"date":"2024-06-15","doctor":"Dr. Ananya Desai","type":"Follow-up","note":"BP controlled. Continue Amlodipine 5mg."},{"date":"2024-05-10","doctor":"Dr. Vikram Rao","type":"Consultation","note":"Chest X-ray normal. Echo scheduled."}]'),
  ('P002', 'Priya Singh',   29, 'Female', 'A+',  'ABHA-22222-11111', '+91-9123456780', 'Type 2 Diabetes',       'Follow-up',  '["Aspirin"]',                'Rohan Singh (+91-9123456781)',   '45, Nehru Nagar, Pune',     '{"bp":"128/82","hr":80,"spo2":98,"temp":98.6,"rr":17}', '[{"date":"2024-06-20","doctor":"Dr. Ananya Desai","type":"Follow-up","note":"HbA1c 7.2. Adjust Metformin dose."}]'),
  ('P003', 'Rajan Mehta',   65, 'Male',   'O-',  'ABHA-33333-22222', '+91-9234567891', 'COPD',                  'Critical',   '["NSAIDs","Codeine"]',       'Sunita Mehta (+91-9234567892)', '78, Gandhi Street, Chennai', '{"bp":"148/94","hr":92,"spo2":91,"temp":99.2,"rr":22}', '[{"date":"2024-07-01","doctor":"Dr. Vikram Rao","type":"Emergency","note":"SpO2 critical, O2 supplementation started."}]'),
  ('P004', 'Anita Verma',   35, 'Female', 'AB+', 'ABHA-44444-33333', '+91-9345678902', 'Migraine',              'Stable',     '[]',                         'Raj Verma (+91-9345678903)',     '22, Park Avenue, Mumbai',   '{"bp":"118/76","hr":68,"spo2":99,"temp":98.2,"rr":15}', '[]'),
  ('P005', 'Suresh Kumar',  51, 'Male',   'B-',  'ABHA-55555-44444', '+91-9456789013', 'Coronary Artery Disease','Monitoring', '["Warfarin"]',               'Lakshmi Kumar (+91-9456789014)','56, Ring Road, Delhi',      '{"bp":"142/90","hr":88,"spo2":96,"temp":98.8,"rr":18}', '[]');

-- ─── Appointments ─────────────────────────────────────────────────────────
INSERT INTO appointments (id, patient_id, patient_name, doctor_id, doctor_name, department, date, time, type, status) VALUES
  ('A001', 'P001', 'Amit Sharma',   'U001', 'Dr. Ananya Desai', 'Cardiology',    '2024-07-15', '10:30', 'Follow-up', 'Confirmed'),
  ('A002', 'P002', 'Priya Singh',   'U001', 'Dr. Ananya Desai', 'Endocrinology', '2024-07-12', '11:00', 'New',       'Confirmed'),
  ('A003', 'P003', 'Rajan Mehta',   'U001', 'Dr. Ananya Desai', 'Pulmonology',   '2024-07-10', '09:00', 'Emergency', 'Confirmed'),
  ('A004', 'P004', 'Anita Verma',   'U001', 'Dr. Ananya Desai', 'Neurology',     '2024-07-18', '14:30', 'Follow-up', 'Pending'),
  ('A005', 'P005', 'Suresh Kumar',  'U001', 'Dr. Ananya Desai', 'Cardiology',    '2024-07-11', '10:00', 'Follow-up', 'Confirmed');

-- ─── Lab Tests ────────────────────────────────────────────────────────────
INSERT INTO lab_tests (id, patient_id, patient_name, test, ordered_by, priority, status, time_ordered, date, results) VALUES
  ('LAB001', 'P001', 'Amit Sharma',   'CBC + LFT',       'Dr. Ananya Desai', 'Routine', 'Pending',     '09:15', '2024-07-10', NULL),
  ('LAB002', 'P003', 'Rajan Mehta',   'ABG + D-Dimer',   'Dr. Vikram Rao',   'Urgent',  'In Progress', '09:30', '2024-07-10', NULL),
  ('LAB003', 'P002', 'Priya Singh',   'HbA1c + FBS',     'Dr. Ananya Desai', 'Routine', 'Complete',    '08:00', '2024-07-10', '{"value":"HbA1c: 7.2%, FBS: 142 mg/dL","findings":"Slightly elevated glycemic control","interpretation":"Abnormal","tat":"2h 15m"}'),
  ('LAB004', 'P005', 'Suresh Kumar',  'Troponin I',      'Dr. Vikram Rao',   'Stat',    'Pending',     '10:00', '2024-07-10', NULL),
  ('LAB005', 'P004', 'Anita Verma',   'MRI Brain',       'Dr. Neha Gupta',   'Routine', 'Pending',     '10:20', '2024-07-10', NULL);

-- ─── Vitals ───────────────────────────────────────────────────────────────
INSERT INTO vitals (id, patient_id, bp, hr, spo2, temp, rr, pain, notes, timestamp, nurse) VALUES
  ('V001', 'P001', '138/88', 76, 97, 98.4, 16, 2, 'Patient comfortable',         '2024-07-10T09:00:00', 'Sr. Neha Sharma'),
  ('V002', 'P002', '128/82', 80, 98, 98.6, 17, 1, '',                            '2024-07-10T09:15:00', 'Sr. Neha Sharma'),
  ('V003', 'P003', '148/94', 92, 91, 99.2, 22, 5, 'O2 at 4L/min. Monitor closely.', '2024-07-10T09:30:00', 'Sr. Neha Sharma');

-- ─── Prescriptions ────────────────────────────────────────────────────────
INSERT INTO prescriptions (id, patient_id, patient_name, doctor_id, doctor_name, drug, dosage, qty, status, date) VALUES
  ('RX001', 'P001', 'Amit Sharma',  'U001', 'Dr. Ananya Desai', 'Amlodipine 5mg',     '1 tab daily',        30, 'Pending',   '2024-07-10'),
  ('RX002', 'P002', 'Priya Singh',  'U001', 'Dr. Ananya Desai', 'Metformin 500mg',    '1 tab twice daily',  60, 'Dispensed', '2024-07-09'),
  ('RX003', 'P003', 'Rajan Mehta',  'U001', 'Dr. Vikram Rao',   'Salbutamol Inhaler', '2 puffs 4x daily',    2, 'Pending',   '2024-07-10'),
  ('RX004', 'P005', 'Suresh Kumar', 'U001', 'Dr. Ananya Desai', 'Atorvastatin 20mg',  '1 tab at night',     30, 'Pending',   '2024-07-10');

-- ─── Inventory ────────────────────────────────────────────────────────────
INSERT INTO inventory (id, drug, stock, threshold, expiry, unit, cost) VALUES
  ('INV001', 'Amlodipine 5mg',      450,  100, '2025-06-30', 'tabs',  2.50),
  ('INV002', 'Metformin 500mg',      80,  150, '2025-03-15', 'tabs',  1.80),
  ('INV003', 'Salbutamol Inhaler',   25,   30, '2024-12-31', 'units', 120.00),
  ('INV004', 'Atorvastatin 20mg',   300,  100, '2025-09-30', 'tabs',  3.20),
  ('INV005', 'Aspirin 75mg',         12,  200, '2025-01-15', 'tabs',  0.80);

-- ─── Staff ────────────────────────────────────────────────────────────────
INSERT INTO staff (id, name, role, department, shift, status) VALUES
  ('S001', 'Dr. Ananya Desai', 'Cardiologist',     'Cardiology',  'Morning',   'On Duty'),
  ('S002', 'Dr. Vikram Rao',   'Pulmonologist',    'Pulmonology', 'Morning',   'On Duty'),
  ('S003', 'Sr. Neha Sharma',  'Head Nurse',       'Ward 3',      'Morning',   'On Duty'),
  ('S004', 'Dr. Rohan Khan',   'General Surgeon',  'Surgery',     'Night',     'Off Duty'),
  ('S005', 'Ramesh Verma',     'Lab Technician',   'Pathology',   'Morning',   'On Duty');

-- ─── Beds ─────────────────────────────────────────────────────────────────
INSERT INTO beds (ward, total, occupied) VALUES
  ('ICU',       20,  17),
  ('General',   80,  62),
  ('Pediatric', 30,  22),
  ('Maternity', 25,  18),
  ('Emergency', 15,  14);

-- ─── Compliance ───────────────────────────────────────────────────────────
INSERT INTO compliance (id, item, due, status, category) VALUES
  ('C001', 'Fire Safety Audit',          '2024-07-30', 'Complete',    'Safety'),
  ('C002', 'NABH Accreditation',         '2024-08-15', 'In Progress', 'Accreditation'),
  ('C003', 'HIPAA Training',             '2024-07-20', 'Overdue',     'Training'),
  ('C004', 'Equipment Calibration',      '2024-07-25', 'Complete',    'Equipment'),
  ('C005', 'Staff Training Sessions',    '2024-08-01', 'In Progress', 'Training');

-- ─── Surveillance Cases ───────────────────────────────────────────────────
INSERT INTO surveillance_cases (id, disease, state, district, cases, new_cases, deaths, trend, severity) VALUES
  ('SC001', 'Dengue',       'Maharashtra',   'Pune',         1240, 89,  12, 'up',     'high'),
  ('SC002', 'Malaria',      'Rajasthan',     'Jodhpur',       780, 42,   5, 'stable', 'medium'),
  ('SC003', 'COVID-19',     'Delhi',         'South Delhi',  3200, 210, 18, 'up',     'critical'),
  ('SC004', 'Tuberculosis', 'Uttar Pradesh', 'Varanasi',      560, 22,   8, 'down',   'medium'),
  ('SC005', 'Cholera',      'Bihar',         'Patna',         340, 65,   9, 'up',     'high');

-- ─── Hotspots ─────────────────────────────────────────────────────────────
INSERT INTO hotspots (id, city, state, lat, lng, disease, cases, severity, trend, days_active) VALUES
  ('H001', 'Mumbai',    'Maharashtra', 19.0760, 72.8777, 'Dengue',      2100, 'critical', 'up',     14),
  ('H002', 'Delhi',     'Delhi',       28.7041, 77.1025, 'COVID-19',    3200, 'critical', 'up',     21),
  ('H003', 'Kolkata',   'West Bengal', 22.5726, 88.3639, 'Cholera',      890, 'high',     'up',      7),
  ('H004', 'Chennai',   'Tamil Nadu',  13.0827, 80.2707, 'Dengue',      1450, 'high',     'stable', 18),
  ('H005', 'Bengaluru', 'Karnataka',   12.9716, 77.5946, 'Influenza',    720, 'medium',   'down',   10);

-- ─── Notifications ────────────────────────────────────────────────────────
INSERT INTO notifications (id, user_id, message, type, read) VALUES
  ('N001', 'U002', 'Follow-up appointment with Dr. Ananya Desai on July 15.', 'reminder',   FALSE),
  ('N002', 'U002', 'Your lab results for HbA1c are ready. Please review.',    'result',     FALSE),
  ('N003', 'U002', 'Time to take your Amlodipine 5mg medication.',            'medication', FALSE);

-- ─── Drug Interactions ────────────────────────────────────────────────────
INSERT INTO drug_interactions (drug1, drug2, severity, effect, significance) VALUES
  ('Warfarin',     'Aspirin',       'High',   'Increased bleeding risk',  'Avoid combination'),
  ('Metformin',    'Alcohol',       'High',   'Lactic acidosis risk',     'Contraindicated'),
  ('Amlodipine',   'Grapefruit',    'Medium', 'Increased drug levels',    'Avoid grapefruit juice'),
  ('Atorvastatin', 'Erythromycin',  'Medium', 'Myopathy risk',            'Monitor closely');
