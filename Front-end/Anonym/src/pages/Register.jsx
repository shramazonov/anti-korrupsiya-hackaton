import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Auth.module.css'
import { registerUser } from '../api'

const notCollected = [
  'Ism va familiya',
  'Email manzil',
  'Telefon raqam',
  'Manzil yoki joylashuv',
  'Pasport yoki ID ma\'lumotlari',
]

const isCollected = [
  { label: 'Nikneym', note: 'Siz tanlagan istalgan nom' },
  { label: 'Parol', note: 'Faqat shifrlangan holda' },
]

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nikneym: '', parol: '', parolTasdig: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showWhy, setShowWhy] = useState(false)

  function validate() {
    const e = {}
    if (!form.nikneym.trim() || form.nikneym.trim().length < 3)
      e.nikneym = 'Nikneym kamida 3 ta belgidan iborat bo\'lishi kerak'
    if (/\s/.test(form.nikneym))
      e.nikneym = 'Nikneymda bo\'sh joy bo\'lmasligi kerak'
    if (form.parol.length < 8)
      e.parol = 'Parol kamida 8 ta belgidan iborat bo\'lishi kerak'
    if (form.parol !== form.parolTasdig)
      e.parolTasdig = 'Parollar mos kelmayapti'
    return e
  }

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }

    setLoading(true)
    try {
      await registerUser(form.nikneym, form.parol)
      localStorage.setItem('user', JSON.stringify({ nikneym: form.nikneym }))
      setSuccess(true)
      setTimeout(() => navigate('/'), 1500)
    } catch (err) {
      setErrors(er => ({ ...er, nikneym: err.message }))
    } finally {
      setLoading(false)
    }
  }

  const strength = form.parol.length === 0 ? 0
    : form.parol.length < 8 ? 1
    : form.parol.length < 12 ? 2
    : 3

  if (success) {
    return (
      <div className={styles.page}>
        <div className={styles.successBox}>
          <div className={styles.successShield}>
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="9 12 11 14 15 10" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2>Xush kelibsiz, <span>{form.nikneym}</span>!</h2>
          <p>Shaxsingiz to'liq himoyalangan holda ro'yxatdan o'tdingiz.</p>
          <div className={styles.successNote}>
            Biz haqingizda faqat <strong>nikneym</strong>ni bilamiz. Boshqa hech narsa yo'q.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.registerLayout}>

        {/* Left: Trust panel */}
        <aside className={styles.trustPanel}>
          <div className={styles.trustShield}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              <polyline points="9 12 11 14 15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>100% Anonim</span>
          </div>

          <h2>Biz sizdan hech qanday shaxsiy ma'lumot so'rmaymiz</h2>
          <p className={styles.trustSubtitle}>
            Ko'pgina platformalar sizning shaxsiy ma'lumotlaringizni to'playdi. Biz buni qilmaymiz — va bu bizning asosiy tamoyilimiz.
          </p>

          <div className={styles.trustSection}>
            <div className={styles.trustSectionTitle}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.5)" strokeWidth="2"/>
                <line x1="15" y1="9" x2="9" y2="15" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
                <line x1="9" y1="9" x2="15" y2="15" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Biz so'ramaymiz
            </div>
            <ul className={styles.notList}>
              {notCollected.map(item => (
                <li key={item}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <line x1="18" y1="6" x2="6" y2="18" stroke="#fca5a5" strokeWidth="2.5" strokeLinecap="round"/>
                    <line x1="6" y1="6" x2="18" y2="18" stroke="#fca5a5" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.trustSection}>
            <div className={styles.trustSectionTitle}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
                <polyline points="22 4 12 14.01 9 11.01" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Biz saqlaymiz
            </div>
            <ul className={styles.yesList}>
              {isCollected.map(item => (
                <li key={item.label}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <polyline points="20 6 9 17 4 12" stroke="#86efac" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <strong>{item.label}</strong>
                    <small>{item.note}</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <button
            className={styles.whyBtn}
            onClick={() => setShowWhy(!showWhy)}
            type="button"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.6)" strokeWidth="2"/>
              <line x1="12" y1="8" x2="12" y2="12" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"/>
              <line x1="12" y1="16" x2="12.01" y2="16" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Nima uchun bunday? {showWhy ? '▲' : '▼'}
          </button>
          {showWhy && (
            <p className={styles.whyText}>
              Murojaat beruvchilar ko'pincha murojaat qilishdan qo'rqishadi — shaxsiy ma'lumotlari oshkor bo'lishidan.
              Shuning uchun biz faqat nikneym va parol bilan cheklanamiz.
              Hatto bizning serverlarimiz ham sizning kim ekanligingizni bilmaydi.
            </p>
          )}
        </aside>

        {/* Right: Form */}
        <div className={styles.formCard}>
          <div className={styles.formCardHeader}>
            <h1>Ro'yxatdan o'tish</h1>
            <p>Atigi 2 ta maydon — boshqa hech narsa kerak emas</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label>
                Nikneym <span>*</span>
                <small className={styles.labelNote}>— haqiqiy ismingiz emas</small>
              </label>
              <input
                name="nikneym"
                value={form.nikneym}
                onChange={handleChange}
                placeholder="Masalan: Lochin99"
                className={errors.nikneym ? styles.inputError : ''}
                autoComplete="username"
              />
              {errors.nikneym
                ? <span className={styles.error}>{errors.nikneym}</span>
                : <small>Istalgan nom — harf, raqam, belgi. Shaxsiy ma'lumot emas.</small>
              }
            </div>

            <div className={styles.field}>
              <label>Parol <span>*</span></label>
              <input
                type="password"
                name="parol"
                value={form.parol}
                onChange={handleChange}
                placeholder="Kamida 8 ta belgi"
                className={errors.parol ? styles.inputError : ''}
                autoComplete="new-password"
              />
              {errors.parol && <span className={styles.error}>{errors.parol}</span>}
              {form.parol && (
                <div className={styles.strengthWrap}>
                  <div className={styles.strengthBars}>
                    <div className={`${styles.sBar} ${strength >= 1 ? styles.sBar1 : ''}`} />
                    <div className={`${styles.sBar} ${strength >= 2 ? styles.sBar2 : ''}`} />
                    <div className={`${styles.sBar} ${strength >= 3 ? styles.sBar3 : ''}`} />
                  </div>
                  <small className={strength === 1 ? styles.sWeak : strength === 2 ? styles.sMed : styles.sStrong}>
                    {strength === 1 ? 'Zaif' : strength === 2 ? "O'rtacha" : 'Kuchli'}
                  </small>
                </div>
              )}
            </div>

            <div className={styles.field}>
              <label>Parolni tasdiqlang <span>*</span></label>
              <div className={styles.confirmWrap}>
                <input
                  type="password"
                  name="parolTasdig"
                  value={form.parolTasdig}
                  onChange={handleChange}
                  placeholder="Parolni qayta kiriting"
                  className={errors.parolTasdig ? styles.inputError : ''}
                  autoComplete="new-password"
                />
                {form.parolTasdig && form.parolTasdig === form.parol && (
                  <svg className={styles.confirmCheck} width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="20 6 9 17 4 12" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              {errors.parolTasdig && <span className={styles.error}>{errors.parolTasdig}</span>}
            </div>

            <div className={styles.guarantee}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round"/>
                <polyline points="9 12 11 14 15 10" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p>
                Faqat <strong>nikneym</strong> va <strong>shifrlangan parol</strong> saqlanadi.
                Hech qanday shaxsiy ma'lumot talab etilmaydi.
              </p>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading && <span className={styles.spinner} />}
              {loading ? "Ro'yxatdan o'tilmoqda..." : "Ro'yxatdan o'tish"}
            </button>
          </form>

          <p className={styles.switchLink}>
            Akkauntingiz bormi? <Link to="/kirish">Kirish</Link>
          </p>
        </div>

      </div>
    </div>
  )
}
