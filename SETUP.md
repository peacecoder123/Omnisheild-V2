# OmniShield — Setup Guide

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Python 3.10+ (only if running the disease forecasting service)

---

## 1. Install Node Dependencies

```bash
npm install
```

---

## 2. Set Up PostgreSQL

### Create the database

```bash
psql -U postgres -c "CREATE DATABASE omnishield;"
```

### Apply the schema

```bash
psql -U postgres -d omnishield -f schema.sql
```

### Seed demo data

```bash
psql -U postgres -d omnishield -f seed.sql
```

The schema drops and recreates all tables, so it is safe to re-run from scratch.

---

## 3. Configure Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

Minimum required contents:

```
DATABASE_URL=postgresql://postgres:postgres123@localhost:5432/omnishield
JWT_SECRET=your_secret_here
VITE_API_URL=http://localhost:5000
VITE_API_BASE=http://localhost:5000/api
```

Change `postgres123` to your actual Postgres password. Set `JWT_SECRET` to any long random string — never leave it as the placeholder in production.

**Using Supabase instead of local Postgres?** The project ships with a Supabase `DATABASE_URL` already set in `.env`. If you use that, skip the local Postgres steps (2a–2c) and just run the server. Make sure the Supabase DB has had `schema.sql` + `seed.sql` applied (run via the Supabase SQL editor or `psql` with the connection string).

---

## 4. Start the Backend

```bash
npm run server
```

This starts the Express server on `http://localhost:5000`.

> **If login fails with "Database connection failed"**, check this first:
> - Is Postgres running? (`pg_ctl status` or check Services on Windows)
> - Did you run `schema.sql` and `seed.sql`?
> - Is `DATABASE_URL` in `.env` correct?
> - Is `JWT_SECRET` set? The server logs a warning at startup if it is missing.

---

## 5. Start the Frontend

In a separate terminal:

```bash
npm run dev
```

Or run both together:

```bash
npm run dev:full
```

The frontend runs at `http://localhost:5173`.

---

## 6. Demo Credentials

Log in with any of the seeded accounts (password is `demo` for all):

| Role | Email |
|------|-------|
| Doctor | `doctor@demo.com` |
| Patient | `patient@demo.com` |
| Nurse | `nurse@demo.com` |
| Lab Tech | `labtech@demo.com` |
| Pharmacist | `pharma@demo.com` |
| Admin | `admin@demo.com` |
| Government | `govt@demo.com` |

---

## 7. Disease Forecasting API (Optional)

The FastAPI Prophet service runs independently on port 8000. It is optional — the main app works without it.

```bash
cd disease_forecasting_api
python -m venv venv
venv\Scripts\activate      # Windows
# source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
python main.py
```

The service starts at `http://localhost:8000`. It exposes `POST /predict` accepting `{ data: [{timestamp, cases}, ...] }` and returning a 24-hour Prophet forecast.

---

## 8. Production Build

```bash
npm run build
```

Output goes to `dist/`. Serve with any static host or `npm run preview`.
