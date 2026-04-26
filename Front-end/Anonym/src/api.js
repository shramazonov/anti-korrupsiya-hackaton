const BASE = 'http://localhost:3001'

function genTrackingId() {
  return 'AK-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000)
}

async function req(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error('Server xatosi: ' + res.status)
  return res.json()
}

export async function registerUser(nikneym, parol) {
  const existing = await req(`/users?nikneym=${encodeURIComponent(nikneym)}`)
  if (existing.length > 0) throw new Error('Bu nikneym band. Boshqa nom tanlang.')
  return req('/users', {
    method: 'POST',
    body: JSON.stringify({ nikneym, parol }),
  })
}

export async function loginUser(nikneym, parol) {
  const users = await req(`/users?nikneym=${encodeURIComponent(nikneym)}&parol=${encodeURIComponent(parol)}`)
  if (users.length === 0) throw new Error("Nikneym yoki parol noto'g'ri")
  return users[0]
}

export async function submitComplaint(data) {
  const trackingId = genTrackingId()
  return req('/complaints', {
    method: 'POST',
    body: JSON.stringify({
      trackingId,
      ...data,
      holat: 'Qabul qilindi',
      sanaYuborildi: new Date().toISOString(),
    }),
  })
}

export async function trackComplaint(code) {
  const results = await req(`/complaints?trackingId=${encodeURIComponent(code.toUpperCase())}`)
  return results[0] || null
}

export async function submitRating(data) {
  return req('/ratings', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function getRatings() {
  return req('/ratings')
}

export async function getAllComplaints() {
  return req('/complaints?_sort=sanaYuborildi&_order=desc')
}

export async function updateComplaint(id, data) {
  return req(`/complaints/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}
