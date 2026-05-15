"use client"

import dynamic from "next/dynamic"
import HeroSection from "@/components/sections/HeroSection"
import MarqueeSection from "@/components/sections/MarqueeSection"
import WhatWeDoSection from "@/components/sections/WhatWeDoSection"
import StatsSection from "@/components/sections/StatsSection"
import ProjectsSection from "@/components/sections/ProjectsSection"
import Footer from "@/components/layout/Footer"

// Dynamically import Three.js component to avoid SSR issues
const ParticleField = dynamic(
  () => import("@/components/three/ParticleField"),
  { ssr: false }
)

export default function Home() {
  return (
    <>
      {/* Three.js Particle Field - behind everything */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticleField />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <HeroSection />
        <MarqueeSection />
        <WhatWeDoSection />
        <StatsSection />
        <ProjectsSection />
        <Footer />
      </div>
    </>
  )
}
