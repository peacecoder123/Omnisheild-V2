import { useState, useEffect, useRef } from 'react'
import { Radio, Circle } from 'lucide-react'

const EVENT_TYPES = [
  { type: 'Admission',    color: 'bg-blue-100 text-blue-700',   patients: ['Ravi Kumar', 'Sneha Patel', 'Mohan Lal', 'Geeta Rani'] },
  { type: 'Diagnosis',    color: 'bg-purple-100 text-purple-700',patients: ['Arun Gupta', 'Kavita Mehta', 'Sunil Sharma'] },
  { type: 'Lab Result',   color: 'bg-yellow-100 text-yellow-700',patients: ['Priya Singh', 'Rahul Verma', 'Neha Joshi'] },
  { type: 'Discharge',    color: 'bg-green-100 text-green-700', patients: ['Amit Yadav', 'Sunita Roy', 'Vijay Nair'] },
  { type: 'Alert',        color: 'bg-red-100 text-red-700',     patients: ['Deepak Mishra', 'Anita Sharma'] },
]

const CONDITIONS = ['Dengue', 'COVID-19', 'Hypertension', 'Diabetes', 'Malaria', 'Influenza', 'COPD']
const FACILITIES  = ['City General', 'Apollo Medical', 'AIIMS Delhi', 'Fortis', 'Max Hospital']

function randomEvent(id) {
  const et = EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)]
  return {
    id,
    type: et.type,
    color: et.color,
    patient: et.patients[Math.floor(Math.random() * et.patients.length)],
    condition: CONDITIONS[Math.floor(Math.random() * CONDITIONS.length)],
    facility: FACILITIES[Math.floor(Math.random() * FACILITIES.length)],
    ts: new Date().toLocaleTimeString('en-IN'),
  }
}

export default function LiveEventFeed() {
  const [events, setEvents] = useState(() => Array.from({ length: 8 }, (_, i) => randomEvent(i)))
  const [running, setRunning] = useState(true)
  const idRef = useRef(9)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setEvents(prev => {
        const next = [randomEvent(idRef.current++), ...prev].slice(0, 50)
        return next
      })
    }, 1800)
    return () => clearInterval(id)
  }, [running])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Live Event Feed</h1>
        <p className="text-gray-500 text-sm mt-1">Real-time patient events — Kafka stream</p>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-[#0d9488]" />
            <h2 className="section-title mb-0">Incoming Events</h2>
            {running && (
              <div className="flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                <Circle className="w-2 h-2 fill-green-500 text-green-500 animate-pulse" />
                Live
              </div>
            )}
          </div>
          <button onClick={() => setRunning(v => !v)}
            className={`text-sm px-3 py-1.5 rounded-lg font-medium transition-colors ${running ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}>
            {running ? 'Pause' : 'Resume'}
          </button>
        </div>

        <div ref={containerRef} className="space-y-2 max-h-96 overflow-y-auto">
          {events.map(ev => (
            <div key={ev.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-sm animate-fade-in">
              <span className={`badge shrink-0 ${ev.color}`}>{ev.type}</span>
              <div className="flex-1">
                <span className="font-medium text-gray-800">{ev.patient}</span>
                <span className="text-gray-400 mx-1">·</span>
                <span className="text-gray-600">{ev.condition}</span>
              </div>
              <div className="text-xs text-gray-400 shrink-0 text-right">
                <div>{ev.facility}</div>
                <div>{ev.ts}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
