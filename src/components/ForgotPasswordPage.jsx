import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts'

const forecastData = [
  { week: 'W1',  dengue: 420,  covid: 1200, influenza: 380, forecast: false },
  { week: 'W2',  dengue: 580,  covid: 1100, influenza: 420, forecast: false },
  { week: 'W3',  dengue: 820,  covid: 980,  influenza: 390, forecast: false },
  { week: 'W4',  dengue: 1240, covid: 940,  influenza: 410, forecast: false },
  { week: 'W5',  dengue: 1680, covid: 890,  influenza: 450, forecast: false },
  { week: 'W6',  dengue: 2100, covid: 920,  influenza: 480, forecast: false },
  { week: 'W7 ▶',dengue: 2600, covid: 1050, influenza: 510, forecast: true },
  { week: 'W8',  dengue: 3200, covid: 1180, influenza: 540, forecast: true },
  { week: 'W9',  dengue: 3800, covid: 1250, influenza: 570, forecast: true },
]

export default function DiseaseForecasting() {
  return (
    <div className="card">
      <h2 className="section-title">Disease Case Forecasting (ARIMA + ML)</h2>
      <p className="text-xs text-gray-400 mb-4">Weeks marked ▶ onwards are model predictions. Dashed line = forecast boundary.</p>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={forecastData}>
          <XAxis dataKey="week" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <ReferenceLine x="W7 ▶" stroke="#94a3b8" strokeDasharray="4 4" label={{ value: 'Forecast', fontSize: 10 }} />
          <Line type="monotone" dataKey="dengue"    stroke="#f97316" strokeWidth={2} dot={{ r: 3 }} name="Dengue" />
          <Line type="monotone" dataKey="covid"     stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} name="COVID-19" strokeDasharray="0" />
          <Line type="monotone" dataKey="influenza" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} name="Influenza" />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
        <div className="bg-orange-50 rounded-lg p-2">
          <div className="font-bold text-orange-600 text-base">↑ 52%</div>
          <div className="text-gray-500">Dengue forecast W9</div>
        </div>
        <div className="bg-red-50 rounded-lg p-2">
          <div className="font-bold text-red-600 text-base">↑ 19%</div>
          <div className="text-gray-500">COVID-19 forecast W9</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-2">
          <div className="font-bold text-blue-600 text-base">↑ 9%</div>
          <div className="text-gray-500">Influenza forecast W9</div>
        </div>
      </div>
    </div>
  )
}
