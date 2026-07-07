import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'

// Auth
import LoginPage from './components/auth/LoginPage.jsx'
import RegisterPage from './components/auth/RegisterPage.jsx'
import ForgotPasswordPage from './components/auth/ForgotPasswordPage.jsx'
import MFASetup from './components/auth/MFASetup.jsx'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'

// Landing
import LandingPage from './components/landing/LandingPage.jsx'

// Layout
import DashboardLayout from './components/layout/DashboardLayout.jsx'

// Dashboards
import RoleDashboard from './components/dashboard/RoleDashboard.jsx'

// Health Card
import HealthCardView from './components/healthcard/HealthCardView.jsx'

// Surveillance
import SurveillanceDashboard from './components/surveillance/SurveillanceDashboard.jsx'

// Privacy
import PrivacyDashboard from './components/privacy/PrivacyDashboard.jsx'

// Integration
import FHIRBrowser from './components/integration/FHIRBrowser.jsx'

// Streaming
import LiveEventFeed from './components/streaming/LiveEventFeed.jsx'

// CDSS
import SymptomChecker from './components/cdss/SymptomChecker.jsx'

// Analytics
import PopulationHealth from './components/analytics/PopulationHealth.jsx'

// Security
import SecurityCenter from './components/security/SecurityCenter.jsx'

// Business
import BusinessModelPage from './components/business/BusinessModelPage.jsx'

// QR Scanner
import QRScanner from './components/QRScanner.jsx'

function ProtectedPage({ children }) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/mfa-setup" element={<MFASetup />} />
          <Route path="/business-model" element={<BusinessModelPage />} />

          {/* Protected */}
          <Route path="/dashboard"    element={<ProtectedPage><RoleDashboard /></ProtectedPage>} />
          <Route path="/health-card"  element={<ProtectedPage><HealthCardView /></ProtectedPage>} />
          <Route path="/surveillance" element={<ProtectedPage><SurveillanceDashboard /></ProtectedPage>} />
          <Route path="/privacy"      element={<ProtectedPage><PrivacyDashboard /></ProtectedPage>} />
          <Route path="/integration"  element={<ProtectedPage><FHIRBrowser /></ProtectedPage>} />
          <Route path="/streaming"    element={<ProtectedPage><LiveEventFeed /></ProtectedPage>} />
          <Route path="/cdss"         element={<ProtectedPage><SymptomChecker /></ProtectedPage>} />
          <Route path="/analytics"    element={<ProtectedPage><PopulationHealth /></ProtectedPage>} />
          <Route path="/security"     element={<ProtectedPage><SecurityCenter /></ProtectedPage>} />
          <Route path="/scan-patient" element={<ProtectedPage><QRScanner /></ProtectedPage>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
