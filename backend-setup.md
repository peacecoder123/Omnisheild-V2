# OmniShield Backend Setup Guide

This guide walks you through the setup for the **Node.js/Express backend** powering the chatbot, appointment booking, notifications, and disease forecasting API integration.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn]
- [PostgreSQL](https://www.postgresql.org/) running locally or remotely
- (Optional) Python/FastAPI Prophet forecasting API for disease prediction

---

## 1. Clone the Repository

```bash
git clone https://github.com/your-org/omnishield-chatbot.git
cd omnishield-chatbot/server
```

---

## 2. Install Dependencies

Using npm:
```bash
npm install
```

or yarn:
```bash
yarn install
```

---

## 3. Database Setup

- **Create a database:**  
  ```
  createdb omnishield
  ```
- **Set up tables:**  
  For the chatbot/booking system, you need a table like `appointments`:

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

- **Add any other required tables (users, notifications, etc.)**

---

## 4. Configure Environment Variables

- Copy `.env.example` to `.env` (or create one):
  ```
  DATABASE_URL=postgres://postgres:yourpassword@localhost:5432/omnishield
  PORT=5000
  # (Optional) External API endpoints and keys
  ```

---

## 5. Start the Node.js Backend Server

```bash
npm run server
```

or

```bash
yarn server
```

- The backend will listen on `http://localhost:5000` (unless PORT is changed).

---

## 6. Key API Endpoints

| Endpoint                     | Method | Purpose                                               |
|------------------------------|--------|-------------------------------------------------------|
| `/chatbot`                   | POST   | Chatbot: receives patient queries, returns response   |
| `/chatbot/book-appointment`  | POST   | Appointment booking via chatbot flow                  |
| `/notifications/:userId`     | GET    | Fetch pending notifications for a user                |
| `/api/forecasted-cases`      | GET    | Forecasted cases from Prophet model (Python API)      |

---

## 7. Disease Forecasting Model (Optional)

- Setup the Prophet model as a FastAPI service:
  - See [disease_forecasting_api/main.py](../disease_forecasting_api/main.py)

- Backend calls this via axios:
  ```js
  // Example in index.js
  const response = await axios.post('http://localhost:8000/predict', { data: cases });
  ```

---

## 8. Testing

- Test endpoints with tools like [Postman](https://www.postman.com/), [curl](https://curl.se/), or your frontend.
- Example:
  ```bash
  curl -X POST http://localhost:5000/chatbot -H "Content-Type: application/json" -d '{"message":"hi", "patientId":"P001"}'
  ```

---

## 9. Troubleshooting

- **Booking fails:**  
  - Check backend logs for SQL errors — ensure columns match your table.
- **Chatbot responses not updating:**  
  - Make sure reply is returned as `{ reply: "..."}`
- **Database issues:**  
  - Ensure `DATABASE_URL` is correct, user/password allowed, table exists.
- **Disease forecast errors:**  
  - Confirm Python API is running and accessible from Node backend.

---

## 10. Useful Commands

| Command          | Purpose                |
|------------------|------------------------|
| `npm run server` | Start development API  |
| `npm run lint`   | Lint backend code      |

---

## 11. Additional Resources

- [API documentation](../docs/API.md)
- [Frontend setup guide](../frontend-setup.md)
- [Prophet model setup](../disease_forecasting_api/README.md)

---

## 12. Contact & Support

For backend support, contact [your-email@example.com](mailto:your-email@example.com)

---

Happy Hacking!