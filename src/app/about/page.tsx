"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Footer from "@/components/layout/Footer"

// Node data for the Ecosystem Infographic
const ecosystemNodes = [
  {
    id: "INNOVATION",
    label: "INNOVATION",
    angle: 72, // angle in degrees
    radiusPercent: 38, // outer circle
    desc: "We apply creative thinking and entrepreneurial action to design innovative business models that target systemic social and environmental issues.",
  },
  {
    id: "IMPACT",
    label: "IMPACT",
    angle: 5,
    radiusPercent: 25, // middle circle
    desc: "We measure our success by the lives transformed. Our projects create tangible, direct economic and social value for community members.",
  },
  {
    id: "SUSTAINABILITY",
    label: "SUSTAINABILITY",
    angle: 312,
    radiusPercent: 38, // outer circle
    desc: "We build self-sustaining social enterprises that continue to operate and generate positive change independent of temporary external funding.",
  },
  {
    id: "LEADERSHIP",
    label: "LEADERSHIP",
    angle: 228,
    radiusPercent: 25, // middle circle
    desc: "We develop empathetic student leaders with the skills, resilience, and business acumen necessary to guide complex projects and drive real-world transformation.",
  },
  {
    id: "COMMUNITY",
    label: "COMMUNITY",
    angle: 144,
    radiusPercent: 38, // outer circle
    desc: "We foster a collaborative network of students, academic mentors, and business advisors working towards a shared vision of a better, more sustainable world.",
  },
]

// Metric count up animator component
const CountUp = ({
  end,
  duration = 1.5,
  suffix = "",
  decimals = 0,
  start = false,
}: {
  end: number
  duration?: number
  suffix?: string
  decimals?: number
  start?: boolean
}) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return

    let startTime: number | null = null
    let animationFrameId: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)

      // Easing: easeOutQuad
      const easeProgress = progress * (2 - progress)
      const current = easeProgress * end

      setCount(current)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [end, duration, start])

  if (!start) return <span>0{suffix}</span>
  return (
    <span>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  )
}

export default function AboutPage() {
  const [activeNode, setActiveNode] = useState<typeof ecosystemNodes[0] | null>(null)
  const [isInView, setIsInView] = useState(false)
  const metricsRef = useRef<HTMLDivElement>(null)

  // Intersection observer to trigger count up
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    const currentMetricsRef = metricsRef.current
    if (currentMetricsRef) {
      observer.observe(currentMetricsRef)
    }

    return () => {
      if (currentMetricsRef) {
        observer.unobserve(currentMetricsRef)
      }
    }
  }, [])

  return (
    <>
      <style>{`
        @keyframes marching-ants {
          0% {
            stroke-dashoffset: 24;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        
        .marching-ants-line {
          stroke-dasharray: 6, 4;
          animation: marching-ants 0.8s linear infinite;
        }
      `}</style>

      <section className="relative px-4 md:px-8 py-4 min-h-screen flex flex-col justify-start">
        {/* Main Hero Container: Large Rounded Black Card */}
        <div className="flex-1 w-full max-w-[1600px] mx-auto bg-[#050505] rounded-[32px] md:rounded-[48px] border border-[rgba(245,200,66,0.08)] relative overflow-hidden shadow-[0_0_50px_rgba(242,195,0,0.02)] flex flex-col justify-between p-6 md:p-12 lg:p-16">
          
          {/* Subtle Tech Dotted Grid Background */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.15] z-0" 
            style={{ 
              backgroundImage: "radial-gradient(rgba(242, 195, 0, 0.15) 1.5px, transparent 1.5px)", 
              backgroundSize: "24px 24px" 
            }} 
          />

          {/* Animate soft ambient glow blobs slowly */}
          <motion.div
            animate={{
              scale: [1, 1.12, 0.95, 1],
              opacity: [0.35, 0.5, 0.3, 0.35],
              x: [0, 15, -10, 0],
              y: [0, -10, 15, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[rgba(245,200,66,0.04)] blur-[120px] pointer-events-none z-0"
          />
          <motion.div
            animate={{
              scale: [1, 0.9, 1.1, 1],
              opacity: [0.25, 0.38, 0.2, 0.25],
              x: [0, -20, 15, 0],
              y: [0, 15, -10, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[rgba(245,200,66,0.035)] blur-[120px] pointer-events-none z-0"
          />

          {/* Watermark Outlined Diagonal Text "ENACTUS" */}
          <div className="absolute inset-0 select-none pointer-events-none flex items-center justify-center overflow-hidden z-0">
            <span 
              className="font-bebas text-[28vw] md:text-[22vw] font-black text-transparent tracking-[0.12em] rotate-[-15deg] uppercase select-none leading-none"
              style={{
                WebkitTextStroke: "1px rgba(255, 255, 255, 0.02)"
              }}
            >
              ENACTUS
            </span>
          </div>

          {/* Grid Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center z-10 flex-1 w-full">
            {/* Left Content (6 cols on lg) */}
            <div className="lg:col-span-6 flex flex-col justify-center text-left">
              <span className="font-bebas text-gold text-lg md:text-xl tracking-[0.2em] mb-4 uppercase">
                ABOUT ENACTUS
              </span>
              <h1 className="font-bebas text-white text-4xl md:text-5xl lg:text-[70px] tracking-[0.03em] leading-[0.98] mb-6 uppercase">
                WE ARE A NONPROFIT ORGANISATION
                <br />
                AND WORK WORLDWIDE
              </h1>
              <p className="font-dm-sans text-[rgba(240,236,228,0.65)] text-base md:text-[17px] leading-[1.8] mb-8 max-w-xl">
                Enactus is a global community of students, academic and business leaders using
                entrepreneurial action to create sustainable impact.
              </p>

              {/* Dynamic Interactive Node Details Pane */}
              <div className="border-t border-[rgba(245,200,66,0.12)] pt-6 mt-2 min-h-[140px] md:min-h-[120px] flex flex-col justify-start">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeNode ? activeNode.id : "core"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span className="font-bebas text-xs text-gold tracking-[0.25em] block mb-2.5 uppercase">
                      {activeNode ? `${activeNode.id} FOCUS` : "ECOSYSTEM CORE"}
                    </span>
                    <p className="text-xs md:text-sm font-dm-sans text-[rgba(240,236,228,0.45)] leading-relaxed">
                      {activeNode
                        ? activeNode.desc
                        : "Hover over the nodes on the ecosystem diagram to explore our key pillars of social entrepreneurship and community action."}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Visual Ecosystem Diagram (6 cols on lg) */}
            <div className="lg:col-span-6 flex items-center justify-center relative w-full h-[350px] md:h-[450px] lg:h-[500px]">
              {/* Concentric Rotating Circles Container */}
              <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] flex items-center justify-center">
                
                {/* Outer Circle (Concentric Circle 3) - Dashed tech-ring with Clockwise Rotation */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
                  className="absolute w-[76%] h-[76%] rounded-full border border-dashed border-[rgba(245,200,66,0.14)] shadow-[0_0_30px_rgba(245,200,66,0.03)]"
                />

                {/* Middle Circle (Concentric Circle 2) - Thin solid border with Counter-Clockwise Rotation */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
                  className="absolute w-[50%] h-[50%] rounded-full border border-[rgba(245,200,66,0.09)] shadow-[0_0_15px_rgba(245,200,66,0.01)]"
                />

                {/* Inner Circle (Concentric Circle 1) - Dashed Clockwise Rotation */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
                  className="absolute w-[30%] h-[30%] rounded-full border border-dashed border-[rgba(245,200,66,0.18)] shadow-[0_0_20px_rgba(245,200,66,0.05)]"
                />

                {/* Center Node (ENACTUS core) - Premium Glossy Double-Ring Layout */}
                <motion.div
                  animate={{
                    scale: [1, 1.02, 1],
                    boxShadow: [
                      "0 0 25px rgba(242,195,0,0.15)",
                      "0 0 45px rgba(242,195,0,0.3)",
                      "0 0 25px rgba(242,195,0,0.15)",
                    ],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                  className="absolute z-20 w-[90px] h-[90px] md:w-[124px] md:h-[124px] rounded-full bg-gradient-to-br from-[#F2C300] via-[#F2C300] to-[#C9A020] flex items-center justify-center cursor-default select-none border border-white/20 p-1"
                >
                  {/* Concentric inner border structure */}
                  <div className="w-full h-full rounded-full border border-black/10 flex items-center justify-center bg-gradient-to-br from-[#F2C300] to-[#C9A020] relative overflow-hidden shadow-[inset_0_4px_12px_rgba(255,255,255,0.4)]">
                    {/* Gloss glassmorphic overlay */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent rounded-t-full pointer-events-none" />
                    
                    <span className="font-bebas text-black text-xl md:text-2xl font-bold tracking-[0.12em] text-center drop-shadow-[0_1px_2px_rgba(255,255,255,0.3)]">
                      ENACTUS
                    </span>
                  </div>
                </motion.div>

                {/* SVG Connector Lines Overlay */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                  {ecosystemNodes.map((node) => {
                    const rad = (node.angle * Math.PI) / 180
                    // Calculate percentage target point coordinates
                    const x = 50 + node.radiusPercent * Math.cos(rad)
                    const y = 50 - node.radiusPercent * Math.sin(rad)
                    const isHovered = activeNode?.id === node.id

                    return (
                      <line
                        key={node.id}
                        x1="50%"
                        y1="50%"
                        x2={`${x}%`}
                        y2={`${y}%`}
                        stroke={isHovered ? "#F2C300" : "rgba(242, 195, 0, 0.15)"}
                        strokeWidth={isHovered ? "2" : "1"}
                        className={`transition-all duration-300 ${isHovered ? "marching-ants-line" : ""}`}
                      />
                    )
                  })}
                </svg>

                {/* Interactive Surrounding Nodes */}
                {ecosystemNodes.map((node) => {
                  const rad = (node.angle * Math.PI) / 180
                  const x = 50 + node.radiusPercent * Math.cos(rad)
                  const y = 50 - node.radiusPercent * Math.sin(rad)
                  
                  const isAnyNodeHovered = activeNode !== null
                  const isThisNodeHovered = activeNode?.id === node.id
                  const nodeOpacity = isAnyNodeHovered && !isThisNodeHovered ? 0.35 : 1

                  // Custom alignment class helper based on angles to map text correctly
                  let textPositionClass = ""
                  if (node.angle === 72) {
                    // INNOVATION: top
                    textPositionClass = "bottom-full mb-3.5 left-1/2 -translate-x-1/2"
                  } else if (node.angle === 5) {
                    // IMPACT: right
                    textPositionClass = "left-full ml-4 top-1/2 -translate-y-1/2"
                  } else if (node.angle === 312) {
                    // SUSTAINABILITY: bottom-right
                    textPositionClass = "left-full ml-2.5 top-full mt-2.5"
                  } else if (node.angle === 228) {
                    // LEADERSHIP: bottom-left
                    textPositionClass = "right-full mr-2.5 top-full mt-2.5"
                  } else if (node.angle === 144) {
                    // COMMUNITY: top-left
                    textPositionClass = "right-full mr-4 bottom-full mb-1"
                  }

                  return (
                    <motion.div
                      key={node.id}
                      style={{ left: `${x}%`, top: `${y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                      onMouseEnter={() => setActiveNode(node)}
                      onMouseLeave={() => setActiveNode(null)}
                      animate={{ opacity: nodeOpacity }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Interactive Dot Node */}
                      <motion.div
                        animate={
                          isThisNodeHovered
                            ? {
                                scale: 1.5,
                                backgroundColor: "#ffffff",
                                boxShadow: "0 0 15px #F2C300, 0 0 30px #F2C300",
                              }
                            : { scale: 1, backgroundColor: "#F2C300" }
                        }
                        className="w-3.5 h-3.5 rounded-full border border-black cursor-pointer transition-colors duration-300 relative"
                      >
                        {/* Glow Halo */}
                        {isThisNodeHovered && (
                          <span className="absolute -inset-1.5 rounded-full border border-gold opacity-50 animate-ping" />
                        )}
                      </motion.div>

                      {/* Text Label */}
                      <span
                        className={`absolute font-bebas text-xs md:text-sm tracking-[0.2em] transition-all duration-300 pointer-events-none whitespace-nowrap ${
                          isThisNodeHovered ? "text-gold font-bold scale-105" : "text-[rgba(240,236,228,0.5)]"
                        } ${textPositionClass}`}
                      >
                        {node.label}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Bottom Impact Metrics Timeline Section */}
          <div ref={metricsRef} className="z-10 mt-16 md:mt-24 w-full">
            {/* Desktop and Tablet Timeline (md and up) */}
            <div className="hidden md:block relative w-full px-6">
              
              {/* Timeline Horizontal Connector Line */}
              <div className="absolute left-[15%] right-[15%] top-[90px] h-[1px] bg-[rgba(245,200,66,0.15)] z-0">
                {/* Glowing Active Center Line */}
                <div className="absolute left-0 right-0 top-0 bottom-0 bg-gold shadow-[0_0_12px_#F2C300] opacity-70" />
              </div>

              {/* Ruler-style Ticks along the timeline */}
              <div className="absolute left-[15%] right-[15%] top-[86px] h-[8px] flex justify-between px-2 pointer-events-none z-0">
                {Array.from({ length: 41 }).map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`w-[1px] bg-gold/25 transition-all duration-300 ${
                      idx % 10 === 0 ? "h-3" : idx % 5 === 0 ? "h-2" : "h-1"
                    }`} 
                  />
                ))}
              </div>

              {/* Spaced Flex Rows for Metrics */}
              <div className="flex justify-between items-start max-w-[1200px] mx-auto relative z-10">
                
                {/* Metric 1 */}
                <motion.div 
                  whileHover={{ scale: 1.04, y: -4 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="w-1/3 flex flex-col items-center text-center cursor-pointer group/metric px-4 py-5 rounded-2xl border border-transparent hover:border-gold/10 hover:bg-white/[0.015] hover:backdrop-blur-sm transition-all duration-300 relative"
                >
                  <div className="h-[45px] flex items-end mb-2">
                    <span className="font-bebas text-gold text-4xl lg:text-5xl font-bold tracking-[0.02em] leading-none drop-shadow-[0_0_12px_rgba(242,195,0,0.25)] transition-all duration-300 group-hover/metric:scale-105 group-hover/metric:text-white">
                      <CountUp end={36} suffix="+" start={isInView} />
                    </span>
                  </div>
                  
                  {/* Spacing placeholder in normal flow */}
                  <div className="h-8" />
                  
                  {/* Timeline Node Dot (Absolute positioned to align centers exactly at 90px timeline height) */}
                  <div className="absolute top-[90px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 pointer-events-none">
                    {/* Outer Orbit/Glow Ring (Brighter, defined, and responsive to hover) */}
                    <div className="absolute w-full h-full rounded-full border-2 border-gold/75 bg-gold/15 shadow-[0_0_18px_rgba(242,195,0,0.45)] scale-90 group-hover/metric:scale-115 group-hover/metric:border-gold group-hover/metric:shadow-[0_0_28px_rgba(242,195,0,0.75)] transition-all duration-300" />
                    
                    {/* Inner Core Dot */}
                    <div className="w-[14px] h-[14px] rounded-full border-[3px] border-[#050505] bg-gold z-10 transition-all duration-300 group-hover/metric:scale-110 group-hover/metric:bg-white relative flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-white opacity-40 animate-pulse group-hover/metric:opacity-70" />
                    </div>
                  </div>

                  <span className="font-bebas text-[13px] text-[rgba(240,236,228,0.5)] tracking-[0.25em] uppercase mt-2 transition-all duration-300 group-hover/metric:text-gold">
                    COUNTRIES
                  </span>
                </motion.div>

                {/* Metric 2 */}
                <motion.div 
                  whileHover={{ scale: 1.04, y: -4 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="w-1/3 flex flex-col items-center text-center cursor-pointer group/metric px-4 py-5 rounded-2xl border border-transparent hover:border-gold/10 hover:bg-white/[0.015] hover:backdrop-blur-sm transition-all duration-300 relative"
                >
                  <div className="h-[45px] flex items-end mb-2">
                    <span className="font-bebas text-gold text-4xl lg:text-5xl font-bold tracking-[0.02em] leading-none drop-shadow-[0_0_12px_rgba(242,195,0,0.25)] transition-all duration-300 group-hover/metric:scale-105 group-hover/metric:text-white">
                      <CountUp end={1700} suffix="+" start={isInView} />
                    </span>
                  </div>
                  
                  {/* Spacing placeholder in normal flow */}
                  <div className="h-8" />
                  
                  {/* Timeline Node Dot (Absolute positioned to align centers exactly at 90px timeline height) */}
                  <div className="absolute top-[90px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 pointer-events-none">
                    {/* Outer Orbit/Glow Ring (Brighter, defined, and responsive to hover) */}
                    <div className="absolute w-full h-full rounded-full border-2 border-gold/75 bg-gold/15 shadow-[0_0_18px_rgba(242,195,0,0.45)] scale-90 group-hover/metric:scale-115 group-hover/metric:border-gold group-hover/metric:shadow-[0_0_28px_rgba(242,195,0,0.75)] transition-all duration-300" />
                    
                    {/* Inner Core Dot */}
                    <div className="w-[14px] h-[14px] rounded-full border-[3px] border-[#050505] bg-gold z-10 transition-all duration-300 group-hover/metric:scale-110 group-hover/metric:bg-white relative flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-white opacity-40 animate-pulse group-hover/metric:opacity-70" />
                    </div>
                  </div>

                  <span className="font-bebas text-[13px] text-[rgba(240,236,228,0.5)] tracking-[0.25em] uppercase mt-2 transition-all duration-300 group-hover/metric:text-gold">
                    UNIVERSITIES
                  </span>
                </motion.div>

                {/* Metric 3 */}
                <motion.div 
                  whileHover={{ scale: 1.04, y: -4 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="w-1/3 flex flex-col items-center text-center cursor-pointer group/metric px-4 py-5 rounded-2xl border border-transparent hover:border-gold/10 hover:bg-white/[0.015] hover:backdrop-blur-sm transition-all duration-300 relative"
                >
                  <div className="h-[45px] flex items-end mb-2">
                    <span className="font-bebas text-gold text-4xl lg:text-5xl font-bold tracking-[0.02em] leading-none drop-shadow-[0_0_12px_rgba(242,195,0,0.25)] transition-all duration-300 group-hover/metric:scale-105 group-hover/metric:text-white">
                      <CountUp end={1.95} suffix="M+" decimals={2} start={isInView} />
                    </span>
                  </div>
                  
                  {/* Spacing placeholder in normal flow */}
                  <div className="h-8" />
                  
                  {/* Timeline Node Dot (Absolute positioned to align centers exactly at 90px timeline height) */}
                  <div className="absolute top-[90px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 pointer-events-none">
                    {/* Outer Orbit/Glow Ring (Brighter, defined, and responsive to hover) */}
                    <div className="absolute w-full h-full rounded-full border-2 border-gold/75 bg-gold/15 shadow-[0_0_18px_rgba(242,195,0,0.45)] scale-90 group-hover/metric:scale-115 group-hover/metric:border-gold group-hover/metric:shadow-[0_0_28px_rgba(242,195,0,0.75)] transition-all duration-300" />
                    
                    {/* Inner Core Dot */}
                    <div className="w-[14px] h-[14px] rounded-full border-[3px] border-[#050505] bg-gold z-10 transition-all duration-300 group-hover/metric:scale-110 group-hover/metric:bg-white relative flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-white opacity-40 animate-pulse group-hover/metric:opacity-70" />
                    </div>
                  </div>

                  <span className="font-bebas text-[13px] text-[rgba(240,236,228,0.5)] tracking-[0.25em] uppercase mt-2 transition-all duration-300 group-hover/metric:text-gold">
                    EMPOWERED
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Mobile Stacked Vertical Timeline (sm and down) */}
            <div className="md:hidden flex flex-col relative pl-8 py-2">
              {/* Vertical Connector Line */}
              <div className="absolute left-[13px] top-0 bottom-0 w-[1px] bg-[rgba(245,200,66,0.2)] z-0">
                <div className="absolute left-0 right-0 top-0 bottom-0 bg-gold shadow-[0_0_10px_#F2C300] opacity-60" />
              </div>

              {/* Mobile Metric 1 */}
              <div className="flex flex-col items-start mb-8 relative z-10">
                {/* Timeline Dot positioned over the line */}
                <div className="absolute left-[-26px] top-[14px] w-[14px] h-[14px] rounded-full border-2 border-[#050505] bg-gold shadow-[0_0_8px_#F2C300]" />
                <span className="font-bebas text-gold text-3xl font-bold tracking-wide">
                  <CountUp end={36} suffix="+" start={isInView} />
                </span>
                <span className="font-bebas text-[11px] text-[rgba(240,236,228,0.4)] tracking-[0.2em] uppercase mt-0.5">
                  COUNTRIES
                </span>
              </div>

              {/* Mobile Metric 2 */}
              <div className="flex flex-col items-start mb-8 relative z-10">
                {/* Timeline Dot positioned over the line */}
                <div className="absolute left-[-26px] top-[14px] w-[14px] h-[14px] rounded-full border-2 border-[#050505] bg-gold shadow-[0_0_8px_#F2C300]" />
                <span className="font-bebas text-gold text-3xl font-bold tracking-wide">
                  <CountUp end={1700} suffix="+" start={isInView} />
                </span>
                <span className="font-bebas text-[11px] text-[rgba(240,236,228,0.4)] tracking-[0.2em] uppercase mt-0.5">
                  UNIVERSITIES
                </span>
              </div>

              {/* Mobile Metric 3 */}
              <div className="flex flex-col items-start relative z-10">
                {/* Timeline Dot positioned over the line */}
                <div className="absolute left-[-26px] top-[14px] w-[14px] h-[14px] rounded-full border-2 border-[#050505] bg-gold shadow-[0_0_8px_#F2C300]" />
                <span className="font-bebas text-gold text-3xl font-bold tracking-wide">
                  <CountUp end={1.95} suffix="M+" decimals={2} start={isInView} />
                </span>
                <span className="font-bebas text-[11px] text-[rgba(240,236,228,0.4)] tracking-[0.2em] uppercase mt-0.5">
                  EMPOWERED
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </>
  )
}
