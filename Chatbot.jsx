import { CheckCircle, Zap } from 'lucide-react'

const plans = [
  {
    name: 'Basic',
    price: '₹49,999',
    period: '/month',
    tagline: 'For small clinics & nursing homes',
    color: 'border-gray-200',
    headerBg: 'bg-gray-50',
    btn: 'btn-outline',
    features: [
      'Up to 500 patients',
      'Basic Health Card',
      'ABHA Integration',
      'EMR Module',
      'Email Support',
      '99.5% SLA',
    ],
    missing: ['Disease Surveillance', 'Federated Learning', 'Analytics API', 'Custom Integrations'],
  },
  {
    name: 'Professional',
    price: '₹1,49,999',
    period: '/month',
    tagline: 'For mid-size hospitals',
    color: 'border-[#0d9488] ring-2 ring-[#0d9488]',
    headerBg: 'bg-[#0d9488]',
    btn: 'btn-accent',
    badge: 'Most Popular',
    features: [
      'Up to 5,000 patients',
      'Full Health Card + QR',
      'Disease Surveillance',
      'CDSS / AI Module',
      'FHIR R4 Integration',
      'Basic Analytics',
      'Federated Learning (5 nodes)',
      'Priority Support',
      '99.9% SLA',
    ],
    missing: ['Unlimited patients', 'Custom Analytics', 'Gov Dashboard'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    tagline: 'For hospital networks & government',
    color: 'border-[#1e3a5f]',
    headerBg: 'bg-[#1e3a5f]',
    btn: 'btn-primary',
    features: [
      'Unlimited patients',
      'All Professional features',
      'Government Surveillance Dashboard',
      'Custom Federated Learning',
      'Advanced Analytics API',
      'White-label option',
      'Custom Integrations',
      'Dedicated Account Manager',
      '99.99% SLA',
    ],
    missing: [],
  },
]

export default function PricingTable() {
  return (
    <div className="card">
      <h2 className="section-title text-center text-2xl mb-8">Choose your plan</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map(plan => (
          <div key={plan.name} className={`rounded-2xl border-2 overflow-hidden ${plan.color} relative`}>
            {plan.badge && (
              <div className="absolute top-4 right-4">
                <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3" /> {plan.badge}
                </span>
              </div>
            )}
            <div className={`p-6 ${plan.headerBg} ${plan.headerBg.startsWith('bg-[#') ? 'text-white' : ''}`}>
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className={`text-sm mt-1 ${plan.headerBg.startsWith('bg-[#') ? 'text-white/70' : 'text-gray-500'}`}>{plan.tagline}</p>
              <div className="mt-4">
                <span className="text-3xl font-extrabold">{plan.price}</span>
                <span className={`text-sm ${plan.headerBg.startsWith('bg-[#') ? 'text-white/70' : 'text-gray-400'}`}>{plan.period}</span>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-2 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <button className={`${plan.btn} w-full py-2.5`}>
                {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
