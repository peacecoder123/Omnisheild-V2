export function formatDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function formatDateTime(d) {
  return new Date(d).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generateId() {
  return Math.random().toString(36).slice(2, 11).toUpperCase()
}

/** Lightweight SIR epidemic model calculator */
export function simulateSIR({ R0 = 2.5, gamma = 0.1, N = 1_000_000, I0 = 100, days = 180 } = {}) {
  const beta = R0 * gamma
  let S = N - I0, I = I0, R = 0
  const data = []
  for (let t = 0; t <= days; t++) {
    data.push({
      day: t,
      S: Math.round(S),
      I: Math.round(I),
      R: Math.round(R),
    })
    const dS = -(beta * S * I) / N
    const dR = gamma * I
    const dI = -dS - dR
    S += dS; I += dI; R += dR
    if (I < 0) I = 0
    if (S < 0) S = 0
  }
  return data
}

export function classByRisk(score) {
  if (score >= 75) return 'text-red-600 bg-red-50'
  if (score >= 50) return 'text-yellow-600 bg-yellow-50'
  return 'text-green-600 bg-green-50'
}

export function truncate(str, n = 40) {
  return str.length > n ? str.slice(0, n) + '…' : str
}
