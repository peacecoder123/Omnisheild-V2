-- OmniShield PostgreSQL Schema
-- Run: psql -U postgres -d omnishield -f schema.sql

DROP TABLE IF EXISTS drug_interactions CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS hotspots CASCADE;
DROP TABLE IF EXISTS surveillance_cases CASCADE;
DROP TABLE IF EXISTS compliance CASCADE;
DROP TABLE IF EXISTS beds CASCADE;
DROP TABLE IF EXISTS staff CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS prescriptions CASCADE;
DROP TABLE IF EXISTS vitals CASCADE;
DROP TABLE IF EXISTS lab_tests CASCADE;
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS patients CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id          TEXT PRIMARY KEY,
  email       TEXT UNIQUE NOT NULL,
  password    TEXT NOT NULL,
  role        TEXT NOT NULL,
  name        TEXT NOT NULL,
  facility    TEXT,
  abha_id     TEXT
);

CREATE TABLE patients (
  id                TEXT PRIMARY KEY,
  name              TEXT NOT NULL,
  age               INTEGER,
  gender            TEXT,
  blood             TEXT,
  abha_id           TEXT,
  phone             TEXT,
  condition         TEXT,
  status            TEXT DEFAULT 'Stable',
  allergies         JSONB DEFAULT '[]',
  emergency_contact TEXT,
  address           TEXT,
  vitals            JSONB DEFAULT '{}',
  history           JSONB DEFAULT '[]'
);

CREATE TABLE appointments (
  id           TEXT PRIMARY KEY,
  patient_id   TEXT REFERENCES patients(id),
  patient_name TEXT,
  doctor_id    TEXT REFERENCES users(id),
  doctor_name  TEXT,
  department   TEXT,
  date         TEXT,
  time         TEXT,
  type         TEXT,
  status       TEXT DEFAULT 'Pending'
);

CREATE TABLE lab_tests (
  id           TEXT PRIMARY KEY,
  patient_id   TEXT REFERENCES patients(id),
  patient_name TEXT,
  test         TEXT,
  ordered_by   TEXT,
  priority     TEXT DEFAULT 'Routine',
  status       TEXT DEFAULT 'Pending',
  time_ordered TEXT,
  date         TEXT,
  results      JSONB
);

CREATE TABLE vitals (
  id         TEXT PRIMARY KEY,
  patient_id TEXT REFERENCES patients(id),
  bp         TEXT,
  hr         INTEGER,
  spo2       INTEGER,
  temp       NUMERIC(5,1),
  rr         INTEGER,
  pain       INTEGER,
  notes      TEXT,
  timestamp  TEXT,
  nurse      TEXT
);

CREATE TABLE prescriptions (
  id           TEXT PRIMARY KEY,
  patient_id   TEXT REFERENCES patients(id),
  patient_name TEXT,
  doctor_id    TEXT REFERENCES users(id),
  doctor_name  TEXT,
  drug         TEXT,
  dosage       TEXT,
  qty          INTEGER,
  status       TEXT DEFAULT 'Pending',
  date         TEXT,
  dispensed_at TEXT
);

CREATE TABLE inventory (
  id        TEXT PRIMARY KEY,
  drug      TEXT NOT NULL,
  stock     INTEGER DEFAULT 0,
  threshold INTEGER DEFAULT 100,
  expiry    TEXT,
  unit      TEXT,
  cost      NUMERIC(10,2)
);

CREATE TABLE staff (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  role       TEXT,
  department TEXT,
  shift      TEXT,
  status     TEXT
);

CREATE TABLE beds (
  ward     TEXT PRIMARY KEY,
  total    INTEGER,
  occupied INTEGER
);

CREATE TABLE compliance (
  id       TEXT PRIMARY KEY,
  item     TEXT,
  due      TEXT,
  status   TEXT,
  category TEXT
);

CREATE TABLE surveillance_cases (
  id        TEXT PRIMARY KEY,
  disease   TEXT,
  state     TEXT,
  district  TEXT,
  cases     INTEGER,
  new_cases INTEGER,
  deaths    INTEGER,
  trend     TEXT,
  severity  TEXT
);

CREATE TABLE hotspots (
  id          TEXT PRIMARY KEY,
  city        TEXT,
  state       TEXT,
  lat         NUMERIC(9,4),
  lng         NUMERIC(9,4),
  disease     TEXT,
  cases       INTEGER,
  severity    TEXT,
  trend       TEXT,
  days_active INTEGER
);

CREATE TABLE notifications (
  id      TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  message TEXT,
  type    TEXT,
  read    BOOLEAN DEFAULT FALSE
);

CREATE TABLE drug_interactions (
  id           SERIAL PRIMARY KEY,
  drug1        TEXT,
  drug2        TEXT,
  severity     TEXT,
  effect       TEXT,
  significance TEXT
);
