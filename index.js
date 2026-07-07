// Mock data for OmniShield backend — DEMO ONLY, do not use in production

// NOTE: Passwords are stored in plain text here for demo purposes only.
// A production system must hash passwords with bcrypt or similar.
export const users = [
  { id: 'U001', email: 'doctor@demo.com', password: 'demo', role: 'doctor', name: 'Dr. Ananya Desai', facility: 'City General Hospital' },
  { id: 'U002', email: 'patient@demo.com', password: 'demo', role: 'patient', name: 'Amit Sharma', facility: 'City General Hospital', abhaId: 'ABHA-12345-67890' },
  { id: 'U003', email: 'nurse@demo.com', password: 'demo', role: 'nurse', name: 'Sr. Neha Sharma', facility: 'City General Hospital' },
  { id: 'U004', email: 'labtech@demo.com', password: 'demo', role: 'lab_tech', name: 'Ramesh Verma', facility: 'City General Hospital' },
  { id: 'U005', email: 'pharma@demo.com', password: 'demo', role: 'pharmacist', name: 'Kavita Patel', facility: 'City General Hospital' },
  { id: 'U006', email: 'admin@demo.com', password: 'demo', role: 'admin', name: 'Suresh Kumar', facility: 'City General Hospital' },
  { id: 'U007', email: 'govt@demo.com', password: 'demo', role: 'government', name: 'IAS Rajesh Mehta', facility: 'Ministry of Health' },
];

export const patients = [
  {
    id: 'P001', name: 'Amit Sharma', age: 42, gender: 'Male', blood: 'B+',
    abhaId: 'ABHA-12345-67890', phone: '+91-9876543210',
    condition: 'Hypertension', status: 'Stable',
    allergies: ['Penicillin', 'Sulfa'], emergency_contact: 'Reena Sharma (+91-9876543211)',
    address: '12, MG Road, Bengaluru',
    vitals: { bp: '138/88', hr: 76, spo2: 97, temp: 98.4, rr: 16 },
    history: [
      { date: '2024-06-15', doctor: 'Dr. Ananya Desai', type: 'Follow-up', note: 'BP controlled. Continue Amlodipine 5mg.' },
      { date: '2024-05-10', doctor: 'Dr. Vikram Rao', type: 'Consultation', note: 'Chest X-ray normal. Echo scheduled.' },
    ],
  },
  {
    id: 'P002', name: 'Priya Singh', age: 29, gender: 'Female', blood: 'A+',
    abhaId: 'ABHA-22222-11111', phone: '+91-9123456780',
    condition: 'Type 2 Diabetes', status: 'Follow-up',
    allergies: ['Aspirin'], emergency_contact: 'Rohan Singh (+91-9123456781)',
    address: '45, Nehru Nagar, Pune',
    vitals: { bp: '128/82', hr: 80, spo2: 98, temp: 98.6, rr: 17 },
    history: [
      { date: '2024-06-20', doctor: 'Dr. Ananya Desai', type: 'Follow-up', note: 'HbA1c 7.2. Adjust Metformin dose.' },
    ],
  },
  {
    id: 'P003', name: 'Rajan Mehta', age: 65, gender: 'Male', blood: 'O-',
    abhaId: 'ABHA-33333-22222', phone: '+91-9234567891',
    condition: 'COPD', status: 'Critical',
    allergies: ['NSAIDs', 'Codeine'], emergency_contact: 'Sunita Mehta (+91-9234567892)',
    address: '78, Gandhi Street, Chennai',
    vitals: { bp: '148/94', hr: 92, spo2: 91, temp: 99.2, rr: 22 },
    history: [
      { date: '2024-07-01', doctor: 'Dr. Vikram Rao', type: 'Emergency', note: 'SpO2 critical, O2 supplementation started.' },
    ],
  },
  {
    id: 'P004', name: 'Anita Verma', age: 35, gender: 'Female', blood: 'AB+',
    abhaId: 'ABHA-44444-33333', phone: '+91-9345678902',
    condition: 'Migraine', status: 'Stable',
    allergies: [], emergency_contact: 'Raj Verma (+91-9345678903)',
    address: '22, Park Avenue, Mumbai',
    vitals: { bp: '118/76', hr: 68, spo2: 99, temp: 98.2, rr: 15 },
    history: [],
  },
  {
    id: 'P005', name: 'Suresh Kumar', age: 51, gender: 'Male', blood: 'B-',
    abhaId: 'ABHA-55555-44444', phone: '+91-9456789013',
    condition: 'Coronary Artery Disease', status: 'Monitoring',
    allergies: ['Warfarin'], emergency_contact: 'Lakshmi Kumar (+91-9456789014)',
    address: '56, Ring Road, Delhi',
    vitals: { bp: '142/90', hr: 88, spo2: 96, temp: 98.8, rr: 18 },
    history: [],
  },
];

export const appointments = [
  { id: 'A001', patientId: 'P001', patientName: 'Amit Sharma', doctorId: 'U001', doctorName: 'Dr. Ananya Desai', department: 'Cardiology', date: '2024-07-15', time: '10:30', type: 'Follow-up', status: 'Confirmed' },
  { id: 'A002', patientId: 'P002', patientName: 'Priya Singh', doctorId: 'U001', doctorName: 'Dr. Ananya Desai', department: 'Endocrinology', date: '2024-07-12', time: '11:00', type: 'New', status: 'Confirmed' },
  { id: 'A003', patientId: 'P003', patientName: 'Rajan Mehta', doctorId: 'U001', doctorName: 'Dr. Ananya Desai', department: 'Pulmonology', date: '2024-07-10', time: '09:00', type: 'Emergency', status: 'Confirmed' },
  { id: 'A004', patientId: 'P004', patientName: 'Anita Verma', doctorId: 'U001', doctorName: 'Dr. Ananya Desai', department: 'Neurology', date: '2024-07-18', time: '14:30', type: 'Follow-up', status: 'Pending' },
  { id: 'A005', patientId: 'P005', patientName: 'Suresh Kumar', doctorId: 'U001', doctorName: 'Dr. Ananya Desai', department: 'Cardiology', date: '2024-07-11', time: '10:00', type: 'Follow-up', status: 'Confirmed' },
];

export const labTests = [
  { id: 'LAB001', patientId: 'P001', patientName: 'Amit Sharma', test: 'CBC + LFT', orderedBy: 'Dr. Ananya Desai', priority: 'Routine', status: 'Pending', timeOrdered: '09:15', date: '2024-07-10', results: null },
  { id: 'LAB002', patientId: 'P003', patientName: 'Rajan Mehta', test: 'ABG + D-Dimer', orderedBy: 'Dr. Vikram Rao', priority: 'Urgent', status: 'In Progress', timeOrdered: '09:30', date: '2024-07-10', results: null },
  { id: 'LAB003', patientId: 'P002', patientName: 'Priya Singh', test: 'HbA1c + FBS', orderedBy: 'Dr. Ananya Desai', priority: 'Routine', status: 'Complete', timeOrdered: '08:00', date: '2024-07-10', results: { value: 'HbA1c: 7.2%, FBS: 142 mg/dL', findings: 'Slightly elevated glycemic control', interpretation: 'Abnormal', tat: '2h 15m' } },
  { id: 'LAB004', patientId: 'P005', patientName: 'Suresh Kumar', test: 'Troponin I', orderedBy: 'Dr. Vikram Rao', priority: 'Stat', status: 'Pending', timeOrdered: '10:00', date: '2024-07-10', results: null },
  { id: 'LAB005', patientId: 'P004', patientName: 'Anita Verma', test: 'MRI Brain', orderedBy: 'Dr. Neha Gupta', priority: 'Routine', status: 'Pending', timeOrdered: '10:20', date: '2024-07-10', results: null },
];

export const vitals = [
  { id: 'V001', patientId: 'P001', bp: '138/88', hr: 76, spo2: 97, temp: 98.4, rr: 16, pain: 2, notes: 'Patient comfortable', timestamp: '2024-07-10T09:00:00', nurse: 'Sr. Neha Sharma' },
  { id: 'V002', patientId: 'P002', bp: '128/82', hr: 80, spo2: 98, temp: 98.6, rr: 17, pain: 1, notes: '', timestamp: '2024-07-10T09:15:00', nurse: 'Sr. Neha Sharma' },
  { id: 'V003', patientId: 'P003', bp: '148/94', hr: 92, spo2: 91, temp: 99.2, rr: 22, pain: 5, notes: 'O2 at 4L/min. Monitor closely.', timestamp: '2024-07-10T09:30:00', nurse: 'Sr. Neha Sharma' },
];

export const prescriptions = [
  { id: 'RX001', patientId: 'P001', patientName: 'Amit Sharma', doctorId: 'U001', doctorName: 'Dr. Ananya Desai', drug: 'Amlodipine 5mg', dosage: '1 tab daily', qty: 30, status: 'Pending', date: '2024-07-10' },
  { id: 'RX002', patientId: 'P002', patientName: 'Priya Singh', doctorId: 'U001', doctorName: 'Dr. Ananya Desai', drug: 'Metformin 500mg', dosage: '1 tab twice daily', qty: 60, status: 'Dispensed', date: '2024-07-09' },
  { id: 'RX003', patientId: 'P003', patientName: 'Rajan Mehta', doctorId: 'U001', doctorName: 'Dr. Vikram Rao', drug: 'Salbutamol Inhaler', dosage: '2 puffs 4x daily', qty: 2, status: 'Pending', date: '2024-07-10' },
  { id: 'RX004', patientId: 'P005', patientName: 'Suresh Kumar', doctorId: 'U001', doctorName: 'Dr. Ananya Desai', drug: 'Atorvastatin 20mg', dosage: '1 tab at night', qty: 30, status: 'Pending', date: '2024-07-10' },
];

export const inventory = [
  { id: 'INV001', drug: 'Amlodipine 5mg', stock: 450, threshold: 100, expiry: '2025-06-30', unit: 'tabs', cost: 2.5 },
  { id: 'INV002', drug: 'Metformin 500mg', stock: 80, threshold: 150, expiry: '2025-03-15', unit: 'tabs', cost: 1.8 },
  { id: 'INV003', drug: 'Salbutamol Inhaler', stock: 25, threshold: 30, expiry: '2024-12-31', unit: 'units', cost: 120 },
  { id: 'INV004', drug: 'Atorvastatin 20mg', stock: 300, threshold: 100, expiry: '2025-09-30', unit: 'tabs', cost: 3.2 },
  { id: 'INV005', drug: 'Aspirin 75mg', stock: 12, threshold: 200, expiry: '2025-01-15', unit: 'tabs', cost: 0.8 },
  { id: 'INV006', drug: 'Paracetamol 500mg', stock: 1200, threshold: 200, expiry: '2026-02-28', unit: 'tabs', cost: 0.5 },
  { id: 'INV007', drug: 'Omeprazole 20mg', stock: 180, threshold: 100, expiry: '2025-07-31', unit: 'caps', cost: 2.0 },
  { id: 'INV008', drug: 'Amoxicillin 500mg', stock: 60, threshold: 100, expiry: '2024-11-30', unit: 'caps', cost: 5.0 },
];

export const staff = [
  { id: 'S001', name: 'Dr. Ananya Desai', role: 'Cardiologist', department: 'Cardiology', shift: 'Morning', status: 'On Duty' },
  { id: 'S002', name: 'Dr. Vikram Rao', role: 'Pulmonologist', department: 'Pulmonology', shift: 'Morning', status: 'On Duty' },
  { id: 'S003', name: 'Sr. Neha Sharma', role: 'Head Nurse', department: 'Ward 3', shift: 'Morning', status: 'On Duty' },
  { id: 'S004', name: 'Dr. Rohan Khan', role: 'General Surgeon', department: 'Surgery', shift: 'Night', status: 'Off Duty' },
  { id: 'S005', name: 'Ramesh Verma', role: 'Lab Technician', department: 'Pathology', shift: 'Morning', status: 'On Duty' },
  { id: 'S006', name: 'Kavita Patel', role: 'Pharmacist', department: 'Pharmacy', shift: 'Morning', status: 'On Duty' },
  { id: 'S007', name: 'Dr. Neha Gupta', role: 'Neurologist', department: 'Neurology', shift: 'Afternoon', status: 'On Duty' },
  { id: 'S008', name: 'Arjun Singh', role: 'Radiologist', department: 'Radiology', shift: 'Morning', status: 'On Leave' },
];

export const beds = [
  { ward: 'ICU', total: 20, occupied: 17 },
  { ward: 'General', total: 80, occupied: 62 },
  { ward: 'Pediatric', total: 30, occupied: 22 },
  { ward: 'Maternity', total: 25, occupied: 18 },
  { ward: 'Emergency', total: 15, occupied: 14 },
];

export const compliance = [
  { id: 'C001', item: 'Fire Safety Audit', due: '2024-07-30', status: 'Complete', category: 'Safety' },
  { id: 'C002', item: 'NABH Accreditation', due: '2024-08-15', status: 'In Progress', category: 'Accreditation' },
  { id: 'C003', item: 'HIPAA Training', due: '2024-07-20', status: 'Overdue', category: 'Training' },
  { id: 'C004', item: 'Equipment Calibration', due: '2024-07-25', status: 'Complete', category: 'Equipment' },
  { id: 'C005', item: 'Staff Training Sessions', due: '2024-08-01', status: 'In Progress', category: 'Training' },
  { id: 'C006', item: 'Fire Holding Equipment Check', due: '2024-07-15', status: 'Complete', category: 'Safety' },
  { id: 'C007', item: 'Infection Control Audit', due: '2024-07-28', status: 'In Progress', category: 'Safety' },
  { id: 'C008', item: 'Waste Management Review', due: '2024-08-10', status: 'Overdue', category: 'Environment' },
];

export const surveillanceCases = [
  { id: 'SC001', disease: 'Dengue', state: 'Maharashtra', district: 'Pune', cases: 1240, newCases: 89, deaths: 12, trend: 'up', severity: 'high' },
  { id: 'SC002', disease: 'Malaria', state: 'Rajasthan', district: 'Jodhpur', cases: 780, newCases: 42, deaths: 5, trend: 'stable', severity: 'medium' },
  { id: 'SC003', disease: 'COVID-19', state: 'Delhi', district: 'South Delhi', cases: 3200, newCases: 210, deaths: 18, trend: 'up', severity: 'critical' },
  { id: 'SC004', disease: 'Tuberculosis', state: 'Uttar Pradesh', district: 'Varanasi', cases: 560, newCases: 22, deaths: 8, trend: 'down', severity: 'medium' },
  { id: 'SC005', disease: 'Cholera', state: 'Bihar', district: 'Patna', cases: 340, newCases: 65, deaths: 9, trend: 'up', severity: 'high' },
];

export const hotspots = [
  { id: 'H001', city: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777, disease: 'Dengue', cases: 2100, severity: 'critical', trend: 'up', daysActive: 14 },
  { id: 'H002', city: 'Delhi', state: 'Delhi', lat: 28.7041, lng: 77.1025, disease: 'COVID-19', cases: 3200, severity: 'critical', trend: 'up', daysActive: 21 },
  { id: 'H003', city: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639, disease: 'Cholera', cases: 890, severity: 'high', trend: 'up', daysActive: 7 },
  { id: 'H004', city: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707, disease: 'Dengue', cases: 1450, severity: 'high', trend: 'stable', daysActive: 18 },
  { id: 'H005', city: 'Bengaluru', state: 'Karnataka', lat: 12.9716, lng: 77.5946, disease: 'Influenza', cases: 720, severity: 'medium', trend: 'down', daysActive: 10 },
  { id: 'H006', city: 'Hyderabad', state: 'Telangana', lat: 17.3850, lng: 78.4867, disease: 'Malaria', cases: 540, severity: 'medium', trend: 'stable', daysActive: 12 },
  { id: 'H007', city: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567, disease: 'Typhoid', cases: 320, severity: 'low', trend: 'down', daysActive: 5 },
  { id: 'H008', city: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873, disease: 'Malaria', cases: 280, severity: 'low', trend: 'down', daysActive: 8 },
  { id: 'H009', city: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lng: 72.5714, disease: 'Hepatitis B', cases: 410, severity: 'medium', trend: 'stable', daysActive: 15 },
  { id: 'H010', city: 'Patna', state: 'Bihar', lat: 25.5941, lng: 85.1376, disease: 'Cholera', cases: 650, severity: 'high', trend: 'up', daysActive: 6 },
];

export const notifications = [
  { id: 'N001', userId: 'U002', message: 'Follow-up appointment with Dr. Ananya Desai on July 15.', type: 'reminder', read: false },
  { id: 'N002', userId: 'U002', message: 'Your lab results for HbA1c are ready. Please review.', type: 'result', read: false },
  { id: 'N003', userId: 'U002', message: 'Time to take your Amlodipine 5mg medication.', type: 'medication', read: false },
];

export const drugInteractions = [
  { drug1: 'Warfarin', drug2: 'Aspirin', severity: 'High', effect: 'Increased bleeding risk', significance: 'Avoid combination' },
  { drug1: 'Metformin', drug2: 'Alcohol', severity: 'High', effect: 'Lactic acidosis risk', significance: 'Contraindicated' },
  { drug1: 'Amlodipine', drug2: 'Grapefruit', severity: 'Medium', effect: 'Increased drug levels', significance: 'Avoid grapefruit juice' },
  { drug1: 'Atorvastatin', drug2: 'Erythromycin', severity: 'Medium', effect: 'Myopathy risk', significance: 'Monitor closely' },
];
