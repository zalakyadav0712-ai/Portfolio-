import { useEffect } from 'react'
import styles from './ResumeModal.module.css'

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <span className={styles.toolbarTitle}>resume.pdf — Zalak Yadav</span>
          <div className={styles.toolbarActions}>
            <button
              className={styles.printBtn}
              onClick={() => window.print()}
              title="Print or Save as PDF"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              Print / Save PDF
            </button>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close resume">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Resume Content */}
        <div className={styles.body}>

          {/* Header */}
          <div className={styles.resumeHeader}>
            <div className={styles.resumeHeaderLeft}>
              <h1 className={styles.resumeName}>Zalak Yadav</h1>
              <p className={styles.resumeTitle}>React &amp; .NET Full Stack Developer</p>
              <p className={styles.resumeLocation}>📍 Ahmedabad, Gujarat, India</p>
            </div>
            <div className={styles.resumeContact}>
              <a href="mailto:zalakyadav0712@gmail.com">zalakyadav0712@gmail.com</a>
              <a href="tel:7203914657">+91 7203914657</a>
              <a href="https://www.linkedin.com/in/zalakyadav/" target="_blank" rel="noopener noreferrer">
                linkedin.com/in/zalakyadav
              </a>
            </div>
          </div>

          {/* Summary */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Professional Summary</h2>
            <p className={styles.summaryText}>
              Full Stack Developer with <strong>3.5+ years</strong> of experience building
              enterprise-grade web applications using React.js and ASP.NET Core. Specializing in
              Microsoft 365 &amp; Teams App development for international clients across the US and
              UK. Proven track record of delivering complex, deadline-driven projects — recognized
              with <strong>Best Performer of Q3 2025</strong> award at BrainerHub Solutions.
            </p>
          </div>

          {/* Experience */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Work Experience</h2>

            <div className={styles.job}>
              <div className={styles.jobHeader}>
                <div>
                  <h3 className={styles.jobTitle}>React .NET Full Stack Developer</h3>
                  <p className={styles.jobCompany}>BrainerHub Solutions · Ahmedabad, Gujarat, India</p>
                </div>
                <span className={styles.jobPeriod}>Oct 2023 – Present</span>
              </div>
              <ul className={styles.bullets}>
                <li>Architected and delivered full-stack web applications using React.js (frontend) and ASP.NET Core (backend), serving enterprise clients across the US and UK.</li>
                <li>Built and deployed 5+ Microsoft Teams Apps and M365-integrated solutions, reducing manual workflow time by ~40% for end users.</li>
                <li>Led weekly client communication calls with international stakeholders — gathered requirements, presented product demos, and ensured on-time delivery across 3+ concurrent projects.</li>
                <li>Delivered the External User Manager project (M365 guest/tenant management tool) within strict deadline, earning Best Performer of Q3 2025 award.</li>
                <li>Implemented multi-agent automated code review pipeline (CodeReviewr, SonarQube, Performance Optimizer, System Breaker) to enforce code quality standards.</li>
              </ul>
              <p className={styles.techLine}>React.js · ASP.NET Core · C# · Microsoft Teams · M365 · Microsoft Graph API · Azure DevOps · SQL Server · TypeScript</p>
            </div>

            <div className={styles.job}>
              <div className={styles.jobHeader}>
                <div>
                  <h3 className={styles.jobTitle}>Software Engineer</h3>
                  <p className={styles.jobCompany}>SixSigma Cloud Solutions · Ahmedabad, Gujarat, India</p>
                </div>
                <span className={styles.jobPeriod}>Apr 2023 – Aug 2023</span>
              </div>
              <ul className={styles.bullets}>
                <li>Developed and maintained web applications using ASP.NET MVC and C# in a professional enterprise environment.</li>
                <li>Participated in the complete software development lifecycle from requirements gathering to deployment.</li>
                <li>Contributed to code reviews and maintained high code quality standards within an Agile team.</li>
                <li>Worked with SQL Server for database management and query optimization.</li>
              </ul>
              <p className={styles.techLine}>ASP.NET MVC · C# · SQL Server · JavaScript · Git · REST APIs</p>
            </div>

            <div className={styles.job}>
              <div className={styles.jobHeader}>
                <div>
                  <h3 className={styles.jobTitle}>Internship Trainee</h3>
                  <p className={styles.jobCompany}>SixSigma Cloud Solutions · Ahmedabad, Gujarat, India</p>
                </div>
                <span className={styles.jobPeriod}>Jun 2022 – Mar 2023</span>
              </div>
              <ul className={styles.bullets}>
                <li>Completed a 10-month intensive internship gaining hands-on experience in .NET development and web technologies.</li>
                <li>Built small-scale web applications using C# and ASP.NET MVC as part of training projects.</li>
                <li>Developed strong technical foundations that directly led to securing a full-time role.</li>
              </ul>
              <p className={styles.techLine}>C# · ASP.NET MVC · SQL Server · HTML · CSS · JavaScript · Git</p>
            </div>
          </div>

          {/* Skills */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Technical Skills</h2>
            <div className={styles.skillsGrid}>
              <div className={styles.skillRow}>
                <span className={styles.skillCat}>Frontend</span>
                <span className={styles.skillVal}>React.js, JavaScript (ES6+), TypeScript, HTML5, CSS3</span>
              </div>
              <div className={styles.skillRow}>
                <span className={styles.skillCat}>Backend</span>
                <span className={styles.skillVal}>ASP.NET Core, .NET MVC, C#, Web API, REST APIs</span>
              </div>
              <div className={styles.skillRow}>
                <span className={styles.skillCat}>Microsoft</span>
                <span className={styles.skillVal}>Teams Apps, M365, Microsoft Graph API, SharePoint, Azure Bot Service</span>
              </div>
              <div className={styles.skillRow}>
                <span className={styles.skillCat}>Database</span>
                <span className={styles.skillVal}>SQL Server, Entity Framework, Query Optimization, Database Design</span>
              </div>
              <div className={styles.skillRow}>
                <span className={styles.skillCat}>Tools</span>
                <span className={styles.skillVal}>Git, Azure DevOps, Postman, Visual Studio, VS Code</span>
              </div>
              <div className={styles.skillRow}>
                <span className={styles.skillCat}>Methods</span>
                <span className={styles.skillVal}>Agile, Scrum, SOLID Principles, Code Reviews, Sprint Planning</span>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Key Projects</h2>

            <div className={styles.project}>
              <div className={styles.projectHeader}>
                <h3 className={styles.projectTitle}>External User Manager</h3>
                <span className={styles.awardChip}>🏆 Best Performer Q3 2025</span>
              </div>
              <p className={styles.projectPeriod}>Sep 2025 – Feb 2026 · BrainerHub Solutions · React.js, .NET Core, Azure DevOps, Microsoft Graph API</p>
              <p className={styles.projectDesc}>
                Microsoft 365 guest/tenant management tool with full guest lifecycle management
                (invite, approve, revoke), Microsoft Graph API integration, and enterprise compliance
                features. Implemented 4-agent automated review pipeline: CodeReviewr, SonarQube
                Quality, Performance Optimizer, and System Breaker.
              </p>
            </div>

            <div className={styles.project}>
              <h3 className={styles.projectTitle}>Calendar +</h3>
              <p className={styles.projectPeriod}>May 2025 – Sep 2025 · BrainerHub Solutions · React.js, Teams Toolkit, .NET Core, Azure Bot Service</p>
              <p className={styles.projectDesc}>
                Enterprise-grade Microsoft Teams App extending calendar functionality with smart
                scheduling, cross-team visibility, and Azure Bot Service integration. Deployed for
                3 production clients, improving page load performance by 20%.
              </p>
            </div>
          </div>

          {/* Education */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Education</h2>
            <div className={styles.job}>
              <div className={styles.jobHeader}>
                <div>
                  <h3 className={styles.jobTitle}>Bachelor of Engineering — Computer Engineering</h3>
                  <p className={styles.jobCompany}>Apollo Institute of Engineering and Technology, Ahmedabad</p>
                </div>
                <span className={styles.jobPeriod}>2019 – 2023</span>
              </div>
            </div>
          </div>

          {/* Award */}
          <div className={styles.awardCard}>
            <span className={styles.awardEmoji}>🏆</span>
            <div>
              <p className={styles.awardTitle}>Best Performer of the Quarter — Q3 2025</p>
              <p className={styles.awardSub}>BrainerHub Solutions · September 2025</p>
              <p className={styles.awardDesc}>
                Awarded for outstanding performance on the External User Manager — a complex, client-specific
                M365 project requiring strict adherence to tight deadlines and exceptional delivery precision.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
