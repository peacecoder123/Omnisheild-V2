import BudgetTracker from './BudgetTracker.jsx'
import FederatedLearning from './FederatedLearning.jsx'
import { Shield, Eye, Lock } from 'lucide-react'

const queries = [
  { id: 'Q001', query: 'Avg age of dengue patients in Mumbai', cost: 0.08, ts: '2024-07-08 10:12', user: 'Researcher A', status: 'Approved' },
  { id: 'Q002', query: 'Count of diabetic patients per district', cost: 0.12, ts: '2024-07-08 09:45', user: 'Gov Official', status: 'Approved' },
  { id: 'Q003', query: 'Drug adherence rate for Hypertension', cost: 0.21, ts: '2024-07-07 15:30', user: 'Dr. Vikram', status: 'Rejected' },
]

export default function PrivacyDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Privacy & Federated Learning</h1>
        <p className="text-gray-500 text-sm mt-1">Differential privacy budgets and distributed model training</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { Icon: Shield, label: 'Privacy Model',     value: 'ε-DP (ε = 1.0)', color: 'bg-blue-50 text-blue-600' },
          { Icon: Eye,    label: 'Queries Today',     value: '3 / 10 limit',   color: 'bg-teal-50 text-teal-600' },
          { Icon: Lock,   label: 'Data Minimization', value: 'Active (k=5)',   color: 'bg-purple-50 text-purple-600' },
        ].map(({ Icon, label, value, color }) => (
          <div key={label} className="stat-card flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}><Icon className="w-5 h-5" /></div>
            <div><div className="font-bold text-gray-800">{value}</div><div className="text-sm text-gray-500">{label}</div></div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <BudgetTracker />
        <FederatedLearning />
      </div>

      <div className="card">
        <h2 className="section-title">Query History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Query', 'ε Cost', 'By', 'Time', 'Status'].map(h => (
                  <th key={h} className="text-left py-2 text-gray-400 font-medium text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {queries.map(q => (
                <tr key={q.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2.5 text-gray-700 max-w-xs truncate">{q.query}</td>
                  <td className="py-2.5 font-mono text-orange-600">{q.cost}</td>
                  <td className="py-2.5 text-gray-600">{q.user}</td>
                  <td className="py-2.5 text-gray-400 text-xs">{q.ts}</td>
                  <td className="py-2.5">
                    <span className={`badge ${q.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{q.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
