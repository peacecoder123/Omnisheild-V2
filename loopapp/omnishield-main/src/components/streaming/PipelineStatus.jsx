import { Activity, CheckCircle, AlertCircle, Clock } from 'lucide-react'

const pipelines = [
  { name: 'Patient Admission Events',   broker: 'Kafka',     topic: 'admissions',      lag: 0,    status: 'Healthy',   tps: 245 },
  { name: 'Lab Results Stream',          broker: 'Kafka',     topic: 'lab-results',     lag: 12,   status: 'Healthy',   tps: 88 },
  { name: 'HL7 v2 ADT Messages',        broker: 'RabbitMQ',  topic: 'hl7.adt',         lag: 3,    status: 'Healthy',   tps: 42 },
  { name: 'Disease Surveillance Feed',  broker: 'Kafka',     topic: 'idsp-reports',    lag: 0,    status: 'Healthy',   tps: 18 },
  { name: 'Insurance Claims Stream',    broker: 'RabbitMQ',  topic: 'claims.inbound',  lag: 1240, status: 'Degraded',  tps: 5 },
  { name: 'Medication Orders',          broker: 'Kafka',     topic: 'medication-orders',lag: 0,   status: 'Healthy',   tps: 120 },
]

const statusIcon = {
  Healthy:  <CheckCircle className="w-4 h-4 text-green-500" />,
  Degraded: <AlertCircle className="w-4 h-4 text-yellow-500" />,
  Down:     <AlertCircle className="w-4 h-4 text-red-500" />,
}

export default function PipelineStatus() {
  const totalTps = pipelines.reduce((a, p) => a + p.tps, 0)

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#0d9488]" />
          <h2 className="section-title mb-0">Pipeline Status</h2>
        </div>
        <div className="text-sm text-gray-500">{totalTps} events/s total</div>
      </div>

      <div className="space-y-2">
        {pipelines.map(p => (
          <div key={p.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-sm">
            {statusIcon[p.status]}
            <div className="flex-1">
              <div className="font-medium text-gray-800">{p.name}</div>
              <div className="text-xs text-gray-400">{p.broker} · {p.topic}</div>
            </div>
            <div className="text-right text-xs">
              <div className="font-semibold text-gray-700">{p.tps} ev/s</div>
              <div className={`${p.lag > 100 ? 'text-red-500' : 'text-gray-400'}`}>lag: {p.lag}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
