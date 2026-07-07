const timeline = [
  { date: '2024-07-08', event: 'Cardiology Follow-up', doctor: 'Dr. Ananya Desai', type: 'Consultation', status: 'Completed' },
  { date: '2024-07-03', event: 'CBC + Lipid Panel',     doctor: 'Lab System',        type: 'Lab Test',     status: 'Results Ready' },
  { date: '2024-06-25', event: 'Echocardiogram',        doctor: 'Dr. Vikram Rao',    type: 'Procedure',    status: 'Completed' },
  { date: '2024-06-15', event: 'Amlodipine Prescribed', doctor: 'Dr. Ananya Desai',  type: 'Medication',   status: 'Active' },
  { date: '2024-05-10', event: 'Initial Consultation',  doctor: 'Dr. Vikram Rao',    type: 'Consultation', status: 'Completed' },
]

const typeColor = {
  Consultation: 'bg-blue-100 text-blue-700',
  'Lab Test':   'bg-yellow-100 text-yellow-700',
  Procedure:    'bg-purple-100 text-purple-700',
  Medication:   'bg-green-100 text-green-700',
}

export default function CarePathway() {
  return (
    <div className="card">
      <h2 className="section-title">Care Pathway Timeline</h2>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
        <div className="space-y-6 pl-10">
          {timeline.map((item, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-6 w-4 h-4 rounded-full bg-[#0d9488] border-2 border-white shadow" />
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="font-semibold text-gray-800 text-sm">{item.event}</div>
                  <span className={`badge shrink-0 ${typeColor[item.type] || 'bg-gray-100 text-gray-600'}`}>{item.type}</span>
                </div>
                <div className="text-xs text-gray-500">{item.doctor}</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-400">{item.date}</span>
                  <span className={`text-xs font-medium ${item.status === 'Active' ? 'text-green-600' : 'text-gray-500'}`}>{item.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
