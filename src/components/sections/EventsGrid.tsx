"use client"

import React, { useRef } from "react"
import { useScroll, useTransform } from "framer-motion"
import { EventCard } from "@/components/ui/EventCard"

const EVENT_DATA = [
  {
    title: "UTSAV",
    description: "Annual sale of all catalogue products from Enactus VIT Chennai projects — open to students and faculty on campus. Shop impact.",
    color: "#F6E8D6", // Cream
    textColor: "#3D3A35",
    imageSrc: "/images/events/utsav.png",
    rotation: -2,
  },
  {
    title: "PERIOD PAIN WAVE",
    description: "Experience period pain firsthand — a TENS machine strapped to participants simulates menstrual cramps, building empathy and awareness.",
    color: "#2C2D31", // Dark Grey
    textColor: "#FFFFFF",
    imageSrc: "/images/events/period_pain_wave.png",
    rotation: 1,
  },
  {
    title: "INTO THE DEPTHS",
    description: "VR meets scuba diving — an immersive experience that takes you into the deep ocean without leaving campus.",
    color: "#88D4E6", // Light Blue
    textColor: "#1A4B59",
    imageSrc: "/images/events/into_the_depths.png",
    rotation: -1.5,
  },
  {
    title: "ATOOT",
    description: "Coconut rakhi distribution across India during Rakshabandhan — celebrating bonds, supporting artisans, spreading joy.",
    color: "#FBEA56", // Vibrant Yellow
    textColor: "#5A531A",
    imageSrc: "/images/events/atoot.png",
    rotation: 2,
  },
]

export default function EventsGrid() {
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  })

  // Staggered Y offsets to create the "fan out" deck of cards effect
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 0])
  const y2 = useTransform(scrollYProgress, [0, 1], [100, 0])
  const y3 = useTransform(scrollYProgress, [0, 1], [200, 0])
  const y4 = useTransform(scrollYProgress, [0, 1], [300, 0])
  const transforms = [y1, y2, y3, y4]

  return (
    <section 
      ref={containerRef} 
      className="relative w-full max-w-4xl mx-auto px-6 py-32 pb-48"
    >
      <div className="flex flex-col items-center">
        {EVENT_DATA.map((event, index) => (
          <EventCard
            key={event.title}
            {...event}
            style={{ y: transforms[index], zIndex: index, rotate: event.rotation }}
            className={index > 0 ? "-mt-10" : ""} // Negative margin to stack them
          />
        ))}
      </div>
    </section>
  )
}
