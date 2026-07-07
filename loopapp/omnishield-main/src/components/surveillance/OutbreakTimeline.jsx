import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const outbreaks = [
  { disease: 'COVID-19',   start: '2024-01', peak: 24500, current: 3200, color: '#ef4444' },
  { disease: 'Dengue',     start: '2024-03', peak: 8900,  current: 4200, color: '#f97316' },
  { disease: 'Influenza',  start: '2024-05', peak: 5600,  current: 1800, color: '#eab308' },
  { disease: 'Malaria',    start: '2024-04', peak: 3200,  current: 980,  color: '#8b5cf6' },
  { disease: 'Cholera',    start: '2024-06', peak: 420,   current: 85,   color: '#06b6d4' },
]

const history = [
  { year: 'Jan', dengue: 120, covid: 3400, malaria: 80 },
  { year: 'Feb', dengue: 200, covid: 4200, malaria: 100 },
  { year: 'Mar', dengue: 580, covid: 2800, malaria: 180 },
  { year: 'Apr', dengue: 2400,covid: 1900, malaria: 420 },
  { year: 'May', dengue: 4200,covid: 1200, malaria: 680 },
  { year: 'Jun', dengue: 6800,covid: 900,  malaria: 840 },
  { year: 'Jul', dengue: 8200,covid: 3200, malaria: 960 },
]

export default function OutbreakTimeline() {
  return (
    <div className="card">
      <h2 className="section-title">Outbreak Timeline — 2024</h2>

      <div className="grid md:grid-cols-5 gap-3 mb-6">
        {outbreaks.map(o => (
          <div key={o.disease} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: o.color }} />
              <span className="text-xs font-semibold text-gray-700">{o.disease}</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{o.current.toLocaleString()}</div>
            <div className="text-xs text-gray-400">current cases</div>
            <div className="text-xs text-gray-400 mt-1">Peak: {o.peak.toLocaleString()}</div>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={history} barCategoryGap="25%">
          <XAxis dataKey="year" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <Bar dataKey="dengue" fill="#f97316" name="Dengue" radius={[3,3,0,0]} />
          <Bar dataKey="covid"  fill="#ef4444" name="COVID-19" radius={[3,3,0,0]} />
          <Bar dataKey="malaria"fill="#8b5cf6" name="Malaria" radius={[3,3,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
