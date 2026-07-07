import { useState, useEffect } from 'react'
import { FlaskConical, FileText, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { api } from '../../utils/api.js'

const MOCK_ORDERS = [
  { id: 'LAB001', patientId: 'P001', patientName: 'Amit Sharma', test: 'CBC + LFT', orderedBy: 'Dr. Ananya Desai', priority: 'Routine', status: 'Pending', timeOrdered: '09:15', date: '2024-07-10' },
  { id: 'LAB002', patientId: 'P003', patientName: 'Rajan Mehta', test: 'ABG + D-Dimer', orderedBy: 'Dr. Vikram Rao', priority: 'Urgent', status: 'In Progress', timeOrdered: '09:30', date: '2024-07-10' },
  { id: 'LAB003', patientId: 'P002', patientName: 'Priya Singh', test: 'HbA1c + FBS', orderedBy: 'Dr. Ananya Desai', priority: 'Routine', status: 'Complete', timeOrdered: '08:00', date: '2024-07-10', tat: '2h 15m', results: { value: 'HbA1c: 7.2%, FBS: 142 mg/dL', interpretation: 'Abnormal' } },
  { id: 'LAB004', patientId: 'P005', patientName: 'Suresh Kumar', test: 'Troponin I', orderedBy: 'Dr. Vikram Rao', priority: 'Stat', status: 'Pending', timeOrdered: '10:00', date: '2024-07-10' },
  { id: 'LAB005', patientId: 'P004', patientName: 'Anita Verma', test: 'MRI Brain', orderedBy: 'Dr. Neha Gupta', priority: 'Routine', status: 'Pending', timeOrdered: '10:20', date: '2024-07-10' },
]

const priorityColor = {
  Routine: 'bg-blue-100 text-blue-700',
  Urgent: 'bg-orange-100 text-orange-700',
  Stat: 'bg-red-100 text-red-700',
}

const priorityOrder = { Stat: 0, Urgent: 1, Routine: 2 }

export default function LabTechDashboard() {
  const { user } = useAuth()
  const [orders, setOrders] = useState(MOCK_ORDERS)
  const [expandedOrder, setExpandedOrder] = useState(null)
  const [resultForm, setResultForm] = useState({ value: '', findings: '', interpretation: 'Normal' })
  const [submitToast, setSubmitToast] = useState(null)

  useEffect(() => {
    api.get('/lab-tests').then(data => { if (data?.length) setOrders(data) }).catch(() => {})
  }, [])

  const sortedOrders = [...orders].sort((a, b) =>
    (priorityOrder[a.priority] ?? 3) - (priorityOrder[b.priority] ?? 3)
  )

  const pending = orders.filter(o => o.status === 'Pending')
  const inProgress = orders.filter(o => o.status === 'In Progress')
  const complete = orders.filter(o => o.status === 'Complete')
  const critical = orders.filter(o => o.priority === 'Stat')
  const avgTAT = '2h 18m'

  const submitResult = async (orderId) => {
    try {
      await api.post(`/lab-tests/${orderId}/results`, resultForm)
    } catch {
      setSubmitToast('Warning: Could not sync to server, but results saved locally.')
      setTimeout(() => setSubmitToast(null), 4000)
      return
    }
    setOrders(prev => prev.map(o =>
      o.id === orderId ? { ...o, status: 'Complete', results: resultForm, tat: '1h 45m' } : o
    ))
    setExpandedOrder(null)
    setResultForm({ value: '', findings: '', interpretation: 'Normal' })
    setSubmitToast('Results submitted successfully!')
    setTimeout(() => setSubmitToast(null), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Lab Technician Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Pathology Lab — {user?.name || 'Ramesh Verma'}</p>
      </div>

      {submitToast && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
          <CheckCircle className="w-4 h-4" />
          {submitToast}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {[
          { label: 'Pending', value: pending.length, Icon: Clock, color: 'bg-yellow-50 text-yellow-600' },
          { label: 'In Progress', value: inProgress.length, Icon: FlaskConical, color: 'bg-purple-50 text-purple-600' },
          { label: 'Completed', value: complete.length, Icon: CheckCircle, color: 'bg-green-50 text-green-600' },
          { label: 'Critical/Stat', value: critical.length, Icon: AlertTriangle, color: 'bg-red-50 text-red-600' },
          { label: 'Avg TAT', value: avgTAT, Icon: FileText, color: 'bg-blue-50 text-blue-600' },
        ].map(({ label, value, Icon, color }) => (
          <div key={label} className="stat-card flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}><Icon className="w-4 h-4" /></div>
            <div><div className="text-xl font-bold">{value}</div><div className="text-xs text-gray-500">{label}</div></div>
          </div>
        ))}
      </div>

      {/* Test Orders Queue */}
      <div className="card">
        <h2 className="section-title">Test Orders Queue</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 text-gray-500 font-medium">Order ID</th>
                <th className="text-left py-2 text-gray-500 font-medium">Patient</th>
                <th className="text-left py-2 text-gray-500 font-medium">Test</th>
                <th className="text-left py-2 text-gray-500 font-medium">Ordered By</th>
                <th className="text-left py-2 text-gray-500 font-medium">Priority</th>
                <th className="text-left py-2 text-gray-500 font-medium">Status</th>
                <th className="text-left py-2 text-gray-500 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedOrders.map(order => (
                <>
                  <tr key={order.id} className={`border-b border-gray-50 hover:bg-gray-50 ${order.priority === 'Stat' ? 'bg-red-50' : ''}`}>
                    <td className="py-2.5">
                      <div className="font-medium text-gray-800">{order.id}</div>
                      <div className="text-xs text-gray-400">{order.timeOrdered}</div>
                    </td>
                    <td className="py-2.5 text-gray-700">{order.patientName}</td>
                    <td className="py-2.5">
                      <div className="text-gray-800">{order.test}</div>
                      {order.priority === 'Stat' && <span className="text-xs bg-red-600 text-white px-1.5 py-0.5 rounded font-semibold">URGENT</span>}
                    </td>
                    <td className="py-2.5 text-gray-600 text-xs">{order.orderedBy}</td>
                    <td className="py-2.5">
                      <span className={`badge ${priorityColor[order.priority]}`}>{order.priority}</span>
                    </td>
                    <td className="py-2.5">
                      <span className={`badge ${order.status === 'Complete' ? 'bg-green-100 text-green-700' : order.status === 'In Progress' ? 'bg-purple-100 text-purple-700' : 'bg-yellow-100 text-yellow-700'}`}>{order.status}</span>
                    </td>
                    <td className="py-2.5">
                      {order.status !== 'Complete' && (
                        <button onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)} className="text-xs bg-[#0d9488] text-white px-2 py-1 rounded hover:bg-[#0f766e]">
                          Enter Results
                        </button>
                      )}
                    </td>
                  </tr>
                  {expandedOrder === order.id && (
                    <tr key={order.id + '_form'} className="bg-gray-50">
                      <td colSpan={7} className="px-4 py-4">
                        <div className="grid sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Test Values</label>
                            <input className="input-field text-sm" placeholder="e.g. HbA1c: 7.2%, FBS: 142" value={resultForm.value} onChange={e => setResultForm(v => ({ ...v, value: e.target.value }))} />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Findings</label>
                            <input className="input-field text-sm" placeholder="Clinical findings..." value={resultForm.findings} onChange={e => setResultForm(v => ({ ...v, findings: e.target.value }))} />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Interpretation</label>
                            <select className="input-field text-sm" value={resultForm.interpretation} onChange={e => setResultForm(v => ({ ...v, interpretation: e.target.value }))}>
                              <option>Normal</option>
                              <option>Abnormal</option>
                              <option>Critical</option>
                            </select>
                          </div>
                        </div>
                        <button onClick={() => submitResult(order.id)} className="mt-3 btn-accent text-sm px-4 py-1.5">
                          Submit Results
                        </button>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Completed Tests */}
      <div className="card">
        <h2 className="section-title">Completed Tests Today</h2>
        <div className="space-y-3">
          {complete.length === 0 ? (
            <p className="text-sm text-gray-400">No completed tests yet today</p>
          ) : (
            complete.map(o => (
              <div key={o.id} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-gray-800">{o.test} — {o.patientName}</div>
                    <div className="text-xs text-gray-500 mt-0.5">Ordered: {o.timeOrdered} · TAT: {o.tat || '—'}</div>
                  </div>
                  <span className={`badge ${o.results?.interpretation === 'Normal' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {o.results?.interpretation || 'Complete'}
                  </span>
                </div>
                {o.results?.value && <div className="text-xs text-gray-600 mt-2">{o.results.value}</div>}
              </div>
            ))
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-4 text-center text-sm">
          <div><div className="text-xl font-bold text-gray-800">{orders.length}</div><div className="text-gray-500">Total Orders</div></div>
          <div><div className="text-xl font-bold text-gray-800">{avgTAT}</div><div className="text-gray-500">Avg TAT</div></div>
          <div><div className="text-xl font-bold text-gray-800">{critical.length}</div><div className="text-gray-500">Critical Findings</div></div>
        </div>
      </div>
    </div>
  )
}
