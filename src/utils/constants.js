export const ROLES = {
  doctor:     { label: 'Doctor',              color: 'bg-blue-100 text-blue-800' },
  nurse:      { label: 'Nurse',               color: 'bg-green-100 text-green-800' },
  lab_tech:   { label: 'Lab Technician',      color: 'bg-yellow-100 text-yellow-800' },
  pharmacist: { label: 'Pharmacist',          color: 'bg-purple-100 text-purple-800' },
  admin:      { label: 'Hospital Admin',      color: 'bg-red-100 text-red-800' },
  government: { label: 'Government Official', color: 'bg-orange-100 text-orange-800' },
  patient:    { label: 'Patient',             color: 'bg-teal-100 text-teal-800' },
}

export const ROLE_NAV_ITEMS = {
  doctor: [
    { path: '/dashboard',      label: 'Dashboard',      icon: 'LayoutDashboard' },
    { path: '/scan-patient',   label: 'Scan Patient',   icon: 'QrCode' },
    { path: '/appointments',   label: 'Appointments',   icon: 'Calendar' },
    { path: '/prescriptions',  label: 'Prescriptions',  icon: 'FileText' },
    { path: '/cdss',           label: 'CDSS / AI',      icon: 'Brain' },
  ],
  patient: [
    { path: '/dashboard',      label: 'Dashboard',      icon: 'LayoutDashboard' },
    { path: '/health-card',    label: 'Health Card',    icon: 'CreditCard' },
    { path: '/lab-results',    label: 'Lab Results',    icon: 'FlaskConical' },
    { path: '/book-appointment', label: 'Book Appointment', icon: 'Calendar' },
  ],
  lab_tech: [
    { path: '/dashboard',      label: 'Dashboard',      icon: 'LayoutDashboard' },
    { path: '/test-orders',    label: 'Test Orders',    icon: 'ClipboardList' },
    { path: '/submit-results', label: 'Submit Results', icon: 'CheckCircle' },
    { path: '/lab-history',    label: 'History',        icon: 'History' },
  ],
  nurse: [
    { path: '/dashboard',      label: 'Dashboard',      icon: 'LayoutDashboard' },
    { path: '/vitals',         label: 'Vitals',         icon: 'Activity' },
    { path: '/med-round',      label: 'Medication Round', icon: 'Pill' },
    { path: '/inspections',    label: 'Inspections',    icon: 'CheckSquare' },
    { path: '/alerts',         label: 'Alerts',         icon: 'Bell' },
  ],
  pharmacist: [
    { path: '/dashboard',      label: 'Dashboard',      icon: 'LayoutDashboard' },
    { path: '/prescriptions',  label: 'Prescriptions',  icon: 'FileText' },
    { path: '/inventory',      label: 'Inventory',      icon: 'Package' },
    { path: '/bill-history',   label: 'Bill History',   icon: 'Receipt' },
  ],
  admin: [
    { path: '/dashboard',      label: 'Dashboard',      icon: 'LayoutDashboard' },
    { path: '/staff',          label: 'Staff',          icon: 'Users' },
    { path: '/beds',           label: 'Beds',           icon: 'Bed' },
    { path: '/revenue',        label: 'Revenue',        icon: 'IndianRupee' },
    { path: '/compliance',     label: 'Compliance',     icon: 'ShieldCheck' },
  ],
  government: [
    { path: '/dashboard',      label: 'Dashboard',      icon: 'LayoutDashboard' },
    { path: '/surveillance',   label: 'Surveillance',   icon: 'Activity' },
    { path: '/hotspots',       label: 'Hotspots',       icon: 'MapPin' },
    { path: '/forecasting',    label: 'Forecasting',    icon: 'TrendingUp' },
    { path: '/gov-alerts',     label: 'Alerts',         icon: 'AlertTriangle' },
  ],
}

// Fallback for all roles in sidebar
export const NAV_ITEMS = [
  { path: '/dashboard',    label: 'Dashboard',            icon: 'LayoutDashboard' },
  { path: '/health-card',  label: 'Health Card',          icon: 'CreditCard' },
  { path: '/surveillance', label: 'Disease Surveillance', icon: 'Activity' },
  { path: '/cdss',         label: 'CDSS / AI',            icon: 'Brain' },
  { path: '/analytics',    label: 'Analytics',            icon: 'BarChart2' },
  { path: '/privacy',      label: 'Privacy & FL',         icon: 'Shield' },
  { path: '/integration',  label: 'FHIR Integration',     icon: 'Link' },
  { path: '/streaming',    label: 'Live Streaming',       icon: 'Radio' },
  { path: '/security',     label: 'Security',             icon: 'Lock' },
  { path: '/business-model', label: 'Business Model',     icon: 'TrendingUp' },
]

export const DISEASE_LIST = [
  'COVID-19', 'Dengue', 'Malaria', 'Tuberculosis', 'Influenza',
  'Cholera', 'Typhoid', 'Hepatitis B', 'Hepatitis C', 'Nipah Virus',
]

export const MOCK_FACILITIES = [
  'City General Hospital', 'Apollo Medical Center', 'AIIMS Delhi',
  'Fortis Healthcare', 'Max Super Specialty Hospital',
]

export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'
