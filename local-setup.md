# OmniShield Local Development Setup

This guide explains how to set up **OmniShield** on your local machine for development and testing. It covers the frontend, backend, and Prophet model (disease forecasting) APIs.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn]
- [Python 3.x](https://www.python.org/downloads/)
- [PostgreSQL](https://www.postgresql.org/)
- Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/your-org/omnishield-chatbot.git
cd omnishield-chatbot
```

---

## 2. Backend Setup

```bash
cd server
npm install
```

- Create a `.env` file with your DB URL and other environment variables.
- Start the backend server:
  ```bash
  npm run server
  ```

---

## 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

- Access the app at [http://localhost:5173](http://localhost:5173).

---

## 4. Database Setup

- Create local OmniShield database with PostgreSQL:
  ```bash
  createdb omnishield
  ```
- Add the `appointments` table (run in psql or your DB GUI):
  ```sql
  CREATE TABLE appointments (
    id VARCHAR(32) PRIMARY KEY,
    patient_id VARCHAR(32),
    doctor_name VARCHAR(100),
    department VARCHAR(100),
    date DATE,
    time VARCHAR(10),
    type VARCHAR(32),
    status VARCHAR(32)
  );
  ```

---

## 5. Prophet Model API (Disease Forecasting)

```bash
cd ../disease_forecasting_api
pip install fastapi prophet uvicorn pandas
uvicorn main:app
```

- API listens at [http://localhost:8000/predict](http://localhost:8000/predict)

---

## 6. Configuration

- Make sure frontend `.env` and backend `.env` have correct URLs and DB credentials.
- Backend should be able to query the local PostgreSQL database.

---

## 7. Running All Services

- With all services started:
  - **Backend:** http://localhost:5000
  - **Frontend:** http://localhost:5173
  - **Prophet Model API:** http://localhost:8000

---

## 8. Testing

- Access frontend in browser.
- Interact with chatbot, book appointments, check authority dashboard, trigger forecasting.
- Use [Postman](https://www.postman.com/) or [curl](https://curl.se/) to poke API endpoints.

---

## 9. Troubleshooting

- **Port in use:** Stop other apps or change port in `.env`.
- **CORS issues:** Ensure backend has CORS enabled for frontend.
- **DB errors:** Double-check credentials or table schema.
- **Model API fails:** Confirm required Python packages installed and port is correct.

---

## 10. Resetting Data (Optional)

- To clear or reload the database for a fresh start:
  ```bash
  psql -d omnishield -c "TRUNCATE appointments RESTART IDENTITY;"
  ```

---

## 11. Useful Links

- [Frontend Setup Guide](../frontend-setup.md)
- [Backend Setup Guide](../backend-setup.md)
- [Prophet Model Setup](../disease_forecasting_api/README.md)

---

## 12. Contact

For local setup support, contact [your-email@example.com](mailto:your-email@example.com)

---

Happy Developing!