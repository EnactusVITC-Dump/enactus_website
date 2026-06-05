"use client"

import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center" style={{ height: "calc(100vh - 120px)" }}>
      <div className="w-full max-w-[1200px] px-4">
        <div className="relative w-full aspect-[1200/500]">
          <svg viewBox="0 0 1200 500" className="w-full h-full overflow-visible">
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

            <image
              href="/enactus-logo.png"
              x="480"
              y="120"
              width="280"
              height="280"
              className="transition-transform duration-300 hover:scale-110 cursor-pointer"
            />

            <g style={{ transformOrigin: "120px 230px" }}>
              <line x1="120" y1="230" x2="155" y2="280" stroke="#000000" strokeWidth="10" />
              <rect x="142" y="270" width="340" height="110" rx="10" fill="#F5C842" stroke="#000000" strokeWidth="2" transform="rotate(6, 142, 270)" />
              <circle cx="155" cy="285" r="6" fill="#D9D9D9" stroke="#000000" strokeWidth="1" />
              <g transform="rotate(6, 142, 270)">
                <text x="175" y="300" fontFamily="var(--font-syne)" fontSize="16" fontWeight="800" fill="#000000" letterSpacing="0.02em">ENTREPRENEURSHIP</text>
                <text x="175" y="335" fontFamily="var(--font-syne)" fontSize="32" fontWeight="800" fill="#000000" letterSpacing="0.05em">ACTION</text>
                <text x="175" y="365" fontFamily="var(--font-syne)" fontSize="28" fontWeight="900" fill="#000000">US</text>
              </g>
            </g>
          </svg>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="font-syne text-[10px] uppercase tracking-[3px] text-[rgba(240,236,228,0.3)]">Scroll</span>
          <motion.div className="w-[1px] bg-gold" animate={{ height: [16, 32, 16] }} transition={{ duration: 2, repeat: Infinity }} />
        </motion.div>
      </div>
    </section>
  )
}
