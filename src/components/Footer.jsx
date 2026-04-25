import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>AntiKorrupsiya</span>
          <p>O'zbekiston Respublikasida korrupsiyaga qarshi kurash portali. Sizning murojaatingiz maxfiy saqlanadi.</p>
        </div>
        <div className={styles.links}>
          <h4>Sahifalar</h4>
          <Link to="/">Bosh sahifa</Link>
          <Link to="/murojaat">Murojaat yuborish</Link>
          <Link to="/kuzatish">Kuzatish</Link>
          <Link to="/royxat">Ro'yxatdan o'tish</Link>
        </div>
        <div className={styles.links}>
          <h4>Ma'lumot</h4>
          <a href="#">Maxfiylik siyosati</a>
          <a href="#">Foydalanish shartlari</a>
          <a href="#">Yordam</a>
          <a href="#">Biz haqimizda</a>
        </div>
        <div className={styles.contact}>
          <h4>Aloqa</h4>
          <p>1077 (bepul)</p>
          <p>info@antikorrupsiya.uz</p>
          <p>Toshkent, O'zbekiston</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>© 2024 AntiKorrupsiya portali. Barcha huquqlar himoyalangan.</p>
      </div>
    </footer>
  )
}
