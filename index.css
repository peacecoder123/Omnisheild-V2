import { useState } from 'react'
import { Network, RefreshCw } from 'lucide-react'

const nodes = [
  { id: 'H1', name: 'City General Hospital', status: 'Active',  round: 12, accuracy: 91.2 },
  { id: 'H2', name: 'Apollo Medical Center', status: 'Active',  round: 12, accuracy: 89.7 },
  { id: 'H3', name: 'AIIMS Delhi',           status: 'Active',  round: 11, accuracy: 93.4 },
  { id: 'H4', name: 'Fortis Healthcare',     status: 'Syncing', round: 10, accuracy: 87.1 },
  { id: 'H5', name: 'Max Hospital',          status: 'Offline', round: 9,  accuracy: 85.6 },
]

const statusColor = { Active: 'bg-green-100 text-green-700', Syncing: 'bg-yellow-100 text-yellow-700', Offline: 'bg-red-100 text-red-700' }
const dotColor    = { Active: 'bg-green-500', Syncing: 'bg-yellow-500', Offline: 'bg-red-500' }

export default function FederatedLearning() {
  const [aggregating, setAggregating] = useState(false)

  const triggerAggregation = () => {
    setAggregating(true)
    // TODO: POST /api/federated/aggregate
    setTimeout(() => setAggregating(false), 2000)
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-[#0d9488]" />
          <h2 className="section-title mb-0">Federated Learning Nodes</h2>
        </div>
        <button onClick={triggerAggregation} disabled={aggregating}
          className="btn-accent text-xs py-1.5 px-3 flex items-center gap-1">
          <RefreshCw className={`w-3 h-3 ${aggregating ? 'animate-spin' : ''}`} />
          {aggregating ? 'Aggregating…' : 'Aggregate'}
        </button>
      </div>

      <div className="space-y-2 mb-4">
        {nodes.map(node => (
          <div key={node.id} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg">
            <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${dotColor[node.status]}`} />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-800">{node.name}</div>
              <div className="text-xs text-gray-400">Round {node.round} · Acc: {node.accuracy}%</div>
            </div>
            <span className={`badge ${statusColor[node.status]}`}>{node.status}</span>
          </div>
        ))}
      </div>

      <div className="bg-teal-50 rounded-lg p-3 text-sm">
        <div className="font-semibold text-teal-700 mb-1">Global Model — Round 12</div>
        <div className="text-teal-600 text-xs">Accuracy: 90.8% · Participants: 3 · Algorithm: FedAvg</div>
      </div>
    </div>
  )
}
