import { useEffect, useState } from 'react'
import { getAllComplaints, updateComplaint } from '../api'
import styles from './StaffPanel.module.css'

const STATUSES = [
  'Qabul qilindi',
  "Ko'rib chiqilmoqda",
  'Tekshiruvda',
  'Hal etildi',
  'Rad etildi',
]

const STATUS_COLOR = {
  'Qabul qilindi':       '#1a56db',
  "Ko'rib chiqilmoqda":  '#d97706',
  'Tekshiruvda':         '#7c3aed',
  'Hal etildi':          '#16a34a',
  'Rad etildi':          '#dc2626',
}

function Row({ c, staffName, onUpdated }) {
  const [open, setOpen]   = useState(false)
  const [holat, setHolat] = useState(c.holat)
  const [javob, setJavob] = useState(c.javob || '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved]   = useState(false)

  async function handleSave() {
    setSaving(true)
    try {
      await updateComplaint(c.id, {
        holat,
        javob: javob.trim(),
        javobSana: new Date().toISOString(),
        javobchi: staffName,
      })
      setSaved(true)
      onUpdated()
    } catch {
      // retry on next click
    } finally {
      setSaving(false)
    }
  }

  const dateStr = new Date(c.sanaYuborildi).toLocaleDateString('uz-UZ', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  })

  return (
    <div className={styles.row}>
      <button className={styles.rowHead} onClick={() => setOpen(o => !o)}>
        <span className={styles.colId}>{c.trackingId}</span>
        <span className={styles.colCat}>{c.kategoriya || <em>—</em>}</span>
        <span className={styles.colDate}>{dateStr}</span>
        <span className={styles.colStatus} style={{ color: STATUS_COLOR[c.holat] ?? '#333' }}>
          {c.holat}
        </span>
        <span className={styles.colArrow}>{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className={styles.rowBody}>
          <div className={styles.bodyFields}>
            <div className={styles.bf}>
              <span className={styles.bfLabel}>Tavsif</span>
              <p className={styles.bfText}>{c.tavsif}</p>
            </div>
            {c.shaxslar && (
              <div className={styles.bf}>
                <span className={styles.bfLabel}>Shaxslar</span>
                <p className={styles.bfText}>{c.shaxslar}</p>
              </div>
            )}
            {c.sana && (
              <div className={styles.bf}>
                <span className={styles.bfLabel}>Voqea sanasi</span>
                <p className={styles.bfText}>{c.sana}</p>
              </div>
            )}
          </div>

          <div className={styles.replyBlock}>
            <div className={styles.replyRow}>
              <label className={styles.replyLabel}>Holat</label>
              <select
                className={styles.replySelect}
                value={holat}
                onChange={e => { setHolat(e.target.value); setSaved(false) }}
              >
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className={styles.replyRow}>
              <label className={styles.replyLabel}>Javob</label>
              <textarea
                className={styles.replyTextarea}
                value={javob}
                rows={3}
                placeholder="Murojaat bo'yicha javob yozing..."
                onChange={e => { setJavob(e.target.value); setSaved(false) }}
              />
            </div>

            <div className={styles.replyFooter}>
              {saved && <span className={styles.savedNote}>✓ Saqlandi</span>}
              <button
                className={styles.saveBtn}
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? 'Saqlanmoqda...' : 'Saqlash'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function StaffPanel() {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading]       = useState(true)
  const [filter, setFilter]         = useState('all')

  async function load() {
    try {
      const data = await getAllComplaints()
      setComplaints(data)
    } catch {
      // server not running
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  if (!user || user.role !== 'staff') {
    return (
      <div className={styles.denied}>
        <p>Bu sahifaga kirish taqiqlangan.</p>
      </div>
    )
  }

  const filtered = filter === 'all'
    ? complaints
    : complaints.filter(c => c.holat === filter)

  const total   = complaints.length
  const yangi   = complaints.filter(c => c.holat === 'Qabul qilindi').length
  const active  = complaints.filter(c => ["Ko'rib chiqilmoqda", 'Tekshiruvda'].includes(c.holat)).length
  const done    = complaints.filter(c => ['Hal etildi', 'Rad etildi'].includes(c.holat)).length

  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        <div className={styles.header}>
          <h1>Murojaatlar paneli</h1>
          <span className={styles.staffName}>{user.nikneym}</span>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}><b>{total}</b><span>Jami</span></div>
          <div className={styles.stat}><b style={{ color: '#1a56db' }}>{yangi}</b><span>Yangi</span></div>
          <div className={styles.stat}><b style={{ color: '#d97706' }}>{active}</b><span>Jarayonda</span></div>
          <div className={styles.stat}><b style={{ color: '#16a34a' }}>{done}</b><span>Yakunlangan</span></div>
        </div>

        <div className={styles.filters}>
          {[
            { key: 'all',                  label: 'Barchasi' },
            { key: 'Qabul qilindi',        label: 'Yangi' },
            { key: "Ko'rib chiqilmoqda",   label: 'Jarayonda' },
            { key: 'Hal etildi',           label: 'Hal etildi' },
            { key: 'Rad etildi',           label: 'Rad etildi' },
          ].map(f => (
            <button
              key={f.key}
              className={`${styles.fBtn} ${filter === f.key ? styles.fActive : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading && <p className={styles.msg}>Yuklanmoqda...</p>}
        {!loading && filtered.length === 0 && (
          <p className={styles.msg}>Murojaatlar mavjud emas</p>
        )}

        {!loading && filtered.length > 0 && (
          <div className={styles.list}>
            <div className={styles.listHead}>
              <span className={styles.colId}>Tracking ID</span>
              <span className={styles.colCat}>Kategoriya</span>
              <span className={styles.colDate}>Sana</span>
              <span className={styles.colStatus}>Holat</span>
              <span className={styles.colArrow} />
            </div>
            {filtered.map(c => (
              <Row key={c.id} c={c} staffName={user.nikneym} onUpdated={load} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
