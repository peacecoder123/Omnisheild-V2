import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

const checklist = [
  {
    category: 'HIPAA',
    items: [
      { item: 'Access Controls (§164.312(a)(1))',      status: 'Pass' },
      { item: 'Audit Controls (§164.312(b))',           status: 'Pass' },
      { item: 'Integrity Controls (§164.312(c)(1))',   status: 'Pass' },
      { item: 'Transmission Security (§164.312(e)(1))',status: 'Pass' },
      { item: 'Risk Analysis Completed',               status: 'Warning' },
      { item: 'Business Associate Agreements',          status: 'Pass' },
    ],
  },
  {
    category: 'GDPR',
    items: [
      { item: 'Data Processing Records (Art. 30)',     status: 'Pass' },
      { item: 'Privacy Impact Assessments',            status: 'Pass' },
      { item: 'Data Subject Rights Mechanisms',        status: 'Pass' },
      { item: 'DPA Notification Procedures',           status: 'Warning' },
      { item: 'Consent Management',                    status: 'Pass' },
    ],
  },
  {
    category: 'NDHM / ABDM',
    items: [
      { item: 'ABHA Integration',                      status: 'Pass' },
      { item: 'Health Data Retention Policy',          status: 'Pass' },
      { item: 'ABDM Gateway Registration',             status: 'Pass' },
      { item: 'Digital Signature on Health Records',   status: 'Fail' },
    ],
  },
]

const statusIcon = {
  Pass:    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />,
  Warning: <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0" />,
  Fail:    <XCircle className="w-4 h-4 text-red-500 shrink-0" />,
}

export default function ComplianceChecklist() {
  const allItems = checklist.flatMap(c => c.items)
  const passed = allItems.filter(i => i.status === 'Pass').length
  const score = allItems.length > 0 ? Math.round((passed / allItems.length) * 100) : 0

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title mb-0">Compliance Checklist</h2>
        <div className={`text-lg font-bold px-3 py-1 rounded-full ${score >= 90 ? 'bg-green-100 text-green-700' : score >= 70 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
          {score}% Compliant
        </div>
      </div>

      <div className="space-y-6">
        {checklist.map(section => (
          <div key={section.category}>
            <h3 className="font-semibold text-[#1e3a5f] text-sm mb-2 uppercase tracking-wide">{section.category}</h3>
            <div className="space-y-1.5">
              {section.items.map(item => (
                <div key={item.item} className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
                  {statusIcon[item.status]}
                  <span className="text-sm text-gray-700 flex-1">{item.item}</span>
                  <span className={`text-xs font-medium ${item.status === 'Pass' ? 'text-green-600' : item.status === 'Warning' ? 'text-yellow-600' : 'text-red-600'}`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
