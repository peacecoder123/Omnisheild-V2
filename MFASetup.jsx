import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const vacData = [
  { month: 'Jan', vaccinated: 12000, unvaccinated: 88000, cases_vacc: 120, cases_unvacc: 1840 },
  { month: 'Feb', vaccinated: 28000, unvaccinated: 72000, cases_vacc: 200, cases_unvacc: 2100 },
  { month: 'Mar', vaccinated: 48000, unvaccinated: 52000, cases_vacc: 280, cases_unvacc: 1960 },
  { month: 'Apr', vaccinated: 65000, unvaccinated: 35000, cases_vacc: 310, cases_unvacc: 1500 },
  { month: 'May', vaccinated: 78000, unvaccinated: 22000, cases_vacc: 290, cases_unvacc: 980 },
  { month: 'Jun', vaccinated: 88000, unvaccinated: 12000, cases_vacc: 240, cases_unvacc: 540 },
]

export default function VaccinationImpact() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Vaccination Impact Analysis</h1>
        <p className="text-gray-500 text-sm mt-1">COVID-19 vaccination rollout — population of 100,000</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: 'Vaccination Coverage', value: '88%', color: 'text-green-600' },
          { label: 'Vaccine Effectiveness',value: '84%', color: 'text-teal-600' },
          { label: 'Cases Averted (est.)', value: '12,400', color: 'text-blue-600' },
        ].map(s => (
          <div key={s.label} className="stat-card text-center">
            <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="section-title">Vaccination Coverage Over Time</h2>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={vacData}>
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Area type="monotone" dataKey="vaccinated" stackId="1" stroke="#0d9488" fill="#ccfbf1" name="Vaccinated" />
            <Area type="monotone" dataKey="unvaccinated" stackId="1" stroke="#94a3b8" fill="#f1f5f9" name="Unvaccinated" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h2 className="section-title">Cases: Vaccinated vs Unvaccinated</h2>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={vacData}>
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Area type="monotone" dataKey="cases_unvacc" stroke="#ef4444" fill="#fee2e2" name="Cases (Unvaccinated)" />
            <Area type="monotone" dataKey="cases_vacc"   stroke="#0d9488" fill="#ccfbf1" name="Cases (Vaccinated)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
