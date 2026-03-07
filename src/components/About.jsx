import { useEffect, useRef } from 'react'
import styles from './About.module.css'

const highlights = [
  { number: '3.5+', label: 'Years Experience' },
  { number: '5+', label: 'Teams Apps Built' },
  { number: '40%', label: 'Workflow Time Saved' },
  { number: '3+', label: 'Concurrent Projects' },
]

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      <div className="container">
        <div className="section-title">
          <span className="number">01.</span>
          <h2>About Me</h2>
          <div className="line" />
        </div>

        <div className={styles.grid}>
          <div className={styles.text}>
            <p>
              I'm a <span className="accent">React & .NET Full Stack Developer</span> based in
              Ahmedabad, Gujarat, India, with 3.5+ years of professional experience delivering
              enterprise-grade web applications. Currently working at{' '}
              <span className="accent">BrainerHub Solutions</span>, where I build and ship
              production-ready Microsoft 365 and Teams App integrations for clients across the
              US and UK.
            </p>
            <p>
              I own the complete development lifecycle — from architecture and API design all the
              way to client demos and production deployment. I'm passionate about writing clean,
              maintainable code and collaborating closely with international stakeholders to
              deliver solutions that actually make a difference.
            </p>
            <p>
              Outside of coding, I'm driven by continuous learning and staying sharp on the{' '}
              <span className="accent">Microsoft ecosystem</span> — Teams Apps, Microsoft Graph
              API, Azure DevOps, and SharePoint integrations are where I feel most at home.
            </p>

            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Location</span>
                <span className={styles.infoValue}>Ahmedabad, Gujarat, India</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Email</span>
                <a href="mailto:zalakyadav0712@gmail.com" className={styles.infoLink}>
                  zalakyadav0712@gmail.com
                </a>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Phone</span>
                <a href="tel:7203914657" className={styles.infoLink}>7203914657</a>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Availability</span>
                <span className={styles.available}>
                  <span className={styles.dot} />
                  Open to Opportunities
                </span>
              </div>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.statsGrid}>
              {highlights.map((h) => (
                <div key={h.label} className={styles.statCard}>
                  <span className={styles.statNum}>{h.number}</span>
                  <span className={styles.statLabel}>{h.label}</span>
                </div>
              ))}
            </div>

            <div className={styles.award}>
              <div className={styles.awardIcon}>🏆</div>
              <div>
                <p className={styles.awardTitle}>Best Performer of Q3 2025</p>
                <p className={styles.awardSub}>BrainerHub Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
