import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Hero3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let w = mount.clientWidth || 400
    let h = mount.clientHeight || 400

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100)
    camera.position.z = 6

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // Main icosahedron wireframe
    const icoGeo = new THREE.IcosahedronGeometry(2.0, 1)
    const icoEdges = new THREE.EdgesGeometry(icoGeo)
    const icoMat = new THREE.LineBasicMaterial({
      color: 0x64ffda,
      transparent: true,
      opacity: 0.75,
    })
    const icosahedron = new THREE.LineSegments(icoEdges, icoMat)
    scene.add(icosahedron)

    // Inner glowing sphere
    const sphereGeo = new THREE.SphereGeometry(0.85, 32, 32)
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x64ffda,
      transparent: true,
      opacity: 0.06,
    })
    const sphere = new THREE.Mesh(sphereGeo, sphereMat)
    scene.add(sphere)

    // Secondary octahedron wireframe
    const octGeo = new THREE.OctahedronGeometry(1.3)
    const octEdges = new THREE.EdgesGeometry(octGeo)
    const octMat = new THREE.LineBasicMaterial({
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.4,
    })
    const octahedron = new THREE.LineSegments(octEdges, octMat)
    scene.add(octahedron)

    // Orbital ring 1
    const ring1Geo = new THREE.TorusGeometry(2.7, 0.013, 4, 80)
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x64ffda,
      transparent: true,
      opacity: 0.22,
    })
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat)
    ring1.rotation.x = Math.PI / 3
    scene.add(ring1)

    // Orbital ring 2
    const ring2Geo = new THREE.TorusGeometry(3.0, 0.01, 4, 80)
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.18,
    })
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
    ring2.rotation.x = Math.PI / 5
    ring2.rotation.y = Math.PI / 4
    scene.add(ring2)

    // Orbital ring 3
    const ring3Geo = new THREE.TorusGeometry(3.3, 0.008, 4, 80)
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.15,
    })
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat)
    ring3.rotation.x = Math.PI / 2.5
    ring3.rotation.z = Math.PI / 6
    scene.add(ring3)

    // Floating particles around the shape
    const pGeo = new THREE.BufferGeometry()
    const pCount = 80
    const pPos = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const r = 3.0 + Math.random() * 1.4
      pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pPos[i * 3 + 2] = r * Math.cos(phi)
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({
      color: 0x64ffda,
      size: 0.065,
      transparent: true,
      opacity: 0.85,
    })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    let mouseX = 0
    let mouseY = 0
    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect()
      mouseX = ((e.clientX - rect.left) / mount.clientWidth - 0.5) * 2
      mouseY = ((e.clientY - rect.top) / mount.clientHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    let frameId
    let t = 0
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      t += 0.004

      icosahedron.rotation.x = t * 0.28 + mouseY * 0.18
      icosahedron.rotation.y = t * 0.45 + mouseX * 0.18

      octahedron.rotation.x = -t * 0.22 + mouseY * 0.1
      octahedron.rotation.y = t * 0.38 - mouseX * 0.1

      ring1.rotation.z += 0.004
      ring2.rotation.z -= 0.003
      ring3.rotation.z += 0.0025

      particles.rotation.y = t * 0.07
      particles.rotation.x = t * 0.04

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const nw = mount.clientWidth
      const nh = mount.clientHeight
      if (!nw || !nh) return
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      icoGeo.dispose(); icoEdges.dispose(); icoMat.dispose()
      sphereGeo.dispose(); sphereMat.dispose()
      octGeo.dispose(); octEdges.dispose(); octMat.dispose()
      ring1Geo.dispose(); ring1Mat.dispose()
      ring2Geo.dispose(); ring2Mat.dispose()
      ring3Geo.dispose(); ring3Mat.dispose()
      pGeo.dispose(); pMat.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100%', minHeight: '320px' }}
    />
  )
}
