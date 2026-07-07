import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const ageData = [
  { group: '0-14',  count: 12400 },
  { group: '15-24', count: 18600 },
  { group: '25-44', count: 31200 },
  { group: '45-64', count: 28400 },
  { group: '65+',   count: 14800 },
]

const diseaseData = [
  { name: 'Cardiovascular', value: 28, color: '#ef4444' },
  { name: 'Diabetes',       value: 18, color: '#f97316' },
  { name: 'Respiratory',    value: 15, color: '#3b82f6' },
  { name: 'Infectious',     value: 22, color: '#8b5cf6' },
  { name: 'Other',          value: 17, color: '#94a3b8' },
]

const districtData = [
  { district: 'Mumbai', burden: 92 }, { district: 'Delhi', burden: 88 },
  { district: 'Kolkata', burden: 76 }, { district: 'Chennai', burden: 71 },
  { district: 'Bangalore', burden: 68 }, { district: 'Pune', burden: 62 },
]

export default function PopulationHealth() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Population Health Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Aggregated health data across registered facilities</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: 'Registered Population', value: '1.05M' },
          { label: 'Active Chronic Cases',  value: '284K' },
          { label: 'Avg BMI',               value: '24.8' },
          { label: 'Vaccination Coverage',  value: '78.4%' },
        ].map(s => (
          <div key={s.label} className="stat-card text-center">
            <div className="text-3xl font-bold text-[#1e3a5f]">{s.value}</div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="section-title">Age Distribution</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ageData}>
              <XAxis dataKey="group" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#1e3a5f" radius={[4,4,0,0]} name="Population" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="section-title">Disease Burden Distribution</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={diseaseData} cx="50%" cy="50%" outerRadius={80} dataKey="value" nameKey="name">
                {diseaseData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h2 className="section-title">Disease Burden by City (Index 0–100)</h2>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={districtData} layout="vertical" barCategoryGap="30%">
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
            <YAxis dataKey="district" type="category" tick={{ fontSize: 11 }} width={80} />
            <Tooltip />
            <Bar dataKey="burden" fill="#0d9488" radius={[0,4,4,0]} name="Burden Index" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
