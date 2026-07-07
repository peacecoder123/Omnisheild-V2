import { useState } from 'react'
import { Calculator, TrendingUp } from 'lucide-react'

export default function ROICalculator() {
  const [beds, setBeds] = useState(200)
  const [plan, setPlan] = useState('professional')
  const [adm, setAdm] = useState(80)   // admission utilization %

  const annualRevLoss = beds * adm * 365 * 0.01 * 2500  // rough: 1% inefficiency * ₹2500/day
  const annualCost = plan === 'basic' ? 49999 * 12 : plan === 'professional' ? 149999 * 12 : 350000 * 12
  const saving = Math.round(annualRevLoss * 0.18)        // 18% efficiency gain
  const roi = Math.round(((saving - annualCost) / annualCost) * 100)
  const payback = (annualCost / (saving / 12)).toFixed(1)

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-5 h-5 text-[#0d9488]" />
        <h2 className="section-title mb-0">ROI Calculator</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-5">
          <div>
            <div className="flex justify-between text-sm mb-1 text-gray-600">
              <span>Hospital Beds</span><span className="font-semibold text-[#1e3a5f]">{beds}</span>
            </div>
            <input type="range" min="50" max="2000" step="50" value={beds}
              onChange={e => setBeds(+e.target.value)} className="w-full accent-[#0d9488]" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1 text-gray-600">
              <span>Bed Occupancy Rate</span><span className="font-semibold text-[#1e3a5f]">{adm}%</span>
            </div>
            <input type="range" min="40" max="100" step="5" value={adm}
              onChange={e => setAdm(+e.target.value)} className="w-full accent-[#0d9488]" />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Subscription Plan</label>
            <select className="input-field" value={plan} onChange={e => setPlan(e.target.value)}>
              <option value="basic">Basic — ₹49,999/mo</option>
              <option value="professional">Professional — ₹1,49,999/mo</option>
              <option value="enterprise">Enterprise — ₹3,50,000/mo</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#0d9488] rounded-xl p-6 text-white space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="font-bold">Estimated Returns</span>
          </div>
          {[
            { label: 'Annual OmniShield Cost',  value: `₹${(annualCost / 100000).toFixed(1)}L`, highlight: false },
            { label: 'Efficiency Savings/yr',   value: `₹${(saving / 100000).toFixed(1)}L`,    highlight: true },
            { label: 'Net Annual Benefit',       value: `₹${((saving - annualCost) / 100000).toFixed(1)}L`, highlight: roi > 0 },
            { label: 'ROI',                      value: `${roi}%`,                              highlight: roi > 0 },
            { label: 'Payback Period',           value: `${payback} months`,                   highlight: false },
          ].map(r => (
            <div key={r.label} className={`flex justify-between items-center py-1 border-b border-white/20 ${r.highlight ? 'text-yellow-300' : ''}`}>
              <span className="text-sm text-white/80">{r.label}</span>
              <span className="font-bold">{r.value}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-4">* Estimates based on 18% operational efficiency improvement. Actual results vary.</p>
    </div>
  )
}
