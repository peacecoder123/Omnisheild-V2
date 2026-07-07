import { useState } from 'react'
import { Bell, Plus, Trash2 } from 'lucide-react'

const defaultAlerts = [
  { id: 1, name: 'High-Risk Dengue Zone', condition: 'cases > 500 in district', channel: 'SMS + Email', active: true },
  { id: 2, name: 'Rt > 1.5 Alert',        condition: 'Rt exceeds 1.5',           channel: 'Email',       active: true },
  { id: 3, name: 'ICU Capacity Warning',   condition: 'Bed occupancy > 90%',      channel: 'SMS',         active: false },
]

export default function AlertConfig() {
  const [alerts, setAlerts] = useState(defaultAlerts)
  const [form, setForm] = useState({ name: '', condition: '', channel: 'Email' })

  const addAlert = (e) => {
    e.preventDefault()
    if (!form.name) return
    setAlerts(prev => [...prev, { id: Date.now(), ...form, active: true }])
    setForm({ name: '', condition: '', channel: 'Email' })
  }

  const remove = (id) => setAlerts(prev => prev.filter(a => a.id !== id))
  const toggle = (id) => setAlerts(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a))

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-5 h-5 text-[#0d9488]" />
        <h2 className="section-title mb-0">Alert Configuration</h2>
      </div>

      <div className="space-y-2 mb-6">
        {alerts.map(a => (
          <div key={a.id} className={`flex items-center gap-3 p-3 rounded-lg border ${a.active ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex-1">
              <div className="font-medium text-sm text-gray-800">{a.name}</div>
              <div className="text-xs text-gray-500">{a.condition} · {a.channel}</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={a.active} onChange={() => toggle(a.id)} className="sr-only peer" />
              <div className="w-9 h-5 bg-gray-300 peer-checked:bg-[#0d9488] rounded-full transition-colors" />
              <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-4 transition-transform" />
            </label>
            <button onClick={() => remove(a.id)} className="text-red-400 hover:text-red-600">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={addAlert} className="border-t border-gray-100 pt-4 space-y-3">
        <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
          <Plus className="w-4 h-4" /> Add New Alert
        </p>
        <input className="input-field" placeholder="Alert name" value={form.name}
          onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
        <input className="input-field" placeholder="Trigger condition" value={form.condition}
          onChange={e => setForm(p => ({ ...p, condition: e.target.value }))} />
        <select className="input-field" value={form.channel}
          onChange={e => setForm(p => ({ ...p, channel: e.target.value }))}>
          {['Email', 'SMS', 'SMS + Email', 'Webhook', 'Push Notification'].map(c => <option key={c}>{c}</option>)}
        </select>
        <button type="submit" className="btn-accent w-full py-2">Add Alert</button>
      </form>
    </div>
  )
}
