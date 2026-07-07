const districts = [
  { name: 'Mumbai',     cases: 2840, risk: 'high' },
  { name: 'Delhi',      cases: 3120, risk: 'high' },
  { name: 'Bangalore',  cases: 1650, risk: 'medium' },
  { name: 'Chennai',    cases: 980,  risk: 'medium' },
  { name: 'Kolkata',    cases: 2100, risk: 'high' },
  { name: 'Hyderabad',  cases: 760,  risk: 'medium' },
  { name: 'Pune',       cases: 1240, risk: 'medium' },
  { name: 'Ahmedabad',  cases: 890,  risk: 'medium' },
  { name: 'Jaipur',     cases: 420,  risk: 'low' },
  { name: 'Lucknow',    cases: 580,  risk: 'low' },
  { name: 'Surat',      cases: 340,  risk: 'low' },
  { name: 'Nagpur',     cases: 610,  risk: 'medium' },
]

const riskStyle = {
  high:   'bg-red-100 border-red-400 text-red-800',
  medium: 'bg-yellow-100 border-yellow-400 text-yellow-800',
  low:    'bg-green-100 border-green-400 text-green-800',
}

const dotColor = {
  high:   'bg-red-500',
  medium: 'bg-yellow-500',
  low:    'bg-green-500',
}

export default function HotspotMap() {
  return (
    <div className="card">
      <h2 className="section-title">Disease Hotspot Map — India</h2>

      {/* Legend */}
      <div className="flex gap-4 mb-4">
        {['high', 'medium', 'low'].map(r => (
          <div key={r} className="flex items-center gap-1.5 text-xs capitalize text-gray-600">
            <div className={`w-3 h-3 rounded-full ${dotColor[r]}`} />
            {r} risk
          </div>
        ))}
      </div>

      {/* Grid map */}
      <div className="grid grid-cols-3 gap-2">
        {districts.map(d => (
          <div key={d.name}
            className={`border rounded-lg p-2.5 ${riskStyle[d.risk]} flex items-center justify-between`}>
            <div>
              <div className="font-semibold text-xs">{d.name}</div>
              <div className="text-xs opacity-80 mt-0.5">{d.cases.toLocaleString()} cases</div>
            </div>
            <div className={`w-3 h-3 rounded-full ${dotColor[d.risk]} shrink-0`} />
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-3">* Data updated every 4 hours from IDSP feed. Dengue, COVID-19, Malaria combined.</p>
    </div>
  )
}
