import { Shield, Lock, AlertTriangle, Eye, CheckCircle } from 'lucide-react'

const threats = [
  { type: 'Brute Force Attempt', ip: '203.0.113.42', time: '10:34', severity: 'High',   blocked: true },
  { type: 'Unusual Data Export',  ip: '10.0.0.88',    time: '09:58', severity: 'Medium', blocked: false },
  { type: 'Invalid Token Usage',  ip: '172.16.0.12',  time: '09:15', severity: 'Low',    blocked: true },
]

const metrics = [
  { label: 'Active Sessions',        value: '142',  Icon: Eye,           color: 'bg-blue-50 text-blue-600' },
  { label: 'Failed Logins (24h)',    value: '28',   Icon: AlertTriangle, color: 'bg-orange-50 text-orange-600' },
  { label: 'Data Encryption',        value: 'AES-256', Icon: Lock,       color: 'bg-green-50 text-green-600' },
  { label: 'MFA Adoption',           value: '89%',  Icon: Shield,        color: 'bg-purple-50 text-purple-600' },
]

export default function SecurityCenter() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Security Center</h1>
        <p className="text-gray-500 text-sm mt-1">Zero-trust architecture monitoring</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map(({ label, value, Icon, color }) => (
          <div key={label} className="stat-card flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}><Icon className="w-5 h-5" /></div>
            <div><div className="font-bold text-gray-800">{value}</div><div className="text-sm text-gray-500">{label}</div></div>
          </div>
        ))}
      </div>

      {/* Threat Summary */}
      <div className="card">
        <h2 className="section-title">Recent Threat Events</h2>
        <div className="space-y-2">
          {threats.map((t, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${t.severity === 'High' ? 'bg-red-50' : t.severity === 'Medium' ? 'bg-yellow-50' : 'bg-gray-50'}`}>
              <AlertTriangle className={`w-4 h-4 shrink-0 ${t.severity === 'High' ? 'text-red-500' : t.severity === 'Medium' ? 'text-yellow-500' : 'text-gray-400'}`} />
              <div className="flex-1">
                <div className="font-medium text-sm text-gray-800">{t.type}</div>
                <div className="text-xs text-gray-400">IP: {t.ip} · {t.time}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`badge ${t.severity === 'High' ? 'bg-red-100 text-red-700' : t.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>{t.severity}</span>
                {t.blocked && <span className="badge bg-green-100 text-green-700">Blocked</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Stack */}
      <div className="card">
        <h2 className="section-title">Security Stack</h2>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            'Zero-Trust Architecture', 'JWT + Refresh Tokens', 'AES-256 Encryption at rest',
            'TLS 1.3 in transit', 'Role-Based Access Control', 'Field-level Encryption (PII)',
            'Differential Privacy', 'Audit Trail (immutable)', 'Penetration Tested (Q2 2024)',
          ].map(item => (
            <div key={item} className="flex items-center gap-2 p-2.5 bg-green-50 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
