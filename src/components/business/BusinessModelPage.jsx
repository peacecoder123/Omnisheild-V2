import PricingTable from './PricingTable.jsx'
import ROICalculator from './ROICalculator.jsx'
import { TrendingUp, Target, Globe, DollarSign } from 'lucide-react'

export default function BusinessModelPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Business Model</h1>
        <p className="text-gray-500 text-sm mt-1">Revenue streams, market opportunity, and ROI</p>
      </div>

      {/* Market Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { Icon: Globe,       label: 'TAM (India Health IT)',    value: '$8.5B',   color: 'bg-blue-50 text-blue-600' },
          { Icon: Target,      label: 'SAM (Hospital SaaS)',      value: '$1.8B',   color: 'bg-teal-50 text-teal-600' },
          { Icon: TrendingUp,  label: 'CAGR (2024–2030)',         value: '24.6%',   color: 'bg-green-50 text-green-600' },
          { Icon: DollarSign,  label: 'Avg Revenue/Hospital',     value: '₹18L/yr', color: 'bg-purple-50 text-purple-600' },
        ].map(({ Icon, label, value, color }) => (
          <div key={label} className="stat-card text-center">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${color}`}><Icon className="w-5 h-5" /></div>
            <div className="text-2xl font-bold text-gray-800">{value}</div>
            <div className="text-sm text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Revenue Streams */}
      <div className="card">
        <h2 className="section-title">Revenue Streams</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { stream: 'SaaS Subscriptions',    pct: 55, desc: 'Monthly/annual per-hospital pricing tiers', color: 'bg-blue-500' },
            { stream: 'Government Contracts',  pct: 25, desc: 'State/national surveillance platform licenses', color: 'bg-teal-500' },
            { stream: 'Data Analytics APIs',   pct: 12, desc: 'Per-query pricing for researchers & insurers', color: 'bg-purple-500' },
            { stream: 'Federated ML Services', pct: 5,  desc: 'Model training fees from pharma companies', color: 'bg-orange-500' },
            { stream: 'Implementation Services',pct: 3, desc: 'Onboarding, training, custom integrations', color: 'bg-gray-400' },
          ].map(s => (
            <div key={s.stream} className="bg-gray-50 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-sm text-gray-800">{s.stream}</span>
                <span className="text-lg font-bold text-[#1e3a5f]">{s.pct}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full mb-2">
                <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
              </div>
              <p className="text-xs text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <PricingTable />
      <ROICalculator />
    </div>
  )
}
