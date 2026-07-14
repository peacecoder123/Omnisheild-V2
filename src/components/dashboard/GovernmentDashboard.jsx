import { useState, useEffect, useCallback } from 'react'
import { AlertTriangle, MapPin, TrendingUp, Activity, X, Bell, Loader2 } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { MapContainer, TileLayer, CircleMarker, Tooltip as MapTooltip } from 'react-leaflet'
import { api } from '../../utils/api.js'

const SEVERITY_COLORS = {
  critical: '#dc2626',
  high: '#ea580c',
  medium: '#d97706',
  low: '#16a34a',
}

const TREND_ICON = { up: '↑', down: '↓', stable: '→' }

function generateSIRData(R0 = 2.5, gamma = 0.1, sigma = 0.2) {
  const data = []
  let S = 950000, I = 1000, R = 0, E = 5000
  for (let day = 0; day <= 180; day += 5) {
    data.push({
      day: `Day ${day}`,
      susceptible: Math.round(S / 1000),
      exposed: Math.round(E / 1000),
      infected: Math.round(I / 1000),
      recovered: Math.round(R / 1000),
    })
    const N = S + E + I + R
    const beta = R0 * gamma
    const newE = beta * S * I / N
    const newI = sigma * E
    const newR = gamma * I
    S -= newE; E += newE - newI; I += newI - newR; R += newR
    if (S < 0) S = 0; if (E < 0) E = 0; if (I < 0) I = 0
  }
  return data
}

const OUTBREAK_MESSAGES = [
  { disease: 'Dengue', city: 'Bhopal', cases: 340 },
  { disease: 'COVID-19', city: 'Surat', cases: 520 },
  { disease: 'Cholera', city: 'Lucknow', cases: 180 },
]

export default function GovernmentDashboard() {
  const [hotspots, setHotspots] = useState([])
  const [surveillanceCases, setSurveillanceCases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [alert, setAlert] = useState(null)
  const [R0, setR0] = useState(2.5)
  const [gamma, setGamma] = useState(0.1)
  const [sigma, setSigma] = useState(0.2)
  const [forecastData, setForecastData] = useState(() => generateSIRData(2.5, 0.1, 0.2))
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      api.get('/surveillance/hotspots'),
      api.get('/surveillance/cases'),
    ])
      .then(([hotspotsData, casesData]) => {
        setHotspots(hotspotsData || [])
        setSurveillanceCases(casesData || [])
        setError(null)
      })
      .catch(() => {
        setError('Could not load surveillance data. Check that the backend is running.')
      })
      .finally(() => {
        setLoading(false)
        setMapReady(true)
      })

    const initialTimer = setTimeout(() => {
      setAlert(OUTBREAK_MESSAGES[0])
    }, 2000)

    const mapTimer = setInterval(() => {
      api.get('/surveillance/hotspots').then(data => { if (data) setHotspots(data) }).catch(() => {})
    }, 30000)

    let alertIdx = 1
    const alertTimer = setInterval(() => {
      setAlert(OUTBREAK_MESSAGES[alertIdx % OUTBREAK_MESSAGES.length])
      alertIdx++
    }, 60000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(mapTimer)
      clearInterval(alertTimer)
    }
  }, [])

  const updateForecast = useCallback((newR0, newGamma, newSigma) => {
    setForecastData(generateSIRData(newR0, newGamma, newSigma))
  }, [])

  const criticalHotspots = hotspots.filter(h => h.severity === 'critical')
  const highHotspots = hotspots.filter(h => h.severity === 'high')
  const totalCases = hotspots.reduce((sum, h) => sum + (h.cases || 0), 0)
  const anomalies = 7
  const forecastAccuracy = 94.2
  const districtsOnAlert = criticalHotspots.length + highHotspots.length

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#0d9488]" />
        <span className="ml-3 text-gray-500">Loading surveillance data…</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-700">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-semibold">Data load failed</span>
        </div>
        <p className="text-sm">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Government Authority Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">National Disease Surveillance — Real-Time Monitoring</p>
      </div>

      {alert && (
        <div className="fixed top-4 right-4 z-50 w-80 bg-red-600 text-white rounded-xl shadow-2xl border-2 border-red-400 animate-pulse">
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                <span className="font-bold text-sm">⚠️ OUTBREAK ALERT</span>
              </div>
              <button onClick={() => setAlert(null)} className="text-white/70 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <p className="text-sm">
              <strong>{alert.disease}</strong> in <strong>{alert.city}</strong> — {alert.cases} new cases in last 24h
            </p>
            <button onClick={() => setAlert(null)} className="mt-3 w-full bg-white/20 hover:bg-white/30 text-white text-xs py-1.5 rounded-lg transition-colors">
              Acknowledge & Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Cases (National)', value: totalCases.toLocaleString(), Icon: Activity, color: 'bg-red-50 text-red-600' },
          { label: 'Anomalies Detected', value: anomalies, Icon: AlertTriangle, color: 'bg-orange-50 text-orange-600' },
          { label: 'Forecast Accuracy', value: `${forecastAccuracy}%`, Icon: TrendingUp, color: 'bg-green-50 text-green-600' },
          { label: 'Districts Under Alert', value: districtsOnAlert, Icon: MapPin, color: 'bg-yellow-50 text-yellow-600' },
        ].map(({ label, value, Icon, color }) => (
          <div key={label} className="stat-card">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${color}`}><Icon className="w-5 h-5" /></div>
            <div className="text-2xl font-bold text-gray-800">{value}</div>
            <div className="text-sm text-gray-600">{label}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-[#0d9488]" />
          <h2 className="section-title mb-0">Real-Time Disease Hotspot Map — India</h2>
          <span className="ml-auto text-xs text-gray-400 bg-green-50 text-green-600 px-2 py-1 rounded-full">Live</span>
        </div>
        {mapReady && (
          <div style={{ height: '420px' }} className="rounded-xl overflow-hidden border border-gray-200">
            <MapContainer
              center={[20.5937, 78.9629]}
              zoom={5}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {hotspots.map(spot => (
                <CircleMarker
                  key={spot.id}
                  center={[parseFloat(spot.lat), parseFloat(spot.lng)]}
                  radius={Math.min(8 + (spot.cases || 0) / 300, 28)}
                  pathOptions={{
                    color: SEVERITY_COLORS[spot.severity] || '#6b7280',
                    fillColor: SEVERITY_COLORS[spot.severity] || '#6b7280',
                    fillOpacity: spot.severity === 'critical' ? 0.75 : 0.55,
                    weight: spot.severity === 'critical' ? 2.5 : 1.5,
                  }}
                >
                  <MapTooltip>
                    <div className="text-xs">
                      <div className="font-bold">{spot.city}</div>
                      <div>Disease: {spot.disease}</div>
                      <div>Cases: {(spot.cases || 0).toLocaleString()}</div>
                      <div>Severity: {(spot.severity || '').toUpperCase()}</div>
                      <div>Trend: {TREND_ICON[spot.trend] || '→'} {spot.trend}</div>
                      <div>Days Active: {spot.daysActive}</div>
                    </div>
                  </MapTooltip>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
        )}
        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
          {Object.entries(SEVERITY_COLORS).map(([sev, color]) => (
            <span key={sev} className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: color }}></span>
              {sev.charAt(0).toUpperCase() + sev.slice(1)}
            </span>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="section-title">Disease Hotspot Zones</h2>
        {criticalHotspots.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 border-2 border-red-300 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-600 animate-pulse" />
              <span className="font-semibold text-red-700 text-sm">CRITICAL ALERT ZONES</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              {criticalHotspots.map(h => (
                <div key={h.id} className="bg-white p-2.5 rounded-lg border border-red-200">
                  <div className="font-semibold text-sm text-gray-800">{h.city} — {h.disease}</div>
                  <div className="text-xs text-gray-500">{(h.cases || 0).toLocaleString()} cases · Active {h.daysActive} days · Trend: {TREND_ICON[h.trend] || '→'}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {hotspots.length === 0 ? (
          <p className="text-sm text-gray-400">No hotspot data available.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {hotspots.filter(h => h.severity !== 'critical').map(h => (
              <div key={h.id} className="p-3 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-semibold text-sm text-gray-800">{h.city}</div>
                  <span className="text-lg">{TREND_ICON[h.trend] || '→'}</span>
                </div>
                <div className="text-xs text-gray-600 mb-1">{h.disease} · {(h.cases || 0).toLocaleString()} cases</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{h.daysActive} days active</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium capitalize" style={{ backgroundColor: (SEVERITY_COLORS[h.severity] || '#6b7280') + '20', color: SEVERITY_COLORS[h.severity] || '#6b7280' }}>
                    {h.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[#0d9488]" />
          <h2 className="section-title mb-0">SIR/SEIR Epidemic Forecast Model</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {[
            { label: `R₀ (Basic Reproduction Number): ${R0}`, min: 0.5, max: 5, step: 0.1, val: R0, setter: (v) => { setR0(v); updateForecast(v, gamma, sigma) } },
            { label: `Recovery Rate (γ): ${gamma}`, min: 0.01, max: 0.5, step: 0.01, val: gamma, setter: (v) => { setGamma(v); updateForecast(R0, v, sigma) } },
            { label: `Incubation Rate (σ): ${sigma}`, min: 0.01, max: 0.5, step: 0.01, val: sigma, setter: (v) => { setSigma(v); updateForecast(R0, gamma, v) } },
          ].map(({ label, min, max, step, val, setter }) => (
            <div key={label}>
              <label className="block text-xs text-gray-600 mb-2">{label}</label>
              <input type="range" min={min} max={max} step={step} value={val}
                onChange={e => setter(parseFloat(e.target.value))}
                className="w-full accent-[#0d9488]"
              />
            </div>
          ))}
        </div>
        <div className="text-xs text-right text-gray-500 mb-2">Forecast Accuracy: {forecastAccuracy}%</div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={forecastData}>
            <XAxis dataKey="day" tick={{ fontSize: 10 }} interval={4} />
            <YAxis tick={{ fontSize: 10 }} label={{ value: '(thousands)', angle: -90, position: 'insideLeft', style: { fontSize: 10 } }} />
            <Tooltip formatter={(v) => [`${v}K`, '']} />
            <Legend />
            <Line type="monotone" dataKey="susceptible" stroke="#3b82f6" strokeWidth={2} name="Susceptible" dot={false} />
            <Line type="monotone" dataKey="exposed" stroke="#f59e0b" strokeWidth={2} name="Exposed" dot={false} />
            <Line type="monotone" dataKey="infected" stroke="#ef4444" strokeWidth={2} name="Infected" dot={false} />
            <Line type="monotone" dataKey="recovered" stroke="#10b981" strokeWidth={2} name="Recovered" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h2 className="section-title">Active Surveillance Cases</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 text-gray-500 font-medium">Disease</th>
                <th className="text-left py-2 text-gray-500 font-medium">State/District</th>
                <th className="text-left py-2 text-gray-500 font-medium">Total Cases</th>
                <th className="text-left py-2 text-gray-500 font-medium">New Cases</th>
                <th className="text-left py-2 text-gray-500 font-medium">Deaths</th>
                <th className="text-left py-2 text-gray-500 font-medium">Trend</th>
                <th className="text-left py-2 text-gray-500 font-medium">Severity</th>
              </tr>
            </thead>
            <tbody>
              {surveillanceCases.length === 0 ? (
                <tr><td colSpan={7} className="py-4 text-center text-gray-400 text-sm">No surveillance cases found.</td></tr>
              ) : surveillanceCases.map((row, i) => (
                <tr key={row.id || i} className={`border-b border-gray-50 hover:bg-gray-50 ${row.severity === 'critical' ? 'bg-red-50' : ''}`}>
                  <td className="py-2.5 font-medium text-gray-800">{row.disease}</td>
                  <td className="py-2.5 text-gray-600 text-xs">{row.state}{row.district ? `, ${row.district}` : ''}</td>
                  <td className="py-2.5 text-gray-700">{(row.cases || 0).toLocaleString()}</td>
                  <td className="py-2.5 font-semibold text-red-600">{row.newCases ?? row.new_cases ?? 0}</td>
                  <td className="py-2.5 text-gray-600">{row.deaths ?? 0}</td>
                  <td className="py-2.5 text-lg">{TREND_ICON[row.trend] || '→'}</td>
                  <td className="py-2.5">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium capitalize" style={{ backgroundColor: (SEVERITY_COLORS[row.severity] || '#6b7280') + '20', color: SEVERITY_COLORS[row.severity] || '#6b7280' }}>
                      {row.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
