import { useState } from 'react'
import styles from './Track.module.css'
import { trackComplaint } from '../api'

const statusConfig = {
  'Qabul qilindi': {
    color: '#1a56db', bg: '#e8f0fe',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  "Ko'rib chiqilmoqda": {
    color: '#d97706', bg: '#fffbeb',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  'Tekshiruvda': {
    color: '#7c3aed', bg: '#f5f3ff',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  'Hal etildi': {
    color: '#16a34a', bg: '#f0fdf4',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  'Rad etildi': {
    color: '#dc2626', bg: '#fef2f2',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
}

const categoryLabels = {
  davlat: "Davlat xizmatlari",
  soglik: "Sog'liqni saqlash",
  talim: "Ta'lim",
  huquq: "Huquq-tartibot",
  qurilish: "Qurilish va yer",
  moliya: "Moliya va soliq",
  transport: "Transport",
  boshqa: "Boshqa",
}

export default function Track() {
  const [code, setCode] = useState('')
  const [result, setResult] = useState(null)
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSearch(e) {
    e.preventDefault()
    if (!code.trim()) return
    setLoading(true)
    try {
      const found = await trackComplaint(code.trim())
      setResult(found)
    } catch {
      setResult(null)
    } finally {
      setSearched(true)
      setLoading(false)
    }
  }

  const cfg = result ? (statusConfig[result.holat] || statusConfig['Qabul qilindi']) : null

  const timeline = result ? [
    { status: 'Yuborildi', date: result.sanaYuborildi, done: true },
    { status: 'Qabul qilindi', date: result.sanaYuborildi, done: true },
    { status: "Ko'rib chiqilmoqda", date: null, done: ['Ko\'rib chiqilmoqda', 'Tekshiruvda', 'Hal etildi'].includes(result.holat) },
    { status: 'Hal etildi', date: null, done: result.holat === 'Hal etildi' },
  ] : []

  return (
    <div className={styles.page}>
      <div className={styles.pageInner}>
        <div className={styles.pageHeader}>
          <h1>Murojaatni kuzatish</h1>
          <p>Tracking kod orqali murojaatingiz holatini tekshiring</p>
        </div>

        <form className={styles.searchForm} onSubmit={handleSearch}>
          <div className={styles.searchRow}>
            <input
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="Masalan: AK-2024-8821"
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchBtn} disabled={loading || !code.trim()}>
              {loading ? <span className={styles.spinner} /> : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2.5"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              )}
              {loading ? 'Qidirilmoqda...' : 'Qidirish'}
            </button>
          </div>
          <p className={styles.searchHint}>
            Tracking kod murojaatni yuborganda ko'rsatilgan va emailga yuborilgan
          </p>
        </form>

        {searched && !result && (
          <div className={styles.notFound}>
            <div className={styles.notFoundIcon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" stroke="#d1d5db" strokeWidth="1.5"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="8" y1="11" x2="14" y2="11" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Murojaat topilmadi</h3>
            <p>«<strong>{code}</strong>» kodi bo'yicha murojaat topilmadi.</p>
            <ul>
              <li>Kodni to'g'ri kiritganingizni tekshiring</li>
              <li>Katta-kichik harflarga e'tibor bering (AK-2024-XXXX)</li>
              <li>Murojaat yuborgan bo'lsangiz, bir oz kutib qaytadan urinib ko'ring</li>
            </ul>
          </div>
        )}

        {result && (
          <div className={styles.result}>
            <div className={styles.resultHeader}>
              <div>
                <div className={styles.resultId}>{result.trackingId}</div>
                <div className={styles.resultCat}>{categoryLabels[result.kategoriya] || result.kategoriya}</div>
              </div>
              <div
                className={styles.statusBadge}
                style={{ color: cfg.color, background: cfg.bg }}
              >
                {cfg.icon} {result.holat}
              </div>
            </div>

            {/* Timeline */}
            <div className={styles.timeline}>
              {timeline.map((t, i) => (
                <div key={i} className={`${styles.tStep} ${t.done ? styles.tDone : ''}`}>
                  <div className={styles.tDot}>{t.done ? '✓' : (i + 1)}</div>
                  <div className={styles.tInfo}>
                    <span className={styles.tLabel}>{t.status}</span>
                    {t.date && (
                      <span className={styles.tDate}>
                        {new Date(t.date).toLocaleDateString('uz-UZ', {
                          year: 'numeric', month: 'long', day: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </span>
                    )}
                  </div>
                  {i < timeline.length - 1 && <div className={`${styles.tLine} ${t.done ? styles.tLineDone : ''}`} />}
                </div>
              ))}
            </div>

            {/* Details */}
            <div className={styles.details}>
              <h3>Murojaat tafsilotlari</h3>
              <div className={styles.detailGrid}>
                {result.viloyat && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>📍 Viloyat</span>
                    <span>{result.viloyat}</span>
                  </div>
                )}
                {result.manzil && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>🏢 Manzil</span>
                    <span>{result.manzil}</span>
                  </div>
                )}
                {result.sana && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>📅 Voqea sanasi</span>
                    <span>{result.sana}</span>
                  </div>
                )}
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>⏰ Yuborildi</span>
                  <span>{new Date(result.sanaYuborildi).toLocaleDateString('uz-UZ', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}</span>
                </div>
              </div>

              <div className={styles.detailFull}>
                <span className={styles.detailLabel}>📝 Tavsif</span>
                <p>{result.tavsif}</p>
              </div>
            </div>

            <div className={styles.resultNote}>
              🔒 Murojaatingiz maxfiy saqlanmoqda. Javob 48 soat ichida tayyorlanadi.
            </div>
          </div>
        )}

        {/* Help */}
        {!searched && (
          <div className={styles.help}>
            <div className={styles.helpCard}>
              <div className={styles.helpIcon}>📧</div>
              <h4>Email orqali</h4>
              <p>Murojaat yuborganda emailingizga tracking kod yuborildi</p>
            </div>
            <div className={styles.helpCard}>
              <div className={styles.helpIcon}>📋</div>
              <h4>Ekranda ko'rsatildi</h4>
              <p>Murojaatni yuborgandan so'ng tracking kod ekranda ko'rsatildi</p>
            </div>
            <div className={styles.helpCard}>
              <div className={styles.helpIcon}>📞</div>
              <h4>Qo'ng'iroq qiling</h4>
              <p>1077 raqamiga qo'ng'iroq qilib tracking kodingizni so'rang</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
