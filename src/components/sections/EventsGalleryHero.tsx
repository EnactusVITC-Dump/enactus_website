"use client"

import React from "react"

const TickerText = () => {
  // Repeat the text enough times to fill the ticker
  const repeatCount = 20
  return (
    <div className="flex whitespace-nowrap">
      {Array.from({ length: repeatCount }).map((_, i) => (
        <span key={i} className="mx-6">
          <span className="text-white">OUR</span>{" "}
          <span className="text-[#FFD200]">EVENTS</span>
        </span>
      ))}
    </div>
  )
}

export default function EventsGalleryHero() {
  return (
    <section 
      className="relative w-full h-[60vh] min-h-[400px] bg-[#000] overflow-hidden flex items-center justify-center font-bebas"
      style={{ perspective: "1200px" }}
    >
      
      {/* SVG Corridor Geometry */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none" 
        preserveAspectRatio="none" 
      >
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,210,0,0.12)" />
            <stop offset="60%" stopColor="transparent" />
          </radialGradient>
        </defs>
        
        {/* Radial Glow */}
        <rect x="0" y="0" width="100%" height="100%" fill="url(#glow)" />
        
        {/* Depth lines (Corners to Center Vanishing Point) */}
        <line x1="0" y1="0" x2="50%" y2="50%" stroke="rgba(255, 210, 0, 0.4)" strokeWidth="1" />
        <line x1="100%" y1="0" x2="50%" y2="50%" stroke="rgba(255, 210, 0, 0.4)" strokeWidth="1" />
        <line x1="0" y1="100%" x2="50%" y2="50%" stroke="rgba(255, 210, 0, 0.4)" strokeWidth="1" />
        <line x1="100%" y1="100%" x2="50%" y2="50%" stroke="rgba(255, 210, 0, 0.4)" strokeWidth="1" />

        {/* Nested Rectangles (Depth Rings) */}
        <rect x="8%"  y="10%" width="84%" height="80%" fill="none" stroke="rgba(255,210,0,0.2)"  strokeWidth="1.5" />
        <rect x="18%" y="20%" width="64%" height="60%" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <rect x="30%" y="32%" width="40%" height="36%" fill="none" stroke="rgba(255,255,255,0.1)"  strokeWidth="0.8" />
        <rect x="40%" y="42%" width="20%" height="16%" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
      </svg>

      {/* Vanishing Point Lockup */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none gap-3">
        {/* Section label */}
        <p className="text-[#FFD200] text-xs tracking-[0.3em] uppercase font-medium opacity-70">
          Enactus
        </p>

        {/* Main title */}
        <h1
          className="text-white uppercase text-center leading-none"
          style={{
            fontFamily: "inherit",
            fontSize: "clamp(48px, 8vw, 96px)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
          }}
        >
          Our<br />
          <span style={{ color: "#FFD200" }}>Events</span>
        </h1>

        {/* Scroll cue */}
        <div className="flex flex-col items-center gap-1 mt-4 opacity-40">
          <span className="text-white text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-white opacity-50" />
        </div>
      </div>

      {/* 3D Walls Container */}
      {/* 
        The text OUR EVENTS sits on the left and right walls. 
        Transform origins are on the far left and far right edges to pin them.
      */}

      {/* LEFT WALL */}
      <div 
        className="absolute left-0 top-[38%] w-[55%] overflow-hidden"
        style={{ 
          transformOrigin: "left center",
          transform: "perspective(600px) rotateY(30deg)",
        }}
      >
        <div className="flex w-full text-[clamp(32px,5vw,58px)] font-[900] tracking-[-0.02em] uppercase leading-none">
          {/* Main Ticker - Scrolls Right to Left */}
          <div className="flex animate-[ticker-left_20s_linear_infinite] w-max">
            <TickerText />
            <TickerText />
          </div>
        </div>
        
        {/* Floor Reflection */}
        <div className="flex w-full text-[clamp(32px,5vw,58px)] font-[900] tracking-[-0.02em] uppercase opacity-15 blur-[1px] scale-y-[-1] mt-1 leading-none">
          <div className="flex animate-[ticker-left_20s_linear_infinite] w-max">
            <TickerText />
            <TickerText />
          </div>
        </div>
      </div>

      {/* RIGHT WALL */}
      <div 
        className="absolute right-0 top-[38%] w-[55%] overflow-hidden"
        style={{ 
          transformOrigin: "right center",
          transform: "perspective(600px) rotateY(-30deg)",
        }}
      >
        <div className="flex w-full text-[clamp(32px,5vw,58px)] font-[900] tracking-[-0.02em] uppercase leading-none">
          {/* Main Ticker - Scrolls Left to Right */}
          <div className="flex animate-[ticker-right_20s_linear_infinite] w-max">
            <TickerText />
            <TickerText />
          </div>
        </div>
        
        {/* Floor Reflection */}
        <div className="flex w-full text-[clamp(32px,5vw,58px)] font-[900] tracking-[-0.02em] uppercase opacity-15 blur-[1px] scale-y-[-1] mt-1 leading-none">
          <div className="flex animate-[ticker-right_20s_linear_infinite] w-max">
            <TickerText />
            <TickerText />
          </div>
        </div>
      </div>

      {/* CSS Keyframes for the seamless ticker loops */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ticker-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes ticker-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}} />
    </section>
  )
}
