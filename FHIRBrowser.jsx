import { useState, useEffect } from 'react'
import { ClipboardList, Heart, Thermometer, CheckSquare, Activity, Bell, AlertTriangle, CheckCircle, Users } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { api } from '../../utils/api.js'
import { addPendingRecord } from '../../utils/offlineDB.js'

const MOCK_PATIENTS = [
  { id: 'P001', name: 'Amit Sharma', room: '101-A', condition: 'Hypertension', lastVitals: '09:00', doctor: 'Dr. Ananya Desai', status: 'Stable' },
  { id: 'P002', name: 'Priya Singh', room: '102-B', condition: 'Type 2 Diabetes', lastVitals: '09:15', doctor: 'Dr. Ananya Desai', status: 'Stable' },
  { id: 'P003', name: 'Rajan Mehta', room: 'ICU-3', condition: 'COPD', lastVitals: '09:30', doctor: 'Dr. Vikram Rao', status: 'Critical' },
  { id: 'P004', name: 'Anita Verma', room: '203-A', condition: 'Migraine', lastVitals: '08:45', doctor: 'Dr. Neha Gupta', status: 'Stable' },
  { id: 'P005', name: 'Suresh Kumar', room: '110-B', condition: 'Coronary Artery Disease', lastVitals: '08:30', doctor: 'Dr. Ananya Desai', status: 'Monitoring' },
]

const MOCK_MEDS = [
  { id: 1, patient: 'Amit Sharma', drug: 'Amlodipine 5mg', time: '08:00', done: true, adminTime: '08:05' },
  { id: 2, patient: 'Priya Singh', drug: 'Metformin 500mg', time: '09:00', done: false, adminTime: null },
  { id: 3, patient: 'Rajan Mehta', drug: 'Salbutamol Inhaler 2 puffs', time: '09:00', done: false, adminTime: null },
  { id: 4, patient: 'Suresh Kumar', drug: 'Atorvastatin 20mg', time: '10:00', done: false, adminTime: null },
]

const MOCK_INSPECTION = [
  { id: 1, item: 'Bed cleanliness — Ward 3', done: false, time: null },
  { id: 2, item: 'Equipment check — crash cart', done: true, time: '08:00' },
  { id: 3, item: 'IV line check — all patients', done: false, time: null },
  { id: 4, item: 'Patient comfort rounds', done: false, time: null },
  { id: 5, item: 'Waste disposal bins emptied', done: true, time: '07:45' },
]

const MOCK_ALERTS = [
  { id: 1, patient: 'Rajan Mehta', alert: 'SpO₂ dropped below 92% — immediate attention required', severity: 'critical', time: '09:32', ack: false },
  { id: 2, patient: 'Suresh Kumar', alert: 'HR elevated to 98 bpm — monitor closely', severity: 'warning', time: '09:15', ack: false },
]

const statusColor = {
  Stable: 'bg-green-100 text-green-700',
  Critical: 'bg-red-100 text-red-700',
  Monitoring: 'bg-blue-100 text-blue-700',
}

export default function NurseDashboard() {
  const { user } = useAuth()
  const [patients] = useState(MOCK_PATIENTS)
  const [meds, setMeds] = useState(MOCK_MEDS)
  const [inspection, setInspection] = useState(MOCK_INSPECTION)
  const [alerts, setAlerts] = useState(MOCK_ALERTS)
  const [expandedPatient, setExpandedPatient] = useState(null)
  const [vitals, setVitals] = useState({ patientId: 'P003', bp: '', hr: '', temp: '', spo2: '', rr: '', pain: 5, notes: '' })
  const [vitalsToast, setVitalsToast] = useState(null)
  const [activityLog, setActivityLog] = useState([
    { time: '07:45', action: 'Waste disposal bins emptied — Ward 3' },
    { time: '08:00', action: 'Equipment check completed — crash cart verified' },
    { time: '08:05', action: 'Medication administered — Amit Sharma / Amlodipine 5mg' },
  ])

  const criticalCount = patients.filter(p => p.status === 'Critical').length
  const pendingMeds = meds.filter(m => !m.done).length
  const pendingInspections = inspection.filter(i => !i.done).length
  const unackedAlerts = alerts.filter(a => !a.ack).length

  const saveVitals = async (e) => {
    e.preventDefault()
    const data = { ...vitals, timestamp: new Date().toISOString(), nurse: user?.name || 'Sr. Neha Sharma' }
    try {
      await api.post('/vitals', data)
      setVitalsToast({ type: 'success', msg: 'Vitals saved successfully!' })
    } catch (err) {
      if (!navigator.onLine || err.offline) {
        await addPendingRecord('pendingVitals', data)
        setVitalsToast({ type: 'offline', msg: 'Saved offline — will sync when connected' })
      } else {
        setVitalsToast({ type: 'error', msg: 'Failed to save vitals' })
      }
    }
    const pt = patients.find(p => p.id === vitals.patientId)
    setActivityLog(l => [{ time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), action: `Vitals logged — ${pt?.name} / BP ${vitals.bp}, HR ${vitals.hr}` }, ...l])
    setTimeout(() => setVitalsToast(null), 3000)
    setVitals(v => ({ ...v, bp: '', hr: '', temp: '', spo2: '', rr: '', notes: '' }))
  }

  const adminMed = (id) => {
    const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    const med = meds.find(m => m.id === id)
    setMeds(m => m.map(x => x.id === id ? { ...x, done: true, adminTime: now } : x))
    if (med) setActivityLog(l => [{ time: now, action: `Medication administered — ${med.patient} / ${med.drug}` }, ...l])
  }

  const checkInspection = (id) => {
    const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    const item = inspection.find(i => i.id === id)
    setInspection(i => i.map(x => x.id === id ? { ...x, done: !x.done, time: !x.done ? now : null } : x))
    if (item && !item.done) setActivityLog(l => [{ time: now, action: `Inspection completed — ${item.item}` }, ...l])
  }

  const ackAlert = (id) => {
    setAlerts(a => a.map(x => x.id === id ? { ...x, ack: true } : x))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Nurse Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Ward 3 — Morning Shift · {user?.name || 'Sr. Neha Sharma'}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {[
          { label: 'Active Patients', value: patients.length, Icon: Users, color: 'bg-blue-50 text-blue-600' },
          { label: 'Critical Patients', value: criticalCount, Icon: Heart, color: 'bg-red-50 text-red-600' },
          { label: 'Med Rounds Pending', value: pendingMeds, Icon: ClipboardList, color: 'bg-yellow-50 text-yellow-600' },
          { label: 'Inspections Due', value: pendingInspections, Icon: CheckSquare, color: 'bg-purple-50 text-purple-600' },
          {
            label: 'Emergency Alerts', value: unackedAlerts,
            Icon: Bell,
            color: unackedAlerts > 0 ? 'bg-red-600 text-white animate-pulse' : 'bg-green-50 text-green-600'
          },
        ].map(({ label, value, Icon, color }) => (
          <div key={label} className="stat-card flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}><Icon className="w-4 h-4" /></div>
            <div><div className="text-xl font-bold">{value}</div><div className="text-xs text-gray-500">{label}</div></div>
          </div>
        ))}
      </div>

      {/* Emergency Alerts */}
      {unackedAlerts > 0 && (
        <div className="card border-2 border-red-300">
          <div className="flex items-center gap-2 mb-3">
            <Bell className="w-5 h-5 text-red-600 animate-pulse" />
            <h2 className="section-title mb-0 text-red-700">Emergency Alerts</h2>
          </div>
          <div className="space-y-3">
            {alerts.filter(a => !a.ack).map(a => (
              <div key={a.id} className={`p-3 rounded-lg border flex items-start justify-between gap-3 ${a.severity === 'critical' ? 'bg-red-50 border-red-300' : 'bg-yellow-50 border-yellow-300'}`}>
                <div className="flex items-start gap-2">
                  <AlertTriangle className={`w-4 h-4 mt-0.5 ${a.severity === 'critical' ? 'text-red-600' : 'text-yellow-600'}`} />
                  <div>
                    <div className="font-semibold text-sm text-gray-800">{a.patient}</div>
                    <div className="text-xs text-gray-600">{a.alert}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{a.time}</div>
                  </div>
                </div>
                <button onClick={() => ackAlert(a.id)} className="text-xs bg-white border border-gray-300 px-2 py-1 rounded hover:bg-gray-50 shrink-0">Acknowledge</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {vitalsToast && (
        <div className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 text-white text-sm ${vitalsToast.type === 'success' ? 'bg-green-600' : vitalsToast.type === 'offline' ? 'bg-yellow-600' : 'bg-red-600'}`}>
          <CheckCircle className="w-4 h-4" />
          {vitalsToast.msg}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Vitals Entry */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Thermometer className="w-5 h-5 text-[#0d9488]" />
            <h2 className="section-title mb-0">Log Patient Vitals</h2>
          </div>
          <form onSubmit={saveVitals} className="space-y-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Patient</label>
              <select className="input-field" value={vitals.patientId} onChange={e => setVitals(v => ({ ...v, patientId: e.target.value }))}>
                {patients.map(p => <option key={p.id} value={p.id}>{p.name} — {p.room}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Blood Pressure</label>
                <input className="input-field" placeholder="120/80 mmHg" value={vitals.bp} onChange={e => setVitals(v => ({ ...v, bp: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Heart Rate (bpm)</label>
                <input className="input-field" placeholder="72" value={vitals.hr} onChange={e => setVitals(v => ({ ...v, hr: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Temperature (°F)</label>
                <input className="input-field" placeholder="98.6" value={vitals.temp} onChange={e => setVitals(v => ({ ...v, temp: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">SpO₂ (%)</label>
                <input className="input-field" placeholder="98" value={vitals.spo2} onChange={e => setVitals(v => ({ ...v, spo2: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Resp. Rate (/min)</label>
                <input className="input-field" placeholder="16" value={vitals.rr} onChange={e => setVitals(v => ({ ...v, rr: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Pain Level ({vitals.pain}/10)</label>
                <input type="range" min="0" max="10" className="w-full mt-1" value={vitals.pain} onChange={e => setVitals(v => ({ ...v, pain: parseInt(e.target.value) }))} />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Notes</label>
              <textarea className="input-field h-16 resize-none" placeholder="Clinical notes..." value={vitals.notes} onChange={e => setVitals(v => ({ ...v, notes: e.target.value }))} />
            </div>
            <button type="submit" className="btn-accent w-full py-2">Log Vitals</button>
          </form>
        </div>

        {/* Med Round Tracker */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="w-5 h-5 text-[#0d9488]" />
            <h2 className="section-title mb-0">Medication Round</h2>
          </div>
          <div className="space-y-2">
            {meds.map(m => (
              <div key={m.id} className={`flex items-center justify-between p-3 rounded-lg ${m.done ? 'bg-green-50' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <input type="checkbox" checked={m.done} onChange={() => adminMed(m.id)} className="accent-[#0d9488]" disabled={m.done} />
                  <div>
                    <div className={`text-sm font-medium ${m.done ? 'line-through text-gray-400' : 'text-gray-800'}`}>{m.patient}</div>
                    <div className="text-xs text-gray-500">{m.drug} · Due: {m.time}</div>
                    {m.adminTime && <div className="text-xs text-green-600">Given: {m.adminTime}</div>}
                  </div>
                </div>
                {!m.done && (
                  <button onClick={() => adminMed(m.id)} className="text-xs bg-[#0d9488] text-white px-2 py-1 rounded hover:bg-[#0f766e]">Administer</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Patient Details */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-[#0d9488]" />
          <h2 className="section-title mb-0">Patient Details</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {patients.map(p => (
            <div key={p.id} onClick={() => setExpandedPatient(expandedPatient === p.id ? null : p.id)} className={`p-3 rounded-xl border cursor-pointer transition-all hover:shadow-md ${p.status === 'Critical' ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'}`}>
              <div className="flex items-center justify-between mb-1">
                <div className="font-semibold text-sm text-gray-800">{p.name}</div>
                <span className={`badge text-xs ${statusColor[p.status]}`}>{p.status}</span>
              </div>
              <div className="text-xs text-gray-500">Room: {p.room} · {p.condition}</div>
              <div className="text-xs text-gray-400 mt-1">{p.doctor}</div>
              {expandedPatient === p.id && (
                <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-600">
                  <div>Last Vitals: {p.lastVitals}</div>
                  <div className="mt-1">Assigned Doctor: {p.doctor}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Inspection Checklist */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <CheckSquare className="w-5 h-5 text-[#0d9488]" />
          <h2 className="section-title mb-0">Shift Inspection Checklist</h2>
          <span className="ml-auto text-xs text-gray-500">{inspection.filter(i => i.done).length}/{inspection.length} complete</span>
        </div>
        <div className="space-y-2">
          {inspection.map(item => (
            <div key={item.id} className={`flex items-center gap-3 p-2.5 rounded-lg ${item.done ? 'bg-green-50' : 'bg-gray-50'}`}>
              <input type="checkbox" checked={item.done} onChange={() => checkInspection(item.id)} className="accent-[#0d9488]" />
              <div className="flex-1">
                <span className={`text-sm ${item.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>{item.item}</span>
              </div>
              {item.time && <span className="text-xs text-green-600">{item.time}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Activity Log */}
      <div className="card">
        <h2 className="section-title">Shift Activity Log</h2>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {activityLog.map((entry, i) => (
            <div key={i} className="flex gap-3 text-sm">
              <span className="text-gray-400 text-xs w-12 shrink-0 pt-0.5">{entry.time}</span>
              <span className="text-gray-700">{entry.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
