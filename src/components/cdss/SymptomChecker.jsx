import { useState } from 'react'
import { Brain, Search, AlertCircle } from 'lucide-react'

const SYMPTOM_DB = {
  'fever':        ['Dengue', 'Malaria', 'COVID-19', 'Influenza', 'Typhoid'],
  'cough':        ['COVID-19', 'Influenza', 'Tuberculosis', 'Pneumonia', 'COPD'],
  'rash':         ['Dengue', 'Chickenpox', 'Measles', 'Drug Reaction'],
  'headache':     ['Migraine', 'Dengue', 'Hypertension', 'Meningitis'],
  'chest pain':   ['Angina', 'MI', 'GERD', 'Pulmonary Embolism', 'Costochondritis'],
  'breathlessness':['Asthma', 'COPD', 'Heart Failure', 'Pulmonary Embolism', 'Pneumonia'],
  'joint pain':   ['Dengue', 'Rheumatoid Arthritis', 'Gout', 'Chikungunya'],
  'vomiting':     ['Gastroenteritis', 'Typhoid', 'Cholera', 'Migraine'],
}

const ALL_SYMPTOMS = Object.keys(SYMPTOM_DB)

function getDifferential(selected) {
  if (!selected.length) return []
  const scores = {}
  selected.forEach(s => {
    ;(SYMPTOM_DB[s] || []).forEach(disease => {
      scores[disease] = (scores[disease] || 0) + 1
    })
  })
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([disease, score]) => ({ disease, score, pct: Math.round((score / selected.length) * 100) }))
}

export default function SymptomChecker() {
  const [selected, setSelected] = useState([])
  const [search, setSearch] = useState('')
  const [checked, setChecked] = useState(false)

  const toggle = (s) => setSelected(prev =>
    prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
  )

  const filtered = ALL_SYMPTOMS.filter(s => s.includes(search.toLowerCase()))
  const differential = checked ? getDifferential(selected) : []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Clinical Decision Support</h1>
        <p className="text-gray-500 text-sm mt-1">AI-assisted symptom checker and differential diagnosis</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Symptom Selection */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-[#0d9488]" />
            <h2 className="section-title mb-0">Select Symptoms</h2>
          </div>

          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input className="input-field pl-9" placeholder="Search symptoms…"
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {filtered.map(s => (
              <button key={s} onClick={() => toggle(s)}
                className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${selected.includes(s)
                  ? 'bg-[#0d9488] text-white border-[#0d9488]'
                  : 'border-gray-300 text-gray-600 hover:border-[#0d9488]'}`}>
                {s}
              </button>
            ))}
          </div>

          {selected.length > 0 && (
            <div className="bg-blue-50 rounded-lg p-3 text-sm mb-3">
              <strong className="text-blue-700">Selected:</strong>{' '}
              <span className="text-blue-600">{selected.join(', ')}</span>
            </div>
          )}

          <button onClick={() => setChecked(true)} disabled={!selected.length}
            className="btn-primary w-full py-2.5">
            Analyse Symptoms
          </button>
        </div>

        {/* Differential Diagnosis */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            <h2 className="section-title mb-0">Differential Diagnosis</h2>
          </div>

          {!checked ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-400 text-sm">
              <Brain className="w-10 h-10 mb-2 opacity-30" />
              Select symptoms and click Analyse
            </div>
          ) : differential.length === 0 ? (
            <p className="text-gray-400 text-sm">No matching conditions found.</p>
          ) : (
            <div className="space-y-3">
              {differential.slice(0, 6).map((d, i) => (
                <div key={d.disease}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={`font-medium ${i === 0 ? 'text-red-600' : i === 1 ? 'text-orange-600' : 'text-gray-700'}`}>
                      {i + 1}. {d.disease}
                    </span>
                    <span className="text-gray-500">{d.pct}% match</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${i === 0 ? 'bg-red-400' : i === 1 ? 'bg-orange-400' : 'bg-[#0d9488]'}`}
                      style={{ width: `${d.pct}%` }} />
                  </div>
                </div>
              ))}
              <p className="text-xs text-gray-400 mt-2">
                ⚠ AI-assisted suggestions only. Clinical judgment required.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
