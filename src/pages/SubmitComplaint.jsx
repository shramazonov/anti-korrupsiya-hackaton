import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './SubmitComplaint.module.css'
import { submitComplaint } from '../api'

const categories = [
  { value: '', label: '-- Kategoriyani tanlang --' },
  { value: 'davlat', label: '🏛️ Davlat xizmatlari' },
  { value: 'soglik', label: '🏥 Sog\'liqni saqlash' },
  { value: 'talim', label: '🎓 Ta\'lim' },
  { value: 'huquq', label: '🚔 Huquq-tartibot organlari' },
  { value: 'qurilish', label: '🏗️ Qurilish va yer masalalari' },
  { value: 'moliya', label: '💰 Moliya va soliq' },
  { value: 'transport', label: '🚌 Transport' },
  { value: 'boshqa', label: '📋 Boshqa' },
]

const viloyatlar = [
  '', 'Toshkent shahri', 'Toshkent viloyati', 'Andijon', 'Farg\'ona', 'Namangan',
  'Samarqand', 'Buxoro', 'Navoiy', 'Qashqadaryo', 'Surxondaryo',
  'Jizzax', 'Sirdaryo', 'Xorazm', 'Qoraqalpog\'iston'
]

export default function SubmitComplaint() {
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const [form, setForm] = useState({
    kategoriya: '',
    viloyat: '',
    manzil: '',
    sana: '',
    tavsif: '',
    shaxslar: '',
    dalillar: '',
    aloqa: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(null)

  function validate() {
    const e = {}
    if (!form.kategoriya) e.kategoriya = 'Kategoriya tanlash majburiy'
    if (!form.viloyat) e.viloyat = 'Viloyat tanlash majburiy'
    if (!form.tavsif.trim() || form.tavsif.trim().length < 50)
      e.tavsif = 'Tavsif kamida 50 ta belgidan iborat bo\'lishi kerak'
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
      const result = await submitComplaint({
        ...form,
        userNikneym: user?.nikneym || null,
      })
      setSubmitted(result.trackingId)
    } catch {
      setErrors(er => ({ ...er, tavsif: 'Server xatosi. Qaytadan urinib ko\'ring.' }))
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>🎉</div>
          <h2>Murojaat muvaffaqiyatli yuborildi!</h2>
          <p>Murojaatingiz qabul qilindi. Quyidagi tracking kod orqali holatini kuzatib boring.</p>
          <div className={styles.trackCode}>
            <span>Tracking kod:</span>
            <strong>{submitted}</strong>
          </div>
          <div className={styles.successActions}>
            <Link to="/kuzatish" className={styles.trackBtn}>🔍 Kuzatish</Link>
            <Link to="/" className={styles.homeBtn}>Bosh sahifaga</Link>
          </div>
          <p className={styles.note}>⚠️ Ushbu kodni saqlab qoling. Parolsiz kuzatish uchun kerak bo'ladi.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageInner}>
        <div className={styles.pageHeader}>
          <div className={styles.badge}>🔒 Anonim murojaat</div>
          <h1>Murojaat yuborish</h1>
          <p>Barcha ma'lumotlar maxfiy saqlanadi. Shaxsingiz hech qachon oshkor etilmaydi.</p>
        </div>

        <div className={styles.layout}>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>

            <div className={styles.section}>
              <h3>📋 Asosiy ma'lumotlar</h3>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Murojaat kategoriyasi <span>*</span></label>
                  <select
                    name="kategoriya"
                    value={form.kategoriya}
                    onChange={handleChange}
                    className={errors.kategoriya ? styles.inputError : ''}
                  >
                    {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                  {errors.kategoriya && <span className={styles.error}>{errors.kategoriya}</span>}
                </div>
                <div className={styles.field}>
                  <label>Viloyat / Shahar <span>*</span></label>
                  <select
                    name="viloyat"
                    value={form.viloyat}
                    onChange={handleChange}
                    className={errors.viloyat ? styles.inputError : ''}
                  >
                    {viloyatlar.map(v => <option key={v} value={v}>{v || '-- Tanlang --'}</option>)}
                  </select>
                  {errors.viloyat && <span className={styles.error}>{errors.viloyat}</span>}
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Aniq manzil</label>
                  <input
                    name="manzil"
                    value={form.manzil}
                    onChange={handleChange}
                    placeholder="Ko'cha, tashkilot nomi..."
                  />
                </div>
                <div className={styles.field}>
                  <label>Voqea sanasi</label>
                  <input
                    type="date"
                    name="sana"
                    value={form.sana}
                    onChange={handleChange}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h3>📝 Murojaat mazmuni</h3>
              <div className={styles.field}>
                <label>Tavsif <span>*</span></label>
                <textarea
                  name="tavsif"
                  value={form.tavsif}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Korrupsiya faktini batafsil tasvirlab bering: nima sodir bo'ldi, qachon, qayerda, kim tomonidan? Kamida 50 ta belgi kiriting..."
                  className={errors.tavsif ? styles.inputError : ''}
                />
                <div className={styles.charCount}>
                  <span className={form.tavsif.length < 50 ? styles.charLow : styles.charOk}>
                    {form.tavsif.length} / 50+ belgi
                  </span>
                </div>
                {errors.tavsif && <span className={styles.error}>{errors.tavsif}</span>}
              </div>

              <div className={styles.field}>
                <label>Aybdor shaxslar</label>
                <input
                  name="shaxslar"
                  value={form.shaxslar}
                  onChange={handleChange}
                  placeholder="Lavozim va ismlari (ixtiyoriy)"
                />
                <small>Agar ma'lum bo'lsa, vazifasi yoki ismi</small>
              </div>

              <div className={styles.field}>
                <label>Dalillar va guvohlar</label>
                <textarea
                  name="dalillar"
                  value={form.dalillar}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Hujjatlar, fotosuratlar, guvohlar haqida ma'lumot (ixtiyoriy)"
                />
              </div>
            </div>

            <div className={styles.section}>
              <h3>📞 Aloqa ma'lumotlari (ixtiyoriy)</h3>
              <div className={styles.field}>
                <label>Telefon yoki email</label>
                <input
                  name="aloqa"
                  value={form.aloqa}
                  onChange={handleChange}
                  placeholder="+998 90 123 45 67 yoki email@mail.uz"
                />
                <small>Qo'shimcha ma'lumot so'ralganda bog'lanish uchun. Maxfiy saqlanadi.</small>
              </div>
            </div>

            <div className={styles.agreement}>
              <span>🔒</span>
              <p>
                Murojaatingiz yuborilgandan so'ng 48 soat ichida ko'rib chiqiladi.
                Barcha ma'lumotlar <strong>maxfiy</strong> va <strong>himoyalangan</strong> holda saqlanadi.
              </p>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? <span className={styles.spinner} /> : '📨'}
              {loading ? 'Yuborilmoqda...' : 'Murojaat yuborish'}
            </button>
          </form>

          <aside className={styles.sidebar}>
            <div className={styles.sideCard}>
              <h4>🛡️ Maxfiylik kafolati</h4>
              <ul>
                <li>Shaxsiy ma'lumotlaringiz saqlanmaydi</li>
                <li>IP manzil yashiriladi</li>
                <li>Uchinchi shaxslarga berilmaydi</li>
                <li>SSL shifrlash orqali uzatiladi</li>
              </ul>
            </div>
            <div className={styles.sideCard}>
              <h4>📞 Yordam kerakmi?</h4>
              <p>Bepul qo'ng'iroq qiling:</p>
              <strong className={styles.phone}>📞 1077</strong>
              <p>Kun bo'yi, 7 kun</p>
            </div>
            <div className={styles.sideCard}>
              <h4>⏱️ Ko'rib chiqish muddati</h4>
              <div className={styles.timeline}>
                <div className={styles.tItem}><span className={styles.tDot} />Qabul — 1 soat</div>
                <div className={styles.tItem}><span className={styles.tDot} />Ko'rib chiqish — 24 soat</div>
                <div className={styles.tItem}><span className={styles.tDot} />Javob — 48 soat</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
