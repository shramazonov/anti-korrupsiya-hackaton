import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'))
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user') || 'null'))
  }, [location.pathname])

  function handleLogout() {
    localStorage.removeItem('user')
    navigate('/')
    setMenuOpen(false)
  }

  const links = [
    { to: '/targhibot', label: "Targ'ibot" },
    { to: '/oquv-kursi', label: "O'quv kursi" },
    { to: '/choralar', label: "Chora ko'rilganlar" },
    { to: '/davlat-xaridlari', label: 'Davlat xaridlari' },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <div>
            <span className={styles.logoTitle}>Anonym</span>
            <span className={styles.logoSub}>Maxfiy • Xavfsiz • Ishonchli</span>
          </div>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {user?.role === 'staff' ? (
            <Link
              to="/panel"
              className={`${styles.navLink} ${styles.panelLink} ${location.pathname === '/panel' ? styles.active : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Panel
            </Link>
          ) : (
            links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`${styles.navLink} ${location.pathname === l.to ? styles.active : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            ))
          )}
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
