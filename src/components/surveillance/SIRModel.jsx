import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { simulateSIR } from '../../utils/helpers.js'

const CHART_DOWNSAMPLE_INTERVAL = 3 // Show every Nth day for chart readability

export default function SIRModel() {
  const [R0, setR0] = useState(2.5)
  const [gamma, setGamma] = useState(0.1)
  const [N, setN] = useState(100000)
  const [days, setDays] = useState(180)

  const data = useMemo(() => {
    const raw = simulateSIR({ R0, gamma, N, I0: 100, days })
    return raw.filter((_, i) => i % CHART_DOWNSAMPLE_INTERVAL === 0).map(d => ({
      day: d.day,
      Susceptible: Math.round(d.S / 1000),
      Infected:    Math.round(d.I / 1000),
      Recovered:   Math.round(d.R / 1000),
    }))
  }, [R0, gamma, N, days])

  const peak = Math.max(...data.map(d => d.Infected))
  const beta = (R0 * gamma).toFixed(3)

  return (
    <div className="card">
      <h2 className="section-title">SIR Epidemic Model</h2>

      <div className="grid grid-cols-3 gap-3 mb-4 text-center text-xs">
        <div className="bg-blue-50 rounded-lg p-2">
          <div className="font-bold text-blue-700 text-lg">β = {beta}</div>
          <div className="text-blue-500">Transmission rate</div>
        </div>
        <div className="bg-red-50 rounded-lg p-2">
          <div className="font-bold text-red-700 text-lg">{peak.toLocaleString()}K</div>
          <div className="text-red-500">Peak infected (K)</div>
        </div>
        <div className="bg-green-50 rounded-lg p-2">
          <div className="font-bold text-green-700 text-lg">R₀ = {R0}</div>
          <div className="text-green-500">Reproductive number</div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -10 }}>
          <XAxis dataKey="day" tick={{ fontSize: 10 }} label={{ value: 'Days', position: 'insideBottom', offset: -2, fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} label={{ value: 'Pop (K)', angle: -90, position: 'insideLeft', fontSize: 10 }} />
          <Tooltip formatter={(v) => `${v}K`} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Line type="monotone" dataKey="Susceptible" stroke="#3b82f6" dot={false} strokeWidth={2} />
          <Line type="monotone" dataKey="Infected"    stroke="#ef4444" dot={false} strokeWidth={2} />
          <Line type="monotone" dataKey="Recovered"   stroke="#10b981" dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

      {/* Controls */}
      <div className="mt-4 space-y-3">
        <div>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>R₀ (Basic Reproduction Number)</span><span className="font-semibold text-[#1e3a5f]">{R0}</span>
          </div>
          <input type="range" min="0.5" max="6" step="0.1" value={R0}
            onChange={e => setR0(+e.target.value)} className="w-full accent-[#0d9488]" />
        </div>
        <div>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>γ (Recovery Rate)</span><span className="font-semibold text-[#1e3a5f]">{gamma}</span>
          </div>
          <input type="range" min="0.02" max="0.5" step="0.01" value={gamma}
            onChange={e => setGamma(+e.target.value)} className="w-full accent-[#0d9488]" />
        </div>
        <div>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Simulation Days</span><span className="font-semibold text-[#1e3a5f]">{days}</span>
          </div>
          <input type="range" min="60" max="365" step="10" value={days}
            onChange={e => setDays(+e.target.value)} className="w-full accent-[#0d9488]" />
        </div>
      </div>
    </div>
  )
}
