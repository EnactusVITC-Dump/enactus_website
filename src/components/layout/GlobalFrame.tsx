"use client"

import React from "react"

export default function GlobalFrame() {
  return (
    <div className="fixed inset-0 z-[40] pointer-events-none flex flex-col">
      {/* Top Bar (Navbar area is inside this) */}
      {/* The navbar is fixed on its own, so we just create the visual frame here */}
      <div className="h-[100px] w-full bg-gold relative">
        {/* SVG to create the gaming console curved cutout into the black area */}
        <svg 
          className="absolute bottom-[-40px] left-[20px] right-[20px] w-[calc(100%-40px)] h-[40px]" 
          preserveAspectRatio="none" 
          viewBox="0 0 100 40"
        >
          <path d="M0,0 L100,0 C100,0 95,40 90,40 L10,40 C5,40 0,0 0,0 Z" fill="#F5C842" />
        </svg>
      </div>
      
      {/* Side Borders */}
      <div className="flex-1 border-l-[20px] border-r-[20px] border-gold"></div>
      
      {/* Bottom Border */}
      <div className="h-[20px] w-full bg-gold"></div>
    </div>
  )
}
