import { useState, useEffect, useCallback } from 'react'
import { Users, Calendar, FileText, AlertTriangle, TrendingUp, QrCode, ChevronDown, ChevronUp, Search, Plus, Trash2, CheckCircle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { api } from '../../utils/api.js'
import { addPendingRecord } from '../../utils/offlineDB.js'

const MOCK_PATIENTS = [
  { id: 'P001', name: 'Amit Sharma', age: 42, condition: 'Hypertension', blood: 'B+', allergies: ['Penicillin'], status: 'Stable', abhaId: 'ABHA-12345-67890', vitals: { bp: '138/88', hr: 76, spo2: 97, temp: 98.4 } },
  { id: 'P002', name: 'Priya Singh', age: 29, condition: 'Type 2 Diabetes', blood: 'A+', allergies: ['Aspirin'], status: 'Follow-up', abhaId: 'ABHA-22222-11111', vitals: { bp: '128/82', hr: 80, spo2: 98, temp: 98.6 } },
  { id: 'P003', name: 'Rajan Mehta', age: 65, condition: 'COPD', blood: 'O-', allergies: ['NSAIDs', 'Codeine'], status: 'Critical', abhaId: 'ABHA-33333-22222', vitals: { bp: '148/94', hr: 92, spo2: 91, temp: 99.2 } },
  { id: 'P004', name: 'Anita Verma', age: 35, condition: 'Migraine', blood: 'AB+', allergies: [], status: 'Stable', abhaId: 'ABHA-44444-33333', vitals: { bp: '118/76', hr: 68, spo2: 99, temp: 98.2 } },
  { id: 'P005', name: 'Suresh Kumar', age: 51, condition: 'Coronary Artery Disease', blood: 'B-', allergies: ['Warfarin'], status: 'Monitoring', abhaId: 'ABHA-55555-44444', vitals: { bp: '142/90', hr: 88, spo2: 96, temp: 98.8 } },
]

const MOCK_APPOINTMENTS = [
  { id: 'A001', patientName: 'Amit Sharma', date: '2024-07-15', time: '10:30', department: 'Cardiology', type: 'Follow-up' },
  { id: 'A002', patientName: 'Priya Singh', date: '2024-07-12', time: '11:00', department: 'Endocrinology', type: 'New' },
  { id: 'A003', patientName: 'Rajan Mehta', date: '2024-07-10', time: '09:00', department: 'Pulmonology', type: 'Emergency' },
  { id: 'A004', patientName: 'Anita Verma', date: '2024-07-18', time: '14:30', department: 'Neurology', type: 'Follow-up' },
]

const TREND_DATA = [
  { day: 'Mon', consultations: 12 }, { day: 'Tue', consultations: 18 },
  { day: 'Wed', consultations: 15 }, { day: 'Thu', consultations: 22 },
  { day: 'Fri', consultations: 20 }, { day: 'Sat', consultations: 8 },
]

const statusColor = {
  Stable: 'bg-green-100 text-green-700',
  Critical: 'bg-red-100 text-red-700',
  'Follow-up': 'bg-yellow-100 text-yellow-700',
  Monitoring: 'bg-blue-100 text-blue-700',
}

const apptTypeColor = {
  Emergency: 'bg-red-100 text-red-700',
  'Follow-up': 'bg-yellow-100 text-yellow-700',
  New: 'bg-blue-100 text-blue-700',
}

export default function DoctorDashboard() {
  const { user } = useAuth()
  const [patients, setPatients] = useState(MOCK_PATIENTS)
  const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS)
  const [search, setSearch] = useState('')
  const [expandedPatient, setExpandedPatient] = useState(null)
  const [scanToast, setScanToast] = useState(null)
  const [scannedPatient, setScannedPatient] = useState(null)
  const [showRxForm, setShowRxForm] = useState(false)
  const [rx, setRx] = useState({ patientId: '', drug: '', dosage: '', frequency: '', duration: '' })
  const [rxSubmitted, setRxSubmitted] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [rxError, setRxError] = useState(null)

  useEffect(() => {
    api.get('/patients').then(setPatients).catch(() => {})
    api.get('/appointments').then(setAppointments).catch(() => {})
  }, [])

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.condition.toLowerCase().includes(search.toLowerCase())
  )

  const simulateScan = useCallback(async () => {
    setScanning(true)
    await new Promise(r => setTimeout(r, 1500))
    const simulatedPatientId = 'P001'
    const scanData = {
      patientId: simulatedPatientId,
      timestamp: new Date().toISOString(),
      geolocation: { lat: 12.9716, lng: 77.5946 },
    }
    try {
      const res = await api.post('/patients/scan', scanData)
      setScannedPatient(res.patient || MOCK_PATIENTS.find(p => p.id === simulatedPatientId))
      setScanToast({ type: 'success', msg: 'Patient scanned successfully!' })
    } catch (err) {
      if (!navigator.onLine || err.offline) {
        await addPendingRecord('pendingScans', scanData)
        setScannedPatient(MOCK_PATIENTS.find(p => p.id === simulatedPatientId))
        setScanToast({ type: 'offline', msg: 'Saved offline — will sync when connected' })
      } else {
        setScanToast({ type: 'error', msg: 'Scan failed. Please try again.' })
      }
    } finally {
      setScanning(false)
      setTimeout(() => setScanToast(null), 4000)
    }
  }, [])

  const submitPrescription = async (e) => {
    e.preventDefault()
    setRxError(null)
    try {
      await api.post('/prescriptions', { ...rx, doctorId: user?.id, doctorName: user?.name })
      setRxSubmitted(true)
      setTimeout(() => { setRxSubmitted(false); setShowRxForm(false); setRx({ patientId: '', drug: '', dosage: '', frequency: '', duration: '' }) }, 2000)
    } catch {
      setRxError('Failed to submit prescription. Please try again.')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Doctor Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome, {user?.name || 'Dr. Demo User'} · {user?.facility || 'City General Hospital'}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: 'Total Patients', value: patients.length || '247', sub: '+12 this week', color: 'text-blue-600 bg-blue-50' },
          { icon: Calendar, label: "Today's Appointments", value: appointments.length || '18', sub: '3 pending', color: 'text-teal-600 bg-teal-50' },
          { icon: FileText, label: 'Pending Prescriptions', value: '9', sub: '2 urgent', color: 'text-orange-600 bg-orange-50' },
          { icon: AlertTriangle, label: 'CDSS Alerts', value: '4', sub: 'Review needed', color: 'text-red-600 bg-red-50' },
        ].map(({ icon: Icon, label, value, sub, color }) => (
          <div key={label} className="stat-card">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${color}`}><Icon className="w-5 h-5" /></div>
            <div className="text-2xl font-bold text-gray-800">{value}</div>
            <div className="text-sm text-gray-600 font-medium">{label}</div>
            <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
          </div>
        ))}
      </div>

      {/* QR Scanner */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <QrCode className="w-5 h-5 text-[#0d9488]" />
          <h2 className="section-title mb-0">Scan Patient QR</h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <button
            onClick={simulateScan}
            disabled={scanning}
            className="btn-accent flex items-center gap-2 px-6 py-2.5"
          >
            <QrCode className="w-4 h-4" />
            {scanning ? 'Scanning...' : 'Scan Patient QR Code'}
          </button>
          {scanToast && (
            <div className={`px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
              scanToast.type === 'success' ? 'bg-green-100 text-green-800' :
              scanToast.type === 'offline' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {scanToast.type === 'success' && <CheckCircle className="w-4 h-4" />}
              {scanToast.msg}
            </div>
          )}
        </div>
        {scannedPatient && (
          <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="font-semibold text-[#1e3a5f] mb-3">Scanned Patient Details</h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-500">Name:</span> <strong>{scannedPatient.name}</strong></div>
              <div><span className="text-gray-500">ABHA ID:</span> <strong>{scannedPatient.abhaId}</strong></div>
              <div><span className="text-gray-500">Blood Group:</span> <strong className="text-red-600">{scannedPatient.blood}</strong></div>
              <div><span className="text-gray-500">Condition:</span> <strong>{scannedPatient.condition}</strong></div>
              <div>
                <span className="text-gray-500">Allergies:</span>{' '}
                {scannedPatient.allergies?.length ? scannedPatient.allergies.map(a => (
                  <span key={a} className="inline-block bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full mr-1">{a}</span>
                )) : <span className="text-green-600 text-xs">None</span>}
              </div>
              {scannedPatient.vitals && (
                <div><span className="text-gray-500">BP:</span> <strong>{scannedPatient.vitals.bp}</strong> · <span className="text-gray-500">HR:</span> <strong>{scannedPatient.vitals.hr}</strong> · <span className="text-gray-500">SpO₂:</span> <strong>{scannedPatient.vitals.spo2}%</strong></div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Patient History */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title mb-0">Patient History</h2>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-2.5 top-2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search patients..." className="input-field pl-8 py-1.5 text-sm w-48" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 text-gray-500 font-medium">Patient</th>
                  <th className="text-left py-2 text-gray-500 font-medium">Condition</th>
                  <th className="text-left py-2 text-gray-500 font-medium">Blood</th>
                  <th className="text-left py-2 text-gray-500 font-medium">Status</th>
                  <th className="w-8"></th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map(p => (
                  <>
                    <tr key={p.id} onClick={() => setExpandedPatient(expandedPatient === p.id ? null : p.id)} className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                      <td className="py-2.5">
                        <div className="font-medium text-gray-800">{p.name}</div>
                        <div className="text-gray-400 text-xs">Age {p.age} · {p.id}</div>
                      </td>
                      <td className="py-2.5 text-gray-600">{p.condition}</td>
                      <td className="py-2.5 text-red-600 font-semibold text-xs">{p.blood}</td>
                      <td className="py-2.5">
                        <span className={`badge ${statusColor[p.status] || 'bg-gray-100 text-gray-600'}`}>{p.status}</span>
                      </td>
                      <td className="py-2.5 text-gray-400">
                        {expandedPatient === p.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </td>
                    </tr>
                    {expandedPatient === p.id && (
                      <tr key={p.id + '_expand'} className="bg-blue-50">
                        <td colSpan={5} className="px-4 py-3">
                          <div className="grid sm:grid-cols-3 gap-3 text-xs">
                            <div><span className="text-gray-500">ABHA ID:</span> {p.abhaId}</div>
                            <div><span className="text-gray-500">Allergies:</span> {p.allergies?.join(', ') || 'None'}</div>
                            {p.vitals && <div><span className="text-gray-500">Vitals:</span> BP {p.vitals.bp} · HR {p.vitals.hr} · SpO₂ {p.vitals.spo2}%</div>}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CDSS Panel */}
        <div className="card">
          <h2 className="section-title">CDSS Alerts</h2>
          <div className="space-y-3">
            {[
              { patient: 'Rajan Mehta', alert: 'SpO₂ < 92% — consider O₂ supplementation', level: 'critical' },
              { patient: 'Suresh Kumar', alert: 'Review beta-blocker dosage — BPM elevated', level: 'warning' },
              { patient: 'Priya Singh', alert: 'HbA1c overdue by 3 months', level: 'info' },
              { patient: 'Amit Sharma', alert: 'BP medication refill due', level: 'info' },
            ].map((item, i) => (
              <div key={i} className={`p-3 rounded-lg text-sm ${item.level === 'critical' ? 'bg-red-50 border border-red-200' : item.level === 'warning' ? 'bg-yellow-50 border border-yellow-200' : 'bg-blue-50 border border-blue-200'}`}>
                <div className="font-medium text-gray-800 mb-0.5">{item.patient}</div>
                <div className={`text-xs ${item.level === 'critical' ? 'text-red-700' : item.level === 'warning' ? 'text-yellow-700' : 'text-blue-700'}`}>{item.alert}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="card">
        <h2 className="section-title">Upcoming Appointments</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 text-gray-500 font-medium">Patient</th>
                <th className="text-left py-2 text-gray-500 font-medium">Date & Time</th>
                <th className="text-left py-2 text-gray-500 font-medium">Department</th>
                <th className="text-left py-2 text-gray-500 font-medium">Type</th>
              </tr>
            </thead>
            <tbody>
              {appointments.slice(0, 5).map(a => (
                <tr key={a.id || a.patientName} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2.5 font-medium text-gray-800">{a.patientName}</td>
                  <td className="py-2.5 text-gray-600">{a.date} {a.time}</td>
                  <td className="py-2.5 text-gray-600">{a.department}</td>
                  <td className="py-2.5">
                    <span className={`badge ${apptTypeColor[a.type] || 'bg-gray-100 text-gray-600'}`}>{a.type}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Consultation Trend */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[#0d9488]" />
          <h2 className="section-title mb-0">Weekly Consultation Trend</h2>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={TREND_DATA}>
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="consultations" stroke="#0d9488" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Prescription Writer */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#0d9488]" />
            <h2 className="section-title mb-0">Write Prescription</h2>
          </div>
          <button onClick={() => setShowRxForm(v => !v)} className="btn-primary text-sm px-3 py-1.5">
            {showRxForm ? 'Close' : <><Plus className="w-4 h-4 inline mr-1" />New Prescription</>}
          </button>
        </div>
        {showRxForm && (
          <form onSubmit={submitPrescription} className="space-y-3 border-t pt-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Patient</label>
                <select required className="input-field" value={rx.patientId} onChange={e => setRx(v => ({ ...v, patientId: e.target.value }))}>
                  <option value="">Select patient</option>
                  {MOCK_PATIENTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Drug Name</label>
                <input required className="input-field" placeholder="e.g. Amlodipine 5mg" value={rx.drug} onChange={e => setRx(v => ({ ...v, drug: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Dosage</label>
                <input required className="input-field" placeholder="e.g. 1 tab twice daily" value={rx.dosage} onChange={e => setRx(v => ({ ...v, dosage: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Duration</label>
                <input required className="input-field" placeholder="e.g. 30 days" value={rx.duration} onChange={e => setRx(v => ({ ...v, duration: e.target.value }))} />
              </div>
            </div>
            {rx.patientId && (
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-xs">
                <strong className="text-orange-700">Drug Interaction Alert:</strong>
                <span className="text-orange-600 ml-1">Check patient allergies before prescribing</span>
                <div className="text-gray-500 mt-1">Allergies: {MOCK_PATIENTS.find(p => p.id === rx.patientId)?.allergies?.join(', ') || 'None'}</div>
              </div>
            )}
            {rxError && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">{rxError}</div>}
            <button type="submit" className="btn-accent w-full py-2">
              {rxSubmitted ? '✓ Prescription Submitted!' : 'Submit Prescription'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
