import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts'

const TOTAL_BUDGET = 10
const USED_BUDGET = 3.84

export default function BudgetTracker() {
  const pct = Math.round((USED_BUDGET / TOTAL_BUDGET) * 100)
  const data = [{ name: 'Used', value: pct }]

  const color = pct > 80 ? '#ef4444' : pct > 60 ? '#f97316' : '#0d9488'

  return (
    <div className="card">
      <h2 className="section-title">Privacy Budget (ε-DP)</h2>
      <div className="flex items-center gap-6">
        <div className="w-40 h-40 relative shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%"
              startAngle={90} endAngle={-270} data={data}>
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar dataKey="value" cornerRadius={8} fill={color} background={{ fill: '#e5e7eb' }} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold" style={{ color }}>{pct}%</span>
            <span className="text-xs text-gray-400">used</span>
          </div>
        </div>
        <div className="flex-1 space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Total Budget (ε)</span>
              <span className="font-semibold">{TOTAL_BUDGET}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Used Budget (ε)</span>
              <span className="font-semibold text-orange-600">{USED_BUDGET}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Remaining (ε)</span>
              <span className="font-semibold text-green-600">{(TOTAL_BUDGET - USED_BUDGET).toFixed(2)}</span>
            </div>
          </div>
          <div className="text-xs text-gray-400 bg-gray-50 rounded p-2">
            Budget resets in <strong>22 days</strong>. Noise mechanism: Gaussian (δ = 10⁻⁵).
          </div>
        </div>
      </div>
    </div>
  )
}
