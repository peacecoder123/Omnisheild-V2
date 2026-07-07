import { useAuth } from '../../contexts/AuthContext.jsx'
import { Shield, MapPin, Clock } from 'lucide-react'

const accessLog = [
  { by: 'Dr. Ananya Desai', facility: 'City General Hospital', time: '2024-07-08 10:32', location: 'Mumbai', action: 'View Records' },
  { by: 'Dr. Vikram Rao',   facility: 'Apollo Medical Center', time: '2024-07-05 14:15', location: 'Delhi',  action: 'View Lab Reports' },
  { by: 'Lab System',       facility: 'City General Hospital', time: '2024-07-03 09:00', location: 'Mumbai', action: 'Upload Results' },
  { by: 'Pharmacist Portal',facility: 'MedPlus Pharmacy',      time: '2024-07-01 17:40', location: 'Mumbai', action: 'Read Prescription' },
]

export default function HealthCardView() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1e3a5f]">Smart Health Card</h1>

      {/* Digital Health Card */}
      <div className="max-w-md">
        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#0d9488] text-white rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6" />
              <span className="font-bold text-lg tracking-wide">OmniShield</span>
            </div>
            <div className="text-xs bg-white/20 rounded-full px-3 py-1">ABDM Verified</div>
          </div>

          <div className="mb-6">
            <div className="text-4xl font-bold tracking-widest mb-1">{user?.abhaId || 'ABHA-12345-67890'}</div>
            <div className="text-teal-200 text-sm">Ayushman Bharat Health Account</div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-teal-200 text-xs uppercase tracking-wider mb-0.5">Cardholder</div>
              <div className="text-xl font-semibold">{user?.name || 'Demo User'}</div>
              <div className="text-teal-200 text-sm capitalize mt-0.5">{user?.role || 'patient'}</div>
            </div>
            {/* QR placeholder */}
            <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
              <div className="text-xs text-center text-white/60">QR</div>
            </div>
          </div>
        </div>
      </div>

      {/* Health Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: 'Blood Group', value: 'B+' },
          { label: 'Known Allergies', value: 'Penicillin, Sulfa' },
          { label: 'Chronic Conditions', value: 'Hypertension' },
          { label: 'Emergency Contact', value: '+91 98765 43210' },
          { label: 'Organ Donor', value: 'Yes' },
          { label: 'Insurance ID', value: 'PMJAY-XXX-2024' },
        ].map(({ label, value }) => (
          <div key={label} className="card">
            <div className="text-xs text-gray-400 mb-1">{label}</div>
            <div className="font-semibold text-gray-800">{value}</div>
          </div>
        ))}
      </div>

      {/* Access Log */}
      <div className="card">
        <h2 className="section-title">Recent Access Log</h2>
        <div className="space-y-2">
          {accessLog.map((log, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-[#e6f7f6] rounded-full flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-[#0d9488]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-gray-800">{log.by}</span>
                  <span className="text-xs text-gray-400">{log.time}</span>
                </div>
                <div className="text-xs text-gray-500">{log.facility} · {log.action}</div>
                <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                  <MapPin className="w-3 h-3" />{log.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
