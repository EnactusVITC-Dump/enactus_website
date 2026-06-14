import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MascotCoco from './MascotCoco';
import { SDG_ZONES, SdgZone } from '../types';
import { motion, AnimatePresence } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

export default function SdgSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<HTMLDivElement>(null);

  const [activeZoneIndex, setActiveZoneIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCoconutCracked, setIsCoconutCracked] = useState(false);

  useEffect(() => {
    // 1. Setup ScrollTrigger to pin tree and drive ascendance progress
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: true,
      pinSpacing: false, // Clean pass into next section
      scrub: 1.2,
      onUpdate: (self) => {
        const progress = self.progress;
        setScrollProgress(progress);

        // Map progress (0 -> 1) to one of the 6 SDG Zones
        const zoneIndex = Math.min(
          Math.floor(progress * SDG_ZONES.length),
          SDG_ZONES.length - 1
        );
        setActiveZoneIndex(zoneIndex);
      },
    });

    // 2. Drive subtle zoom scale on the tree to simulate climbing
    gsap.fromTo(
      treeRef.current,
      { scale: 0.95, y: 100 },
      {
        scale: 1.35,
        y: -150, // slowly pull tree down to climb up
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      }
    );

    return () => {
      scrollTriggerInstance.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Soft sky transitions in real-time based on scrolling climb:
  // Roots (Bottom) -> Crown (Top)
  // Roots: Deep earth Dusk #1A1008
  // Crown: Golden sunset amber shifting to Soft Sky teal
  const getSkyStyle = () => {
    // We blend our colors nicely based on progress
    if (scrollProgress < 0.25) {
      // Zone 1 & 2 Roots: deep earth cocoa to dark warm amber
      return {
        background: 'radial-gradient(circle at 50% 120%, #3D1F0D 0%, #1A1008 70%)',
      };
    } else if (scrollProgress < 0.6) {
      // Zone 3 & 4 Trunk: warm amber to rich copper
      return {
        background: 'radial-gradient(circle at 50% 100%, #5C3217 0%, #241308 80%)',
      };
    } else if (scrollProgress < 0.85) {
      // Zone 5 Fronds Base: shift toward organic teal depth
      return {
        background: 'radial-gradient(circle at 50% 50%, #1c454a 0%, #0d2224 80%)',
      };
    } else {
      // Zone 6 Crown: sunset gold, twilight breeze
      return {
        background: 'radial-gradient(circle at 50% 30%, #4D3D1F 0%, #1F150B 100%)',
      };
    }
  };

  const activeZone = SDG_ZONES[activeZoneIndex];

  // Sides for SDG tags based on zone hierarchy layout balance
  const side = activeZoneIndex % 2 === 0 ? 'left' : 'right';

  return (
    <div
      ref={containerRef}
      id="sdg-navigation-container"
      className="relative w-full h-[600vh] overflow-hidden"
    >
      {/* 1. Viewport fixed display frame */}
      <div
        ref={skyRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center transition-all duration-[1200ms] ease-out-quint"
        style={getSkyStyle()}
      >
        {/* Subtle cloud drift behind tree */}
        <div className="absolute inset-x-0 top-12 flex justify-around pointer-events-none opacity-10">
          <div className="w-96 h-12 bg-white/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDuration: '12s' }} />
          <div className="w-80 h-16 bg-white/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDuration: '18s', animationDelay: '2s' }} />
        </div>

        {/* 2. THE MAJESTIC FIXED CENTER AXIS: SDG TREE CONTAINER */}
        <div 
          ref={treeRef}
          className="absolute inset-y-0 w-full max-w-[800px] flex items-center justify-center pointer-events-none select-none z-10 px-6"
        >
          <div className="relative h-[110%] w-full flex items-center justify-center">
            
            {/* Base high-contrast palm tree */}
            <img
              src="/src/assets/images/coconut_tree_1781015370709.png"
              alt="Majestic Project Inara SDG Coconut Tree"
              className="h-full w-auto object-contain filter drop-shadow-[0_30px_50px_rgba(0,0,0,0.85)] brightness-110 saturate-[1.10]"
              referrerPolicy="no-referrer"
            />

            {/* Glowing Ripened Coconut Left - representing upcycling SDG 12 */}
            <div 
              className="absolute top-[32%] left-[41%] w-8 h-9 sm:w-11 sm:h-12 bg-gradient-to-br from-[#73421d] via-[#4a270f] to-[#120701] rounded-[38%_42%_50%_50%] shadow-[inset_-3px_-3px_8px_rgba(0,0,0,0.8),0_15px_20px_rgba(0,0,0,0.65)] border border-[#C4894F]/35 pointer-events-auto cursor-pointer group"
              style={{ transform: 'rotate(-12deg)' }}
            >
              {/* Stem connect */}
              <div className="absolute top-[-7px] left-1/2 -translate-x-1/2 w-1.5 h-3 bg-[#334E2A] rounded-full" />
              {/* Shimmer light reflect */}
              <div className="absolute top-1 left-2.5 w-2 h-2 bg-white/20 rounded-full blur-[0.5px]" />
              {/* Dynamic pulse representation when active zone is SDGS */}
              <div className="absolute inset-0 rounded-[38%_42%_50%_50%] border-2 border-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Badge */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-xl text-[9px] text-[#D4A843] font-mono uppercase tracking-widest whitespace-nowrap z-50 shadow-lg border border-white/10">
                SDG 12 • Smart Production
              </div>
            </div>

            {/* Glowing Ripened Coconut Right - representing local climate support SDG 13 */}
            <div 
              className="absolute top-[34%] left-[53%] w-9 h-10 sm:w-12 sm:h-13 bg-gradient-to-br from-[#7e4b25] via-[#522d14] to-[#140801] rounded-[42%_38%_48%_52%] shadow-[inset_-3px_-3px_9px_rgba(0,0,0,0.85),0_18px_24px_rgba(0,0,0,0.7)] border border-[#C4894F]/40 pointer-events-auto cursor-pointer group"
              style={{ transform: 'rotate(15deg)' }}
            >
              <div className="absolute top-[-7px] left-1/3 -translate-x-1/2 w-1.5 h-3 bg-[#334E2A] rounded-full" />
              <div className="absolute top-1 left-3 w-2.5 h-2.5 bg-white/15 rounded-full blur-[0.5px]" />
              <div className="absolute inset-0 rounded-[42%_38%_48%_52%] border-2 border-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-xl text-[9px] text-[#D4A843] font-mono uppercase tracking-widest whitespace-nowrap z-50 shadow-lg border border-white/10">
                SDG 13 • Climate Protection
              </div>
            </div>

            {/* Glowing Ripened Coconut Center - representing livelihood SDG 8 */}
            <div 
              className="absolute top-[29%] left-[47%] w-7 h-8 sm:w-10 sm:h-11 bg-gradient-to-br from-[#683c18] via-[#421f0a] to-[#0e0400] rounded-[45%_45%_50%_50%] shadow-[inset_-2px_-2px_7px_rgba(0,0,0,0.8),0_12px_18px_rgba(0,0,0,0.6)] border border-[#C4894F]/30 pointer-events-auto cursor-pointer group"
              style={{ transform: 'rotate(4deg)' }}
            >
              <div className="absolute top-[-6px] left-1/2 -translate-x-1/2 w-1 h-2.5 bg-[#334E2A] rounded-full" />
              <div className="absolute top-1 left-2 w-1.5 h-1.5 bg-white/20 rounded-full blur-[0.5px]" />
              <div className="absolute inset-0 rounded-[45%_45%_50%_50%] border-2 border-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-xl text-[9px] text-[#D4A843] font-mono uppercase tracking-widest whitespace-nowrap z-50 shadow-lg border border-white/10">
                SDG 8 • Dignified Livelihoods
              </div>
            </div>

            {/* Delicate high-fidelity leaf structures floating in space */}
            <div className="absolute top-[22%] left-[25%] w-[15%] h-[8%] opacity-30 pointer-events-none mix-blend-screen scale-x-[-1] rotate-12 blur-[0.5px]">
              <svg viewBox="0 0 100 35" fill="#8AAF6E" className="w-full h-full">
                <path d="M0,35 C30,30 65,15 100,0 C75,10 40,20 0,35 Z" />
              </svg>
            </div>
            <div className="absolute top-[18%] right-[20%] w-[18%] h-[9%] opacity-25 pointer-events-none mix-blend-screen rotate-6 blur-[1px]">
              <svg viewBox="0 0 100 35" fill="#4A6741" className="w-full h-full">
                <path d="M0,35 C30,30 65,15 100,0 C75,10 40,20 0,35 Z" />
              </svg>
            </div>

          </div>

          {/* Active zone laser light ring glow projecting on the tree */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-48 h-48 rounded-full pointer-events-none filter blur-2xl animate-pulse duration-[3000ms]"
            style={{
              top: `${80 - (scrollProgress * 70)}%`, // follows climbing coordinates
              background: `radial-gradient(circle, ${activeZone.color} 0%, rgba(255,255,255,0) 70%)`,
              opacity: 0.55
            }}
          />
        </div>

        {/* 3. DYNAMIC CRACKING SDG INFO CARDS (FLOAT SIDES) */}
        <div className="w-full max-w-[1300px] mx-auto h-full flex flex-col justify-center px-6 sm:px-12 relative z-20 pointer-events-none">
          
          <div className={`w-full md:w-[45%] flex flex-col justify-center pointer-events-auto h-auto ${side === 'right' ? 'self-end' : 'self-start'}`}>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeZone.id}
                initial={{ opacity: 0, x: side === 'left' ? -65 : 65, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: side === 'left' ? -45 : 45, scale: 0.95 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white/35 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/25 shadow-2xl text-[#3D1F0D]"
              >
                {/* Heading details */}
                <div className="flex items-center space-x-3 mb-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full inline-block animate-ping"
                    style={{ backgroundColor: activeZone.color }}
                  />
                  <h4 className="font-serif font-black text-xs uppercase tracking-widest text-[#3D1F0D]/60">
                    Active Zone • UN Alignment
                  </h4>
                </div>

                <div className="flex items-baseline space-x-3 select-none">
                  <h2 className="font-serif font-black text-3xl sm:text-4xl" style={{ color: activeZone.color }}>
                    {activeZone.sdgNumber}
                  </h2>
                  <span className="font-handwritten text-lg text-[#C4894F] font-bold">
                    {activeZone.title}
                  </span>
                </div>

                <span className="w-16 h-[1.5px] bg-[#3D1F0D]/15 block my-4" />

                {/* Substantive Inara Contribution body */}
                <p className="font-handwritten text-base sm:text-xl text-[#3D1F0D] leading-relaxed font-bold">
                  {activeZone.action}
                </p>

                <div className="mt-5 flex items-center space-x-2 text-[10px] font-mono uppercase tracking-wider text-[#3D1F0D]/50 font-bold">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 8v4l3 3"/>
                  </svg>
                  <span>Zone Altitude {Math.round(scrollProgress * 100)}%</span>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

          {/* Left instructions header overlay explaining navigation */}
          <div className="absolute top-10 left-6 sm:left-12 max-w-[280px]">
            <h5 className="font-sans font-bold text-[#FAF6EE] opacity-50 uppercase tracking-[0.25em] text-[10px] sm:text-xs">
              SDG Navigation Climb
            </h5>
            <p className="font-handwritten text-xs sm:text-sm text-[#F5ECD7] opacity-60 mt-1 italic">
              scroll downwards slowly to ascend the tree and trace out six eco milestones...
            </p>
          </div>

        </div>

        {/* 4. COCO WAVING HAPPILY SITS IN THE CROWN AT VERY TOP */}
        <AnimatePresence>
          {scrollProgress > 0.88 && (
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute top-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-auto"
            >
              <MascotCoco emotion="excited" size={90} />
              <div className="bg-white/30 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl px-3 py-1.5 mt-2 font-handwritten text-xs text-[#3D1F0D] font-black rotate-[-3deg]">
                Waving from the Crown! 🌴
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
