import { useState } from 'react'
import { Pill, AlertTriangle, Search } from 'lucide-react'

const INTERACTIONS = [
  { d1: 'Warfarin',    d2: 'Aspirin',       severity: 'High',   effect: 'Increased bleeding risk — avoid combination if possible.' },
  { d1: 'Warfarin',    d2: 'Ibuprofen',     severity: 'High',   effect: 'NSAIDs potentiate anticoagulation. Use paracetamol instead.' },
  { d1: 'Lisinopril',  d2: 'Spironolactone',severity: 'Medium', effect: 'Risk of hyperkalemia. Monitor potassium levels.' },
  { d1: 'Metformin',   d2: 'Contrast Dye',  severity: 'High',   effect: 'Hold metformin 48h before and after iodinated contrast.' },
  { d1: 'Clarithromycin',d2:'Simvastatin',  severity: 'High',   effect: 'Severe myopathy/rhabdomyolysis risk. Use alternative statin.' },
  { d1: 'Ciprofloxacin',d2:'Antacids',      severity: 'Medium', effect: 'Antacids reduce ciprofloxacin absorption. Space by 2h.' },
]

const DRUG_LIST = ['Warfarin', 'Aspirin', 'Ibuprofen', 'Lisinopril', 'Spironolactone', 'Metformin',
  'Contrast Dye', 'Clarithromycin', 'Simvastatin', 'Ciprofloxacin', 'Antacids', 'Amlodipine', 'Paracetamol']

export default function DrugInteractions() {
  const [drug1, setDrug1] = useState('')
  const [drug2, setDrug2] = useState('')
  const [result, setResult] = useState(null)
  const [checked, setChecked] = useState(false)

  const check = (e) => {
    e.preventDefault()
    const found = INTERACTIONS.find(
      i => (i.d1.toLowerCase() === drug1.toLowerCase() && i.d2.toLowerCase() === drug2.toLowerCase()) ||
           (i.d1.toLowerCase() === drug2.toLowerCase() && i.d2.toLowerCase() === drug1.toLowerCase())
    )
    setResult(found || null)
    setChecked(true)
  }

  return (
    <div className="card max-w-2xl">
      <div className="flex items-center gap-2 mb-4">
        <Pill className="w-5 h-5 text-[#0d9488]" />
        <h2 className="section-title mb-0">Drug Interaction Checker</h2>
      </div>

      <form onSubmit={check} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Drug 1</label>
            <input list="drug-list" className="input-field" value={drug1} onChange={e => setDrug1(e.target.value)} placeholder="e.g. Warfarin" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Drug 2</label>
            <input list="drug-list" className="input-field" value={drug2} onChange={e => setDrug2(e.target.value)} placeholder="e.g. Aspirin" required />
          </div>
        </div>
        <datalist id="drug-list">{DRUG_LIST.map(d => <option key={d} value={d} />)}</datalist>
        <button type="submit" className="btn-primary flex items-center gap-2"><Search className="w-4 h-4" />Check Interaction</button>
      </form>

      {checked && (
        <div className={`mt-4 p-4 rounded-xl border ${result ? (result.severity === 'High' ? 'bg-red-50 border-red-300' : 'bg-yellow-50 border-yellow-300') : 'bg-green-50 border-green-300'}`}>
          {result ? (
            <>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className={`w-5 h-5 ${result.severity === 'High' ? 'text-red-500' : 'text-yellow-500'}`} />
                <span className={`font-bold ${result.severity === 'High' ? 'text-red-700' : 'text-yellow-700'}`}>
                  {result.severity} Interaction: {result.d1} + {result.d2}
                </span>
              </div>
              <p className={`text-sm ${result.severity === 'High' ? 'text-red-600' : 'text-yellow-600'}`}>{result.effect}</p>
            </>
          ) : (
            <p className="text-green-700 font-medium">✓ No known interaction found between {drug1} and {drug2}.</p>
          )}
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Common High-Risk Interactions</h3>
        <div className="space-y-2">
          {INTERACTIONS.filter(i => i.severity === 'High').slice(0, 3).map(i => (
            <div key={i.d1+i.d2} className="flex items-start gap-2 p-2.5 bg-red-50 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="text-xs text-red-700"><strong>{i.d1} + {i.d2}:</strong> {i.effect}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
