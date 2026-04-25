import { Link } from 'react-router-dom'
import styles from './Home.module.css'

const stats = [
  { value: '12,450+', label: 'Qabul qilingan murojaatlar' },
  { value: '8,320+', label: 'Hal etilgan holatlar' },
  { value: '95%', label: 'Maxfiylik darajasi' },
  { value: '24/7', label: 'Xizmat ish vaqti' },
]

const steps = [
  {
    num: '01',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="14 2 14 8 20 8" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="16" y1="13" x2="8" y2="13" stroke="#1a56db" strokeWidth="2" strokeLinecap="round"/>
        <line x1="16" y1="17" x2="8" y2="17" stroke="#1a56db" strokeWidth="2" strokeLinecap="round"/>
        <polyline points="10 9 9 9 8 9" stroke="#1a56db" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Murojaat yozing',
    desc: "Korrupsiya faktini batafsil tasvirlab bering. Ishlatiladigan ma'lumotlar maxfiy saqlanadi.",
  },
  {
    num: '02',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="16" r="1" fill="#1a56db"/>
      </svg>
    ),
    title: 'Anonim yuboring',
    desc: "Murojaatingiz maxfiy kanal orqali yuboriladi. Shaxsingiz hech qachon oshkor etilmaydi.",
  },
  {
    num: '03',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="8" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#1a56db" strokeWidth="2" strokeLinecap="round"/>
        <line x1="11" y1="8" x2="11" y2="14" stroke="#1a56db" strokeWidth="2" strokeLinecap="round"/>
        <line x1="8" y1="11" x2="14" y2="11" stroke="#1a56db" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Ko'rib chiqiladi",
    desc: "Vakolatli idoralar murojaatingizni ko'rib chiqadi va zarur choralar ko'riladi.",
  },
  {
    num: '04',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="22 4 12 14.01 9 11.01" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Natija oling',
    desc: "Tracking kod orqali murojaatingiz holati haqida xabardor bo'lib turing.",
  },
]

const categories = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 21h18M3 18h18" stroke="#1a56db" strokeWidth="2" strokeLinecap="round"/>
        <path d="M5 18V10M9 18V10M15 18V10M19 18V10" stroke="#1a56db" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 3L2 8h20L12 3z" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Davlat xizmatlari',
    count: '2,341 murojaat',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="#1a56db" strokeWidth="2" strokeLinecap="round"/>
        <line x1="12" y1="8" x2="12" y2="16" stroke="#1a56db" strokeWidth="2" strokeLinecap="round"/>
        <line x1="8" y1="12" x2="16" y2="12" stroke="#1a56db" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Sog'liqni saqlash",
    count: '1,892 murojaat',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Ta'lim",
    count: '1,567 murojaat',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="9 12 11 14 15 10" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Huquq-tartibot',
    count: '1,234 murojaat',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="14" width="20" height="8" rx="1" stroke="#1a56db" strokeWidth="2" strokeLinecap="round"/>
        <path d="M6 14V9a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 14V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v9" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Qurilish va yer',
    count: '987 murojaat',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="#1a56db" strokeWidth="2"/>
        <path d="M12 7v1.5M12 15.5V17" stroke="#1a56db" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9.5 9.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H12c-.83 0-1.5.67-1.5 1.5S11.17 15.5 12 15.5h3" stroke="#1a56db" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Moliya va soliq',
    count: '876 murojaat',
  },
]

export default function Home() {
  return (
    <div className={styles.page}>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>Maxfiy • Xavfsiz • Ishonchli</div>
          <h1 className={styles.heroTitle}>
            Korrupsiyaga qarshi<br />
            <span>birgalikda kurashaylik</span>
          </h1>
          <p className={styles.heroDesc}>
            Anonim murojaat qiling. Shaxsingiz himoyalangan. O'zbekistonda shaffoflik va adolat o'rnatishda ishtirok eting.
          </p>
          <div className={styles.heroActions}>
            <Link to="/murojaat" className={styles.heroCta}>
              Murojaat yuborish
            </Link>
            <Link to="/kuzatish" className={styles.heroSecondary}>
              Murojaatni kuzatish
            </Link>
          </div>
          <p className={styles.heroNote}>
            * Barcha murojaatlar 48 soat ichida ko'rib chiqiladi
          </p>
        </div>
        <div className={styles.heroIllustration}>
          <div className={styles.card1}>
            <span>
              <img src="https://cdn-icons-png.flaticon.com/128/2438/2438078.png" alt="" />
            </span>
            <div>
              <strong>Maxfiylik kafolati</strong>
              <small>Shaxsingiz himoyalangan</small>
            </div>
          </div>
          <div className={styles.card2}>
            <span>
              <img src="https://cdn-icons-png.flaticon.com/128/992/992650.png" alt="" />
            </span>
            <div>
              <strong>Murojaat qabul qilindi</strong>
              <small>Tracking: #AK-2024-8821</small>
            </div>
          </div>
          <div className={styles.card3}>
            <span>
              <img src="https://cdn-icons-png.flaticon.com/128/992/992700.png" alt="" />
            </span>
            <div>
              <strong>Ko'rib chiqilmoqda</strong>
              <small>Jarayon boshlandi</small>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.stats}>
        <div className={styles.statsInner}>
          {stats.map(s => (
            <div key={s.label} className={styles.statItem}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2>Qanday ishlaydi?</h2>
            <p>To'rt oddiy qadam bilan murojaatingizni yuboring</p>
          </div>
          <div className={styles.steps}>
            {steps.map(s => (
              <div key={s.num} className={styles.step}>
                <div className={styles.stepNum}>{s.num}</div>
                <div className={styles.stepIcon}>{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className={`${styles.section} ${styles.sectionGray}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2>Murojaat turlari</h2>
            <p>Qaysi sohadagi korrupsiya faktini aniqladingiz?</p>
          </div>
          <div className={styles.categories}>
            {categories.map(c => (
              <Link to="/murojaat" key={c.title} className={styles.categoryCard}>
                <span className={styles.catIcon}>{c.icon}</span>
                <h3>{c.title}</h3>
                <span className={styles.catCount}>{c.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2>Hoziroq murojaat qiling</h2>
          <p>Sizning ovozingiz muhim. Birgalikda korrupsiyasiz jamiyat quramiz.</p>
          <div className={styles.ctaActions}>
            <Link to="/murojaat" className={styles.ctaBtn}>Murojaat yuborish</Link>
            <Link to="/royxat" className={styles.ctaBtnOutline}>Ro'yxatdan o'tish</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
