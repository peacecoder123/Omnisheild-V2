# OmniShield V2 — Decentralized Health Surveillance Platform

> India's health surveillance and clinical decision support platform, unifying decentralized health cards, real-time epidemic monitoring, and role-based dashboards.

---

## Quick Start

See **[SETUP.md](./SETUP.md)** for the full setup guide including Postgres provisioning, environment variables, and the disease forecasting service.

```bash
npm install
cp .env.example .env   # edit DATABASE_URL and JWT_SECRET
npm run dev:full        # starts frontend (5173) + backend (5000) concurrently
```

---

## Demo Credentials

After running `schema.sql` + `seed.sql`, log in with any of these accounts. Password is `demo` for all.

| Role | Email |
|------|-------|
| Doctor | `doctor@demo.com` |
| Patient | `patient@demo.com` |
| Nurse | `nurse@demo.com` |
| Lab Tech | `labtech@demo.com` |
| Pharmacist | `pharma@demo.com` |
| Admin | `admin@demo.com` |
| Government | `govt@demo.com` |

The login page also has a "Show demo accounts" toggle that auto-fills credentials.

> If login returns **"Database connection failed"**, Postgres is not running or `DATABASE_URL` is wrong. See SETUP.md → Step 4.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite 5, TailwindCSS 3 |
| Routing | React Router v6 |
| State | React Context API + hooks |
| Charts | Recharts 2 |
| Maps | React Leaflet + OpenStreetMap |
| Icons | Lucide React |
| PWA | Service Worker + Web App Manifest |
| Backend | Node.js + Express 5, PostgreSQL via `pg` |
| Auth | bcryptjs password hashing + JWT (jsonwebtoken) |
| WebSockets | `ws` for real-time event broadcasting |
| Forecasting | FastAPI + Prophet (Python, optional service) |

---

## Project Structure

```
├── schema.sql                    # PostgreSQL schema (run first)
├── seed.sql                      # Demo data seeder (run second)
├── SETUP.md                      # Full setup instructions
├── server/
│   ├── index.js                  # Express API + auth middleware
│   ├── db.js                     # PostgreSQL pool
│   ├── websocket.js              # WebSocket broadcast
│   └── chatbot.js                # Rule-based chatbot responses
├── disease_forecasting_api/
│   ├── main.py                   # FastAPI + Prophet forecast endpoint
│   └── requirements.txt
└── src/
    ├── App.jsx                   # Route definitions
    ├── contexts/AuthContext.jsx  # Login/register/logout + JWT storage
    ├── utils/api.js              # Auth-aware fetch client
    └── components/
        ├── auth/                 # Login, Register, ProtectedRoute
        ├── landing/              # Public landing page
        ├── layout/               # Navbar, Sidebar, DashboardLayout
        ├── dashboard/            # Role dashboards (see below)
        ├── surveillance/         # SurveillanceDashboard
        ├── healthcard/           # HealthCardView
        ├── privacy/              # PrivacyDashboard
        ├── integration/          # FHIRBrowser
        ├── streaming/            # LiveEventFeed
        ├── cdss/                 # SymptomChecker
        ├── analytics/            # PopulationHealth
        └── security/             # SecurityCenter
```

---

## Feature Status

### Fully functional (database-backed, end-to-end)

| Feature | Description |
|---------|-------------|
| **Auth** | bcrypt login/register, signed JWT, token sent as `Authorization: Bearer` on all API calls |
| **Doctor Dashboard** | Patient list, appointments from Postgres; prescription writer + lab order creator hit real API |
| **Government Dashboard** | Hotspots + surveillance cases fetched from `hotspots` and `surveillance_cases` tables; interactive SIR/SEIR forecast model |
| **Pharmacist Dashboard** | Prescriptions fetched from DB; dispense action updates DB record; inventory from DB |
| **Lab Tech Dashboard** | Lab test queue from DB; result submission writes to DB |
| **Admin Dashboard** | Beds and staff fetched from DB; compliance items from DB |
| **Patient Dashboard** | Appointments bookable (writes to DB); vitals from DB; lab results from DB |
| **QR Scanner** | Scans patient QR code, fetches full patient record from DB, broadcasts via WebSocket |
| **Disease Surveillance endpoint** | `GET /api/surveillance/hotspots` and `/api/surveillance/cases` serve real DB rows |

### UI prototype — not yet backend-connected

These components render working UIs with hardcoded/static data. They are **not** connected to backend endpoints and do not persist state.

| Component | Status |
|-----------|--------|
| Nurse Dashboard — medication schedule, shift tasks, handover | UI scaffold — vitals form submits to real API; task list is static |
| FHIR Browser | UI scaffold — displays sample FHIR resource JSON; no live FHIR server |
| Federated Learning panel (Privacy Dashboard) | UI scaffold — simulated node status; no real FL training |
| Privacy Dashboard — differential privacy budget | UI scaffold — static budget gauge |
| Security Center — threat log, audit log | UI scaffold — hardcoded event list |
| Population Health (Analytics) | UI scaffold — static charts |
| Live Event Feed (Streaming) | UI scaffold — simulated Kafka events via `setInterval` |
| CDSS — Symptom Checker, Diagnostic Recommendations | UI scaffold — static scoring logic |
| Disease Forecasting chart | UI scaffold — calls FastAPI `/predict` if the Python service is running; falls back silently |

---

## API Routes

All data routes require `Authorization: Bearer <token>` (obtained from login). Auth, chatbot, and forecast routes are public.

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/login` | Login — returns user + JWT |
| POST | `/api/auth/register` | Register — hashes password, returns JWT |
| GET | `/api/patients` | All patients |
| GET | `/api/patients/:id` | Patient + labs + prescriptions + appointments + vitals |
| POST | `/api/patients/scan` | QR scan — fetches patient, broadcasts event |
| GET | `/api/appointments` | Appointments (filter by patientId/doctorId) |
| POST | `/api/appointments` | Create appointment |
| GET | `/api/lab-tests` | Lab tests (filter by status/patientId) |
| POST | `/api/lab-tests` | Order lab test |
| POST | `/api/lab-tests/:id/results` | Submit results |
| GET | `/api/vitals/:patientId` | Vitals history |
| POST | `/api/vitals` | Record vitals |
| GET | `/api/prescriptions` | Prescriptions (filter by status/patientId) |
| POST | `/api/prescriptions` | Write prescription |
| PATCH | `/api/prescriptions/:id/dispense` | Dispense prescription |
| GET | `/api/inventory` | Drug inventory |
| GET | `/api/staff` | Staff list |
| GET | `/api/beds` | Bed occupancy by ward |
| GET | `/api/compliance` | Compliance items |
| GET | `/api/surveillance/hotspots` | Disease hotspots |
| GET | `/api/surveillance/cases` | Surveillance cases |
| GET | `/api/surveillance/forecast` | Computed SIR/SEIR forecast (no DB) |
| GET | `/api/notifications/:userId` | User notifications |
| GET | `/api/drug-interactions` | Drug interaction table |
| POST | `/api/chatbot` | Rule-based chatbot |

---

## Environment Variables

Copy `.env.example` to `.env`:

```
DATABASE_URL=postgresql://postgres:postgres123@localhost:5432/omnishield
JWT_SECRET=your_long_random_secret
VITE_API_URL=http://localhost:5000
VITE_API_BASE=http://localhost:5000/api
CORS_ORIGIN=http://localhost:5173
```

`JWT_SECRET` is required — the server logs a fatal warning at startup if it is missing.

---

## Build

```bash
npm run build
```

Output in `dist/`. The chunk size warning is expected (large dependency bundle from Recharts + Leaflet). No errors.

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow existing code style (no semicolons in JSX files, match the style of the file you edit)
4. No code comments
5. Run `npm run build` to verify no build errors
6. Submit a pull request

---

*© 2024 OmniShield Health Technologies Pvt. Ltd.*
