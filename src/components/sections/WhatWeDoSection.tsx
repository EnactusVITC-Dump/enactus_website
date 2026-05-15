"use client"

import { useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    number: "01",
    title: "Community Projects",
    description:
      "Design and execute entrepreneurial projects that empower communities and create sustainable social impact.",
  },
  {
    number: "02",
    title: "National Competitions",
    description:
      "Compete at regional, national, and world cup levels, showcasing innovative solutions to pressing challenges.",
  },
  {
    number: "03",
    title: "Leadership Development",
    description:
      "Build skills that last beyond campus — from project management to public speaking and strategic thinking.",
  },
]

export default function WhatWeDoSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.1,
        }
      )
    })
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 md:py-40 px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Label */}
        <div className="mb-16 md:mb-24">
          <p className="font-syne text-[11px] font-bold uppercase tracking-[3px] text-[rgba(240,236,228,0.4)] mb-4">
            What We Do
          </p>
          <h2 className="font-bebas text-enactus-white" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
            THREE PILLARS OF <span className="text-gold">IMPACT</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={card.number}
              ref={(el) => {
                if (el) cardsRef.current[i] = el
              }}
              className="group relative bg-enactus-gray border border-[rgba(245,200,66,0.08)] hover:border-[rgba(245,200,66,0.35)] transition-all duration-500 p-8 md:p-10"
            >
              {/* Large translucent number */}
              <span className="font-bebas text-[64px] text-gold opacity-[0.12] group-hover:opacity-[0.35] transition-opacity duration-500 absolute top-6 right-8 leading-none">
                {card.number}
              </span>

              {/* Content */}
              <div className="relative z-10 pt-12">
                <h3 className="font-syne text-[20px] font-bold text-enactus-white mb-4">
                  {card.title}
                </h3>
                <p className="font-dm-sans text-[14px] font-light text-[rgba(240,236,228,0.5)] leading-[1.8]">
                  {card.description}
                </p>
              </div>

              {/* Arrow button */}
              <div className="mt-8 flex justify-end">
                <div
                  className="w-10 h-10 rounded-full border border-[rgba(245,200,66,0.25)] flex items-center justify-center group-hover:border-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                  data-cursor-hover
                >
                  <ArrowUpRight size={16} className="text-gold" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
