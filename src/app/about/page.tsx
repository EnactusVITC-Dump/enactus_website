"use client"

import Image from "next/image"
import Footer from "@/components/layout/Footer"

const values = [
  { title: "Entrepreneurial Action", description: "We believe in the power of business to create sustainable solutions to social problems." },
  { title: "Collaboration", description: "Diverse perspectives and teamwork drive the best outcomes for communities." },
  { title: "Integrity", description: "We hold ourselves to the highest ethical standards in everything we do." },
  { title: "Innovation", description: "Creative thinking and bold ideas are at the heart of our approach to social change." },
]

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-24 px-6 md:px-12 min-h-screen">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="font-bebas text-enactus-white mb-4" style={{ fontSize: "clamp(48px, 8vw, 120px)" }}>
            ABOUT <span className="text-gold">US</span>
          </h1>

          {/* Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
            <div>
              <p className="font-syne text-[11px] font-bold uppercase tracking-[3px] text-[rgba(240,236,228,0.4)] mb-6">
                Our Story
              </p>
              <p className="font-dm-sans text-[rgba(240,236,228,0.6)] text-base leading-[1.8] mb-6">
                Enactus VIT Chennai was established in 2012 as a chapter of the global Enactus network.
                We are a community of student leaders who use entrepreneurial action to transform lives
                and shape a better, more sustainable world.
              </p>
              <p className="font-dm-sans text-[rgba(240,236,228,0.6)] text-base leading-[1.8]">
                Over the past 12 years, we&apos;ve launched 15+ social enterprise projects, impacted
                over 10,000 lives, and competed at national and international stages. Our members
                graduate with real-world experience in leadership, project management, and social innovation.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <Image
                  src="/enactus-logo.png"
                  alt="Enactus VIT Chennai"
                  width={300}
                  height={300}
                  className="w-48 h-48 md:w-64 md:h-64 object-contain mx-auto opacity-20"
                />
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="mb-32">
            <p className="font-syne text-[11px] font-bold uppercase tracking-[3px] text-[rgba(240,236,228,0.4)] mb-6">
              Mission
            </p>
            <h2 className="font-bebas text-enactus-white" style={{ fontSize: "clamp(32px, 5vw, 64px)" }}>
              TO ENGAGE THE NEXT GENERATION OF{" "}
              <span className="text-gold">ENTREPRENEURIAL LEADERS</span>{" "}
              WHO USE INNOVATION AND BUSINESS PRINCIPLES TO IMPROVE THE WORLD
            </h2>
          </div>

          {/* Values */}
          <div>
            <p className="font-syne text-[11px] font-bold uppercase tracking-[3px] text-[rgba(240,236,228,0.4)] mb-12">
              Our Values
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, i) => (
                <div
                  key={value.title}
                  className="bg-enactus-gray border border-[rgba(245,200,66,0.08)] p-10 group hover:border-[rgba(245,200,66,0.35)] transition-all duration-500"
                >
                  <span className="font-bebas text-[48px] text-gold opacity-[0.15] group-hover:opacity-[0.35] transition-opacity duration-500">
                    0{i + 1}
                  </span>
                  <h3 className="font-syne text-[18px] font-bold text-enactus-white mt-2 mb-3">
                    {value.title}
                  </h3>
                  <p className="font-dm-sans text-[14px] text-[rgba(240,236,228,0.5)] leading-[1.8]">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
