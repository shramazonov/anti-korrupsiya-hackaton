import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './SubmitComplaint.module.css'
import { submitComplaint } from '../api'
import { employeesByCategory, avatarColors, getInitials, categoryList } from '../data/employees'

const categories = [
  { value: '', label: 'Bo\'lim yoki kafedrani tanlang' },
  ...categoryList.map(c => ({ value: c, label: c }))
]

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function SubmitComplaint() {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const fileInputRef = useRef(null)

  const [form, setForm] = useState({
    kategoriya: '',
    sana: '',
    tavsif: '',
    shaxslar: '',
  })
  const [files, setFiles] = useState([])
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(null)
  const [selectedEmployees, setSelectedEmployees] = useState([])

  function validate() {
    const e = {}
    if (!form.tavsif.trim() || form.tavsif.trim().length < 50)
      e.tavsif = 'Tavsif kamida 50 ta belgidan iborat bo\'lishi kerak'
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
    if (name === 'kategoriya') {
      setSelectedEmployees([])
      setForm(f => ({ ...f, kategoriya: value, shaxslar: '' }))
    }
  }

  function handleEmployeeSelect(emp) {
    setSelectedEmployees(prev => {
      const isSelected = prev.some(e => e.id === emp.id)
      const updated = isSelected ? prev.filter(e => e.id !== emp.id) : [...prev, emp]
      setForm(f => ({
        ...f,
        shaxslar: updated.map(e => `${e.name} (${e.position})`).join('; ')
      }))
      return updated
    })
  }

  function handleFileChange(e) {
    const added = Array.from(e.target.files)
    setFiles(prev => [...prev, ...added])
    e.target.value = ''
  }

  function removeFile(index) {
    setFiles(prev => prev.filter((_, i) => i !== index))
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
          <div className={styles.successIcon}></div>
          <h2>Murojaat muvaffaqiyatli yuborildi!</h2>
          <p>Murojaatingiz qabul qilindi. Quyidagi tracking kod orqali holatini kuzatib boring.</p>
          <div className={styles.trackCode}>
            <span>Tracking kod:</span>
            <strong>{submitted}</strong>
          </div>
          <div className={styles.successActions}>
            <Link to="/kuzatish" className={styles.trackBtn}>Kuzatish</Link>
            <Link to="/" className={styles.homeBtn}>Bosh sahifaga</Link>
          </div>
          <p className={styles.note}>Ushbu kodni saqlab qoling. Parolsiz kuzatish uchun kerak bo'ladi.</p>
        </div>
      </div>
    )
  }

  const employees = form.kategoriya ? employeesByCategory[form.kategoriya] : null

  return (
    <div className={styles.page}>
      <div className={styles.pageInner}>
        <div className={styles.pageHeader}>
          <div className={styles.badge}>Anonim murojaat</div>
          <h1>Murojaat yuborish</h1>
          <p>Barcha ma'lumotlar maxfiy saqlanadi. Shaxsingiz hech qachon oshkor etilmaydi.</p>
        </div>

        <div className={styles.layout}>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>

            <div className={styles.section}>
              <h3>Asosiy ma'lumotlar</h3>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Murojaat kategoriyasi</label>
                  <select
                    name="kategoriya"
                    value={form.kategoriya}
                    onChange={handleChange}
                  >
                    {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
              </div>

              {employees && (
                <div className={styles.employeeSection}>
                  <span className={styles.empLabel}>
                    Bo'lim xodimlari
                    {selectedEmployees.length > 0 && (
                      <span className={styles.empCount}>{selectedEmployees.length} tanlandi</span>
                    )}
                  </span>
                  <div className={styles.employeeGrid}>
                    {employees.map(emp => {
                      const isSelected = selectedEmployees.some(e => e.id === emp.id)
                      return (
                        <div
                          key={emp.id}
                          className={`${styles.empCard} ${isSelected ? styles.empSelected : ''}`}
                          onClick={() => handleEmployeeSelect(emp)}
                        >
                          <div
                            className={styles.empAvatar}
                            style={!emp.photo ? { background: avatarColors[emp.id % avatarColors.length] } : {}}
                          >
                            {emp.photo
                              ? <img src={emp.photo} alt={emp.name} className={styles.empAvatarImg} />
                              : getInitials(emp.name)
                            }
                          </div>
                          <div className={styles.empInfo}>
                            <span className={styles.empName}>{emp.name}</span>
                            <span className={styles.empPosition}>{emp.position}</span>
                          </div>
                          {isSelected && <span className={styles.empCheck}>&#10003;</span>}
                        </div>
                      )
                    })}
                  </div>
                  {selectedEmployees.length > 0 && (
                    <small className={styles.empHint}>
                      Bekor qilish uchun qayta bosing.
                    </small>
                  )}
                </div>
              )}

              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Holat sodir etilgan sana</label>
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
              <h3>Murojaat mazmuni</h3>
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
                <label>Fayllar</label>
                <div className={styles.fileZone} onClick={() => fileInputRef.current?.click()}>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <svg className={styles.fileIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 16v-8m0 0-3 3m3-3 3 3M20 16.5A3.5 3.5 0 0 0 16.5 13H15a5 5 0 1 0-9.9 1.09" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className={styles.fileZoneText}>Fayllarni yuklash uchun bosing</span>
                  <small>Rasm, hujjat, video — istalgan format</small>
                </div>

                {files.length > 0 && (
                  <ul className={styles.fileList}>
                    {files.map((file, i) => (
                      <li key={i} className={styles.fileItem}>
                        <span className={styles.fileName}>{file.name}</span>
                        <span className={styles.fileSize}>{formatFileSize(file.size)}</span>
                        <button type="button" className={styles.fileRemove} onClick={() => removeFile(i)}>&#10005;</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className={styles.agreement}>
              <p>
                Murojaatingiz tegishli tartibda ko'rib chiqiladi.
                Barcha ma'lumotlar <strong>maxfiy</strong> va <strong>himoyalangan</strong> holda saqlanadi.
              </p>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? <span className={styles.spinner} /> : ' '}
              {loading ? 'Yuborilmoqda...' : 'Murojaat yuborish'}
            </button>
          </form>

          <aside className={styles.sidebar}>
            <div className={styles.sideCard}>
              <h4>Maxfiylik kafolati</h4>
              <ul>
                <li>Shaxsiy ma'lumotlaringiz saqlanmaydi</li>
                <li>IP manzil yashiriladi</li>
                <li>Uchinchi shaxslarga berilmaydi</li>
                <li>SSL shifrlash orqali uzatiladi</li>
              </ul>
            </div>
            <div className={styles.sideCard}>
              <h4>Yordam kerakmi?</h4>
              <p>Bepul qo'ng'iroq qiling:</p>
              <strong className={styles.phone}>1077</strong>
              <p>Kun bo'yi, 7 kun</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
