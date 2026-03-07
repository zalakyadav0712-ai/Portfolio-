import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.z = 80

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // Particles
    const particleCount = 1800
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    const colorOptions = [
      new THREE.Color('#64ffda'),
      new THREE.Color('#a78bfa'),
      new THREE.Color('#60a5fa'),
      new THREE.Color('#34d399'),
    ]

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 260
      positions[i * 3 + 1] = (Math.random() - 0.5) * 160
      positions[i * 3 + 2] = (Math.random() - 0.5) * 120

      const c = colorOptions[Math.floor(Math.random() * colorOptions.length)]
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b

      sizes[i] = Math.random() * 1.5 + 0.3
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const material = new THREE.PointsMaterial({
      size: 0.7,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Floating geometric lines (constellation effect)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x64ffda,
      transparent: true,
      opacity: 0.06,
    })

    for (let i = 0; i < 18; i++) {
      const lineGeo = new THREE.BufferGeometry()
      const pts = []
      const segments = Math.floor(Math.random() * 4) + 3
      for (let j = 0; j < segments; j++) {
        pts.push(
          (Math.random() - 0.5) * 240,
          (Math.random() - 0.5) * 140,
          (Math.random() - 0.5) * 80
        )
      }
      lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
      const line = new THREE.Line(lineGeo, lineMaterial)
      scene.add(line)
    }

    // Mouse interaction
    let mouseX = 0
    let mouseY = 0
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.4
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Resize
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // Animation loop
    let frameId
    let t = 0
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      t += 0.0008

      particles.rotation.y = t * 0.15 + mouseX * 0.5
      particles.rotation.x = t * 0.08 + mouseY * 0.3

      // Gentle drift
      camera.position.x += (mouseX * 6 - camera.position.x) * 0.02
      camera.position.y += (-mouseY * 4 - camera.position.y) * 0.02
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
