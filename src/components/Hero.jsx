import { useEffect, useState, lazy, Suspense } from 'react'
import styles from './Hero.module.css'

const Hero3D = lazy(() => import('./Hero3D'))

const roles = [
  'React & .NET Full Stack Developer',
  'Microsoft 365 App Specialist',
  'Enterprise Web Solutions Builder',
  'Teams App Developer',
]

export default function Hero({ onResumeClick }) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const current = roles[roleIndex]

    if (!deleting && charIndex <= current.length) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex))
        setCharIndex(c => c + 1)
      }, 55)
      return () => clearTimeout(t)
    }

    if (!deleting && charIndex > current.length) {
      const t = setTimeout(() => setDeleting(true), 2000)
      return () => clearTimeout(t)
    }

    if (deleting && charIndex >= 0) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex))
        setCharIndex(c => c - 1)
      }, 28)
      return () => clearTimeout(t)
    }

    if (deleting && charIndex < 0) {
      setDeleting(false)
      setCharIndex(0)
      setRoleIndex(r => (r + 1) % roles.length)
    }
  }, [charIndex, deleting, roleIndex])

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.grid}>
        {/* Left: Text Content */}
        <div className={styles.textCol}>
          <p className={styles.greeting}>Hi, my name is</p>

          <h1 className={styles.name}>Zalak Yadav</h1>

          <h2 className={styles.role}>
            <span className={styles.roleText}>{displayed}</span>
            <span className={styles.cursor}>|</span>
          </h2>

          <p className={styles.summary}>
            Full Stack Developer with <span className="accent">3.5+ years</span> of experience
            building enterprise-grade web apps using <span className="accent">React.js</span> &{' '}
            <span className="accent">.NET Core</span>. Specializing in Microsoft 365 &amp; Teams
            App development for clients across the <span className="accent">US and UK</span>.
          </p>

          <div className={styles.actions}>
            <button className="btn btn-primary" onClick={scrollToAbout}>
              View My Work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </button>
            <button className="btn btn-outline" onClick={onResumeClick}>
              View Resume
            </button>
          </div>

          <div className={styles.socials}>
            <a
              href="https://www.linkedin.com/in/zalakyadav/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="mailto:zalakyadav0712@gmail.com" className={styles.socialLink} aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
            <a href="tel:7203914657" className={styles.socialLink} aria-label="Phone">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right: 3D Visual */}
        <div className={styles.visualCol}>
          <div className={styles.visualGlow} />
          <Suspense fallback={<div className={styles.visualFallback} />}>
            <Hero3D />
          </Suspense>
        </div>
      </div>

      <div className={styles.scrollIndicator} onClick={scrollToAbout}>
        <div className={styles.mouse}>
          <div className={styles.wheel} />
        </div>
        <span>Scroll</span>
      </div>
    </section>
  )
}
