import { useState } from 'react'
import { Code, ChevronDown, ChevronRight } from 'lucide-react'

const FHIR_RESOURCES = {
  Patient: {
    resourceType: 'Patient',
    id: 'pat001',
    identifier: [{ system: 'https://abdm.gov.in/abha', value: 'ABHA-12345-67890' }],
    name: [{ use: 'official', family: 'Sharma', given: ['Amit'] }],
    gender: 'male',
    birthDate: '1982-04-15',
    address: [{ city: 'Mumbai', state: 'Maharashtra', country: 'IN' }],
  },
  Observation: {
    resourceType: 'Observation',
    id: 'obs001',
    status: 'final',
    code: { coding: [{ system: 'http://loinc.org', code: '8480-6', display: 'Systolic Blood Pressure' }] },
    valueQuantity: { value: 122, unit: 'mmHg', system: 'http://unitsofmeasure.org' },
    effectiveDateTime: '2024-07-08T10:32:00Z',
  },
  MedicationRequest: {
    resourceType: 'MedicationRequest',
    id: 'mr001',
    status: 'active',
    intent: 'order',
    medicationCodeableConcept: { coding: [{ system: 'http://snomed.info/sct', code: '372687004', display: 'Amlodipine 5mg' }] },
    subject: { reference: 'Patient/pat001' },
    authoredOn: '2024-06-15',
    dosageInstruction: [{ text: 'Once daily, morning' }],
  },
}

export default function FHIRBrowser() {
  const [selected, setSelected] = useState('Patient')
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">FHIR Resource Browser</h1>
        <p className="text-gray-500 text-sm mt-1">HL7 FHIR R4 — Live resource explorer</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Resource List */}
        <div className="card md:col-span-1">
          <h2 className="section-title">Resources</h2>
          <div className="space-y-1">
            {Object.keys(FHIR_RESOURCES).map(r => (
              <button key={r} onClick={() => setSelected(r)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selected === r ? 'bg-[#0d9488] text-white' : 'hover:bg-gray-100 text-gray-700'}`}>
                {r}
              </button>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 font-semibold mb-2">More Resources</p>
            {['DiagnosticReport', 'Immunization', 'Condition', 'Encounter', 'Procedure'].map(r => (
              <div key={r} className="px-3 py-1.5 text-sm text-gray-400 rounded">{r}</div>
            ))}
          </div>
        </div>

        {/* JSON Viewer */}
        <div className="card md:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-[#0d9488]" />
              <h2 className="section-title mb-0">{selected} — Sample Record</h2>
            </div>
            <button onClick={() => setExpanded(v => !v)} className="text-gray-400 hover:text-gray-600">
              {expanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>

          {expanded && (
            <pre className="bg-gray-900 text-green-300 rounded-xl p-4 text-xs overflow-auto max-h-96 leading-relaxed font-mono">
              {JSON.stringify(FHIR_RESOURCES[selected], null, 2)}
            </pre>
          )}

          <div className="mt-4 flex gap-2">
            <span className="badge bg-blue-100 text-blue-700">GET /fhir/r4/{selected.toLowerCase()}</span>
            <span className="badge bg-green-100 text-green-700">FHIR R4 Compliant</span>
          </div>
        </div>
      </div>

      {/* Endpoints */}
      <div className="card">
        <h2 className="section-title">API Endpoints</h2>
        <div className="space-y-2">
          {[
            { method: 'GET',    path: '/fhir/r4/Patient/{id}',           desc: 'Read patient demographics' },
            { method: 'GET',    path: '/fhir/r4/Observation?patient={id}',desc: 'List observations for patient' },
            { method: 'POST',   path: '/fhir/r4/MedicationRequest',       desc: 'Create new medication order' },
            { method: 'GET',    path: '/fhir/r4/$everything',             desc: 'Patient everything operation' },
            { method: 'POST',   path: '/fhir/r4/Bundle',                  desc: 'Submit transaction bundle' },
          ].map(ep => (
            <div key={ep.path} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg text-sm">
              <span className={`badge shrink-0 ${ep.method === 'GET' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{ep.method}</span>
              <code className="text-gray-700 font-mono text-xs">{ep.path}</code>
              <span className="text-gray-400 text-xs ml-auto">{ep.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
