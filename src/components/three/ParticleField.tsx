"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

function Particles() {
  const pointsRef = useRef<THREE.Points>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  const count = 300

  const [{ positions, velocities }] = useState(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8

      velocities[i * 3] = (Math.random() - 0.5) * 0.002
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.001
    }

    return { positions, velocities }
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return

    const geometry = pointsRef.current.geometry
    const posArray = geometry.attributes.position.array as Float32Array
    const time = state.clock.getElapsedTime()

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Sine wave floating motion
      posArray[i3] += velocities[i3] + Math.sin(time * 0.3 + i * 0.1) * 0.001
      posArray[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.2 + i * 0.05) * 0.001
      posArray[i3 + 2] += velocities[i3 + 2]

      // Subtle mouse attraction
      const dx = mousePos.current.x * viewport.width * 0.5 - posArray[i3]
      const dy = mousePos.current.y * viewport.height * 0.5 - posArray[i3 + 1]
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 5) {
        posArray[i3] += dx * 0.0005
        posArray[i3 + 1] += dy * 0.0005
      }

      // Wrap around boundaries
      if (posArray[i3] > 10) posArray[i3] = -10
      if (posArray[i3] < -10) posArray[i3] = 10
      if (posArray[i3 + 1] > 6) posArray[i3 + 1] = -6
      if (posArray[i3 + 1] < -6) posArray[i3 + 1] = 6
    }

    geometry.attributes.position.needsUpdate = true
  })

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return geo
  }, [positions])

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#F5C842"
        size={0.04}
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

export default function ParticleField() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Particles />
      </Canvas>
    </div>
  )
}
