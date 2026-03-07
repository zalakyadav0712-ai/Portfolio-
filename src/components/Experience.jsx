import { useState } from 'react'
import styles from './Experience.module.css'

const jobs = [
  {
    company: 'BrainerHub Solutions',
    role: 'React .NET Full Stack Developer',
    period: 'Oct 2023 – Present',
    location: 'Ahmedabad, Gujarat, India',
    current: true,
    bullets: [
      'Architected and delivered full-stack web applications using React.js (frontend) and ASP.NET Core (backend), serving enterprise clients across the US and UK.',
      'Built and deployed 5+ Microsoft Teams Apps and M365-integrated solutions, reducing manual workflow time by ~40% for end users.',
      'Led weekly client communication calls with international stakeholders — gathered requirements, presented product demos, and ensured on-time delivery across 3+ concurrent projects.',
      'Delivered the External User Manager project (M365 guest/tenant management tool) within strict deadline, earning Best Performer of Q3 2025 award.',
    ],
    skills: ['React.js', 'ASP.NET Core', 'C#', 'Microsoft Teams', 'Microsoft 365', 'REST APIs', 'SQL Server', 'TypeScript', 'Azure DevOps'],
  },
  {
    company: 'SixSigma Cloud Solutions',
    role: 'Software Engineer',
    period: 'Apr 2023 – Aug 2023',
    location: 'Ahmedabad, Gujarat, India',
    current: false,
    bullets: [
      'Developed and maintained web applications using ASP.NET MVC and C# in a professional enterprise environment.',
      'Collaborated with senior developers on enterprise software solutions.',
      'Participated in the complete software development lifecycle from requirements gathering to deployment.',
      'Worked with SQL Server for database management and query optimization.',
      'Contributed to code reviews and maintained high code quality standards within a professional Agile team environment.',
    ],
    skills: ['ASP.NET MVC', 'C#', 'SQL Server', 'HTML', 'CSS', 'JavaScript', 'Git', 'REST APIs'],
  },
  {
    company: 'SixSigma Cloud Solutions',
    role: 'Internship Trainee',
    period: 'Jun 2022 – Mar 2023',
    location: 'Ahmedabad, Gujarat, India',
    current: false,
    bullets: [
      'Completed a 10-month intensive internship gaining hands-on experience in .NET development and web technologies.',
      'Built small-scale web applications using C# and ASP.NET MVC as part of training projects.',
      'Gained foundational experience in .NET development, SQL Server, and web technologies.',
      'Worked closely with mentors to understand enterprise-level development workflows.',
      'Developed strong technical foundations that directly led to securing a full-time Software Engineer role.',
    ],
    skills: ['C#', 'ASP.NET MVC', 'CSS', 'HTML', 'JavaScript', 'Git', 'SQL Server'],
  },
]

export default function Experience() {
  const [active, setActive] = useState(0)
  const job = jobs[active]

  return (
    <section id="experience" className={styles.experience}>
      <div className="container">
        <div className="section-title">
          <span className="number">03.</span>
          <h2>Work Experience</h2>
          <div className="line" />
        </div>

        <div className={styles.layout}>
          {/* Tabs */}
          <div className={styles.tabs}>
            {jobs.map((j, i) => (
              <button
                key={j.company + j.role}
                className={`${styles.tab} ${active === i ? styles.activeTab : ''}`}
                onClick={() => setActive(i)}
              >
                <span className={styles.tabCompany}>{j.company}</span>
                <span className={styles.tabRole}>{j.role}</span>
                {j.current && <span className={styles.currentBadge}>Current</span>}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className={styles.content} key={active}>
            <div className={styles.jobHeader}>
              <div>
                <h3 className={styles.jobRole}>
                  {job.role} <span className={styles.at}>@</span>{' '}
                  <span className="accent">{job.company}</span>
                </h3>
                <p className={styles.jobMeta}>
                  <span className={styles.period}>{job.period}</span>
                  <span className={styles.dot}>·</span>
                  <span>{job.location}</span>
                </p>
              </div>
            </div>

            <ul className={styles.bullets}>
              {job.bullets.map((b, i) => (
                <li key={i} className={styles.bullet}>
                  <span className={styles.arrow}>▹</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className={styles.skillRow}>
              {job.skills.map((s) => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
