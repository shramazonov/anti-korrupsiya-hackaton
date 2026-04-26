import { useEffect, useState } from 'react'
import { employeesByCategory, categoryList, avatarColors, getInitials } from '../data/employees'
import { submitRating, getRatings } from '../api'
import styles from './RateEmployees.module.css'

const starLabels = { 1: 'Juda yomon', 2: 'Yomon', 3: "O'rtacha", 4: 'Yaxshi', 5: "A'lo" }

function RatingCard({ emp, existingRatings, onRated }) {
  const [hovered, setHovered] = useState(0)
  const [selected, setSelected] = useState(0)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const count = existingRatings.length
  const avg = count > 0
    ? existingRatings.reduce((s, r) => s + r.stars, 0) / count
    : null

  async function handleSubmit() {
    if (!selected) return
    setLoading(true)
    try {
      await submitRating({
        employeeId: emp.id,
        employeeName: emp.name,
        category: emp.category,
        stars: selected,
        comment: comment.trim(),
        date: new Date().toISOString(),
      })
      setDone(true)
      onRated()
    } catch {
      // silent — user sees no change, can retry
    } finally {
      setLoading(false)
    }
  }

  const display = hovered || selected

  return (
    <div className={`${styles.card} ${done ? styles.cardDone : ''}`}>
      <div className={styles.cardTop}>
        <div
          className={styles.avatar}
          style={!emp.photo ? { background: avatarColors[emp.id % avatarColors.length] } : {}}
        >
          {emp.photo
            ? <img src={emp.photo} alt={emp.name} className={styles.avatarImg} />
            : getInitials(emp.name)
          }
        </div>
        <div className={styles.empMeta}>
          <span className={styles.empName}>{emp.name}</span>
          <span className={styles.empPosition}>{emp.position}</span>
        </div>
        {done && <span className={styles.doneBadge}>&#10003; Baholandi</span>}
      </div>

      <div className={styles.starsRow}>
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            type="button"
            className={`${styles.star} ${n <= display ? styles.starOn : ''}`}
            onMouseEnter={() => !done && setHovered(n)}
            onMouseLeave={() => !done && setHovered(0)}
            onClick={() => !done && setSelected(n)}
            disabled={done}
            aria-label={`${n} yulduz`}
          >
            ★
          </button>
        ))}
        {display > 0 && !done && (
          <span className={styles.starLabel}>{starLabels[display]}</span>
        )}
      </div>

      {!done && selected > 0 && (
        <div className={styles.commentArea}>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Izoh qoldiring (ixtiyoriy)..."
            rows={2}
            className={styles.commentInput}
          />
          <button
            type="button"
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <span className={styles.spinner} /> : null}
            {loading ? 'Saqlanmoqda...' : 'Baholash'}
          </button>
        </div>
      )}

      {avg !== null && (
        <div className={styles.avgRow}>
          <span className={styles.avgStars}>
            {[1, 2, 3, 4, 5].map(n => (
              <span key={n} className={n <= Math.round(avg) ? styles.avgStarOn : styles.avgStarOff}>★</span>
            ))}
          </span>
          <span className={styles.avgNum}>{avg.toFixed(1)}</span>
          <span className={styles.avgCount}>({count} baho)</span>
        </div>
      )}
    </div>
  )
}

export default function RateEmployees() {
  const [activeCategory, setActiveCategory] = useState(categoryList[0])
  const [ratingsMap, setRatingsMap] = useState({})

  async function loadRatings() {
    try {
      const all = await getRatings()
      const map = {}
      all.forEach(r => {
        if (!map[r.employeeId]) map[r.employeeId] = []
        map[r.employeeId].push(r)
      })
      setRatingsMap(map)
    } catch {
      // server may not be running yet
    }
  }

  useEffect(() => { loadRatings() }, [])

  const employees = employeesByCategory[activeCategory] ?? []

  return (
    <div className={styles.page}>
      <div className={styles.pageInner}>
        <div className={styles.pageHeader}>
          <div className={styles.badge}>Xizmat sifati</div>
          <h1>Xodimlarni baholang</h1>
          <p>Muassasa xodimlari haqida fikringizni bildiring. Barcha baholar anonim saqlanadi.</p>
        </div>

        <div className={styles.selectWrap}>
          <select
            className={styles.categorySelect}
            value={activeCategory}
            onChange={e => setActiveCategory(e.target.value)}
          >
            {categoryList.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className={styles.grid}>
          {employees.map(emp => (
            <RatingCard
              key={emp.id}
              emp={emp}
              existingRatings={ratingsMap[emp.id] ?? []}
              onRated={loadRatings}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
