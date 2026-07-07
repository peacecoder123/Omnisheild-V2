import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Bed, Users, IndianRupee, ShieldCheck, Filter } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { api } from '../../utils/api.js'

const BED_DATA = [
  { ward: 'ICU', total: 20, occupied: 17 },
  { ward: 'General', total: 80, occupied: 62 },
  { ward: 'Pediatric', total: 30, occupied: 22 },
  { ward: 'Maternity', total: 25, occupied: 18 },
  { ward: 'Emergency', total: 15, occupied: 14 },
]

const REVENUE_DATA = [
  { month: 'Jan', revenue: 42 }, { month: 'Feb', revenue: 48 }, { month: 'Mar', revenue: 45 },
  { month: 'Apr', revenue: 52 }, { month: 'May', revenue: 61 }, { month: 'Jun', revenue: 58 },
  { month: 'Jul', revenue: 63 }, { month: 'Aug', revenue: 57 }, { month: 'Sep', revenue: 70 },
  { month: 'Oct', revenue: 68 }, { month: 'Nov', revenue: 72 }, { month: 'Dec', revenue: 75 },
]

const MOCK_STAFF = [
  { id: 'S001', name: 'Dr. Ananya Desai', role: 'Cardiologist', department: 'Cardiology', shift: 'Morning', status: 'On Duty' },
  { id: 'S002', name: 'Dr. Vikram Rao', role: 'Pulmonologist', department: 'Pulmonology', shift: 'Morning', status: 'On Duty' },
  { id: 'S003', name: 'Sr. Neha Sharma', role: 'Head Nurse', department: 'Ward 3', shift: 'Morning', status: 'On Duty' },
  { id: 'S004', name: 'Dr. Rohan Khan', role: 'General Surgeon', department: 'Surgery', shift: 'Night', status: 'Off Duty' },
  { id: 'S005', name: 'Ramesh Verma', role: 'Lab Technician', department: 'Pathology', shift: 'Morning', status: 'On Duty' },
  { id: 'S006', name: 'Kavita Patel', role: 'Pharmacist', department: 'Pharmacy', shift: 'Morning', status: 'On Duty' },
  { id: 'S007', name: 'Dr. Neha Gupta', role: 'Neurologist', department: 'Neurology', shift: 'Afternoon', status: 'On Duty' },
  { id: 'S008', name: 'Arjun Singh', role: 'Radiologist', department: 'Radiology', shift: 'Morning', status: 'On Leave' },
]

const MOCK_COMPLIANCE = [
  { id: 'C001', item: 'Fire Safety Audit', due: '2024-07-30', status: 'Complete', category: 'Safety' },
  { id: 'C002', item: 'NABH Accreditation', due: '2024-08-15', status: 'In Progress', category: 'Accreditation' },
  { id: 'C003', item: 'HIPAA Training', due: '2024-07-20', status: 'Overdue', category: 'Training' },
  { id: 'C004', item: 'Equipment Calibration', due: '2024-07-25', status: 'Complete', category: 'Equipment' },
  { id: 'C005', item: 'Staff Training Sessions', due: '2024-08-01', status: 'In Progress', category: 'Training' },
  { id: 'C006', item: 'Fire Holding Equipment Check', due: '2024-07-15', status: 'Complete', category: 'Safety' },
  { id: 'C007', item: 'Infection Control Audit', due: '2024-07-28', status: 'In Progress', category: 'Safety' },
  { id: 'C008', item: 'Waste Management Review', due: '2024-08-10', status: 'Overdue', category: 'Environment' },
]

const getBedColor = (occupied, total) => {
  const pct = occupied / total
  if (pct > 0.9) return '#ef4444'
  if (pct > 0.7) return '#f59e0b'
  return '#10b981'
}

const complianceStatusColor = {
  Complete: 'bg-green-100 text-green-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  Overdue: 'bg-red-100 text-red-700',
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const [bedData, setBedData] = useState(BED_DATA)
  const [staff, setStaff] = useState(MOCK_STAFF)
  const [compliance, setCompliance] = useState(MOCK_COMPLIANCE)
  const [deptFilter, setDeptFilter] = useState('')
  const [hoveredCard, setHoveredCard] = useState(null)

  useEffect(() => {
    api.get('/beds').then(data => { if (data?.length) setBedData(data) }).catch(() => {})
    api.get('/staff').then(data => { if (data?.length) setStaff(data) }).catch(() => {})
    api.get('/compliance').then(data => { if (data?.length) setCompliance(data) }).catch(() => {})
  }, [])

  const totalBeds = bedData.reduce((a, b) => a + b.total, 0)
  const occupiedBeds = bedData.reduce((a, b) => a + b.occupied, 0)
  const completeItems = compliance.filter(c => c.status === 'Complete').length
  const complianceScore = Math.round((completeItems / compliance.length) * 100)

  const filteredStaff = deptFilter ? staff.filter(s => s.department === deptFilter) : staff
  const departments = [...new Set(staff.map(s => s.department))]

  const coloredBedData = bedData.map(b => ({ ...b, fill: getBedColor(b.occupied, b.total) }))

  const STAT_CARDS = [
    {
      id: 'beds',
      icon: Bed,
      label: 'Beds Occupied',
      value: `${occupiedBeds}/${totalBeds}`,
      sub: `${Math.round(occupiedBeds / totalBeds * 100)}% occupancy`,
      baseColor: 'from-blue-500 to-blue-700',
      hoverExtra: `ICU: ${BED_DATA[0].occupied}/${BED_DATA[0].total}`,
    },
    {
      id: 'staff',
      icon: Users,
      label: 'Active Staff',
      value: staff.filter(s => s.status === 'On Duty').length,
      sub: `${staff.length} total staff`,
      baseColor: 'from-emerald-500 to-emerald-700',
      hoverExtra: `${staff.filter(s => s.role.includes('Dr.')).length} Doctors · ${staff.filter(s => s.role === 'Head Nurse' || s.role.includes('Nurse')).length} Nurses`,
    },
    {
      id: 'revenue',
      icon: IndianRupee,
      label: 'Revenue Today',
      value: '₹58.4L',
      sub: '+5.2% from yesterday',
      baseColor: 'from-violet-500 to-violet-700',
      hoverExtra: 'OPD: ₹22L · IPD: ₹36.4L',
    },
    {
      id: 'compliance',
      icon: ShieldCheck,
      label: 'Compliance Score',
      value: `${complianceScore}%`,
      sub: `${completeItems}/${compliance.length} items complete`,
      baseColor: 'from-teal-500 to-teal-700',
      hoverExtra: `${compliance.filter(c => c.status === 'Overdue').length} overdue items`,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Hospital Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">{user?.facility || 'City General Hospital'}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map(({ id, icon: Icon, label, value, sub, baseColor, hoverExtra }) => (
          <div
            key={id}
            onMouseEnter={() => setHoveredCard(id)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`bg-gradient-to-br ${baseColor} text-white rounded-xl p-4 cursor-pointer transition-all duration-200 ${hoveredCard === id ? 'scale-105 shadow-xl' : 'shadow-md hover:shadow-lg'}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-sm font-medium opacity-90">{label}</div>
            <div className="text-xs opacity-70 mt-0.5">
              {hoveredCard === id ? hoverExtra : sub}
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Bed Occupancy Chart */}
        <div className="card">
          <h2 className="section-title">Bed Occupancy by Ward</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={coloredBedData} barCategoryGap="30%">
              <XAxis dataKey="ward" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(val, name) => [val, name === 'occupied' ? 'Occupied' : 'Total']} />
              <Bar dataKey="total" fill="#e2e8f0" name="Total" radius={[4, 4, 0, 0]} />
              <Bar dataKey="occupied" name="Occupied" radius={[4, 4, 0, 0]}>
                {coloredBedData.map((entry, index) => (
                  <rect key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500 inline-block"></span> &gt;90%</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-500 inline-block"></span> 70-90%</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-500 inline-block"></span> &lt;70%</span>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="card">
          <h2 className="section-title">Monthly Revenue (₹ Lakh)</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={REVENUE_DATA}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={v => [`₹${v}L`, 'Revenue']} />
              <Line type="monotone" dataKey="revenue" stroke="#1e3a5f" strokeWidth={2} dot={{ r: 4, fill: '#0d9488' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Staff Management */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title mb-0">Staff Management</h2>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select className="input-field py-1.5 text-sm w-40" value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
              <option value="">All Departments</option>
              {departments.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 text-gray-500 font-medium">Name</th>
                <th className="text-left py-2 text-gray-500 font-medium">Role</th>
                <th className="text-left py-2 text-gray-500 font-medium">Department</th>
                <th className="text-left py-2 text-gray-500 font-medium">Shift</th>
                <th className="text-left py-2 text-gray-500 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map(s => (
                <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2.5 font-medium text-gray-800">{s.name}</td>
                  <td className="py-2.5 text-gray-600">{s.role}</td>
                  <td className="py-2.5 text-gray-600">{s.department}</td>
                  <td className="py-2.5 text-gray-600">{s.shift}</td>
                  <td className="py-2.5">
                    <span className={`badge ${s.status === 'On Duty' ? 'bg-green-100 text-green-700' : s.status === 'On Leave' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>{s.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance Checklist */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title mb-0">Compliance Checklist</h2>
          <div className={`text-sm font-semibold px-3 py-1.5 rounded-full ${complianceScore >= 80 ? 'bg-green-100 text-green-700' : complianceScore >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
            Score: {complianceScore}%
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-2">
          {compliance.map(c => (
            <div key={c.id} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-sm text-gray-800">{c.item}</div>
                <div className="text-xs text-gray-400">Due: {c.due} · {c.category}</div>
              </div>
              <span className={`badge ${complianceStatusColor[c.status]}`}>{c.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
