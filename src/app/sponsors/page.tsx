"use client"

import Footer from "@/components/layout/Footer"

const sponsors = [
  "Sponsor 1",
  "Sponsor 2",
  "Sponsor 3",
  "Sponsor 4",
  "Sponsor 5",
  "Sponsor 6",
]

export default function SponsorsPage() {
  return (
    <>
      <section className="pt-32 pb-24 px-6 md:px-12 min-h-screen">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="font-bebas text-enactus-white mb-4" style={{ fontSize: "clamp(48px, 8vw, 120px)" }}>
            OUR <span className="text-gold">SPONSORS</span>
          </h1>
          <p className="font-dm-sans text-[rgba(240,236,228,0.5)] text-lg max-w-xl mb-16">
            Partners who believe in the power of entrepreneurial action to create change.
          </p>

          {/* Sponsor Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {sponsors.map((sponsor, i) => (
              <div
                key={i}
                className="aspect-video bg-enactus-gray border border-[rgba(245,200,66,0.08)] hover:border-[rgba(245,200,66,0.35)] transition-all duration-500 flex items-center justify-center group"
                data-cursor-hover
              >
                <span className="font-syne text-[14px] font-bold text-[rgba(240,236,228,0.3)] group-hover:text-gold transition-colors duration-300">
                  {sponsor}
                </span>
              </div>
            ))}
          </div>

          {/* Sponsor Marquee */}
          <div className="mt-24 border-y border-[rgba(245,200,66,0.12)] py-8 overflow-hidden">
            <div className="flex whitespace-nowrap animate-marquee-left">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="flex items-center">
                  {sponsors.map((sponsor, j) => (
                    <span key={`${i}-${j}`} className="font-bebas text-[48px] text-[rgba(245,200,66,0.15)] mx-8">
                      {sponsor.toUpperCase()}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
