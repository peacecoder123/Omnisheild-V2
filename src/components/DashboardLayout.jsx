import { useAuth } from '../../contexts/AuthContext.jsx'
import DoctorDashboard from './DoctorDashboard.jsx'
import NurseDashboard from './NurseDashboard.jsx'
import LabTechDashboard from './LabTechDashboard.jsx'
import PharmacistDashboard from './PharmacistDashboard.jsx'
import AdminDashboard from './AdminDashboard.jsx'
import PatientDashboard from './PatientDashboard.jsx'
import GovernmentDashboard from './GovernmentDashboard.jsx'

const ROLE_DASHBOARD = {
  doctor:     DoctorDashboard,
  nurse:      NurseDashboard,
  lab_tech:   LabTechDashboard,
  pharmacist: PharmacistDashboard,
  admin:      AdminDashboard,
  government: GovernmentDashboard,
  patient:    PatientDashboard,
}

export default function RoleDashboard() {
  const { user } = useAuth()
  const Component = ROLE_DASHBOARD[user?.role] || DoctorDashboard
  return <Component />
}
