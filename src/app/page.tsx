"use client"

import GlobalBackground from "@/components/layout/GlobalBackground"

import HeroSection from "@/components/sections/HeroSection"
import ImageSlider from "@/components/sections/ImageSlider"
import MarqueeSection from "@/components/sections/MarqueeSection"
import WhatWeDoSection from "@/components/sections/WhatWeDoSection"
import StatsSection from "@/components/sections/StatsSection"
import ProjectsSection from "@/components/sections/ProjectsSection"


export default function Home() {
  return (
    <>
      <GlobalBackground />
      {/* Main Content */}
      <div className="relative z-10">
        <HeroSection />
        <ImageSlider />
        <MarqueeSection />
        <WhatWeDoSection />
        <StatsSection />
        <ProjectsSection />

      </div>
    </>
  )
}
