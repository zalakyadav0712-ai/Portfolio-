import { useState } from 'react'
import styles from './AgenticFlow.module.css'

const AGENTS = [
  {
    id: 'trigger',
    label: 'Code Submit',
    sublabel: 'PR / Push Event',
    icon: '📤',
    color: '#60a5fa',
    type: 'trigger',
    description:
      'Developer submits a pull request or code push, triggering the automated agent review pipeline via Azure DevOps webhook.',
  },
  {
    id: 'codereviewr',
    label: 'CodeReviewr',
    sublabel: 'Review Agent',
    icon: '🔍',
    color: '#64ffda',
    type: 'agent',
    description:
      'AI-powered agent reviews code for best practices, naming conventions, logic errors, and React/.NET style consistency. Flags issues with inline comments.',
  },
  {
    id: 'sonarqube',
    label: 'SonarQube Quality',
    sublabel: 'Analysis Agent',
    icon: '📊',
    color: '#a78bfa',
    type: 'agent',
    description:
      'Static code analysis detects bugs, security vulnerabilities, code smells and measures test coverage. Enforces quality gates before merge.',
  },
  {
    id: 'performance',
    label: 'Perf Optimizer',
    sublabel: 'Performance Agent',
    icon: '⚡',
    color: '#fbbf24',
    type: 'agent',
    description:
      'Analyzes render performance, API response latency, memory leaks, and bundle sizes — then suggests targeted optimizations with before/after metrics.',
  },
  {
    id: 'systembreaker',
    label: 'System Breaker',
    sublabel: 'Stress Test Agent',
    icon: '🛡️',
    color: '#f87171',
    type: 'agent',
    description:
      'Stress tests edge cases, security vulnerabilities, API fault tolerance, and system resilience under simulated failure conditions and malformed inputs.',
  },
  {
    id: 'gate',
    label: 'Deploy Gate',
    sublabel: 'All Agents ✓',
    icon: '✅',
    color: '#34d399',
    type: 'output',
    description:
      'When all agents pass, code is automatically approved and deployed to production via Azure DevOps pipeline — zero manual intervention required.',
  },
]

export default function AgenticFlow() {
  const [activeId, setActiveId] = useState(null)
  const activeAgent = AGENTS.find(a => a.id === activeId)

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.badge}>🤖 Agentic Pipeline</span>
        <p className={styles.subtitle}>
          Automated multi-agent code review &amp; quality pipeline
        </p>
      </div>

      <div className={styles.flow}>
        {AGENTS.map((agent, i) => (
          <div key={agent.id} className={styles.nodeWrapper}>
            <button
              className={`${styles.node} ${activeId === agent.id ? styles.active : ''} ${styles[agent.type]}`}
              onClick={() => setActiveId(activeId === agent.id ? null : agent.id)}
              style={{ '--agent-color': agent.color }}
              aria-expanded={activeId === agent.id}
            >
              <span className={styles.nodeIcon}>{agent.icon}</span>
              <span className={styles.nodeLabel}>{agent.label}</span>
              <span className={styles.nodeSublabel}>{agent.sublabel}</span>
            </button>

            {i < AGENTS.length - 1 && (
              <div className={styles.connector}>
                <div className={styles.connLine} />
                <div className={styles.connPulse} />
                <div className={styles.connArrow}>›</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {activeAgent && (
        <div
          className={styles.tooltip}
          style={{ '--agent-color': activeAgent.color }}
        >
          <div className={styles.tooltipHeader}>
            <span className={styles.tooltipIcon}>{activeAgent.icon}</span>
            <span className={styles.tooltipTitle}>{activeAgent.label}</span>
            <span className={styles.tooltipType}>{activeAgent.sublabel}</span>
          </div>
          <p className={styles.tooltipDesc}>{activeAgent.description}</p>
        </div>
      )}

      {!activeAgent && (
        <p className={styles.hint}>
          Click any agent node to see what it does
        </p>
      )}
    </div>
  )
}
