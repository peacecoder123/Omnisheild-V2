import { Lightbulb, CheckCircle, XCircle } from 'lucide-react'

const recs = [
  {
    patient: 'Amit Sharma (Hypertension)',
    recommendations: [
      { text: 'Add ARB/ACE inhibitor if BP > 140/90 persists', priority: 'High', evidence: 'JNC8 Guideline' },
      { text: 'Lifestyle modification: low-sodium diet recommended', priority: 'Medium', evidence: 'AHA 2023' },
      { text: 'Schedule annual renal function test (eGFR + urine ACR)', priority: 'Low', evidence: 'KDIGO' },
    ],
  },
  {
    patient: 'Priya Singh (Type 2 Diabetes)',
    recommendations: [
      { text: 'Start SGLT2 inhibitor for CV risk reduction', priority: 'High', evidence: 'ADA 2024' },
      { text: 'HbA1c target < 7% — consider insulin titration', priority: 'High', evidence: 'ADA 2024' },
      { text: 'Foot examination due (last: 6 months ago)', priority: 'Medium', evidence: 'NICE NG28' },
    ],
  },
]

const priorityColor = { High: 'bg-red-100 text-red-700', Medium: 'bg-yellow-100 text-yellow-700', Low: 'bg-blue-100 text-blue-700' }

export default function DiagnosticRecommendations() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Lightbulb className="w-6 h-6 text-[#0d9488]" />
        <h2 className="text-xl font-bold text-[#1e3a5f]">Diagnostic Recommendations</h2>
      </div>

      {recs.map(r => (
        <div key={r.patient} className="card">
          <h3 className="font-semibold text-gray-800 mb-3">{r.patient}</h3>
          <div className="space-y-2">
            {r.recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-[#0d9488] mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{rec.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Evidence: {rec.evidence}</p>
                </div>
                <span className={`badge shrink-0 ${priorityColor[rec.priority]}`}>{rec.priority}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
