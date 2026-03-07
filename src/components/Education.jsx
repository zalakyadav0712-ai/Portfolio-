import styles from './Education.module.css'

export default function Education() {
  return (
    <section id="education" className={styles.education}>
      <div className="container">
        <div className="section-title">
          <span className="number">05.</span>
          <h2>Education & Awards</h2>
          <div className="line" />
        </div>

        <div className={styles.grid}>
          {/* Education card */}
          <div className={styles.card}>
            <div className={styles.iconBox}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#64ffda" strokeWidth="1.8">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <div className={styles.info}>
              <p className={styles.period}>2019 – 2023</p>
              <h3 className={styles.degree}>Bachelor of Engineering (BE)</h3>
              <p className={styles.field}>Computer Engineering</p>
              <p className={styles.institute}>Apollo Institute of Engineering and Technology</p>
              <p className={styles.desc}>
                Studied core Computer Engineering subjects including Data Structures, Algorithms,
                DBMS, Operating Systems, OOP, and Software Engineering. Completed hands-on projects
                in web development and database design.
              </p>
            </div>
          </div>

          {/* Award card */}
          <div className={`${styles.card} ${styles.awardCard}`}>
            <div className={styles.iconBox}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8">
                <circle cx="12" cy="8" r="6"/>
                <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
              </svg>
            </div>
            <div className={styles.info}>
              <p className={styles.period}>September 2025</p>
              <h3 className={`${styles.degree} ${styles.gold}`}>Best Performer of the Quarter — Q3</h3>
              <p className={styles.institute}>BrainerHub Solutions</p>
              <p className={styles.desc}>
                Awarded for outstanding performance on a complex, client-specific project requiring
                strict adherence to tight deadlines and exceptional precision in delivery. Recognized
                for delivering the External User Manager project that became a flagship M365 solution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
