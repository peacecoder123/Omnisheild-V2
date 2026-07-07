import { useState } from 'react'
import { FileText, Search, Filter } from 'lucide-react'

const logs = [
  { id: 'L001', user: 'Dr. Ananya Desai', action: 'View Patient Records',  resource: 'Patient/P001',           ip: '10.0.1.22', ts: '2024-07-08 10:32:04', status: 'Success' },
  { id: 'L002', user: 'admin@omnishield', action: 'Export Patient List',   resource: 'Patient/ALL',            ip: '10.0.1.5',  ts: '2024-07-08 10:15:12', status: 'Success' },
  { id: 'L003', user: 'unknown',          action: 'Failed Login',          resource: 'Auth',                   ip: '203.0.113.1',ts:'2024-07-08 10:01:55', status: 'Failed' },
  { id: 'L004', user: 'lab.system',       action: 'Upload Lab Results',    resource: 'Observation/LAB002',     ip: '10.0.2.10', ts: '2024-07-08 09:58:33', status: 'Success' },
  { id: 'L005', user: 'Dr. Vikram Rao',   action: 'Update Prescription',   resource: 'MedicationRequest/MR001',ip: '10.0.1.34', ts: '2024-07-08 09:42:17', status: 'Success' },
  { id: 'L006', user: 'nurse.nair',       action: 'Log Vitals',            resource: 'Observation/VIT001',     ip: '10.0.1.60', ts: '2024-07-08 09:30:00', status: 'Success' },
]

export default function AuditLog() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const filtered = logs.filter(l =>
    (filter === 'All' || l.status === filter) &&
    (l.user.toLowerCase().includes(search.toLowerCase()) || l.action.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-[#0d9488]" />
        <h2 className="section-title mb-0">Audit Log</h2>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input className="input-field pl-9" placeholder="Search by user or action…"
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex items-center gap-1">
          <Filter className="w-4 h-4 text-gray-400" />
          <select className="input-field w-28" value={filter} onChange={e => setFilter(e.target.value)}>
            {['All', 'Success', 'Failed'].map(f => <option key={f}>{f}</option>)}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {['User', 'Action', 'Resource', 'IP', 'Timestamp', 'Status'].map(h => (
                <th key={h} className="text-left py-2 px-1 text-xs text-gray-400 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-2 px-1 font-medium text-gray-800">{l.user}</td>
                <td className="py-2 px-1 text-gray-600">{l.action}</td>
                <td className="py-2 px-1 font-mono text-xs text-gray-400">{l.resource}</td>
                <td className="py-2 px-1 font-mono text-xs text-gray-400">{l.ip}</td>
                <td className="py-2 px-1 text-xs text-gray-400">{l.ts}</td>
                <td className="py-2 px-1">
                  <span className={`badge ${l.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{l.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
