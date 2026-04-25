import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Auth.module.css'
import { loginUser } from '../api'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nikneym: '', parol: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [globalError, setGlobalError] = useState('')

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }))
    setGlobalError('')
  }

  function validate() {
    const e = {}
    if (!form.nikneym.trim()) e.nikneym = 'Nikneym kiriting'
    if (!form.parol) e.parol = 'Parol kiriting'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }

    setLoading(true)
    try {
      const user = await loginUser(form.nikneym, form.parol)
      localStorage.setItem('user', JSON.stringify({ nikneym: user.nikneym }))
      navigate('/')
    } catch (err) {
      setGlobalError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={`${styles.container} ${styles.containerSm}`}>

        <div className={styles.loginPrivacyBadge}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            <polyline points="9 12 11 14 15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Faqat nikneym va parol — shaxsiy ma'lumot yo'q
        </div>

        <div className={styles.header}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{margin: '0 auto 0.75rem'}}>
            <rect x="3" y="11" width="18" height="11" rx="2" stroke="#1a56db" strokeWidth="1.5"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#1a56db" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="12" cy="16" r="1.5" fill="#1a56db"/>
          </svg>
          <h1>Tizimga kirish</h1>
          <p>Nikneym va parolingizni kiriting</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {globalError && (
            <div className={styles.alertError}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              {globalError}
            </div>
          )}

          <div className={styles.field}>
            <label>Nikneym <span>*</span></label>
            <input
              name="nikneym"
              value={form.nikneym}
              onChange={handleChange}
              placeholder="Nikneymingizni kiriting"
              className={errors.nikneym ? styles.inputError : ''}
              autoComplete="username"
            />
            {errors.nikneym && <span className={styles.error}>{errors.nikneym}</span>}
          </div>

          <div className={styles.field}>
            <label>Parol <span>*</span></label>
            <input
              type="password"
              name="parol"
              value={form.parol}
              onChange={handleChange}
              placeholder="Parolingizni kiriting"
              className={errors.parol ? styles.inputError : ''}
              autoComplete="current-password"
            />
            {errors.parol && <span className={styles.error}>{errors.parol}</span>}
          </div>

          <div className={styles.forgotRow}>
            <a href="#" className={styles.forgotLink}>Parolni unutdingizmi?</a>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading && <span className={styles.spinner} />}
            {loading ? 'Kirilmoqda...' : 'Kirish'}
          </button>
        </form>

        <p className={styles.switchLink}>
          Akkauntingiz yo'qmi? <Link to="/royxat">Ro'yxatdan o'ting</Link>
        </p>
      </div>
    </div>
  )
}
