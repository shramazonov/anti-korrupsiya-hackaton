import { useState } from 'react'
import styles from './OquvKursi.module.css'

const lessons = [
  {
    id: 1,
    title: '1-dars. Korrupsiyaga qarshi kurashish bo\'yicha faol dunyoqarash va mustahkam fuqarolik pozitsiyasini shakllantirish',
    type: 'video',
    src: 'src/images/d1.mp4',
  },
  {
    id: 2,
    title: '2-dars. Yoshlar orasida korrupsiya koʻrinishlariga nisbatan murosasizlikni   shakllantirishning oʻziga xos jihatlari',
    type: 'file',
    src: 'src/images/d2.pdf',
    fileName: '2-dars — Huquqiy asoslar.pdf',
  },
  {
    id: 3,
    title: '3-dars. OTMlarda tashkil etilgan korrupsiyaga qarshi talaba yoshlar klubi faoliyati xususida',
    type: 'file',
    src: 'src/images/d3.pdf',
    fileName: "3-dars — Amaliy qo'llanma.pdf",
  },
]

function Lesson({ lesson }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`${styles.item} ${open ? styles.itemOpen : ''}`}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className={styles.lessonNum}>{lesson.id}</span>
        <span className={styles.lessonTitle}>{lesson.title}</span>
        <span className={styles.arrow}>{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className={styles.body}>
          {lesson.type === 'video' && (
            <video
              className={styles.video}
              src={lesson.src}
              controls
              preload="metadata"
            />
          )}

          {lesson.type === 'file' && (
            <a href={lesson.src} download={lesson.fileName} className={styles.fileLink}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.fileIcon}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinejoin="round"/>
                <polyline points="14 2 14 8 20 8" strokeLinejoin="round"/>
                <line x1="12" y1="18" x2="12" y2="12"/>
                <polyline points="9 15 12 18 15 15"/>
              </svg>
              <span className={styles.fileLinkName}>{lesson.fileName}</span>
              <span className={styles.fileLinkHint}>Yuklab olish</span>
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export default function OquvKursi() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        <div className={styles.header}>
          <h1>O'quv kursi</h1>
          <p>Antikorrupsiya bo'yicha asosiy bilimlar</p>
        </div>

        <div className={styles.accordion}>
          {lessons.map(lesson => (
            <Lesson key={lesson.id} lesson={lesson} />
          ))}
        </div>

      </div>
    </div>
  )
}
