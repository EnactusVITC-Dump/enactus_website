"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"

gsap.registerPlugin(ScrollTrigger)

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const RocketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F5C842" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
)

const UsersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F5C842" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
)

const LightbulbIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F5C842" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>
)

const projects = [
  { name: "Taru", logo: "/custom-taru.png" },
  { name: "Naari", logo: "/custom-naari.png" },
  { name: "Minavar", logo: "/custom-minavar.png" },
  { name: "Inara", logo: "/custom-inara.png" },
]

function MagneticButton({ children, href, className, style }: { children: React.ReactNode, href: string, className?: string, style?: any }) {
  return (
    <motion.a
      href={href}
      className={`group block relative z-20 ${className}`}
      style={style}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="absolute inset-0 rounded-full bg-[#FFD84D] opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300 z-0"></div>
      <div className="relative z-10 flex items-center justify-between w-full h-full px-6 py-2.5 bg-[#FFFFFF] rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-[rgba(245,200,66,0.2)]">
        {children}
      </div>
    </motion.a>
  );
}

const MapBackground = () => {
  const [dots, setDots] = useState<{ cx: number, cy: number, r: number, opacity: number }[]>([]);
  const [paths, setPaths] = useState<{ d: string, opacity: number }[]>([]);

  useEffect(() => {
    setDots(Array.from({ length: 200 }).map(() => ({
      cx: Math.random() * 1000,
      cy: Math.random() * 500,
      r: Math.random() > 0.8 ? 2 : 1,
      opacity: Math.random() * 0.4 + 0.1
    })));
    setPaths(Array.from({ length: 40 }).map(() => ({
      d: `M ${Math.random() * 1000},${Math.random() * 500} Q ${Math.random() * 1000},${Math.random() * 500} ${Math.random() * 1000},${Math.random() * 500}`,
      opacity: Math.random() * 0.3
    })));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-20 flex items-center justify-center overflow-hidden">
      <svg width="120%" height="120%" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice" className="mix-blend-screen opacity-40">
        {dots.map((dot, i) => (
          <circle key={i} cx={dot.cx} cy={dot.cy} r={dot.r} fill="#ffffff" opacity={dot.opacity} />
        ))}
        {paths.map((path, i) => (
          <path key={`path-${i}`} d={path.d} fill="none" stroke="#F5C842" strokeWidth="1" strokeDasharray="2 4" opacity={path.opacity} />
        ))}
      </svg>
    </div>
  );
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!footerRef.current) return

    gsap.fromTo(
      footerRef.current,
      { yPercent: 10, opacity: 0 },
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
      className="relative bg-transparent pt-8 pb-0 overflow-hidden"
    >
      <MapBackground />

      {/* Abstract Background Constellations */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <svg className="w-full h-full opacity-30" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
          {/* Constellation 1 */}
          <path d="M 100,200 Q 250,150 400,300 T 700,250" fill="none" stroke="#F5C842" strokeWidth="1" strokeDasharray="4 8" className="animate-pulse" />
          <circle cx="100" cy="200" r="2" fill="#F5C842" />
          <circle cx="400" cy="300" r="3" fill="#F5C842" />
          <circle cx="700" cy="250" r="2" fill="#F5C842" />

          {/* Constellation 2 */}
          <path d="M -50,800 Q 150,900 300,750 T 500,850" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 6" opacity="0.5" className="animate-pulse" style={{ animationDelay: '1s' }} />
          <circle cx="300" cy="750" r="2" fill="#FFFFFF" />

          {/* Constellation 3 */}
          <path d="M 1200,400 Q 1400,300 1600,500 T 1900,450" fill="none" stroke="#F5C842" strokeWidth="1" strokeDasharray="2 6" opacity="0.7" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
          <circle cx="1200" cy="400" r="2" fill="#F5C842" />
          <circle cx="1600" cy="500" r="3" fill="#F5C842" />

          {/* Constellation 4 */}
          <path d="M 1500,900 Q 1650,850 1800,1000" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
          <circle cx="1500" cy="900" r="2" fill="#FFFFFF" />
          <circle cx="1800" cy="1000" r="2" fill="#FFFFFF" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 mb-8 mt-4">
        {/* Global Impact Header (Top Center) */}
        <div className="flex flex-col items-center justify-center text-center relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-[40px] h-[1px] bg-[#F5C842] opacity-50"></div>
            <h3 className="font-bebas text-[#FFFFFF] text-[20px] tracking-widest drop-shadow-md">OUR GLOBAL IMPACT</h3>
            <div className="w-[40px] h-[1px] bg-[#F5C842] opacity-50"></div>
          </div>

          <div className="flex flex-col xl:flex-row items-center justify-center gap-8 xl:gap-16 w-full relative mt-8 xl:mt-0">
            {/* Left text */}
            <div className="flex flex-col items-center xl:items-start text-center xl:text-left xl:absolute xl:left-[5%] xl:-top-4">
              <h2 className="font-bebas text-[#FFFFFF] text-[40px] xl:text-[56px] leading-[0.9] drop-shadow-lg">
                TURNING<br />
                <span className="text-[#F5C842]">IDEAS</span><br />
                INTO <span className="text-[#F5C842]">IMPACT</span>
              </h2>
              <p className="font-dm-sans text-gray-400 mt-2 text-[14px] max-w-[200px]">
                We innovate today for a better tomorrow.
              </p>
            </div>

            {/* Center Impact Cards */}
            <div className="flex flex-row flex-wrap justify-center gap-4 z-10">
              {/* Card 1 */}
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(245,200,66,0.3)" }}
                className="bg-[rgba(26,26,26,0.6)] backdrop-blur-md border-2 border-[#F5C842] rounded-lg p-6 flex flex-col items-center justify-center w-[130px] md:w-[150px] aspect-square transition-colors cursor-default"
              >
                <RocketIcon />
                <span className="font-bebas text-[#FFFFFF] text-[32px] md:text-[40px] mt-2 leading-none">15+</span>
                <span className="font-bebas text-[#F5C842] text-[14px] tracking-wider mt-1">PROJECTS</span>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(245,200,66,0.3)" }}
                className="bg-[rgba(26,26,26,0.6)] backdrop-blur-md border-2 border-[#F5C842] rounded-lg p-6 flex flex-col items-center justify-center w-[130px] md:w-[150px] aspect-square transition-colors cursor-default"
              >
                <UsersIcon />
                <span className="font-bebas text-[#FFFFFF] text-[32px] md:text-[40px] mt-2 leading-none">500+</span>
                <span className="font-bebas text-[#F5C842] text-[14px] tracking-wider mt-1 text-center leading-tight">STUDENTS IMPACTED</span>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(245,200,66,0.3)" }}
                className="bg-[rgba(26,26,26,0.6)] backdrop-blur-md border-2 border-[#F5C842] rounded-lg p-6 flex flex-col items-center justify-center w-[130px] md:w-[150px] aspect-square transition-colors cursor-default"
              >
                <LightbulbIcon />
                <span className="font-bebas text-[#FFFFFF] text-[32px] md:text-[40px] mt-2 leading-none">4</span>
                <span className="font-bebas text-[#F5C842] text-[14px] tracking-wider mt-1 text-center leading-tight">SOCIAL VENTURES</span>
              </motion.div>
            </div>

            {/* Right text */}
            <div className="xl:absolute xl:right-[5%] xl:top-0 transform xl:rotate-[-5deg]">
              <h2 className="font-bebas text-[#FFFFFF] text-[32px] md:text-[42px] leading-[0.9] drop-shadow-lg" style={{ fontFamily: "'Caveat', cursive" }}>
                Be the <br /><span className="text-[#F5C842] text-[40px] md:text-[50px]">CHANGE!</span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Ribbon Banner - Desktop (Single wave) */}
      <div className="hidden md:block w-full relative pointer-events-none my-0 z-20 overflow-visible">
        <svg className="w-full h-auto drop-shadow-xl" preserveAspectRatio="xMidYMid meet" viewBox="-120 -90 1920 550">
          <path id="wavePathDesktop" d="M -120 180 C 220 20, 520 420, 820 300 S 1350 -50, 1800 180" fill="transparent" stroke="#F5C842" strokeWidth="80" strokeLinecap="round" strokeLinejoin="round" />
          <text>
            <textPath href="#wavePathDesktop" startOffset="50%" textAnchor="middle" fontSize="30" fontFamily="var(--font-bebas)" letterSpacing="0.1em" fill="#000000" dominantBaseline="middle">
              ENACTUS  IS  A  GLOBAL  COMMUNITY  OF  STUDENT  ACADEMIC  AND  CREATE  SUSTAINABLE  IMPACT.
            </textPath>
          </text>
        </svg>
      </div>

      {/* Ribbon Banner - Mobile (Two waves) */}
      <div className="block md:hidden w-full relative pointer-events-none my-0 z-20 overflow-visible">
        <svg className="w-full h-auto drop-shadow-xl" preserveAspectRatio="xMidYMid meet" viewBox="-100 -45 1000 410">
          <path id="wavePathMobile1" d="M -100 100 C 200 220, 500 -20, 900 100" fill="transparent" stroke="#F5C842" strokeWidth="50" strokeLinecap="round" strokeLinejoin="round" />
          <text>
            <textPath href="#wavePathMobile1" startOffset="50%" textAnchor="middle" fontSize="22" fontFamily="var(--font-bebas)" letterSpacing="0.05em" fill="#000000" dominantBaseline="middle">
              ENACTUS IS A GLOBAL COMMUNITY OF STUDENT,
            </textPath>
          </text>

          <path id="wavePathMobile2" d="M -100 220 C 200 340, 500 100, 900 220" fill="transparent" stroke="#F5C842" strokeWidth="50" strokeLinecap="round" strokeLinejoin="round" />
          <text>
            <textPath href="#wavePathMobile2" startOffset="50%" textAnchor="middle" fontSize="22" fontFamily="var(--font-bebas)" letterSpacing="0.05em" fill="#000000" dominantBaseline="middle">
              ACADEMIC AND BUSINESS LEADERS TO CREATE IMPACT.
            </textPath>
          </text>
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative pb-0 z-10 -mt-8 md:-mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center lg:items-start relative">

          {/* Left: Scattered Logos */}
          <div className="flex flex-col items-center lg:items-start relative z-10 w-[250px] h-[250px] md:w-[300px] md:h-[300px] mx-auto lg:mx-0">
            {/* Tangled SVG Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" viewBox="0 0 300 300">
              <path d="M -50,150 Q 50,250 150,150 T 250,100 T 350,200" fill="none" stroke="#F5C842" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" className="animate-pulse" />
              <circle cx="150" cy="150" r="3" fill="#F5C842" />
            </svg>
            <div className="absolute inset-0 w-full h-full z-10">
              {projects.map((proj, i) => {
                const customStyles = [
                  // Taru
                  { width: '133px', height: '133px', left: '30%', top: '30%', transform: 'translate(-50%, -50%) rotate(12deg)' },
                  // Naari
                  { width: '112px', height: '108px', left: '35%', top: '75%', transform: 'translate(-50%, -50%) rotate(-15deg)' },
                  // Minavar
                  { width: '130px', height: '130px', left: '70%', top: '35%', transform: 'translate(-50%, -50%) rotate(-8deg)' },
                  // Inara
                  { width: '100px', height: '100px', left: '75%', top: '70%', transform: 'translate(-50%, -50%) rotate(18deg)' }
                ];
                return (
                  <div key={proj.name}
                    className="absolute flex items-center justify-center p-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)] scale-75 md:scale-100 origin-center mix-blend-screen"
                    style={{ ...customStyles[i] }}>
                    <div className="relative w-full h-full">
                      <Image src={proj.logo} alt={proj.name} fill className="object-contain" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Center: Core Values */}
          <div className="flex flex-col items-center justify-center w-full relative z-10 pt-4 md:pt-8">
            <div className="flex flex-row justify-center gap-6 md:gap-12 w-full">
              <div className="flex flex-col items-center text-center max-w-[100px]">
                <div className="mb-3 text-[#F5C842]">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                  </svg>
                </div>
                <h4 className="font-bebas text-[#FFFFFF] text-[22px] tracking-widest mb-1">INNOVATE</h4>
                <p className="font-dm-sans text-gray-400 text-[11px] leading-tight">Bold ideas,<br />real solutions.</p>
              </div>

              <div className="flex flex-col items-center text-center max-w-[100px]">
                <div className="mb-3 text-[#F5C842]">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                </div>
                <h4 className="font-bebas text-[#FFFFFF] text-[22px] tracking-widest mb-1">EMPOWER</h4>
                <p className="font-dm-sans text-gray-400 text-[11px] leading-tight">Students today,<br />leaders tomorrow.</p>
              </div>

              <div className="flex flex-col items-center text-center max-w-[100px]">
                <div className="mb-3 text-[#F5C842]">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>
                </div>
                <h4 className="font-bebas text-[#FFFFFF] text-[22px] tracking-widest mb-1">SUSTAIN</h4>
                <p className="font-dm-sans text-gray-400 text-[11px] leading-tight">Building a better<br />sustainable world.</p>
              </div>
            </div>

            <div className="w-[80%] h-[1px] bg-[rgba(245,200,66,0.3)] my-6"></div>

            <span className="font-bebas text-[#F5C842] text-[18px] tracking-[0.25em] opacity-90">TOGETHER • WE • CREATE • IMPACT</span>
          </div>

          {/* Right: Social Buttons */}
          <div className="flex flex-col items-center lg:items-end w-full relative h-[300px] z-10 pr-0 lg:pr-8 lg:-mt-20 xl:-mt-28">
            <div className="relative mb-8 w-full flex justify-center lg:justify-end">
              <h3 className="font-bebas text-[#F5C842] text-[26px] tracking-wider drop-shadow-[0_0_10px_rgba(245,200,66,0.4)] px-2 z-10 relative">CONNECT WITH US</h3>

              {/* SVG Connecting Lines Behind Socials */}
              <svg className="absolute top-[30px] right-[100px] w-[150px] h-[150px] pointer-events-none z-0 overflow-visible" viewBox="0 0 150 150">
                <path d="M 0,0 Q -40,50 100,80" fill="none" stroke="#F5C842" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
                <path d="M 90,70 L 100,80 L 90,90" fill="none" stroke="#F5C842" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="flex flex-col items-end w-[280px] relative h-[220px]">
              {/* MAIL */}
              <MagneticButton href="mailto:contact@enactusvitc.org" className="w-[220px] h-[55px] bg-white rounded-full border-2 border-black transform rotate-[-15deg] absolute right-[40px] top-[0px] shadow-lg flex items-center justify-between px-6 hover:bg-gray-100 transition-colors">
                <span className="font-bebas text-[#000000] text-[20px] tracking-wider pt-1">MAIL</span>
                <MailIcon />
              </MagneticButton>

              {/* LINKEDIN */}
              <MagneticButton href="#" className="w-[220px] h-[55px] bg-white rounded-full border-2 border-black transform rotate-[-15deg] absolute right-[10px] top-[60px] shadow-lg flex items-center justify-between px-6 hover:bg-gray-100 transition-colors z-10">
                <span className="font-bebas text-[#000000] text-[20px] tracking-wider pt-1">LINKEDIN</span>
                <LinkedinIcon />
              </MagneticButton>

              {/* INSTAGRAM */}
              <MagneticButton href="#" className="w-[220px] h-[55px] bg-white rounded-full border-2 border-black transform rotate-[-15deg] absolute right-[40px] top-[130px] shadow-lg flex items-center justify-between px-6 hover:bg-gray-100 transition-colors z-20">
                <span className="font-bebas text-[#000000] text-[20px] tracking-wider pt-1">INSTAGRAM</span>
                <InstagramIcon />
              </MagneticButton>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-transparent border-t border-[rgba(245,200,66,0.2)] pt-8 pb-16 w-full relative z-20 mt-12">
        <div className="max-w-[1400px] mx-auto flex flex-col items-center justify-between gap-8 px-6 relative z-10">


          <div className="flex flex-col lg:flex-row items-center justify-between w-full mt-4 gap-6">
            <div className="font-bebas text-[#F5C842] text-[16px] tracking-widest border border-[#F5C842] px-6 py-2 opacity-80 text-left">

              <span className="text-[#FFFFFF]">ENACTUS VIT CHENNAI</span>
            </div>

            <div className="font-bebas text-[#F5C842] text-[18px] md:text-[20px] tracking-[0.2em] border border-[#F5C842] px-8 py-3 opacity-80 text-center">
              ACT LOCALLY • IMPACT GLOBALLY
            </div>

            <div className="font-bebas text-[#F5C842] text-[16px] tracking-widest border border-[#F5C842] px-6 py-2 opacity-80 text-right">
              © 2026<br />
              <span className="text-[#FFFFFF]">ALL RIGHTS RESERVED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Yellow background base behind the bottom corners */}
      <div className="absolute bottom-0 left-0 right-0 h-[40px] z-10 bg-[#F5C842]"></div>

      {/* Mask for bottom notch cutouts */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[40px] bg-enactus-black pointer-events-none z-20"
        style={{
          maskImage: `
            radial-gradient(circle at 0 100%, transparent 40px, black 41px),
            radial-gradient(circle at 100% 100%, transparent 40px, black 41px)
          `,
          maskPosition: "bottom left, bottom right",
          maskSize: "51% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskImage: `
            radial-gradient(circle at 0 100%, transparent 40px, black 41px),
            radial-gradient(circle at 100% 100%, transparent 40px, black 41px)
          `,
          WebkitMaskPosition: "bottom left, bottom right",
          WebkitMaskSize: "51% 100%",
          WebkitMaskRepeat: "no-repeat"
        }}
      ></div>
    </footer>
  )
}
