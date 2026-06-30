"use client"

import { useState } from "react"


const projects = [
  { name: "Project Pooranya", category: "Livelihood", tags: ["Livelihood", "Women"], description: "Empowering women through skill development and entrepreneurship training in underserved communities." },
  { name: "Project Minavar", category: "Education", tags: ["Education", "Technology"], description: "Bridging the digital divide through technology education and access programs." },
  { name: "Project Taru", category: "Sustainability", tags: ["Sustainability", "Farming"], description: "Promoting sustainable farming practices and environmental awareness in rural communities." },
  { name: "Project Naari", category: "Health", tags: ["Health", "Community"], description: "Improving health outcomes through community awareness and accessible healthcare solutions." },
  { name: "Project Inara", category: "Health", tags: ["Health", "Community"], description: "Improving health outcomes through community awareness and accessible healthcare solutions." },
]

const categories = ["All", "Livelihood", "Education", "Sustainability", "Health"]

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <>
      <section className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="font-bebas text-enactus-white mb-4" style={{ fontSize: "clamp(48px, 8vw, 120px)" }}>
            OUR <span className="text-gold">PROJECTS</span>
          </h1>
          <p className="font-dm-sans text-[rgba(240,236,228,0.5)] text-lg max-w-xl mb-16">
            Entrepreneurial projects that create lasting social impact in communities around us.
          </p>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-3 mb-16">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2 font-syne text-[11px] font-bold uppercase tracking-[2px] border transition-all duration-300 ${activeFilter === cat
                  ? "bg-gold text-enactus-black border-gold"
                  : "border-[rgba(245,200,66,0.25)] text-gold hover:border-gold"
                  }`}
                data-cursor-hover
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 pt-10 justify-items-center">
            {filteredProjects.map((project) => (
              <div
                key={project.name}
                className="relative w-full max-w-[327px] aspect-[327/295] group cursor-pointer"
                data-cursor-hover
              >
                {/* Folder Back (Yellow) */}
                <div
                  className="absolute inset-0 bg-[#F5C000] rounded-[20px] transition-transform duration-500 origin-bottom group-hover:scale-[1.02]"
                >
                  {/* SVG for the tab shape to match the smooth curve */}
                  <svg
                    className="absolute top-[1px] left-0 w-[140px] h-[40px] -translate-y-full"
                    viewBox="0 0 140 40"
                    preserveAspectRatio="none"
                  >
                    <path d="M0,20 C0,8.954 8.954,0 20,0 L100,0 C110,0 115,10 120,20 L130,40 L0,40 Z" fill="#F5C000" />
                  </svg>
                </div>

                {/* Folder Front (White) */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[220px] bg-[#FFFFFF] rounded-[20px] shadow-[20px_20px_10px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center p-6 z-10 transition-transform duration-500 origin-bottom group-hover:-rotate-3 group-hover:translate-y-2"
                >
                  <h3 className="font-bebas text-enactus-black text-center text-3xl mb-2 group-hover:text-gold transition-colors duration-300">
                    {project.name}
                  </h3>

                  <p className="font-dm-sans text-[12px] text-center text-enactus-black leading-[1.6] mb-4 opacity-80">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 border border-enactus-gray rounded-full font-syne text-[9px] font-bold uppercase tracking-[1px] text-enactus-gray"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
