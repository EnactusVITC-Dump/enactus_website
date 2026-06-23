"use client"

import Footer from "@/app/about/Footer"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

// A simple hook for counting animation
function AnimatedCounter({ from, to, duration = 2, label, suffix = "" }: { from: number, to: number, duration?: number, label: string, suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(nodeRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (inView && nodeRef.current) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        const easeOutExpo = (x: number): number => {
          return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
        };
        const currentProgress = easeOutExpo(progress);

        let displayValue = "";
        if (to % 1 !== 0) {
          // For floats like 1.95
          displayValue = (from + (to - from) * currentProgress).toFixed(2);
        } else {
          displayValue = Math.floor(from + (to - from) * currentProgress).toString();
        }

        if (nodeRef.current) {
          nodeRef.current.textContent = displayValue + suffix;
        }
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          if (nodeRef.current) {
            nodeRef.current.textContent = to + suffix;
          }
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, from, to, duration, suffix]);

  return (
    <div className="flex flex-col items-center w-[120px] group cursor-default">
      <motion.span
        ref={nodeRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="font-bebas text-[#F5C842] text-[40px] md:text-[52px] mb-2 leading-none drop-shadow-[0_0_15px_rgba(245,200,66,0.6)] transition-transform duration-300 group-hover:-translate-y-2"
      >
        {from}{suffix}
      </motion.span>
      <div className="relative w-[14px] h-[14px] bg-[#F5C842] rounded-full shadow-[0_0_20px_rgba(245,200,66,0.9)] mb-3 z-10 transition-transform duration-300 group-hover:scale-[1.5]">
        <div className="absolute inset-0 bg-[#F5C842] rounded-full animate-ping opacity-75"></div>
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="font-bebas text-[#FFFFFF] text-[16px] md:text-[18px] tracking-wider text-center"
      >
        {label}
      </motion.span>
    </div>
  )
}

export default function AboutPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <>
      <section className="relative pt-[80px] pb-[80px] px-6 min-h-[calc(100vh-100px)] bg-transparent overflow-hidden flex flex-col justify-center">
        {/* Subtle World Map Background & Network Grid */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.2]"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(245, 200, 66, 0.08) 0%, transparent 70%), url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20zM20 0h20v20H20V0z' fill='%23ffffff' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '100% 100%, 40px 40px'
          }}>
          {/* Abstract map paths */}
          <svg className="w-full h-full opacity-40" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice">
            <path d="M 100,150 Q 250,50 400,180 T 600,200 T 800,150 T 900,250" fill="none" stroke="#F5C842" strokeWidth="1" strokeDasharray="4 4" className="animate-pulse" />
            <path d="M 150,250 Q 300,350 450,220 T 650,280 T 850,200" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 4" opacity="0.3" />
            <circle cx="400" cy="180" r="3" fill="#F5C842" className="animate-ping" style={{ animationDuration: '3s' }} />
            <circle cx="600" cy="200" r="2" fill="#F5C842" />
            <circle cx="800" cy="150" r="4" fill="#F5C842" className="animate-pulse" />
            <circle cx="450" cy="220" r="3" fill="#FFFFFF" opacity="0.5" />
            <circle cx="650" cy="280" r="4" fill="#F5C842" />
          </svg>
        </div>

        {/* Faint Watermark behind right diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-[20%] right-[-10%] md:right-[5%] flex items-center justify-center pointer-events-none z-0 transform rotate-[-25deg]"
        >
          <span
            className="text-[#1A1A1A] font-bebas select-none opacity-20"
            style={{
              fontSize: "clamp(120px, 25vw, 300px)",
              whiteSpace: "nowrap",
              opacity: 0.2
            }}
          >ENACTUS
          </span>
        </motion.div>

        <div className="max-w-[1200px] mx-auto w-full relative z-10 flex flex-col h-full">
          {/* Main 2-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center flex-grow">

            {/* Left Side: Typography */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              onMouseMove={handleMouseMove}
              className="flex flex-col justify-center max-w-[550px] p-8 md:p-12 relative group"
            >
              {/* Transparent Enactus Logo Background */}
              <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none flex items-center justify-center">
                <Image src="/enactus-logo.png" alt="Enactus Watermark" fill className="object-contain p-4" />
              </div>

              {/* Interactive Hover Glow Effect */}
              <div
                className="absolute pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245,200,66,0.15), transparent 80%)`,
                  left: 0, top: 0, right: 0, bottom: 0,
                }}
              />

              <div className="relative z-10">
                <h1 className="font-bebas text-[#F5C842] mb-6 drop-shadow-[0_0_15px_rgba(245,200,66,0.3)] transition-transform duration-300 group-hover:translate-x-2" style={{ fontSize: "clamp(48px, 6vw, 64px)", lineHeight: 0.9, letterSpacing: "0.02em" }}>
                  ABOUT ENACTUS
                </h1>

                <h2 className="font-bebas text-[#FFFFFF] mb-8 transition-transform duration-300 delay-75 group-hover:translate-x-2" style={{ fontSize: "clamp(24px, 3vw, 32px)", lineHeight: 1.1, letterSpacing: "0.02em" }}>
                  WE ARE A <span className="text-[#F5C842]">NONPROFIT</span> ORGANISATION<br />AND WORK <span className="text-[#F5C842]">WORLDWIDE</span>
                </h2>

                <p className="font-bebas text-gray-300 transition-transform duration-300 delay-150 group-hover:translate-x-2" style={{ fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.4, letterSpacing: "0.05em" }}>
                  ENACTUS IS A GLOBAL COMMUNITY OF<br />
                  <span className="text-white hover:text-[#F5C842] transition-colors cursor-default">STUDENT</span>,<br />
                  <span className="text-white hover:text-[#F5C842] transition-colors cursor-default">ACADEMIC</span> AND <span className="text-white hover:text-[#F5C842] transition-colors cursor-default">BUSINESS LEADERS</span> USING<br />
                  <span className="text-[#F5C842]">ENTREPRENEURIAL ACTION</span> TO CREATE<br />
                  <span className="text-[#F5C842]">SUSTAINABLE IMPACT</span>.
                </p>
              </div>
            </motion.div>

            {/* Right Side - Orbital Diagram */}
            <div className="flex items-center justify-center relative w-full aspect-square max-w-[400px] md:max-w-[500px] mx-auto mt-10 lg:mt-0 perspective-[1000px]">

              {/* Concentric Rings with Rotation */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] z-0 pointer-events-none">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full rounded-full border border-dashed border-[#F5C842] opacity-40 shadow-[0_0_20px_rgba(245,200,66,0.2)_inset] relative"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#F5C842] rounded-full shadow-[0_0_10px_#F5C842]"></div>
                </motion.div>
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[56%] h-[56%] z-0 pointer-events-none">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full rounded-full border border-dashed border-[#F5C842] opacity-20 shadow-[0_0_15px_rgba(245,200,66,0.1)_inset] relative"
                >
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-[#F5C842] rounded-full shadow-[0_0_10px_#F5C842]"></div>
                </motion.div>
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[72%] h-[72%] z-0 pointer-events-none">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full rounded-full border border-dashed border-[#F5C842] opacity-10 shadow-[0_0_10px_rgba(245,200,66,0.05)_inset] relative"
                >
                  <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#F5C842] rounded-full shadow-[0_0_12px_#F5C842]"></div>
                </motion.div>
              </div>

              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 500 500">
                {[
                  { name: "INNOVATION", angle: -90 },
                  { name: "IMPACT", angle: -18 },
                  { name: "SUSTAINABILITY", angle: 54 },
                  { name: "LEADERSHIP", angle: 126 },
                  { name: "COMMUNITY", angle: -162 }
                ].map((sat) => {
                  const rad = sat.angle * (Math.PI / 180);
                  const startX = 250 + 65 * Math.cos(rad);
                  const startY = 250 + 65 * Math.sin(rad);
                  const endX = 250 + 180 * Math.cos(rad);
                  const endY = 250 + 180 * Math.sin(rad);
                  return (
                    <line key={sat.name} x1={startX} y1={startY} x2={endX} y2={endY} stroke="#F5C842" strokeWidth="1.5" opacity="0.4" className="animate-pulse" />
                  )
                })}
              </svg>

              {/* Core Node */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-[26%] h-[26%] bg-[#F5C842] rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(245,200,66,0.6)] cursor-default"
              >
                <div className="absolute inset-0 rounded-full animate-ping bg-[#F5C842] opacity-30" style={{ animationDuration: '2s' }}></div>
                <span className="font-bebas text-[#000000] text-[20px] md:text-[28px] tracking-[0.05em] pt-1 z-10">ENACTUS</span>
              </motion.div>

              {/* Satellite Nodes */}
              {[
                { name: "INNOVATION", angle: -90, textAbove: true },
                { name: "IMPACT", angle: -18, textAbove: false },
                { name: "SUSTAINABILITY", angle: 54, textAbove: false },
                { name: "LEADERSHIP", angle: 126, textAbove: false },
                { name: "COMMUNITY", angle: -162, textAbove: true }
              ].map((sat, i) => {
                const rad = sat.angle * (Math.PI / 180);
                const dotX = 50 + (180 / 250) * 50 * Math.cos(rad);
                const dotY = 50 + (180 / 250) * 50 * Math.sin(rad);

                return (
                  <motion.div
                    key={sat.name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: i * 0.1 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="absolute z-10 group cursor-default"
                    style={{ left: `${dotX}%`, top: `${dotY}%` }}
                  >
                    {/* The Dot */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[12px] h-[12px] bg-[#F5C842] rounded-full shadow-[0_0_20px_rgba(245,200,66,1)] transition-transform duration-300 group-hover:scale-[1.5]">
                      <div className="absolute inset-0 rounded-full animate-ping bg-[#F5C842] opacity-50" style={{ animationDuration: '2s', animationDelay: `${i * 0.2}s` }}></div>
                    </div>

                    {/* The Text */}
                    {sat.textAbove ? (
                      <div className="absolute left-1/2 bottom-[12px] -translate-x-1/2 flex justify-center w-[150px]">
                        <span className="text-[#FFFFFF] font-bebas text-[14px] md:text-[16px] tracking-wider mb-1 drop-shadow-md transition-all duration-300 group-hover:text-[#F5C842] group-hover:-translate-y-1">{sat.name}</span>
                      </div>
                    ) : (
                      <div className="absolute left-1/2 top-[12px] -translate-x-1/2 flex justify-center w-[150px]">
                        <span className="text-[#FFFFFF] font-bebas text-[14px] md:text-[16px] tracking-wider mt-1 drop-shadow-md transition-all duration-300 group-hover:text-[#F5C842] group-hover:translate-y-1">{sat.name}</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Bottom Stats Timeline */}
          <div className="w-full relative mt-16 md:mt-12 pb-10">
            {/* Timeline Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              style={{ transformOrigin: "left" }}
              className="absolute top-[46px] md:top-[58px] left-[5%] right-[5%] h-[2px] bg-[#F5C842] opacity-80 z-0 shadow-[0_0_10px_rgba(245,200,66,0.5)]"
            ></motion.div>

            <div className="flex justify-between relative z-10 px-[5%]">
              <AnimatedCounter from={0} to={36} label="COUNTRIES" suffix="+" duration={1.5} />
              <AnimatedCounter from={0} to={1700} label="UNIVERSITIES" suffix="+" duration={2} />
              <AnimatedCounter from={0} to={1.95} label="EMPOWERED" suffix="M+" duration={2} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
