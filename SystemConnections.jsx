import { useState, useEffect } from 'react'
import { Heart, Activity, Thermometer, Droplet, Calendar, FlaskConical, AlertCircle, CheckCircle } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { api } from '../../utils/api.js'
import Chatbot from '../common/Chatbot.jsx'

const MOCK_VITALS = { bp: '138/88', bpSystolic: 138, bpDiastolic: 88, hr: 76, spo2: 97, temp: 98.4 }
const MOCK_LAB_RESULTS = [
  { id: 'LAB003', test: 'HbA1c + FBS', date: '2024-07-10', value: 'HbA1c: 7.2%, FBS: 142 mg/dL', findings: 'Slightly elevated glycemic control', interpretation: 'Abnormal', normalRange: 'HbA1c <6.5%, FBS 70-100 mg/dL' },
  { id: 'LAB008', test: 'CBC', date: '2024-06-20', value: 'Hb: 13.5 g/dL, WBC: 7200, Platelets: 250k', findings: 'All within normal limits', interpretation: 'Normal', normalRange: 'Hb 12-17, WBC 4500-11000' },
]
const MOCK_APPOINTMENTS = [
  { id: 'A001', doctor: 'Dr. Ananya Desai', department: 'Cardiology', date: '2024-07-15', time: '10:30 AM', type: 'Follow-up' },
  { id: 'A002', doctor: 'Dr. Neha Gupta', department: 'Endocrinology', date: '2024-07-28', time: '02:00 PM', type: 'New' },
]
const BP_TREND = [
  { date: 'Jun 1', bp: 122 }, { date: 'Jun 8', bp: 118 }, { date: 'Jun 15', bp: 124 },
  { date: 'Jun 22', bp: 120 }, { date: 'Jul 1', bp: 138 },
]

const DOCTORS = ['Dr. Ananya Desai', 'Dr. Vikram Rao', 'Dr. Neha Gupta', 'Dr. Rohan Khan']
const DEPARTMENTS = ['Cardiology', 'Pulmonology', 'Neurology', 'Endocrinology', 'General Medicine']

export default function PatientDashboard() {
  const { user } = useAuth()
  const [vitals, setVitals] = useState(MOCK_VITALS)
  const [labResults, setLabResults] = useState(MOCK_LAB_RESULTS)
  const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS)
  const [apptForm, setApptForm] = useState({ doctor: '', department: '', date: '', time: '', reason: '' })
  const [apptSubmitted, setApptSubmitted] = useState(false)
  const [apptError, setApptError] = useState(null)

  const patient = {
    name: user?.name || 'Amit Sharma',
    abhaId: user?.abhaId || 'ABHA-12345-67890',
    blood: 'B+',
    allergies: ['Penicillin', 'Sulfa'],
    emergency: 'Reena Sharma (+91-9876543211)',
  }

  useEffect(() => {
    const pid = 'P001'
    api.get(`/vitals/${pid}`).then(data => { if (data?.length) setVitals(data[0]) }).catch(() => {})
    api.get(`/lab-tests?patientId=${pid}&status=Complete`).then(data => { if (data?.length) setLabResults(data) }).catch(() => {})
    api.get(`/appointments?patientId=${pid}`).then(data => { if (data?.length) setAppointments(data) }).catch(() => {})
  }, [])

  const bookAppointment = async (e) => {
    e.preventDefault()
    setApptError(null)
    const newAppt = { ...apptForm, patientId: 'P001', patientName: patient.name, status: 'Pending' }
    try {
      await api.post('/appointments', newAppt)
      setAppointments(a => [...a, { id: 'A' + Date.now(), ...newAppt, doctor: apptForm.doctor, type: 'New' }])
      setApptSubmitted(true)
      setTimeout(() => { setApptSubmitted(false); setApptForm({ doctor: '', department: '', date: '', time: '', reason: '' }) }, 3000)
    } catch {
      setApptError('Failed to book appointment. Please try again.')
    }
  }

  const vitalStatus = (type, val) => {
    if (type === 'bp') return val > 130 ? 'red' : val > 120 ? 'yellow' : 'green'
    if (type === 'hr') return val > 100 || val < 60 ? 'red' : val > 90 ? 'yellow' : 'green'
    if (type === 'spo2') return val < 94 ? 'red' : val < 96 ? 'yellow' : 'green'
    if (type === 'temp') return val > 100 ? 'red' : val > 99 ? 'yellow' : 'green'
    return 'green'
  }

  const vitalClasses = { red: 'text-red-600 bg-red-50', yellow: 'text-yellow-600 bg-yellow-50', green: 'text-green-600 bg-green-50' }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">My Health Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">ABHA ID: {patient.abhaId}</p>
      </div>

      {/* Health Card */}
      <div className="bg-gradient-to-br from-[#1e3a5f] to-[#0d9488] rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex-1">
            <div className="text-xs opacity-70 mb-1">Smart Health Card</div>
            <h2 className="text-xl font-bold mb-1">{patient.name}</h2>
            <div className="text-sm opacity-80 mb-3">{patient.abhaId}</div>
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
                <div className="text-2xl font-bold">{patient.blood}</div>
                <div className="text-xs opacity-70">Blood Group</div>
              </div>
              <div className="text-xs">
                <div className="opacity-70 mb-1">Emergency Contact</div>
                <div className="font-medium">{patient.emergency}</div>
              </div>
            </div>
            <div>
              <div className="text-xs opacity-70 mb-1">Allergies</div>
              <div className="flex flex-wrap gap-1">
                {patient.allergies.map(a => (
                  <span key={a} className="bg-red-500/30 border border-red-400/50 text-white text-xs px-2 py-0.5 rounded-full">{a}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl self-start">
            <QRCodeSVG value={JSON.stringify({ id: 'P001', name: patient.name, abha: patient.abhaId, blood: patient.blood })} size={96} />
            <div className="text-gray-500 text-xs text-center mt-1">Scan for record</div>
          </div>
        </div>
      </div>

      {/* Current Vitals */}
      <div className="card">
        <h2 className="section-title">Current Vitals</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Blood Pressure', value: vitals.bp, unit: 'mmHg', icon: Activity, type: 'bp', numVal: vitals.bpSystolic || 138 },
            { label: 'Heart Rate', value: `${vitals.hr || 76}`, unit: 'bpm', icon: Heart, type: 'hr', numVal: vitals.hr || 76 },
            { label: 'SpO₂', value: `${vitals.spo2 || 97}%`, unit: '', icon: Droplet, type: 'spo2', numVal: vitals.spo2 || 97 },
            { label: 'Temperature', value: `${vitals.temp || 98.4}°F`, unit: '', icon: Thermometer, type: 'temp', numVal: vitals.temp || 98.4 },
          ].map(({ label, value, unit, icon: Icon, type, numVal }) => {
            const status = vitalStatus(type, numVal)
            return (
              <div key={label} className={`p-4 rounded-xl ${vitalClasses[status]}`}>
                <Icon className="w-5 h-5 mb-2" />
                <div className="text-lg font-bold">{value}</div>
                <div className="text-xs opacity-80">{label}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* BP Trend */}
        <div className="card">
          <h2 className="section-title">Blood Pressure Trend</h2>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={BP_TREND}>
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis domain={[100, 150]} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="bp" stroke="#0d9488" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Upcoming Appointments */}
        <div className="card">
          <h2 className="section-title">Upcoming Appointments</h2>
          <div className="space-y-3">
            {appointments.slice(0, 3).map((a, i) => (
              <div key={i} className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-sm text-[#1e3a5f]">{a.doctor || a.doctorName}</div>
                    <div className="text-xs text-gray-500">{a.department}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-700">{a.date}</div>
                    <div className="text-xs text-gray-500">{a.time}</div>
                  </div>
                </div>
              </div>
            ))}
            {appointments.length === 0 && <p className="text-sm text-gray-400">No upcoming appointments</p>}
          </div>
        </div>
      </div>

      {/* Lab Results */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <FlaskConical className="w-5 h-5 text-[#0d9488]" />
          <h2 className="section-title mb-0">Lab Test Results</h2>
        </div>
        <div className="space-y-3">
          {labResults.map(r => (
            <div key={r.id} className={`p-4 rounded-xl border ${r.interpretation === 'Abnormal' || r.interpretation === 'Critical' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-semibold text-gray-800">{r.test}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{r.date}</div>
                </div>
                <span className={`badge ${r.interpretation === 'Normal' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {r.interpretation === 'Normal' ? <CheckCircle className="w-3 h-3 inline mr-1" /> : <AlertCircle className="w-3 h-3 inline mr-1" />}
                  {r.interpretation}
                </span>
              </div>
              <div className="text-sm text-gray-700">{r.value || r.results?.value}</div>
              {r.findings && <div className="text-xs text-gray-500 mt-1">{r.findings}</div>}
              {r.normalRange && <div className="text-xs text-gray-400 mt-1">Normal range: {r.normalRange}</div>}
            </div>
          ))}
          {labResults.length === 0 && <p className="text-sm text-gray-400">No lab results available</p>}
        </div>
      </div>

      {/* Book Appointment */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-[#0d9488]" />
          <h2 className="section-title mb-0">Book Appointment</h2>
        </div>
        {apptSubmitted ? (
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <div className="font-semibold text-green-800">Appointment booked successfully!</div>
              <div className="text-sm text-green-600">You will receive a confirmation shortly.</div>
            </div>
          </div>
        ) : (
          <form onSubmit={bookAppointment} className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Select Doctor</label>
              <select required className="input-field" value={apptForm.doctor} onChange={e => setApptForm(v => ({ ...v, doctor: e.target.value }))}>
                <option value="">Select doctor</option>
                {DOCTORS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Department</label>
              <select required className="input-field" value={apptForm.department} onChange={e => setApptForm(v => ({ ...v, department: e.target.value }))}>
                <option value="">Select department</option>
                {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Preferred Date</label>
              <input required type="date" className="input-field" value={apptForm.date} onChange={e => setApptForm(v => ({ ...v, date: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Preferred Time</label>
              <input required type="time" className="input-field" value={apptForm.time} onChange={e => setApptForm(v => ({ ...v, time: e.target.value }))} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-600 mb-1">Reason for Visit</label>
              <textarea className="input-field h-20 resize-none" placeholder="Describe your symptoms or reason..." value={apptForm.reason} onChange={e => setApptForm(v => ({ ...v, reason: e.target.value }))} />
            </div>
            <div className="sm:col-span-2">
              {apptError && <div className="mb-2 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">{apptError}</div>}
              <button type="submit" className="btn-accent w-full py-2.5">Book Appointment</button>
            </div>
          </form>
        )}
      </div>

      {/* Chatbot */}
      <Chatbot />
    </div>
  )
}
