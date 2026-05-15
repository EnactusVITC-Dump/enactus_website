"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const [activePanel, setActivePanel] = useState(0)
  const [placarMousePos, setPlacarMousePos] = useState({ x: 50, y: 50 })

  // Scroll progress calculation
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionHeight = sectionRef.current.offsetHeight
      const viewportHeight = window.innerHeight
      const scrollProgress = (-rect.top) / (sectionHeight - viewportHeight)
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress))
      const panel = Math.min(Math.floor(clampedProgress * 4), 3)
      setActivePanel(panel)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Placard mouse position for radial gradient
  const handlePlacardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setPlacarMousePos({ x, y })
  }, [])

  const getPanelClass = (panelIndex: number) => {
    if (panelIndex === activePanel) return "panel-visible"
    if (panelIndex < activePanel) return "panel-hidden-up"
    return "panel-hidden-down"
  }

  return (
    <section ref={sectionRef} className="relative" style={{ height: "500vh" }}>
      <div
        ref={stickyRef}
        className="sticky top-0 h-[calc(100vh-120px)] w-full overflow-hidden"
      >
        {/* Panel Content Container */}
        <div className="absolute inset-0 z-[10] flex items-center justify-center">
          
          {/* Panel 0 — Hero Title (Figma Accurate) */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center panel-transition ${getPanelClass(0)}`}
          >
            {/* Massive scalable SVG container for typography & tag */}
            <div className="relative w-full max-w-[1200px] aspect-[1200/500]">
              <svg viewBox="0 0 1200 500" className="w-full h-full overflow-visible">
                {/* ENACTUS Text */}
                <text
                  x="600"
                  y="400"
                  textAnchor="middle"
                  className="font-bebas"
                  style={{
                    fontSize: "390px",
                    fill: "#FFFFFF",
                    letterSpacing: "0.05em"
                  }}
                >
                  ENACTUS
                </text>
                
                {/* Logo overlapping the A */}
                <image 
                  href="/enactus-logo.png" 
                  x="480" 
                  y="120" 
                  width="280" 
                  height="280" 
                  className="transition-transform duration-300 hover:scale-110 cursor-pointer"
                />

                {/* Swinging Hanging Tag */}
                <motion.g
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [-2, 3, -1, 1, 0] }}
                  transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
                  style={{ transformOrigin: "120px 230px" }}
                >
                  {/* The string (Line 1) */}
                  <line 
                    x1="120" y1="230" 
                    x2="155" y2="280" 
                    stroke="#000000" 
                    strokeWidth="10" 
                  />
                  
                  {/* The tag body (Subtract / Rectangle) */}
                  <rect 
                    x="142" y="270" 
                    width="340" height="110" 
                    rx="10" 
                    fill="#F5C842" 
                    stroke="#000000" 
                    strokeWidth="2"
                    transform="rotate(6, 142, 270)"
                  />
                  
                  {/* Tag hole (Ellipse 1) */}
                  <circle 
                    cx="155" cy="285" 
                    r="6" 
                    fill="#D9D9D9" 
                    stroke="#000000" 
                    strokeWidth="1"
                  />
                  
                  {/* Tag Text */}
                  <g transform="rotate(6, 142, 270)">
                    <text x="175" y="300" fontFamily="var(--font-syne)" fontSize="16" fontWeight="800" fill="#000000" letterSpacing="0.02em">
                      ENTREPRENEURSHIP
                    </text>
                    
                    <text x="175" y="335" fontFamily="var(--font-syne)" fontSize="32" fontWeight="800" fill="#000000" letterSpacing="0.05em">
                      ACTION
                    </text>
                    
                    <text x="175" y="365" fontFamily="var(--font-syne)" fontSize="28" fontWeight="900" fill="#000000">
                      US
                    </text>
                  </g>
                </motion.g>
              </svg>
            </div>

            {/* Scroll Hint */}
            <motion.div
              className="absolute bottom-8 flex flex-col items-center gap-2"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="font-syne text-[10px] uppercase tracking-[3px] text-[rgba(240,236,228,0.3)]">
                Scroll
              </span>
              <motion.div
                className="w-[1px] bg-gold"
                animate={{ height: [16, 32, 16] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </div>

          {/* Panel 1 — Club Photo Placard */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center panel-transition ${getPanelClass(1)}`}
          >
            <div
              className="relative group overflow-hidden bg-enactus-gray rounded-[20px]"
              style={{
                width: "min(800px, 85vw)",
                aspectRatio: "16/9",
                border: "2px solid rgba(245,200,66,0.3)",
                boxShadow: "0 40px 120px rgba(0,0,0,0.8)",
              }}
              onMouseMove={handlePlacardMouseMove}
            >
              {/* Gradient Placeholder (replace with real photo) */}
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background: "linear-gradient(135deg, #1A1A1A 0%, #0E0E0E 40%, #1a1508 70%, #0E0E0E 100%)",
                  filter: "saturate(0.7)",
                }}
              />
              {/* Placeholder text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-bebas text-[clamp(28px,4vw,48px)] text-[rgba(245,200,66,0.15)]">
                  CLUB PHOTO HERE
                </span>
              </div>
              {/* Cursor-following radial gradient */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at ${placarMousePos.x}% ${placarMousePos.y}%, rgba(245,200,66,0.15), transparent 60%)`,
                }}
              />
            </div>

            {/* Caption */}
            <p className="font-dm-sans text-[rgba(240,236,228,0.4)] text-sm mt-8 text-center tracking-wide">
              200+ members · 10+ national championships · Countless lives changed
            </p>
          </div>

          {/* Panel 2 — Mission Statement */}
          <div
            className={`absolute inset-0 flex items-center justify-center px-6 panel-transition ${getPanelClass(2)}`}
          >
            <h2 className="font-bebas section-title text-center max-w-5xl text-enactus-white">
              WE USE{" "}
              <span className="text-gold">ENTREPRENEURIAL ACTION</span>
              <br />
              TO TRANSFORM LIVES AND SHAPE
              <br />
              A BETTER, MORE{" "}
              <span className="text-gold">SUSTAINABLE</span> WORLD
            </h2>
          </div>

          {/* Panel 3 — Join CTA */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center panel-transition ${getPanelClass(3)}`}
          >
            <motion.p
              className="font-syne text-[11px] font-bold uppercase tracking-[3px] text-[rgba(240,236,228,0.4)] mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={activePanel === 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Ready to make an impact?
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={activePanel === 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <a
                href="#"
                className="px-10 py-4 border border-gold text-gold font-syne text-[13px] font-bold uppercase tracking-[2px] hover:bg-gold hover:text-enactus-black transition-all duration-400"
                data-cursor-hover
              >
                Join Us
              </a>
              <a
                href="/projects"
                className="font-syne text-[13px] font-bold uppercase tracking-[2px] text-[rgba(240,236,228,0.5)] hover:text-gold transition-colors duration-300 flex items-center gap-2"
                data-cursor-hover
              >
                View Projects
                <span className="text-gold">→</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
