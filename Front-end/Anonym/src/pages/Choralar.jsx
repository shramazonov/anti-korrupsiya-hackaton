import styles from './Choralar.module.css'

const cases = [
  {
    id: 1,
    photo: 'src/images/1.jpg',
    name: 'Karimov Bobur Salimovich',
    lavozim: 'Bosh buxgalter',
    boʻlim: 'Buxgalteriya',
    holat: 'Oylik ish haqiga 30% jarima',
    modda: '«Korrupsiyaga qarshi kurashish odob-axloq komissiyasining 1-sonli yig\'ilish qarori',
    chora: 'Moliyaviy hisobotlar to\'g\'risidagi ochiq ma\'lumotlarni belgilangan muddatda tizimga kiritilmaganligi',
    sana: '2026-02-14',
  },
  {
    id: 2,
    photo: 'src/images/8.jpg',
    name: 'Abdullayeva Nargiza Rustamovna',
    lavozim: 'Kafedra o\'qituvchisi',
    boʻlim: 'Fizika kafedrasi',
    holat: 'Xayfsan',
    modda: '«Korrupsiyaga qarshi kurashish odob-axloq komissiyasining 1-sonli yig\'ilish qarori',
    chora: 'Akademik korrupsiyaga yo\'l qo\'yib, yakuniy nazorat imtoxonlari o\'tkazilish tartibini buzgan',
    sana: '2026-03-05',
  },
]

const holatColor = {
  'Ishdan boʻshatilgan': { bg: '#fef2f2', color: '#dc2626', border: '#fecaca' },
  'Lavozimidan tushirilgan': { bg: '#fff7ed', color: '#c2410c', border: '#fed7aa' },
}

export default function Choralar() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        <div className={styles.header}>
          <h1>Chora koʻrilganlar</h1>
          <p>Korrupsion harakatlar uchun javobgarlikka tortilgan xodimlar roʻyxati</p>
        </div>

        <div className={styles.list}>
          {cases.map(c => {
            const badge = holatColor[c.holat] ?? { bg: '#f3f4f6', color: '#374151', border: '#d1d5db' }
            return (
              <div key={c.id} className={styles.card}>
                <div className={styles.cardLeft}>
                  <div className={styles.photoWrap}>
                    <img src={c.photo} alt={c.name} className={styles.photo} />
                  </div>
                  <span
                    className={styles.holatBadge}
                    style={{ background: badge.bg, color: badge.color, borderColor: badge.border }}
                  >
                    {c.holat}
                  </span>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.nameRow}>
                    <span className={styles.name}>{c.name}</span>
                    <span className={styles.sana}>{c.sana}</span>
                  </div>
                  <span className={styles.lavozim}>{c.lavozim} — {c.boʻlim}</span>

                  <div className={styles.divider} />

                  <div className={styles.row}>
                    <span className={styles.rowLabel}>Asos</span>
                    <span className={styles.rowValue}>{c.modda}</span>
                  </div>
                  <div className={styles.row}>
                    <span className={styles.rowLabel}>Holat</span>
                    <span className={styles.rowValue}>{c.chora}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}
