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

    // ─── Particles ───────────────────────────────────────────
    const particleCount = 2000
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
      positions[i * 3]     = (Math.random() - 0.5) * 280
      positions[i * 3 + 1] = (Math.random() - 0.5) * 180
      positions[i * 3 + 2] = (Math.random() - 0.5) * 130

      const c = colorOptions[Math.floor(Math.random() * colorOptions.length)]
      colors[i * 3]     = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b

      sizes[i] = Math.random() * 1.6 + 0.3
    }

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const particleMat = new THREE.PointsMaterial({
      size: 0.65,
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // ─── Constellation lines ──────────────────────────────────
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x64ffda,
      transparent: true,
      opacity: 0.055,
    })

    for (let i = 0; i < 22; i++) {
      const lineGeo = new THREE.BufferGeometry()
      const pts = []
      const segments = Math.floor(Math.random() * 5) + 3
      for (let j = 0; j < segments; j++) {
        pts.push(
          (Math.random() - 0.5) * 260,
          (Math.random() - 0.5) * 160,
          (Math.random() - 0.5) * 90,
        )
      }
      lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
      scene.add(new THREE.Line(lineGeo, lineMat))
    }

    // ─── Floating wireframe polyhedra ─────────────────────────
    const floaters = []

    const addFloater = (geo, color, x, y, z, scale = 1) => {
      const edges = new THREE.EdgesGeometry(geo)
      const mat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.12,
      })
      const mesh = new THREE.LineSegments(edges, mat)
      mesh.position.set(x, y, z)
      mesh.scale.setScalar(scale)
      scene.add(mesh)
      floaters.push({ mesh, speed: (Math.random() - 0.5) * 0.003 + 0.001 })
    }

    addFloater(new THREE.IcosahedronGeometry(6, 0), 0x64ffda, -50, 20, -30, 1)
    addFloater(new THREE.OctahedronGeometry(5),      0xa78bfa,  55, -18, -20, 1)
    addFloater(new THREE.TetrahedronGeometry(7),     0x60a5fa, -20, -35, -40, 1)
    addFloater(new THREE.IcosahedronGeometry(4, 0),  0x34d399,  40,  28, -50, 1)
    addFloater(new THREE.OctahedronGeometry(3.5),    0x64ffda,  -5,  42, -60, 1)

    // ─── Mouse interaction ────────────────────────────────────
    let mouseX = 0
    let mouseY = 0
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 0.4
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4
    }
    window.addEventListener('mousemove', handleMouseMove)

    // ─── Resize ───────────────────────────────────────────────
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // ─── Animation loop ───────────────────────────────────────
    let frameId
    let t = 0
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      t += 0.0008

      particles.rotation.y = t * 0.14 + mouseX * 0.5
      particles.rotation.x = t * 0.07 + mouseY * 0.3

      floaters.forEach(({ mesh, speed }, i) => {
        mesh.rotation.x += speed * 0.9
        mesh.rotation.y += speed
        mesh.rotation.z += speed * 0.6
        // gentle float
        mesh.position.y += Math.sin(t * 0.5 + i) * 0.008
      })

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
      particleGeo.dispose()
      particleMat.dispose()
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
