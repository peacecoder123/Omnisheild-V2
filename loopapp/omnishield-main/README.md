# OmniShield — Decentralized Smart Health Card & Disease Surveillance Platform

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

*© 2024 OmniShield Health Technologies Pvt. Ltd.*
