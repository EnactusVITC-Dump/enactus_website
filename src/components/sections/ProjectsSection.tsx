"use client"

import { useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    name: "Project Pooranya",
    tags: ["Livelihood", "Women"],
  },
  {
    name: "Project Minavar",
    tags: ["Education", "Technology"],
  },
  {
    name: "Project Taru",
    tags: ["Sustainability", "Farming"],
  },
]

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const rowsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    rowsRef.current.forEach((row, i) => {
      if (!row) return
      gsap.fromTo(
        row,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.15,
        }
      )
    })
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 md:py-40 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Label */}
        <div className="mb-16 md:mb-24 flex justify-center">
          <h2 className="font-bebas text-enactus-white text-center tracking-wide" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
            FEATURED <span className="text-gold">PROJECTS</span>
          </h2>
        </div>

        {/* Project Folders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 justify-items-center">
          {projects.map((project, i) => (
            <div
              key={project.name}
              ref={(el) => {
                if (el) rowsRef.current[i] = el
              }}
              className="relative w-full max-w-[327px] aspect-[327/295] group cursor-pointer"
              data-cursor-hover
            >
              {/* Folder Back (Yellow) */}
              <div
                className="absolute inset-0 bg-[#F5C000] rounded-[20px] transition-transform duration-500 origin-bottom group-hover:scale-[1.02]"
              >
                {/* SVG for the tab shape to match the smooth curve */}
                <svg
                  className="absolute top-0 left-0 w-[140px] h-[40px] -translate-y-[98%]"
                  viewBox="0 0 140 40"
                  preserveAspectRatio="none"
                >
                  <path d="M0,20 C0,8.954 8.954,0 20,0 L100,0 C110,0 115,10 120,20 L130,40 L0,40 Z" fill="#F5C000" />
                </svg>
              </div>

              {/* Folder Front (White) */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[200px] bg-[#FFFFFF] rounded-[20px] shadow-[20px_20px_10px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center p-6 z-10 transition-transform duration-500 origin-bottom group-hover:-rotate-3 group-hover:translate-y-2"
              >
                <h3 className="font-bebas text-enactus-black text-center text-4xl mb-4 group-hover:text-gold transition-colors duration-300">
                  {project.name}
                </h3>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 border border-enactus-gray rounded-full font-syne text-[10px] font-bold uppercase tracking-[1px] text-enactus-gray"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight size={24} className="text-enactus-black" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
