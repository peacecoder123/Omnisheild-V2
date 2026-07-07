-- OmniShield PostgreSQL Schema
-- Run: psql -U postgres -d omnishield -f server/setup.sql

-- Users
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(50) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  facility VARCHAR(255)
);

-- Patients
CREATE TABLE IF NOT EXISTS patients (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INTEGER,
  gender VARCHAR(20),
  blood VARCHAR(10),
  abha_id VARCHAR(100),
  phone VARCHAR(50),
  condition VARCHAR(255),
  status VARCHAR(50),
  allergies TEXT,
  emergency_contact VARCHAR(255),
  address TEXT,
  vitals JSONB,
  history JSONB
);

-- Appointments
CREATE TABLE IF NOT EXISTS appointments (
  id VARCHAR(50) PRIMARY KEY,
  patient_id VARCHAR(50) REFERENCES patients(id),
  patient_name VARCHAR(255),
  doctor_id VARCHAR(50),
  doctor_name VARCHAR(255),
  department VARCHAR(100),
  date VARCHAR(20),
  time VARCHAR(20),
  type VARCHAR(50),
  status VARCHAR(50)
);

-- Lab Tests
CREATE TABLE IF NOT EXISTS lab_tests (
  id VARCHAR(50) PRIMARY KEY,
  patient_id VARCHAR(50) REFERENCES patients(id),
  patient_name VARCHAR(255),
  test VARCHAR(255),
  ordered_by VARCHAR(255),
  priority VARCHAR(50),
  status VARCHAR(50),
  time_ordered VARCHAR(20),
  date VARCHAR(20),
  results JSONB
);

-- Vitals
CREATE TABLE IF NOT EXISTS vitals (
  id VARCHAR(50) PRIMARY KEY,
  patient_id VARCHAR(50) REFERENCES patients(id),
  bp VARCHAR(20),
  hr INTEGER,
  spo2 INTEGER,
  temp NUMERIC(5,1),
  rr INTEGER,
  pain INTEGER,
  notes TEXT,
  timestamp TIMESTAMPTZ,
  nurse VARCHAR(255)
);

-- Prescriptions
CREATE TABLE IF NOT EXISTS prescriptions (
  id VARCHAR(50) PRIMARY KEY,
  patient_id VARCHAR(50) REFERENCES patients(id),
  patient_name VARCHAR(255),
  doctor_id VARCHAR(50),
  doctor_name VARCHAR(255),
  drug VARCHAR(255),
  dosage VARCHAR(100),
  qty INTEGER,
  status VARCHAR(50),
  date VARCHAR(20),
  dispensed_at TIMESTAMPTZ
);

-- Inventory
CREATE TABLE IF NOT EXISTS inventory (
  id VARCHAR(50) PRIMARY KEY,
  drug VARCHAR(255),
  stock INTEGER,
  threshold INTEGER,
  expiry VARCHAR(20),
  unit VARCHAR(20),
  cost NUMERIC(10,2)
);

-- Staff
CREATE TABLE IF NOT EXISTS staff (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255),
  role VARCHAR(100),
  department VARCHAR(100),
  shift VARCHAR(50),
  status VARCHAR(50)
);

-- Beds
CREATE TABLE IF NOT EXISTS beds (
  ward VARCHAR(100) PRIMARY KEY,
  total INTEGER,
  occupied INTEGER
);

-- Compliance
CREATE TABLE IF NOT EXISTS compliance (
  id VARCHAR(50) PRIMARY KEY,
  item VARCHAR(255),
  due VARCHAR(20),
  status VARCHAR(50),
  category VARCHAR(100)
);

-- Surveillance Cases
CREATE TABLE IF NOT EXISTS surveillance_cases (
  id VARCHAR(50) PRIMARY KEY,
  disease VARCHAR(100),
  state VARCHAR(100),
  district VARCHAR(100),
  cases INTEGER,
  new_cases INTEGER,
  deaths INTEGER,
  trend VARCHAR(20),
  severity VARCHAR(20)
);

-- Hotspots
CREATE TABLE IF NOT EXISTS hotspots (
  id VARCHAR(50) PRIMARY KEY,
  city VARCHAR(100),
  state VARCHAR(100),
  lat NUMERIC(10,4),
  lng NUMERIC(10,4),
  disease VARCHAR(100),
  cases INTEGER,
  severity VARCHAR(20),
  trend VARCHAR(20),
  days_active INTEGER
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50),
  message TEXT,
  type VARCHAR(50),
  read BOOLEAN DEFAULT FALSE
);

-- Drug Interactions
CREATE TABLE IF NOT EXISTS drug_interactions (
  drug1 VARCHAR(100),
  drug2 VARCHAR(100),
  severity VARCHAR(20),
  effect TEXT,
  significance TEXT
);
