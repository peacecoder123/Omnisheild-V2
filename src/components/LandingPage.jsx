import { useState, useEffect } from 'react'
import { FileText, AlertTriangle, Package, Receipt, CheckCircle, XCircle, TrendingUp } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { api } from '../../utils/api.js'

const MOCK_PRESCRIPTIONS = [
  { id: 'RX001', patientName: 'Amit Sharma', drug: 'Amlodipine 5mg', dosage: '1 tab daily', qty: 30, doctor: 'Dr. Ananya Desai', status: 'Pending', date: '2024-07-10' },
  { id: 'RX002', patientName: 'Priya Singh', drug: 'Metformin 500mg', dosage: '1 tab twice daily', qty: 60, doctor: 'Dr. Ananya Desai', status: 'Dispensed', date: '2024-07-09' },
  { id: 'RX003', patientName: 'Rajan Mehta', drug: 'Salbutamol Inhaler', dosage: '2 puffs 4x daily', qty: 2, doctor: 'Dr. Vikram Rao', status: 'Pending', date: '2024-07-10' },
  { id: 'RX004', patientName: 'Suresh Kumar', drug: 'Atorvastatin 20mg', dosage: '1 tab at night', qty: 30, doctor: 'Dr. Ananya Desai', status: 'Pending', date: '2024-07-10' },
]

const MOCK_INVENTORY = [
  { id: 'INV001', drug: 'Amlodipine 5mg', stock: 450, threshold: 100, expiry: '2025-06-30', unit: 'tabs', cost: 2.5 },
  { id: 'INV002', drug: 'Metformin 500mg', stock: 80, threshold: 150, expiry: '2025-03-15', unit: 'tabs', cost: 1.8 },
  { id: 'INV003', drug: 'Salbutamol Inhaler', stock: 25, threshold: 30, expiry: '2024-12-31', unit: 'units', cost: 120 },
  { id: 'INV004', drug: 'Atorvastatin 20mg', stock: 300, threshold: 100, expiry: '2025-09-30', unit: 'tabs', cost: 3.2 },
  { id: 'INV005', drug: 'Aspirin 75mg', stock: 12, threshold: 200, expiry: '2025-01-15', unit: 'tabs', cost: 0.8 },
  { id: 'INV006', drug: 'Paracetamol 500mg', stock: 1200, threshold: 200, expiry: '2026-02-28', unit: 'tabs', cost: 0.5 },
  { id: 'INV007', drug: 'Omeprazole 20mg', stock: 180, threshold: 100, expiry: '2025-07-31', unit: 'caps', cost: 2.0 },
  { id: 'INV008', drug: 'Amoxicillin 500mg', stock: 60, threshold: 100, expiry: '2024-11-30', unit: 'caps', cost: 5.0 },
]

const DRUG_INTERACTIONS = [
  { drug1: 'Warfarin', drug2: 'Aspirin', severity: 'High', effect: 'Increased bleeding risk', significance: 'Avoid combination' },
  { drug1: 'Metformin', drug2: 'Alcohol', severity: 'High', effect: 'Lactic acidosis risk', significance: 'Contraindicated' },
  { drug1: 'Amlodipine', drug2: 'Grapefruit', severity: 'Medium', effect: 'Increased drug levels', significance: 'Avoid grapefruit juice' },
  { drug1: 'Atorvastatin', drug2: 'Erythromycin', severity: 'Medium', effect: 'Myopathy risk', significance: 'Monitor closely' },
]

const BILL_HISTORY = [
  { time: '08:30', patient: 'Priya Singh', drugs: 'Metformin 500mg x60', total: '₹108', status: 'Paid' },
  { time: '09:15', patient: 'Rajan Mehta', drugs: 'Theophylline x30', total: '₹245', status: 'Paid' },
  { time: '10:00', patient: 'Anita Verma', drugs: 'Sumatriptan x6', total: '₹360', status: 'Pending' },
]

export default function PharmacistDashboard() {
  const { user } = useAuth()
  const [prescriptions, setPrescriptions] = useState(MOCK_PRESCRIPTIONS)
  const [inventory, setInventory] = useState(MOCK_INVENTORY)
  const [bills, setBills] = useState(BILL_HISTORY)
  const [stockAlert, setStockAlert] = useState(null)
  const [dispenseToast, setDispenseToast] = useState(null)

  useEffect(() => {
    api.get('/prescriptions?status=Pending').then(data => { if (data?.length) setPrescriptions(data) }).catch(() => {})
    api.get('/inventory').then(data => { if (data?.length) setInventory(data) }).catch(() => {})
    // Check low stock immediately
    const lowStock = MOCK_INVENTORY.filter(i => i.stock < i.threshold)
    if (lowStock.length > 0) {
      setStockAlert(`Low stock alert: ${lowStock.map(i => i.drug).join(', ')}`)
    }
  }, [])

  const dispense = async (id) => {
    try { await api.get(`/prescriptions/${id}/dispense`) } catch {}
    const rx = prescriptions.find(p => p.id === id)
    setPrescriptions(prev => prev.map(p => p.id === id ? { ...p, status: 'Dispensed' } : p))
    if (rx) {
      const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      setBills(b => [{ time: now, patient: rx.patientName, drugs: `${rx.drug} x${rx.qty}`, total: `₹${(rx.qty * 3).toFixed(0)}`, status: 'Paid' }, ...b])
    }
    setDispenseToast('Prescription dispensed successfully!')
    setTimeout(() => setDispenseToast(null), 2500)
  }

  const requestRestock = async (drugId, drugName) => {
    try { await api.post('/inventory/alert', { drugId }) } catch {}
    alert(`Restock request sent for: ${drugName}`)
  }

  const pending = prescriptions.filter(p => p.status === 'Pending')
  const dispensed = prescriptions.filter(p => p.status === 'Dispensed')
  const lowStock = inventory.filter(i => i.stock < i.threshold)
  const highInteractions = DRUG_INTERACTIONS.filter(d => d.severity === 'High')

  const totalRevenue = bills.filter(b => b.status === 'Paid').reduce((sum, b) => sum + parseInt(b.total.replace('₹', '') || 0), 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Pharmacist Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">{user?.name || 'Kavita Patel'} · City General Hospital Pharmacy</p>
      </div>

      {stockAlert && (
        <div className="p-3 bg-red-50 border border-red-300 rounded-xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-sm text-red-800 font-medium">{stockAlert}</span>
          </div>
          <button onClick={() => setStockAlert(null)} className="text-red-400 hover:text-red-600"><XCircle className="w-4 h-4" /></button>
        </div>
      )}

      {dispenseToast && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 text-sm">
          <CheckCircle className="w-4 h-4" />
          {dispenseToast}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Pending Prescriptions', value: pending.length, Icon: FileText, color: 'bg-yellow-50 text-yellow-600' },
          { label: 'Drug Interaction Alerts', value: highInteractions.length, Icon: AlertTriangle, color: 'bg-orange-50 text-orange-600' },
          { label: 'Low Stock Items', value: lowStock.length, Icon: Package, color: 'bg-red-50 text-red-600' },
          { label: 'Dispensed Today', value: dispensed.length, Icon: CheckCircle, color: 'bg-green-50 text-green-600' },
        ].map(({ label, value, Icon, color }) => (
          <div key={label} className="stat-card">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${color}`}><Icon className="w-5 h-5" /></div>
            <div className="text-2xl font-bold text-gray-800">{value}</div>
            <div className="text-sm text-gray-600">{label}</div>
          </div>
        ))}
      </div>

      {/* Pending Prescriptions */}
      <div className="card">
        <h2 className="section-title">Pending Prescription Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 text-gray-500 font-medium">Rx ID</th>
                <th className="text-left py-2 text-gray-500 font-medium">Patient</th>
                <th className="text-left py-2 text-gray-500 font-medium">Drug</th>
                <th className="text-left py-2 text-gray-500 font-medium">Dosage</th>
                <th className="text-left py-2 text-gray-500 font-medium">Qty</th>
                <th className="text-left py-2 text-gray-500 font-medium">Doctor</th>
                <th className="text-left py-2 text-gray-500 font-medium">Status</th>
                <th className="text-left py-2 text-gray-500 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map(rx => (
                <tr key={rx.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2.5 font-medium text-gray-700">{rx.id}</td>
                  <td className="py-2.5 text-gray-800">{rx.patientName}</td>
                  <td className="py-2.5 text-gray-700">{rx.drug}</td>
                  <td className="py-2.5 text-gray-600 text-xs">{rx.dosage}</td>
                  <td className="py-2.5 text-gray-600">{rx.qty}</td>
                  <td className="py-2.5 text-gray-600 text-xs">{rx.doctor || rx.doctorName}</td>
                  <td className="py-2.5">
                    <span className={`badge ${rx.status === 'Dispensed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{rx.status}</span>
                  </td>
                  <td className="py-2.5">
                    {rx.status === 'Pending' && (
                      <button onClick={() => dispense(rx.id)} className="text-xs bg-[#0d9488] text-white px-2 py-1 rounded hover:bg-[#0f766e]">Dispense</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Drug Interactions */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <h2 className="section-title mb-0">Drug Interaction Alerts</h2>
          </div>
          <div className="space-y-3">
            {DRUG_INTERACTIONS.map((d, i) => (
              <div key={i} className={`p-3 rounded-lg border ${d.severity === 'High' ? 'bg-red-50 border-red-200' : 'bg-orange-50 border-orange-200'}`}>
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium text-sm text-gray-800">{d.drug1} + {d.drug2}</div>
                  <span className={`badge ${d.severity === 'High' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>{d.severity}</span>
                </div>
                <div className="text-xs text-gray-600">{d.effect}</div>
                <div className="text-xs text-gray-500 mt-0.5">{d.significance}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-[#0d9488]" />
            <h2 className="section-title mb-0">Inventory Management</h2>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {inventory.map(item => {
              const isLow = item.stock < item.threshold
              const isHigh = item.stock > item.threshold * 3
              return (
                <div key={item.id} className={`p-2.5 rounded-lg flex items-center justify-between ${isLow ? 'bg-red-50 border border-red-200' : isHigh ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                  <div>
                    <div className="font-medium text-sm text-gray-800">{item.drug}</div>
                    <div className="text-xs text-gray-500">Stock: {item.stock} {item.unit} · Expiry: {item.expiry}</div>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    {isLow ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-red-700 font-semibold">LOW</span>
                        <button onClick={() => requestRestock(item.id, item.drug)} className="text-xs bg-red-600 text-white px-1.5 py-0.5 rounded hover:bg-red-700">Restock</button>
                      </div>
                    ) : isHigh ? (
                      <span className="text-xs text-green-700 font-semibold">OK</span>
                    ) : (
                      <span className="text-xs text-gray-500">{Math.round(item.stock / item.threshold * 100)}%</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Daily Bill History */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Receipt className="w-5 h-5 text-[#0d9488]" />
          <h2 className="section-title mb-0">Daily Bill History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 text-gray-500 font-medium">Time</th>
                <th className="text-left py-2 text-gray-500 font-medium">Patient</th>
                <th className="text-left py-2 text-gray-500 font-medium">Drugs Dispensed</th>
                <th className="text-left py-2 text-gray-500 font-medium">Total</th>
                <th className="text-left py-2 text-gray-500 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((b, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2.5 text-gray-500">{b.time}</td>
                  <td className="py-2.5 font-medium text-gray-800">{b.patient}</td>
                  <td className="py-2.5 text-gray-600">{b.drugs}</td>
                  <td className="py-2.5 font-medium text-gray-800">{b.total}</td>
                  <td className="py-2.5">
                    <span className={`badge ${b.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-4 text-center text-sm">
          <div><div className="text-xl font-bold text-gray-800">{bills.length}</div><div className="text-gray-500">Total Bills</div></div>
          <div><div className="text-xl font-bold text-gray-800">₹{totalRevenue}</div><div className="text-gray-500">Total Revenue</div></div>
          <div><div className="text-xl font-bold text-gray-800">₹{bills.length ? Math.round(totalRevenue / bills.length) : 0}</div><div className="text-gray-500">Avg Bill Value</div></div>
        </div>
      </div>
    </div>
  )
}
