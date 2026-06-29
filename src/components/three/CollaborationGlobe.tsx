"use client"

import { Suspense, useMemo, useRef, useState, useEffect } from "react"
import { Billboard, Float, useTexture } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

const GOLD = "#F5C842"
const SOFT_GOLD = "#C9A020"

type OrbitRingProps = {
  radius: number
  rotation: [number, number, number]
  speed: number
  nodes: number
  opacity: number
}

function toSpherePoint(latDeg: number, lonDeg: number, radius: number) {
  const lat = THREE.MathUtils.degToRad(latDeg)
  const lon = THREE.MathUtils.degToRad(lonDeg)
  const cosLat = Math.cos(lat)

  return new THREE.Vector3(
    radius * cosLat * Math.sin(lon),
    radius * Math.sin(lat),
    radius * cosLat * Math.cos(lon)
  )
}

function lonDistance(a: number, b: number) {
  const diff = Math.abs(a - b) % 360
  return diff > 180 ? 360 - diff : diff
}

function landScore(lat: number, lon: number) {
  const clusters = [
    { lat: 48, lon: -105, latSpread: 22, lonSpread: 34, weight: 1.1 },
    { lat: 18, lon: -88, latSpread: 16, lonSpread: 22, weight: 0.75 },
    { lat: -16, lon: -60, latSpread: 28, lonSpread: 18, weight: 0.95 },
    { lat: 52, lon: 18, latSpread: 18, lonSpread: 30, weight: 0.95 },
    { lat: 8, lon: 22, latSpread: 34, lonSpread: 24, weight: 1.0 },
    { lat: 34, lon: 78, latSpread: 24, lonSpread: 42, weight: 1.25 },
    { lat: 54, lon: 102, latSpread: 18, lonSpread: 42, weight: 0.95 },
    { lat: -25, lon: 134, latSpread: 12, lonSpread: 18, weight: 0.82 },
  ]

  return clusters.reduce((max, cluster) => {
    const latTerm = ((lat - cluster.lat) / cluster.latSpread) ** 2
    const lonTerm = (lonDistance(lon, cluster.lon) / cluster.lonSpread) ** 2
    const score = cluster.weight * Math.exp(-(latTerm + lonTerm))
    return Math.max(max, score)
  }, 0)
}

function useContinentPoints() {
  return useMemo(() => {
    const positions: number[] = []
    const colors: number[] = []
    const color = new THREE.Color()
    const samples = 7200
    const goldenAngle = 137.508

    for (let i = 0; i < samples; i++) {
      const y = 1 - (2 * (i + 0.5)) / samples
      const lat = THREE.MathUtils.radToDeg(Math.asin(y))
      const lon = ((i * goldenAngle) % 360) - 180
      const score = landScore(lat, lon)
      const textureNoise = 0.12 * Math.sin(i * 12.9898) + 0.08 * Math.cos(i * 78.233)

      if (score + textureNoise > 0.44) {
        const radius = 1.54 + 0.018 * Math.sin(i * 0.73)
        const point = toSpherePoint(lat, lon, radius)
        positions.push(point.x, point.y, point.z)

        color.set(i % 5 === 0 ? GOLD : "#F0ECE4")
        const intensity = i % 5 === 0 ? 0.85 : 0.38 + Math.min(score, 0.8) * 0.34
        colors.push(color.r * intensity, color.g * intensity, color.b * intensity)
      }
    }

    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors),
    }
  }, [])
}

function useDustPoints() {
  return useMemo(() => {
    const positions: number[] = []
    const colors: number[] = []
    const color = new THREE.Color(GOLD)

    for (let i = 0; i < 220; i++) {
      const angle = i * 2.39996
      const z = 1 - (2 * (i + 0.5)) / 220
      const ring = Math.sqrt(1 - z * z)
      const radius = 2.5 + (i % 17) * 0.045
      positions.push(
        Math.cos(angle) * ring * radius,
        z * radius * 0.76,
        Math.sin(angle) * ring * radius
      )

      const intensity = 0.18 + (i % 7) * 0.045
      colors.push(color.r * intensity, color.g * intensity, color.b * intensity)
    }

    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors),
    }
  }, [])
}

function GlobeBody() {
  const globeRef = useRef<THREE.Group>(null)
  const points = useContinentPoints()

  useFrame((_, delta) => {
    if (!globeRef.current) return
    globeRef.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={globeRef} rotation={[0.08, -0.48, -0.08]}>
      <mesh>
        <sphereGeometry args={[1.5, 72, 72]} />
        <meshStandardMaterial
          color="#111111"
          emissive="#1a1404"
          emissiveIntensity={0.28}
          metalness={0.18}
          roughness={0.92}
          transparent
          opacity={0.34}
        />
      </mesh>
      <mesh scale={1.018}>
        <sphereGeometry args={[1.5, 72, 72]} />
        <meshBasicMaterial
          color="#F0ECE4"
          transparent
          opacity={0.016}
          wireframe
          depthWrite={false}
        />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[points.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.018}
          vertexColors
          transparent
          opacity={0.92}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

function OrbitRing({ radius, rotation, speed, nodes, opacity }: OrbitRingProps) {
  const ringRef = useRef<THREE.Group>(null)

  const nodePositions = useMemo(() => {
    return Array.from({ length: nodes }, (_, index) => {
      const angle = (index / nodes) * Math.PI * 2 + index * 0.21
      return new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0)
    })
  }, [nodes, radius])

  const linePositions = useMemo(() => {
    const values: number[] = []
    nodePositions.forEach((point, index) => {
      const next = nodePositions[(index + 2) % nodePositions.length]
      values.push(point.x, point.y, point.z, next.x, next.y, next.z)
    })
    return new Float32Array(values)
  }, [nodePositions])

  useFrame((_, delta) => {
    if (!ringRef.current) return
    ringRef.current.rotation.z += delta * speed
  })

  return (
    <group ref={ringRef} rotation={rotation}>
      <mesh>
        <torusGeometry args={[radius, 0.0045, 8, 220]} />
        <meshBasicMaterial
          color={GOLD}
          transparent
          opacity={opacity}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={SOFT_GOLD}
          transparent
          opacity={opacity * 0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
      {nodePositions.map((position, index) => (
        <Float
          key={`${radius}-${index}`}
          speed={0.65 + index * 0.05}
          floatIntensity={0.035}
          rotationIntensity={0}
        >
          <mesh position={position}>
            <sphereGeometry args={[index % 3 === 0 ? 0.046 : 0.032, 18, 18]} />
            <meshBasicMaterial
              color={GOLD}
              transparent
              opacity={0.92}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function LogoCore() {
  const logoRef = useRef<THREE.Group>(null)
  const texture = useTexture("/enactus-globe-logo.png")

  useFrame((state) => {
    if (!logoRef.current) return
    logoRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.035
  })

  return (
    <group ref={logoRef} renderOrder={10}>
      <Billboard follow>
        <mesh position={[0, 0, 0.42]} renderOrder={8}>
          <circleGeometry args={[0.58, 48]} />
          <meshBasicMaterial
            color={GOLD}
            transparent
            opacity={0.18}
            depthTest={false}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <mesh position={[0, 0, 0.48]} renderOrder={9}>
          <planeGeometry args={[0.88, 0.88]} />
          <meshBasicMaterial
            map={texture}
            transparent
            depthTest={false}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </Billboard>
    </group>
  )
}

function DustField() {
  const dust = useDustPoints()

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[dust.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[dust.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function GlobeScene() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const checkScale = () => {
      // Smoothly scale down on screens smaller than 550px, capped at 1
      setScale(Math.min(1, window.innerWidth / 550))
    }
    checkScale()
    window.addEventListener("resize", checkScale)
    return () => window.removeEventListener("resize", checkScale)
  }, [])

  return (
    <group scale={scale}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[-3, 2, 4]} intensity={1.4} color="#F0ECE4" />
      <pointLight position={[2.8, 1.3, 2.2]} intensity={42} color={GOLD} distance={7} />
      <group>
        <DustField />
        <GlobeBody />
        <OrbitRing radius={1.86} rotation={[0.38, 0.2, -0.08]} speed={0.22} nodes={8} opacity={0.28} />
        <OrbitRing radius={2.08} rotation={[1.08, -0.5, 0.18]} speed={-0.16} nodes={7} opacity={0.22} />
        <OrbitRing radius={2.28} rotation={[-0.64, 0.62, 0.35]} speed={0.13} nodes={9} opacity={0.18} />
        <OrbitRing radius={1.62} rotation={[1.36, 0.06, -0.42]} speed={-0.2} nodes={6} opacity={0.24} />
        <LogoCore />
      </group>
    </group>
  )
}

function GlobeFallback() {
  return (
    <div className="flex h-full min-h-[340px] w-full items-center justify-center">
      <div className="h-48 w-48 rounded-full border border-[rgba(245,200,66,0.35)] bg-[radial-gradient(circle,rgba(245,200,66,0.22),transparent_68%)]" />
    </div>
  )
}

export default function CollaborationGlobe() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[620px] overflow-visible md:aspect-[16/9]">
      <div className="pointer-events-none absolute inset-[10%] rounded-full bg-gold/15 blur-[70px]" />
      <Canvas
        camera={{ position: [0, 0, 5.1], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="outline-none"
      >
        <Suspense fallback={null}>
          <GlobeScene />
        </Suspense>
      </Canvas>
    </div>
  )
}

export { GlobeFallback }
