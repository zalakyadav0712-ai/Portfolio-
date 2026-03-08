import { useState } from 'react'
import ThreeBackground from './components/ThreeBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import ResumeModal from './components/ResumeModal'
import './App.css'

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false)

  return (
    <>
      <ThreeBackground />
      <Navbar onResumeClick={() => setResumeOpen(true)} />
      <main>
        <Hero onResumeClick={() => setResumeOpen(true)} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  )
}
