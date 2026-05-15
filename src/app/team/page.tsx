"use client"

import { useState } from "react"
import Footer from "@/components/layout/Footer"

const team = [
  { name: "Team Member", role: "President", department: "Core" },
  { name: "Team Member", role: "Vice President", department: "Core" },
  { name: "Team Member", role: "Secretary", department: "Core" },
  { name: "Team Member", role: "Treasurer", department: "Core" },
  { name: "Team Member", role: "Project Head", department: "Projects" },
  { name: "Team Member", role: "Marketing Lead", department: "Marketing" },
  { name: "Team Member", role: "Design Lead", department: "Design" },
  { name: "Team Member", role: "Tech Lead", department: "Technology" },
]

export default function TeamPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <>
      <section className="pt-32 pb-24 px-6 md:px-12 min-h-screen">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="font-bebas text-enactus-white mb-4" style={{ fontSize: "clamp(48px, 8vw, 120px)" }}>
            OUR <span className="text-gold">TEAM</span>
          </h1>
          <p className="font-dm-sans text-[rgba(240,236,228,0.5)] text-lg max-w-xl mb-16">
            The changemakers behind every project, competition, and initiative.
          </p>

          {/* Team Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {team.map((member, i) => (
              <div
                key={i}
                className="group relative aspect-[3/4] bg-enactus-gray border border-[rgba(245,200,66,0.08)] hover:border-[rgba(245,200,66,0.35)] transition-all duration-500 overflow-hidden"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                data-cursor-hover
              >
                {/* Front */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-opacity duration-500 ${hoveredIndex === i ? 'opacity-0' : 'opacity-100'}`}>
                  <div className="w-20 h-20 rounded-full bg-[rgba(245,200,66,0.1)] mb-4" />
                  <h3 className="font-syne text-[14px] font-bold text-enactus-white text-center">
                    {member.name}
                  </h3>
                  <p className="font-dm-sans text-[12px] text-[rgba(240,236,228,0.4)] text-center mt-1">
                    {member.role}
                  </p>
                </div>

                {/* Back (hover) */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 bg-[rgba(245,200,66,0.05)] transition-opacity duration-500 ${hoveredIndex === i ? 'opacity-100' : 'opacity-0'}`}>
                  <h3 className="font-bebas text-[28px] text-gold text-center">
                    {member.name}
                  </h3>
                  <p className="font-syne text-[11px] font-bold uppercase tracking-[2px] text-enactus-white text-center mt-2">
                    {member.role}
                  </p>
                  <p className="font-dm-sans text-[11px] text-[rgba(240,236,228,0.4)] text-center mt-1">
                    {member.department}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
