import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, CreditCard, Activity, Brain, BarChart2,
  Shield, Link, Radio, Lock, TrendingUp, ChevronLeft, ChevronRight,
  QrCode, Calendar, FileText, FlaskConical, CheckCircle, Pill, CheckSquare,
  Bell, Package, Receipt, Users, Bed, IndianRupee, ShieldCheck, MapPin,
  AlertTriangle, ClipboardList,
} from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext.jsx'

const ICON_MAP = {
  LayoutDashboard, CreditCard, Activity, Brain, BarChart2,
  Shield, Link, Radio, Lock, TrendingUp,
  QrCode, Calendar, FileText, FlaskConical, CheckCircle, Pill, CheckSquare,
  Bell, Package, Receipt, Users, Bed, IndianRupee, ShieldCheck, MapPin,
  AlertTriangle, ClipboardList,
}

const ROLE_NAV = {
  doctor: [
    { path: '/dashboard',     label: 'Dashboard',     icon: 'LayoutDashboard' },
    { path: '/health-card',   label: 'Health Card',   icon: 'CreditCard' },
    { path: '/surveillance',  label: 'Surveillance',  icon: 'Activity' },
    { path: '/cdss',          label: 'CDSS / AI',     icon: 'Brain' },
    { path: '/analytics',     label: 'Analytics',     icon: 'BarChart2' },
    { path: '/security',      label: 'Security',      icon: 'Lock' },
  ],
  patient: [
    { path: '/dashboard',     label: 'Dashboard',     icon: 'LayoutDashboard' },
    { path: '/health-card',   label: 'Health Card',   icon: 'CreditCard' },
    { path: '/cdss',          label: 'CDSS / AI',     icon: 'Brain' },
  ],
  lab_tech: [
    { path: '/dashboard',     label: 'Dashboard',     icon: 'LayoutDashboard' },
    { path: '/health-card',   label: 'Health Card',   icon: 'CreditCard' },
    { path: '/security',      label: 'Security',      icon: 'Lock' },
  ],
  nurse: [
    { path: '/dashboard',     label: 'Dashboard',     icon: 'LayoutDashboard' },
    { path: '/health-card',   label: 'Health Card',   icon: 'CreditCard' },
    { path: '/cdss',          label: 'CDSS / AI',     icon: 'Brain' },
    { path: '/security',      label: 'Security',      icon: 'Lock' },
  ],
  pharmacist: [
    { path: '/dashboard',     label: 'Dashboard',     icon: 'LayoutDashboard' },
    { path: '/security',      label: 'Security',      icon: 'Lock' },
  ],
  admin: [
    { path: '/dashboard',     label: 'Dashboard',     icon: 'LayoutDashboard' },
    { path: '/surveillance',  label: 'Surveillance',  icon: 'Activity' },
    { path: '/analytics',     label: 'Analytics',     icon: 'BarChart2' },
    { path: '/privacy',       label: 'Privacy & FL',  icon: 'Shield' },
    { path: '/security',      label: 'Security',      icon: 'Lock' },
    { path: '/business-model',label: 'Business Model',icon: 'TrendingUp' },
  ],
  government: [
    { path: '/dashboard',     label: 'Dashboard',     icon: 'LayoutDashboard' },
    { path: '/surveillance',  label: 'Surveillance',  icon: 'Activity' },
    { path: '/analytics',     label: 'Analytics',     icon: 'BarChart2' },
    { path: '/privacy',       label: 'Privacy & FL',  icon: 'Shield' },
    { path: '/streaming',     label: 'Live Streaming',icon: 'Radio' },
    { path: '/security',      label: 'Security',      icon: 'Lock' },
  ],
}

const DEFAULT_NAV = [
  { path: '/dashboard',      label: 'Dashboard',            icon: 'LayoutDashboard' },
  { path: '/health-card',    label: 'Health Card',          icon: 'CreditCard' },
  { path: '/surveillance',   label: 'Disease Surveillance', icon: 'Activity' },
  { path: '/cdss',           label: 'CDSS / AI',            icon: 'Brain' },
  { path: '/analytics',      label: 'Analytics',            icon: 'BarChart2' },
  { path: '/privacy',        label: 'Privacy & FL',         icon: 'Shield' },
  { path: '/integration',    label: 'FHIR Integration',     icon: 'Link' },
  { path: '/streaming',      label: 'Live Streaming',       icon: 'Radio' },
  { path: '/security',       label: 'Security',             icon: 'Lock' },
  { path: '/business-model', label: 'Business Model',       icon: 'TrendingUp' },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const { user } = useAuth()
  const navItems = (user?.role && ROLE_NAV[user.role]) || DEFAULT_NAV

  return (
    <aside className={`relative bg-[#152a45] text-white flex flex-col transition-all duration-300 ${collapsed ? 'w-16' : 'w-56'} min-h-full shrink-0`}>
      <button
        onClick={() => setCollapsed(v => !v)}
        className="absolute -right-3 top-6 bg-[#0d9488] text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md z-10 hover:bg-[#0f766e] transition-colors"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map(({ path, label, icon }) => {
          const Icon = ICON_MAP[icon] || LayoutDashboard
          return (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'bg-[#0d9488] text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'} ${collapsed ? 'justify-center' : ''}`
              }
              title={collapsed ? label : undefined}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
            </NavLink>
          )
        })}
      </nav>

      {!collapsed && (
        <div className="p-3 border-t border-white/10">
          <p className="text-xs text-gray-500 text-center">OmniShield v1.0.0</p>
        </div>
      )}
    </aside>
  )
}
