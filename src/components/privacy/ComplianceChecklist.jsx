import { Server, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

const systems = [
  { name: 'Apollo EMR',         type: 'EHR System',           protocol: 'HL7 FHIR R4', status: 'Connected',    latency: '42ms' },
  { name: 'AIIMS HIS',          type: 'Hospital Info System', protocol: 'HL7 v2.5',    status: 'Connected',    latency: '88ms' },
  { name: 'ABDM Gateway',       type: 'Gov Health Bridge',    protocol: 'ABDM API',    status: 'Connected',    latency: '120ms' },
  { name: 'SRL Diagnostics',    type: 'Lab System',           protocol: 'HL7 FHIR R4', status: 'Connected',    latency: '55ms' },
  { name: 'Star Health Insurance',type:'Insurance Portal',    protocol: 'REST API',    status: 'Degraded',     latency: '350ms' },
  { name: 'IDSP Feed',          type: 'Gov Surveillance',     protocol: 'SOAP/REST',   status: 'Connected',    latency: '200ms' },
  { name: 'Pharma ERP',         type: 'Pharmacy System',      protocol: 'REST API',    status: 'Disconnected', latency: '—' },
]

const statusIcon = {
  Connected:    <CheckCircle className="w-4 h-4 text-green-500" />,
  Degraded:     <AlertCircle className="w-4 h-4 text-yellow-500" />,
  Disconnected: <XCircle className="w-4 h-4 text-red-500" />,
}
const statusColor = {
  Connected:    'bg-green-100 text-green-700',
  Degraded:     'bg-yellow-100 text-yellow-700',
  Disconnected: 'bg-red-100 text-red-700',
}

export default function SystemConnections() {
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Server className="w-5 h-5 text-[#0d9488]" />
        <h2 className="section-title mb-0">Connected Systems</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {systems.map(s => (
          <div key={s.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            {statusIcon[s.status]}
            <div className="flex-1">
              <div className="font-semibold text-sm text-gray-800">{s.name}</div>
              <div className="text-xs text-gray-400">{s.type} · {s.protocol}</div>
            </div>
            <div className="text-right shrink-0">
              <span className={`badge ${statusColor[s.status]}`}>{s.status}</span>
              <div className="text-xs text-gray-400 mt-0.5">{s.latency}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
