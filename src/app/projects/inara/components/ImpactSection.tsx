import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MascotCoco from './MascotCoco';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

export default function ImpactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Real-time stat state for smooth counting simulation
  const [rakhiCount, setRakhiCount] = useState(0);
  const [shellsCount, setShellsCount] = useState(0);

  useEffect(() => {
    // 1. Core Header and Cards Reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(
      ".impact-header",
      { opacity: 0, scale: 0.95, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power4.out" }
    );

    tl.fromTo(
      ".impact-stat-card",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.25, ease: "power2.out" },
      "-=0.6"
    );

    // Sequential fade-in of the lines in the final quote
    tl.fromTo(
      ".impact-quote-line",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.35, ease: "power2.out" },
      "-=0.2"
    );

    // 2. Count-up triggers
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top center",
      onEnter: () => {
        // Count up Rakhi fulfillment (0 -> 250)
        gsap.to({ val: 0 }, {
          val: 250,
          duration: 2.2,
          ease: "power2.out",
          onUpdate: function() {
            setRakhiCount(Math.floor(this.targets()[0].val));
          }
        });

        // Count up Shells saved per cycle (0 -> 500)
        gsap.to({ val: 0 }, {
          val: 500,
          duration: 2.5,
          ease: "power2.out",
          onUpdate: function() {
            setShellsCount(Math.floor(this.targets()[0].val));
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="impact-section"
      className="relative w-full min-h-[120vh] flex flex-col justify-center items-center py-20 px-6 sm:px-16"
      style={{
        background: 'linear-gradient(180deg, #2A6B72 0%, #1A1008 85%, #0E0703 100%)', // Teal to deep warm dark
      }}
    >
      {/* Background paper noise fibers */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Sparkling particle stars overlay */}
      <div className="absolute inset-x-0 bottom-24 h-48 pointer-events-none overflow-hidden select-none opacity-40">
        <div className="absolute w-1 h-1 bg-[#D4A843] rounded-full bottom-8 left-[40vw] animate-ping" />
        <div className="absolute w-1.5 h-1.5 bg-[#FAF6EE] rounded-full bottom-20 left-[48vw] animate-ping" style={{ animationDelay: '0.8s' }} />
        <div className="absolute w-1 h-1 bg-[#D4A843] rounded-full bottom-10 left-[58vw] animate-ping" style={{ animationDelay: '1.5s' }} />
        <div className="absolute w-2 h-2 bg-[#FAF6EE] rounded-full bottom-24 left-[35vw] animate-ping" style={{ animationDelay: '0.4s' }} />
        <div className="absolute w-1 h-1 bg-[#FAF6EE] rounded-full bottom-16 left-[62vw] animate-ping" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-[1000px] w-full mx-auto flex flex-col items-center text-center z-10">
        
        {/* Solemn Section Header */}
        <div className="impact-header opacity-0 mb-16 select-none">
          <div className="flex items-center justify-center space-x-2.5 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843]" />
            <h5 className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4A843] font-black">
              Verified Progress Roadmap
            </h5>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843]" />
          </div>
          
          <h2 className="font-serif font-black text-[#FAF6EE]" style={{ fontSize: "clamp(2.5rem, 5vw, 4.2rem)" }}>
            What We've Built Together
          </h2>
        </div>

        {/* THREE STAGGERED STATISTICS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-20">
          
          {/* STAT CARD 1 */}
          <div className="impact-stat-card opacity-0 bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 flex flex-col items-center shadow-xl hover:bg-white/15 transition-colors">
            <h3 className="font-serif font-black text-[#D4A843] leading-none" style={{ fontSize: "clamp(3.5rem, 6vw, 5rem)" }}>
              {rakhiCount === 0 ? "..." : `${rakhiCount}+`}
            </h3>
            <span className="font-handwritten text-lg sm:text-xl text-[#FAF6EE] mt-3 font-semibold">
              Rakhi orders fulfilled pan-India
            </span>
            <p className="font-sans text-xs text-[#FAF6EE]/60 mt-1.5 max-w-[200px] font-medium">
              Single holiday campaign empowering rural shipping channels.
            </p>
          </div>

          {/* STAT CARD 2 */}
          <div className="impact-stat-card opacity-0 bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 flex flex-col items-center shadow-xl hover:bg-white/15 transition-colors">
            <h3 className="font-serif font-black text-[#D4A843] leading-none" style={{ fontSize: "clamp(3.5rem, 6vw, 5rem)" }}>
              {shellsCount === 0 ? "..." : `${shellsCount}s`}
            </h3>
            <span className="font-handwritten text-lg sm:text-xl text-[#FAF6EE] mt-3 font-semibold">
              of coconut shells saved per cycle
            </span>
            <p className="font-sans text-xs text-[#FAF6EE]/60 mt-1.5 max-w-[200px] font-medium">
              Diverted cleanly from open agricultural burning.
            </p>
          </div>

          {/* STAT CARD 3 */}
          <div className="impact-stat-card opacity-0 bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 flex flex-col items-center shadow-xl hover:bg-white/15 transition-colors">
            <h3 className="font-serif font-black text-[#D4A843] leading-none" style={{ fontSize: "clamp(2.8rem, 4.5vw, 4rem)" }}>
              2022 & 2023
            </h3>
            <span className="font-handwritten text-lg sm:text-xl text-[#FAF6EE] mt-3 font-semibold">
              Enactus National Recognition
            </span>
            <p className="font-sans text-xs text-[#FAF6EE]/60 mt-1.5 max-w-[200px] font-medium">
              Semi-Finals & Embarking Entrepreneurial Leadership Awards.
            </p>
          </div>

        </div>

        {/* BOTTOM FULL WIDTH HERO QUOTE */}
        <div className="max-w-[700px] w-full border-t border-white/5 pt-12 mb-16 select-none">
          <p className="font-handwritten text-[#C4894F] leading-[1.4] italic" style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)" }}>
            <span className="impact-quote-line block opacity-0">
              "What was once a discarded coconut shell
            </span>
            <span className="impact-quote-line block opacity-0 mt-1">
              has been polished, cut, and carved
            </span>
            <span className="impact-quote-line block opacity-0 mt-1">
              by skilful hands into a charming eco-friendly treasure
            </span>
            <span className="impact-quote-line block opacity-0 mt-1 font-bold text-[#D4A843]">
              — just for you."
            </span>
          </p>
        </div>

        {/* PROUD COCO CELEBRATING */}
        <div className="flex flex-col items-center">
          <MascotCoco emotion="proud" size={110} />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 2.2 }}
            className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#FAF6EE] mt-2 block"
          >
            Mascot Sparkle State
          </motion.span>
        </div>

      </div>
    </div>
  );
}
