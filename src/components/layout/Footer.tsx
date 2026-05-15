"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
)

const socials = [
  { Icon: InstagramIcon, label: "Instagram", href: "#" },
  { Icon: LinkedinIcon, label: "LinkedIn", href: "#" },
  { Icon: TwitterIcon, label: "Twitter", href: "#" },
]

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!footerRef.current) return

    gsap.fromTo(
      footerRef.current,
      { yPercent: 30, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          end: "top 50%",
          scrub: 1,
        },
      }
    )
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative bg-enactus-off-black border-t border-[rgba(245,200,66,0.15)]"
    >
      {/* Main Footer Content */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Giant Headline */}
          <div>
            <h2 className="font-bebas text-enactus-white leading-[0.92]" style={{ fontSize: "clamp(48px, 8vw, 120px)" }}>
              LET&apos;S BUILD
              <br />
              SOMETHING
              <br />
              <span className="text-gold">MEANINGFUL</span>
            </h2>
          </div>

          {/* Right - CTA */}
          <div className="flex flex-col justify-end">
            <p className="font-dm-sans text-[rgba(240,236,228,0.5)] text-base leading-[1.8] mb-8 max-w-md">
              Join a community of changemakers who use entrepreneurial action to
              create lasting social impact. Your journey to making a difference
              starts here.
            </p>
            <Link
              href="#"
              className="inline-flex items-center justify-center w-fit px-10 py-4 border border-gold text-gold font-syne text-[13px] font-bold uppercase tracking-[2px] rounded-none hover:bg-gold hover:text-enactus-black transition-all duration-400"
              data-cursor-hover
            >
              Get Involved
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[rgba(245,200,66,0.08)] px-6 md:px-12 py-6">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-dm-sans text-[12px] text-[rgba(240,236,228,0.3)]">
            © 2025 Enactus VIT Chennai. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="text-[rgba(240,236,228,0.3)] hover:text-gold transition-colors duration-300"
                data-cursor-hover
                aria-label={social.label}
              >
                <social.Icon />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
