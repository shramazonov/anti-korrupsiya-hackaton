import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user') || 'null')

  function handleLogout() {
    localStorage.removeItem('user')
    navigate('/')
    setMenuOpen(false)
  }

  const links = [
    { to: '/', label: 'Bosh sahifa' },
    { to: '/murojaat', label: 'Murojaat yuborish' },
    { to: '/kuzatish', label: 'Kuzatish' },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <div>
            <span className={styles.logoTitle}>AntiKorrupsiya</span>
            <span className={styles.logoSub}>O'zbekiston Respublikasi</span>
          </div>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`${styles.navLink} ${location.pathname === l.to ? styles.active : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          {user ? (
            <div className={styles.userMenu}>
              <span className={styles.userName}>{user.nikneym}</span>
              <button className={styles.logoutBtn} onClick={handleLogout}>Chiqish</button>
            </div>
          ) : (
            <>
              <Link to="/kirish" className={styles.loginBtn} onClick={() => setMenuOpen(false)}>Kirish</Link>
              <Link to="/royxat" className={styles.registerBtn} onClick={() => setMenuOpen(false)}>Ro'yxatdan o'tish</Link>
            </>
          )}
        </div>

        <button className={styles.burger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menyu">
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
