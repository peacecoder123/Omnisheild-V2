# OmniShield Frontend Setup Guide

This guide helps you set up and run the **React frontend** for the OmniShield Health Assistant Chatbot and dashboard.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn]
- Backend API (Node.js/Express) running
- (Optional) Disease Forecast API (Python/FastAPI/Prophet) running

---

## 1. Clone the Repository

```bash
git clone https://github.com/your-org/omnishield-chatbot.git
cd omnishield-chatbot/frontend
```

---

## 2. Install Dependencies

Using npm:
```bash
npm install
```

or with yarn:
```bash
yarn install
```

---

## 3. Configuration

If applicable, create a `.env` file for frontend environment variables:

```env
VITE_BACKEND_URL=http://localhost:5000
VITE_AUTH_CLIENT_ID=your-client-id
```

- Adjust URLs and keys as needed for your backend setup and authentication.

---

## 4. Start the Development Server

```bash
npm run dev
```

or
```bash
yarn dev
```

- The app should run at [http://localhost:5173](http://localhost:5173) or the port shown in your terminal.

---

## 5. Connect to Backend

- Make sure your Node.js backend (`server/index.js`) is running on the URL configured above (default: `http://localhost:5000`).
- The chatbot and dashboard will communicate with backend APIs for chat, bookings, forecasting, etc.

---

## 6. Folder Structure

```
frontend/
  src/components/Chatbot.jsx           # Chatbot UI & logic
  src/components/GovDashboard.jsx      # Authority dashboard (map, alerts)
  src/contexts/AuthContext.jsx         # Authentication context
  src/utils/api.js                     # API wrapper for backend calls
  ...
  public/                              # Static assets
  ...
```

---

## 7. Adding Your Own Components

- User interface components should go in `src/components/`.
- Styles can be added globally or per-component (CSS modules or Tailwind are common).
- For quick actions in chatbot: update `Chatbot.jsx` in the chat panel and `handleQuickAction` logic.

---

## 8. Customizing Chatbot Behavior

- Quick actions (like Book Appointment) are managed in `Chatbot.jsx`.
- Booking and other flows use conversational state (`bookingStage`, `appointmentDetails`).
- Adjust bot prompts or add new flows as needed.

---

## 9. Troubleshooting

- **Backend API not responding:**  
  Check your backend server is running and CORS is enabled.
- **Chatbot not rendering responses:**  
  Ensure API replies use the correct field (e.g., `reply`, not `message`).
- **Hot Reload Issues:**  
  Restart the dev server if changes don’t appear.

---

## 10. Build for Production

```bash
npm run build
```

or

```bash
yarn build
```

- The production build will be output in `dist/`.

---

## 11. Screenshots

<!-- 
Add screenshots or links to demo video for the chatbot and dashboard.
Example:
![Chatbot Demo](./screenshots/chatbot-demo.png)
-->

---

## 12. Useful Commands

| Command         | Purpose                |
|-----------------|------------------------|
| `npm run dev`   | Start development server|
| `npm run build` | Production build       |
| `npm run lint`  | Lint source files      |

---

## 13. Contact & Support

For questions or support, contact [your-email@example.com](mailto:your-email@example.com)

---

Happy Coding!