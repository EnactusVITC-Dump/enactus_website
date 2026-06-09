"use client"

import React from "react"
import { motion, MotionStyle } from "framer-motion"
import Image from "next/image"

interface EventCardProps {
  title: string
  description: string
  color: string
  textColor: string
  imageSrc: string
  style?: MotionStyle
  className?: string
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  color,
  textColor,
  imageSrc,
  style,
  className = "",
}) => {
  return (
    <motion.div
      style={style}
      className={`relative w-full h-[280px] rounded-[32px] overflow-visible flex items-center shadow-xl ${className}`}
    >
      {/* Background layer */}
      <div 
        className="absolute inset-0 rounded-[32px] w-full h-full overflow-hidden shadow-sm"
        style={{ backgroundColor: color }}
      >
        {/* Subtle inner shadow / highlight to make it look premium */}
        <div className="absolute inset-0 rounded-[32px] shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] pointer-events-none" />
      </div>

      {/* LEFT SECTION: Content */}
      <div className="relative z-10 w-[60%] h-full p-10 flex flex-col justify-center">
        <h3 
          className="font-syne text-4xl md:text-5xl font-bold mb-4"
          style={{ color: textColor }}
        >
          {title}
        </h3>
        <p 
          className="font-dm-sans font-medium text-lg leading-snug"
          style={{ color: textColor, opacity: 0.85 }}
        >
          {description}
        </p>
      </div>

      {/* RIGHT SECTION: Protruding Image */}
      <div className="absolute right-[-20px] md:right-8 top-[-60px] md:top-[-80px] w-[50%] md:w-[350px] h-[350px] md:h-[450px] pointer-events-none z-20">
        <div className="relative w-full h-full drop-shadow-2xl hover:scale-105 transition-transform duration-500">
          <Image 
            src={imageSrc} 
            alt={title} 
            fill
            className="object-contain"
            sizes="(max-width: 768px) 50vw, 350px"
          />
        </div>
      </div>
    </motion.div>
  )
}
