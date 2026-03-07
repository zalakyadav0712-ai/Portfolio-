import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#hero" className={styles.logo} onClick={(e) => handleNav(e, '#hero')}>
          <span className={styles.logoZ}>Z</span>
          <span className={styles.logoText}>alak</span>
        </a>

        <nav className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              className={styles.link}
              style={{ animationDelay: `${i * 0.05}s` }}
              onClick={(e) => handleNav(e, l.href)}
            >
              <span className={styles.linkNum}>0{i + 1}.</span> {l.label}
            </a>
          ))}
          <a
            href="/Zalak_Yadav_Resume.pdf"
            className={`btn btn-outline ${styles.resumeBtn}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </nav>

        <button
          className={`${styles.burger} ${menuOpen ? styles.active : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
