import { Link } from 'react-router-dom'
import {
  Shield, Activity, Brain, Lock, Globe, Users,
  CreditCard, BarChart2, Zap, CheckCircle, ArrowRight,
} from 'lucide-react'

const FEATURES = [
  { Icon: CreditCard,  title: 'Smart Health Card',       desc: 'Decentralized ABHA-linked digital health records with quantum-safe encryption and offline-first access.' },
  { Icon: Activity,    title: 'Disease Surveillance',    desc: 'Real-time epidemic monitoring with SIR/SEIR modelling, hotspot detection and outbreak alerts.' },
  { Icon: Brain,       title: 'AI-Powered CDSS',         desc: 'Clinical Decision Support with symptom checking, drug interaction alerts and diagnostic recommendations.' },
  { Icon: Lock,        title: 'Privacy-Preserving',      desc: 'Differential privacy budgets, federated learning across hospital nodes — data never leaves the facility.' },
  { Icon: Globe,       title: 'FHIR Interoperability',   desc: 'Full HL7 FHIR R4 compliance, seamless integration with EMRs, labs, insurance and government systems.' },
  { Icon: Zap,         title: 'Real-Time Streaming',     desc: 'Apache Kafka-powered event streaming for live patient data, HL7 v2 alerts and predictive signals.' },
  { Icon: BarChart2,   title: 'Population Analytics',    desc: 'Vaccination impact analysis, disease forecasting and population health trend dashboards.' },
  { Icon: Users,       title: 'Multi-Role Platform',     desc: 'Purpose-built experiences for Doctors, Nurses, Lab Techs, Pharmacists, Admins, Government and Patients.' },
]

const STATS = [
  { value: '50M+',   label: 'Health Records' },
  { value: '2,400+', label: 'Hospitals Onboarded' },
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '< 50ms', label: 'Query Latency' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="bg-[#1e3a5f] sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 rounded-lg p-1.5">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white text-lg">OmniShield</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#stats" className="hover:text-white transition-colors">Impact</a>
            <Link to="/business-model" className="hover:text-white transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm text-white hover:text-teal-300 transition-colors">Sign In</Link>
            <Link to="/register" className="btn-accent text-sm py-2 px-4">Get Started</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1e3a5f] via-[#1e3a5f] to-[#0d9488] text-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm mb-6">
            <Zap className="w-4 h-4 text-teal-300" />
            <span className="text-teal-200">Now with Federated Learning & Differential Privacy</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            India's Most Advanced<br />
            <span className="text-[#14b8a6]">Health Surveillance</span> Platform
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-10">
            OmniShield unifies decentralized health cards, real-time disease surveillance,
            AI-powered clinical decisions, and privacy-preserving analytics in one platform
            trusted by hospitals, governments and patients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-accent text-base py-3 px-8 flex items-center gap-2 justify-center">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/login" className="border border-white/40 text-white py-3 px-8 rounded-lg font-semibold hover:bg-white/10 transition-colors text-base">
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="bg-[#f0fdfa] py-14">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-extrabold text-[#0d9488]">{s.value}</div>
              <div className="text-gray-500 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[#1e3a5f] mb-3">Everything you need, in one platform</h2>
            <p className="text-gray-500 text-lg">Designed for the full healthcare ecosystem — from bedside to boardroom.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ Icon, title, desc }) => (
              <div key={title} className="card hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-[#e6f7f6] rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#0d9488]" />
                </div>
                <h3 className="font-bold text-[#1e3a5f] mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="bg-[#1e3a5f] text-white py-14 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Enterprise-grade compliance & security</h2>
          <p className="text-blue-200 mb-8">Built to meet the highest global standards.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['HIPAA', 'GDPR', 'NDHM / ABDM', 'HL7 FHIR R4', 'ISO 27001', 'SOC 2 Type II'].map(c => (
              <div key={c} className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2 text-sm">
                <CheckCircle className="w-4 h-4 text-teal-400" />
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-white">
        <h2 className="text-4xl font-bold text-[#1e3a5f] mb-4">Ready to transform healthcare?</h2>
        <p className="text-gray-500 text-lg mb-8">Join 2,400+ hospitals already using OmniShield.</p>
        <div className="flex gap-4 justify-center">
          <Link to="/register" className="btn-primary text-base py-3 px-8">Get Started Free</Link>
          <Link to="/business-model" className="btn-outline text-base py-3 px-8">View Pricing</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#152a45] text-gray-400 py-8 px-6 text-center text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield className="w-4 h-4 text-[#0d9488]" />
          <span className="text-white font-semibold">OmniShield</span>
        </div>
        © {new Date().getFullYear()} OmniShield Health Technologies Pvt. Ltd. All rights reserved.
      </footer>
    </div>
  )
}
