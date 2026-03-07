import styles from './Projects.module.css'

const projects = [
  {
    title: 'External User Manager',
    period: 'Sep 2025 – Feb 2026',
    role: 'FullStack Developer',
    badge: '🏆 Award-Winning',
    description:
      'A Microsoft 365 guest/tenant management tool that allows organizations to manage externals and guests within their M365 group. Built for enterprise clients with strict compliance and deadline requirements. This project earned the Best Performer of Q3 2025 award.',
    bullets: [
      'Built full M365 guest lifecycle management — invite, approve, revoke access',
      'Integrated Microsoft Graph API for real-time tenant data',
      'Delivered under strict deadline — earned Best Performer Q3 2025 award',
    ],
    tech: ['React.js', '.NET Core', 'Azure DevOps', 'Microsoft Graph API', 'Microsoft 365'],
    featured: true,
  },
  {
    title: 'Calendar +',
    period: 'May 2025 – Sep 2025',
    role: 'FullStack Developer',
    badge: '⚡ Teams App',
    description:
      'An enterprise-grade Teams App that extends Microsoft calendar functionality with smart scheduling, cross-team visibility, and Azure Bot Service integration. Deployed for 3 production clients.',
    bullets: [
      'Developed and maintained enterprise web apps using ASP.NET MVC & C# for 3 clients',
      'Optimized SQL Server queries and database schemas, improving page load performance by 20%',
      'Collaborated in full SDLC — from requirements to production deployment',
      'Maintained high code quality through peer reviews and SOLID principles',
    ],
    tech: ['React.js', 'Microsoft Teams Toolkit', '.NET Core', 'Microsoft Graph API', 'Azure Bot Service'],
    featured: false,
  },
]

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <div className="container">
        <div className="section-title">
          <span className="number">04.</span>
          <h2>Recent Projects</h2>
          <div className="line" />
        </div>

        <div className={styles.list}>
          {projects.map((p, i) => (
            <div
              key={p.title}
              className={`${styles.card} ${p.featured ? styles.featured : ''}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {p.featured && <div className={styles.featuredGlow} />}

              <div className={styles.cardTop}>
                <div className={styles.cardLeft}>
                  <div className={styles.titleRow}>
                    <span className={styles.badge}>{p.badge}</span>
                  </div>
                  <h3 className={styles.title}>{p.title}</h3>
                  <p className={styles.meta}>
                    <span className={styles.period}>{p.period}</span>
                    <span className={styles.sep}>·</span>
                    <span className={styles.role}>{p.role}</span>
                  </p>
                </div>
              </div>

              <p className={styles.description}>{p.description}</p>

              <ul className={styles.bullets}>
                {p.bullets.map((b, j) => (
                  <li key={j} className={styles.bullet}>
                    <span className={styles.arrow}>▹</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.techRow}>
                {p.tech.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
