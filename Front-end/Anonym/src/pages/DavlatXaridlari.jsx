import { useState } from 'react'
import styles from './DavlatXaridlari.module.css'

const quarters = [
  {
    id: 1,
    label: 'I chorak',
    period: 'Yanvar — Mart 2025',
    files: [
      { name: 'Xaridlar rejasi — I chorak.pdf', src: 'src/images/s1.pdf' },
      { name: 'Shartnomalar roʻyxati — I chorak.pdf', src: 'src/images/k1.pdf' },
      { name: 'Hisobot — I chorak.pdf', src: 'src/images/m1.pdf' },
    ],
  },
  {
    id: 2,
    label: 'II chorak',
    period: 'Aprel — Iyun 2025',
    files: [
      { name: 'Xaridlar rejasi — II chorak.pdf', src: 'src/images/s2.pdf' },
      { name: 'Shartnomalar roʻyxati — II chorak.pdf', src: 'src/images/k2.pdf' },
      { name: 'Hisobot — II chorak.pdf', src: 'src/images/m2.pdf' },
    ],
  },
  {
    id: 3,
    label: 'III chorak',
    period: 'Iyul — Sentabr 2025',
    files: [
      { name: 'Xaridlar rejasi — III chorak.pdf', src: 'src/images/s3.pdf' },
      { name: 'Shartnomalar roʻyxati — III chorak.pdf', src: 'src/images/k3.pdf' },
      { name: 'Hisobot — III chorak.pdf', src: 'src/images/m3.pdf' },
    ],
  },
  {
    id: 4,
    label: 'IV chorak',
    period: 'Oktabr — Dekabr 2025',
    files: [
      { name: 'Xaridlar rejasi — IV chorak.pdf', src: 'src/images/s4.pdf' },
      { name: 'Shartnomalar roʻyxati — IV chorak.pdf', src: 'src/images/k4.pdf' },
      { name: 'Hisobot — IV chorak.pdf', src: 'src/images/m4.pdf' },
    ],
  },
]

function FileItem({ file }) {
  return (
    <a href={file.src} download={file.name} className={styles.fileRow}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.fileIcon}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinejoin="round" />
        <polyline points="14 2 14 8 20 8" strokeLinejoin="round" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <polyline points="9 15 12 18 15 15" />
      </svg>
      <span className={styles.fileName}>{file.name}</span>
      <span className={styles.downloadHint}>Yuklab olish</span>
    </a>
  )
}

function Quarter({ q }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`${styles.item} ${open ? styles.itemOpen : ''}`}>
      <button type="button" className={styles.trigger} onClick={() => setOpen(o => !o)}>
        <span className={styles.qNum}>{q.label}</span>
        <span className={styles.qPeriod}>{q.period}</span>
        <span className={styles.qCount}>{q.files.length} ta fayl</span>
        <span className={styles.arrow}>{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className={styles.body}>
          {q.files.map((f, i) => <FileItem key={i} file={f} />)}
        </div>
      )}
    </div>
  )
}

export default function DavlatXaridlari() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        <div className={styles.header}>
          <h1>Davlat xaridlari</h1>
          <p>2026-yil uchun davlat xaridlari rejalari va hisobotlari</p>
        </div>

        <div className={styles.accordion}>
          {quarters.map(q => <Quarter key={q.id} q={q} />)}
        </div>

      </div>
    </div>
  )
}
