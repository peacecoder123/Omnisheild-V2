import SIRModel from './SIRModel.jsx'
import HotspotMap from './HotspotMap.jsx'
import OutbreakTimeline from './OutbreakTimeline.jsx'
import { AlertTriangle, TrendingUp, Users, Activity } from 'lucide-react'

export default function SurveillanceDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Disease Surveillance</h1>
        <p className="text-gray-500 text-sm mt-1">Real-time epidemic monitoring — India</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { Icon: Activity,       label: 'Active Outbreaks',   value: '3',     color: 'bg-red-50 text-red-600' },
          { Icon: Users,          label: 'Cases This Week',    value: '12,847',color: 'bg-orange-50 text-orange-600' },
          { Icon: TrendingUp,     label: 'Rt (Dengue)',        value: '1.34',  color: 'bg-yellow-50 text-yellow-600' },
          { Icon: AlertTriangle,  label: 'High-Risk Districts',value: '18',    color: 'bg-purple-50 text-purple-600' },
        ].map(({ Icon, label, value, color }) => (
          <div key={label} className="stat-card flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}><Icon className="w-5 h-5" /></div>
            <div><div className="text-2xl font-bold text-gray-800">{value}</div><div className="text-sm text-gray-500">{label}</div></div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <HotspotMap />
        <SIRModel />
      </div>

      <OutbreakTimeline />
    </div>
  )
}
