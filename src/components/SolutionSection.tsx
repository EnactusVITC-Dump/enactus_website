import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MascotCoco from './MascotCoco';
import { motion, AnimatePresence } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

export default function SolutionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const badgeGroupRef = useRef<HTMLDivElement>(null);

  // States for interactive silhouette cycling
  const [activeSilhouetteIndex, setActiveSilhouetteIndex] = useState(0);

  const productSilhouettes = [
    {
      id: 'bowl',
      name: 'Earthy Shell Bowl',
      svg: (
        <svg viewBox="0 0 100 100" className="w-[180px] h-[180px] text-[#3D1F0D]" fill="currentColor">
          <ellipse cx="50" cy="55" rx="42" ry="30" />
          <path d="M 12 40 L 88 40" stroke="#FAF6EE" strokeWidth="2" strokeDasharray="3 3"/>
          <ellipse cx="50" cy="40" rx="38" ry="12" fill="#FAF6EE" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="50" cy="40" rx="33" ry="8" fill="#E6DECE" />
        </svg>
      )
    },
    {
      id: 'earrings',
      name: 'Delicate Filigree Earrings',
      svg: (
        <svg viewBox="0 0 100 100" className="w-[180px] h-[180px] text-[#C4894F]" fill="currentColor">
          {/* Earring wire hook */}
          <path d="M 50 15 C 50 5, 40 5, 45 3 C 48 3, 52 7, 50 15" stroke="#3D1F0D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Main carved shell leaf drop */}
          <path d="M 50 18 C 30 40, 30 75, 50 92 C 70 75, 70 40, 50 18 Z" stroke="#3D1F0D" strokeWidth="2.5" />
          {/* Inner carvings details */}
          <circle cx="50" cy="55" r="10" fill="#FAF6EE" stroke="#3D1F0D" strokeWidth="2" />
          <path d="M 50 18 L 50 45" stroke="#3D1F0D" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 'candle',
      name: 'Crackling Soy-Wax Candle',
      svg: (
        <svg viewBox="0 0 100 100" className="w-[180px] h-[180px] text-[#3D1F0D]" fill="currentColor">
          {/* Shell container halved */}
          <path d="M 10 50 C 10 82, 90 82, 90 50 Z" />
          {/* Wax fill */}
          <ellipse cx="50" cy="50" rx="40" ry="12" fill="#FAF6EE" stroke="currentColor" strokeWidth="1.5" />
          {/* Golden candle flame */}
          <motion.path
            d="M 50 42 C 45 35, 50 18, 50 18 C 50 18, 55 35, 50 42 Z"
            fill="#D4A843"
            animate={{ scale: [1, 1.15, 0.95, 1.05, 1], rotate: [0, -4, 4, -2, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
          {/* Wood wick */}
          <rect x="48" y="44" width="4" height="6" fill="#8c5835" />
        </svg>
      )
    },
    {
      id: 'keychain',
      name: 'Earthy Coin Keychain',
      svg: (
        <svg viewBox="0 0 100 100" className="w-[180px] h-[180px] text-[#C4894F]" fill="currentColor">
          {/* Keyring ring chain */}
          <circle cx="50" cy="18" r="10" stroke="#3D1F0D" strokeWidth="3" fill="none" />
          <path d="M 50 28 L 50 46" stroke="#3D1F0D" strokeWidth="3.5" strokeLinecap="round" />
          {/* Shell coin ornament */}
          <circle cx="50" cy="62" r="26" stroke="#3D1F0D" strokeWidth="3" />
          {/* Inara letter carved engraving in middle */}
          <circle cx="50" cy="62" r="16" fill="#FAF6EE" stroke="#3D1F0D" strokeWidth="1.5" />
          <path d="M 46 68 L 46 56 L 50 63 L 54 56 L 54 68" stroke="#3D1F0D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    // 1. Core Timeline for solution reveal
    const revealTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "center center",
        toggleActions: "play none none reverse",
      }
    });

    // Slam solution text words in
    revealTimeline.fromTo(
      ".solution-slam-word",
      {
        x: 100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        stagger: 0.25,
        duration: 0.9,
        ease: "back.out(1.5)",
      },
      0.3
    );

    // Slide up badges
    revealTimeline.fromTo(
      ".solution-badge-el",
      {
        y: 45,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.4"
    );

    // 2. Loop cycles through product silhouettes automatically
    const silhouetteInterval = setInterval(() => {
      setActiveSilhouetteIndex((prev) => (prev + 1) % productSilhouettes.length);
    }, 2800);

    return () => {
      clearInterval(silhouetteInterval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="solution-section"
      className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center px-6 sm:px-16"
      style={{
        background: '#F5ECD7',
      }}
    >
      {/* Background paper texture to matching Artisans */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 z-[1]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Decorative spotlights */}
      <div className="absolute top-[10%] left-[5%] w-[380px] h-[380px] opacity-[0.2] bg-[#4A6741] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[450px] h-[450px] opacity-[0.16] bg-[#D4A843] rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative Warm Botanical Accent Top-Right */}
      <div className="absolute top-0 right-0 w-[30vw] max-w-[300px] h-auto pointer-events-none opacity-[0.12] text-[#4A6741] mix-blend-multiply">
        <svg viewBox="0 0 100 100" className="w-full h-full scale-x-[-1]">
          <path d="M0,0 C20,20 40,50 30,100 C15,80 5,40 0,0" fill="currentColor" />
        </svg>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 max-w-[1200px] w-full z-10">
        
        {/* LEFT COLUMN: Spinning Silhouette & Crossfade Morph Carousel */}
        <div className="flex flex-col items-center justify-center relative">
          
          <div className="flex items-center space-x-2 self-start mb-4 select-none lg:pl-16">
            <span className="w-8 h-[1px] bg-[#C4894F]" />
            <span className="font-mono text-[10px] text-[#C4894F] tracking-widest uppercase font-black">The Shell transformed</span>
          </div>

          {/* Central Spinning Platform Card as a Frosted Glass Card */}
          <div className="relative w-80 h-80 flex items-center justify-center bg-white/30 backdrop-blur-xl border border-white/25 rounded-3xl shadow-2xl overflow-hidden">
            
            {/* Spinning/pulsing ambient behind */}
            <div className="absolute inset-12 rounded-full border border-dashed border-[#C4894F]/30 animate-spin" style={{ animationDuration: '40s' }} />

            {/* Carousel Crossfade SVG Component */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSilhouetteIndex}
                initial={{ opacity: 0, scale: 0.85, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.85, rotate: 30 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-center flex-col relative z-10 text-[#3D1F0D]"
              >
                {productSilhouettes[activeSilhouetteIndex].svg}
                <span className="font-handwritten text-xs text-[#3D1F0D]/75 mt-4 font-black tracking-wide block uppercase">
                  {productSilhouettes[activeSilhouetteIndex].name}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute -bottom-8 font-auto font-black text-xs text-[#C4894F] select-none text-center italic">
            every shell holds a custom utility awaiting release
          </div>
        </div>

        {/* RIGHT COLUMN: Slamming Typography & SDG badges */}
        <div className="flex flex-col justify-center items-start pl-0 lg:pl-12">
          
          <div className="space-y-3 sm:space-y-4 mb-10 w-full" ref={textGroupRef}>
            
            {/* Word 1 */}
            <h2 className="solution-slam-word font-serif font-black text-[#3D1F0D] leading-none opacity-0 flex items-baseline" style={{ fontSize: "clamp(2.8rem, 5vw, 4.8rem)" }}>
              Upcycled.
              <span className="text-[#D4A843] ml-1">.</span>
            </h2>

            {/* Word 2 */}
            <h2 className="solution-slam-word font-serif font-black text-[#3D1F0D] leading-none opacity-0 flex items-baseline" style={{ fontSize: "clamp(2.8rem, 5vw, 4.8rem)" }}>
              Handcrafted.
              <span className="text-[#C4894F] ml-1">.</span>
            </h2>

            {/* Word 3 */}
            <h2 className="solution-slam-word font-serif font-black text-[#3D1F0D] leading-none opacity-0 flex items-baseline" style={{ fontSize: "clamp(2.8rem, 5vw, 4.8rem)" }}>
              Purposeful.
              <span className="text-[#4A6741] ml-1">.</span>
            </h2>
          </div>

          {/* BADGES ROW */}
          <div className="space-y-4 w-full" ref={badgeGroupRef}>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#3D1F0D]/50 font-bold mb-2">
              Our triple-bottom-line impact
            </p>

            <div className="grid grid-cols-3 gap-3 md:gap-4 w-full">
              
              {/* Badge 1: Zero Waste */}
              <div className="solution-badge-el opacity-0 bg-white/25 backdrop-blur-lg border border-white/20 rounded-2xl p-3 md:p-4 flex flex-col items-center text-center shadow-md select-none hover:bg-white/35 transition-colors">
                <span className="text-xl md:text-2xl mb-1.5" role="img" aria-label="leaf">🌿</span>
                <span className="font-handwritten font-black text-xs md:text-sm text-[#3D1F0D]">
                  Zero Waste
                </span>
              </div>

              {/* Badge 2: Tribal Community */}
              <div className="solution-badge-el opacity-0 bg-white/25 backdrop-blur-lg border border-white/20 rounded-2xl p-3 md:p-4 flex flex-col items-center text-center shadow-md select-none hover:bg-white/35 transition-colors">
                <span className="text-xl md:text-2xl mb-1.5" role="img" aria-label="hands">🤝</span>
                <span className="font-handwritten font-black text-xs md:text-sm text-[#3D1F0D]">
                  Community
                </span>
              </div>

              {/* Badge 3: Circular Economy */}
              <div className="solution-badge-el opacity-0 bg-white/25 backdrop-blur-lg border border-white/20 rounded-2xl p-3 md:p-4 flex flex-col items-center text-center shadow-md select-none hover:bg-white/35 transition-colors">
                <span className="text-xl md:text-2xl mb-1.5" role="img" aria-label="recycle">♻️</span>
                <span className="font-handwritten font-black text-xs md:text-sm text-[#3D1F0D]">
                  Circular
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* COCO POSITIONED AT BOTTOM-RIGHT IN AN EXCITED STATE */}
      <div className="absolute right-6 bottom-6 sm:right-12 sm:bottom-12 z-20">
        <MascotCoco emotion="excited" size={100} />
      </div>

    </div>
  );
}
