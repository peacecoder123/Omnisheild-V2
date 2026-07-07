import { ArrowRightLeft, CheckCircle, AlertCircle, Clock } from 'lucide-react'

const exchanges = [
  { id: 'DE001', from: 'City General Hospital', to: 'Apollo Medical Center', type: 'Patient Transfer', records: 1, status: 'Complete', ts: '10:32' },
  { id: 'DE002', from: 'Lab System',            to: 'EHR Platform',          type: 'Lab Results',     records: 4, status: 'Complete', ts: '10:15' },
  { id: 'DE003', from: 'Insurance Portal',      to: 'OmniShield',            type: 'Claims Data',     records: 12,status: 'In Progress',ts: '09:58' },
  { id: 'DE004', from: 'IDSP Feed',             to: 'Surveillance Engine',   type: 'Disease Report',  records: 88,status: 'Pending',   ts: '09:30' },
]

const statusIcon = {
  Complete:    <CheckCircle className="w-4 h-4 text-green-500" />,
  'In Progress': <Clock className="w-4 h-4 text-yellow-500" />,
  Pending:     <AlertCircle className="w-4 h-4 text-gray-400" />,
}

export default function DataExchange() {
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <ArrowRightLeft className="w-5 h-5 text-[#0d9488]" />
        <h2 className="section-title mb-0">Data Exchange Log</h2>
      </div>
      <div className="space-y-2">
        {exchanges.map(ex => (
          <div key={ex.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-sm">
            {statusIcon[ex.status]}
            <div className="flex-1">
              <div className="font-medium text-gray-800">{ex.type}</div>
              <div className="text-xs text-gray-400">{ex.from} → {ex.to}</div>
            </div>
            <div className="text-xs text-gray-400 text-right">
              <div>{ex.records} records</div>
              <div>{ex.ts}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
