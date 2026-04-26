import styles from './Targhibot.module.css'

const videos = [
  { id: 1, src: 'src/images/1.MOV', title: 'Korrupsiyaga qarshi kurash asoslari' },
  { id: 2, src: 'src/images/2.mp4', title: 'Fuqarolar huquqlari va majburiyatlari' },
  { id: 3, src: 'src/images/3.mp4', title: 'Shikoyat berish tartibi' },
]

const file = {
  src: 'src/images/4.pdf',
  name: 'Targ\'ibot materiali.pdf',
  label: 'Qo\'llanma — antikorrupsiya',
}

export default function Targhibot() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        <div className={styles.header}>
          <h1>Targ'ibot materiallari</h1>
          <p>Korrupsiyaga qarshi kurash bo'yicha video va hujjatlar</p>
        </div>

        <section>
          <h2 className={styles.sectionTitle}>Videolar</h2>
          <div className={styles.videoGrid}>
            {videos.map(v => (
              <div key={v.id} className={styles.videoCard}>
                <video
                  className={styles.video}
                  src={v.src}
                  controls
                  preload="metadata"
                />
                <p className={styles.videoTitle}>{v.title}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.fileSection}>
          <h2 className={styles.sectionTitle}>Fayl</h2>
          <a
            href={file.src}
            download={file.name}
            className={styles.fileCard}
          >
            <svg className={styles.fileIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinejoin="round"/>
              <polyline points="14 2 14 8 20 8" strokeLinejoin="round"/>
              <line x1="12" y1="18" x2="12" y2="12"/>
              <polyline points="9 15 12 18 15 15"/>
            </svg>
            <div className={styles.fileInfo}>
              <span className={styles.fileName}>{file.name}</span>
              <span className={styles.fileLabel}>{file.label}</span>
            </div>
            <span className={styles.downloadHint}>Yuklab olish</span>
          </a>
        </section>

      </div>
    </div>
  )
}
