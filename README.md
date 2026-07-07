<div align="center">

# 🛡️ OmniShield

**Decentralized Smart Healthcare & Disease Surveillance System**

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg?style=flat-square&logo=node.js)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-PostGIS-336791.svg?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Apache Kafka](https://img.shields.io/badge/Apache_Kafka-Event_Streaming-black.svg?style=flat-square&logo=apachekafka)](https://kafka.apache.org/)
[![Docker](https://img.shields.io/badge/Docker-Cloud_Native-2496ED.svg?style=flat-square&logo=docker)](https://www.docker.com/)

*Built with ❤️ by Team Collective for the LOOP Hackathon 2026*

</div>

---

> **Mission:** To bridge the gap between offline rural healthcare and national disease forecasting by combining an offline-first PWA, differential privacy, real-time event streaming, and federated learning models to predict outbreaks before they become pandemics.

## 👥 Team Collective

| Name | Role / Focus Area |
| :--- | :--- |
| **Vipul Khairnar** | System Architecture & Machine Learning |
| **Neha Tekwani** | Frontend Development & PWA Sync Engine |
| **Radhe Wankhede** | Backend APIs & Data Engineering |

---

## 🌟 Enterprise Architecture (Features)

OmniShield is designed to scale dynamically and handle millions of concurrent users across government and private healthcare networks, directly addressing complex public health requirements.

### 📶 Offline-First Rural Care
* **PWA & IndexedDB:** Rural doctors can scan ABHA-linked Smart Health Cards and log diagnoses completely offline. 
* **Auto-Sync Engine:** Payloads are securely cached locally and automatically background-synced via Service Workers the moment connectivity is restored.

### 🔒 Zero-Knowledge Privacy Layer
* **Local Differential Privacy (LDP):** Injects calculated Laplace noise to geographic coordinates to fuzz patient locations, protecting identities while retaining analytical value.
* **Adaptive Privacy Budgets:** Systemically tracks cumulative privacy loss across queries, generating auditable compliance reports for regulators.

### ⚡ Real-Time & Predictive Epidemiology
* **Event-Driven Streaming:** Replaces REST bottlenecks with **Apache Kafka / RabbitMQ** to continuously ingest healthcare events.
* **PostGIS DBSCAN Clustering:** Instantly calculates spatial disease hotspots directly inside the database via PostgreSQL row-level triggers.
* **Outbreak Forecasting:** Integrates **Prophet** time-series forecasting and **SIR/SEIR** models to simulate epidemic propagation across districts based on population density.
* **Federated Learning:** Privacy-preserving AI trains predictive models locally at individual hospitals, aggregating only encrypted model updates centrally.

---

## 💻 Technical Stack

### Frontend & UI
* **Core:** React 18, Vite, TypeScript
* **Styling:** Tailwind CSS (Custom Design System), Lucide Icons
* **Offline Engine:** Dexie.js (IndexedDB), Vite PWA Plugin
* **Visualization:** Recharts (Forecasting), Custom SVG / Leaflet (Mapping)

### Backend & Event Streaming
* **Server:** Node.js, Express.js (TypeScript)
* **Messaging:** Apache Kafka / RabbitMQ
* **Interoperability:** HL7 FHIR & DICOM Standard APIs

### Database & Geographical AI
* **Database:** PostgreSQL
* **Spatial Extension:** PostGIS (`ST_ClusterDBSCAN`)
* **Real-time Push:** WebSockets (via `pg_notify`)

### Infrastructure & ML
* **DevOps:** Docker, Kubernetes (K8s)
* **ML Frameworks:** Python (FastAPI), Prophet, SIR/SEIR Simulators

---

## 🛠️ Local Development Guide

*Note: This spins up the hackathon prototype (PWA, Node Server, and PostgreSQL).*

### 1. Database Initialization
Ensure PostgreSQL (v14+) is installed with the **PostGIS** extension.
```bash
# In your psql terminal:
CREATE DATABASE omnishield_db;
CREATE USER omnishield WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE omnishield_db TO omnishield;# OmniShield — Decentralized Smart Health Card & Disease Surveillance Platform

> **India's most advanced health surveillance and clinical decision support platform**, unifying decentralized health cards, real-time epidemic monitoring, federated learning, and AI-powered CDSS in a single full-stack web application.

[![Build](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/2024prembhojwani-coder/omnishield/actions)
[![FHIR](https://img.shields.io/badge/FHIR-R4%20Compliant-blue)](#)
[![Compliance](https://img.shields.io/badge/compliance-HIPAA%20%7C%20GDPR%20%7C%20NDHM-teal)](#)
[![License](https://img.shields.io/badge/license-MIT-gray)](#)

---

## 🚀 Quick Start


```bash
npm install
npm run dev       # development server at http://localhost:5173
npm run build     # production build
npm run preview   # preview production build
```

**Demo login:** `demo@omnishield.health` / `demo1234` — any role works.

---

## 📐 Tech Stack

| Layer        | Technology                                          |
|--------------|-----------------------------------------------------|
| Frontend     | React 18, Vite 5, TailwindCSS 3                     |
| Routing      | React Router v6                                     |
| State        | React Context API + useState/useCallback hooks      |
| Charts       | Recharts 2                                          |
| Icons        | Lucide React                                        |
| PWA          | Service Worker + Web App Manifest                   |
| Auth (mock)  | JWT (localStorage) — TODO: connect real backend     |

---

## 🗂 Project Structure

```
src/
├── App.jsx                        # Root router
├── main.jsx                       # React entry point
├── index.css                      # Tailwind + custom components
├── contexts/
│   └── AuthContext.jsx            # Auth state + login/register/logout
├── utils/
│   ├── api.js                     # API client (auth-aware fetch)
│   ├── constants.js               # Roles, nav items, disease list
│   └── helpers.js                 # formatDate, simulateSIR, etc.
└── components/
    ├── layout/                    # Navbar, Sidebar, DashboardLayout, Footer
    ├── auth/                      # Login, Register, ForgotPassword, MFA, ProtectedRoute
    ├── landing/                   # LandingPage (hero, features, CTA)
    ├── dashboard/                 # Role-based: Doctor, Nurse, LabTech, Pharmacist, Admin, Patient
    ├── healthcard/                # HealthCardView, ABHAIntegration, CarePathway
    ├── surveillance/              # SurveillanceDashboard, HotspotMap, SIRModel, OutbreakTimeline
    ├── privacy/                   # PrivacyDashboard, BudgetTracker, FederatedLearning
    ├── integration/               # FHIRBrowser, DataExchange, SystemConnections
    ├── streaming/                 # LiveEventFeed, PipelineStatus, AlertConfig
    ├── cdss/                      # SymptomChecker, DrugInteractions, DiagnosticRecommendations
    ├── analytics/                 # PopulationHealth, DiseaseForecasting, VaccinationImpact
    ├── security/                  # SecurityCenter, AuditLog, ComplianceChecklist
    └── business/                  # BusinessModelPage, PricingTable, ROICalculator
```

---

## 🔑 Features

### Smart Health Card
- Digital ABHA-linked health card with gradient UI and QR placeholder
- Geolocation-stamped access log
- Care pathway timeline of all visits, labs, medications

### Disease Surveillance
- Hotspot map across Indian cities with risk coloring
- Interactive SIR/SEIR epidemic model with live sliders (R₀, γ, days)
- Outbreak timeline with multi-disease comparison charts

### AI-Powered CDSS
- Symptom checker with differential diagnosis scoring
- Drug–drug interaction checker (Warfarin/Aspirin etc.)
- Evidence-based diagnostic recommendations (JNC8, ADA, NICE)

### Privacy & Federated Learning
- ε-Differential privacy budget tracker (radial gauge)
- Federated Learning node status (FedAvg, 5 hospital nodes)
- Query history with approval/rejection workflow

### FHIR Integration
- HL7 FHIR R4 resource browser (Patient, Observation, MedicationRequest)
- JSON viewer for FHIR resources
- API endpoint reference

### Live Streaming
- Real-time event feed (Kafka simulation via setInterval)
- Pipeline status dashboard (Kafka + RabbitMQ)
- Alert configuration with toggle controls

### Analytics
- Population health charts (age distribution, disease burden)
- Disease forecasting (ARIMA + ML, 3-week lookahead)
- Vaccination impact analysis (coverage vs case reduction)

### Security
- Zero-trust security center with threat event log
- Audit log with search and status filter
- HIPAA / GDPR / NDHM compliance checklist (score %)

### Business Model
- Revenue stream breakdown
- 3-tier pricing table (Basic / Professional / Enterprise)
- Interactive ROI calculator (beds, occupancy, plan)

### Multi-Role Dashboards
| Role | Key Features |
|------|-------------|
| Doctor | Patient list, CDSS alerts, consultation trend chart |
| Nurse | Vitals entry form, shift task checklist, handover notes |
| Lab Tech | Orders queue, result entry form |
| Pharmacist | Prescription queue, inventory table, DDI alerts |
| Admin | Bed occupancy, revenue chart, staff list, compliance |
| Patient | Health summary, visit history, upcoming appointments |

---

## 🔒 Authentication

Auth is mocked via localStorage for the demo. To connect a real backend:

1. Open `src/contexts/AuthContext.jsx`
2. Replace the mock `await new Promise(…)` blocks with actual `fetch` calls
3. Set `VITE_API_BASE` in `.env` to your backend URL

```env
VITE_API_BASE=https://api.omnishield.health
```

---

## 🏥 Compliance

- **HIPAA** — access controls, audit trails, transmission security
- **GDPR** — consent management, data subject rights, DPA notification
- **NDHM / ABDM** — ABHA integration, health data retention, gateway registration
- **HL7 FHIR R4** — standard resource types, REST API patterns
- **ISO 27001 / SOC 2 Type II** — documented in security stack

---

## 📦 Build

```bash
npm run build
# → dist/index.html + dist/assets/ (CSS + JS)
# Bundle: ~693 kB JS (191 kB gzip), ~32 kB CSS
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes following existing component patterns
4. Run `npm run build` to verify no build errors
5. Submit a pull request

---

````markdown name=README.md
# OmniShield Health Assistant Chatbot

OmniShield’s Health Assistant Chatbot is a React-based interface designed for patients, doctors, and health authorities on the OmniShield platform. It provides AI-powered chat, quick actions, appointment booking, prescription requests, and connects to backend APIs and a disease forecasting module (Prophet).

---

## Features

- **Patient Chatbot:** Ask questions, get health advice, symptoms, appointment reminders, and medication help.
- **Quick Actions:** “Book Appointment”, “Request Prescription”, etc. with fast access buttons.
- **Multi-turn Booking:** Book doctor appointments in a conversational flow (doctor, department, date, time).
- **Prescription Requests:** Start a prescription flow and integrate with backend.
- **Backend Integration:** Uses REST APIs for chat, booking, notifications, and forecasting.
- **Authority Dashboard:** Displays disease forecast data and triggers (via Prophet model).
- **Doctor Portal:** View appointments and patient requests.

---

## Architecture Overview

- **Frontend:**  
    - `src/components/Chatbot.jsx` (React) for chatbot UI  
    - Quick action buttons above chat input  
    - Handles conversation state, booking flow, and message rendering

- **Backend:**  
    - Node.js/Express REST API  
    - `/chatbot` for chat replies  
    - `/chatbot/book-appointment` for appointment booking  
    - `/api/forecasted-cases` for disease forecast (calls Python service)

- **Disease Forecast Model:**  
    - Python (Prophet) REST API via FastAPI (e.g., `disease_forecasting_api/main.py`)

- **Database:**  
    - PostgreSQL table `appointments` with doctor, patient, date, department, status

---

## Getting Started

### 1. Clone Repo & Install Dependencies

```bash
git clone https://github.com/your-org/omnishield-chatbot.git
cd omnishield-chatbot
npm install
# Also install backend dependencies if in /server
```

### 2. Environment Variables

Set up `.env` for backend:

```
DATABASE_URL=your_postgres_url
PORT=5000
# Add API keys as needed
```

### 3. Start Backend API

```bash
cd server
npm run server
```

### 4. Start Disease Forecasting Model API (Python)

```bash
cd disease_forecasting_api
pip install fastapi prophet uvicorn pandas
uvicorn main:app
```

### 5. Start React Frontend

```bash
cd frontend
npm run dev
```

---

## Usage

### **Patient Chatbot**

- Accessible from dashboard as floating button.
- Quick Action Buttons for appointment and prescription.
- Conversational booking flow:  
    1. Click “Book Appointment”  
    2. Enter doctor, department, date, and time  
    3. Receive booking confirmation

### **Doctor Portal**

- See appointments in tabular view.
- Respond to bookings/requests.

### **Authority Dashboard**

- Displays current and predicted disease cases from Prophet model.
- Shows alerts/triggers based on forecasted data.

---

## File Structure

```
frontend/
    src/components/Chatbot.jsx          # Main chatbot component
    ...
server/
    index.js                           # Backend API routes
    ...
disease_forecasting_api/
    main.py                            # FastAPI + Prophet model endpoint
    ...
```

---

## API Endpoints

### Patient Bot

- `POST /chatbot`: `{ message, patientId }`
    - Returns: `{ reply }`

- `POST /chatbot/book-appointment`: `{ patientId, doctorName, department, date, time, type }`
    - Returns: `{ success, appointmentId }` or `{ success: false, message }`

### Disease Forecast

- `GET /api/forecasted-cases`: Fetches next 24h prediction from Prophet Python API

---

## Customization

- Add new quick actions in the `handleQuickAction` and the Quick Actions Panel in `Chatbot.jsx`
- Customize multi-turn flows for other types (labs, prescriptions, telemedicine)
- Integrate additional AI models via backend endpoints

---

## Troubleshooting

- **Chatbot not displaying backend responses:**  
    - Ensure you use `res.reply` in frontend.
- **Appointment booking fails:**  
    - Check backend logs for SQL errors, missing columns, or data mismatch.
- **Prediction API not working:**  
    - Verify Python API is running and accepting POST requests from backend.

---

## Contributors

- Your Name ([your-email@example.com](mailto:your-email@example.com))
- Organization Name

---

## License

MIT License (add your license details here).

---

## Screenshots

<!-- Add screenshots for chatbot, quick actions, booking flow, authority dashboard, etc. -->

---

## Additional Resources

- [Mermaid diagram architecture](docs/ARCHITECTURE.md)
- [API docs](docs/API.md)
````

*© 2024 OmniShield Health Technologies Pvt. Ltd.*
