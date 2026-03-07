import styles from './Skills.module.css'

const skillGroups = [
  {
    category: 'Frontend',
    icon: '🎨',
    skills: ['React.js', 'JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3'],
  },
  {
    category: 'Backend',
    icon: '⚙️',
    skills: ['ASP.NET Core', '.NET MVC', 'C#', 'Web API', 'REST APIs'],
  },
  {
    category: 'Microsoft Ecosystem',
    icon: '🏢',
    skills: ['Microsoft Teams Apps', 'Microsoft 365 (M365)', 'Microsoft Graph API', 'SharePoint', 'Azure Bot Service'],
  },
  {
    category: 'Databases',
    icon: '🗄️',
    skills: ['SQL Server', 'Entity Framework', 'Query Optimization', 'Database Design'],
  },
  {
    category: 'Tools & Platforms',
    icon: '🛠️',
    skills: ['Git', 'Azure DevOps', 'Postman', 'Visual Studio', 'VS Code'],
  },
  {
    category: 'Methodologies',
    icon: '📋',
    skills: ['Agile', 'Scrum', 'Sprint Planning', 'Code Reviews', 'SOLID Principles'],
  },
]

const softSkills = [
  'Client Communication',
  'Requirements Gathering',
  'Demo Presentation',
  'Cross-functional Collaboration',
  'Problem-solving',
  'On-time Delivery',
]

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <div className="container">
        <div className="section-title">
          <span className="number">02.</span>
          <h2>Tech Stack</h2>
          <div className="line" />
        </div>

        <div className={styles.grid}>
          {skillGroups.map((group) => (
            <div key={group.category} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.icon}>{group.icon}</span>
                <h3 className={styles.category}>{group.category}</h3>
              </div>
              <div className={styles.tags}>
                {group.skills.map((skill) => (
                  <span key={skill} className={`tag ${styles.skillTag}`}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.softSkills}>
          <h3 className={styles.softTitle}>
            <span className={styles.softIcon}>💬</span> Soft Skills
          </h3>
          <div className={styles.softTags}>
            {softSkills.map((s) => (
              <span key={s} className={styles.softTag}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
