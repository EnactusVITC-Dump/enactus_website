import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MascotCoco from './MascotCoco';
import { motion, AnimatePresence, useAnimation, useInView } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

export default function ProblemSection() {
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const panel3Ref = useRef<HTMLDivElement>(null);

  // Stats and animations states
  const [statValue, setStatValue] = useState(0);
  const [revealCounterpoints, setRevealCounterpoints] = useState(false);
  const [triggerCocoTurn, setTriggerCocoTurn] = useState(false);
  const [cocoState, setCocoState] = useState<'sad' | 'curious' | 'excited'>('sad');

  // Strikethrough lines refs for Panel 2
  const strike1Ref = useRef<SVGLineElement>(null);
  const strike2Ref = useRef<SVGLineElement>(null);
  const strike3Ref = useRef<SVGLineElement>(null);

  useEffect(() => {
    // Count-up stat for Panel 1 on view
    ScrollTrigger.create({
      trigger: panel1Ref.current,
      start: "top 70%",
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: 3.7,
          duration: 3,
          ease: "power2.out",
          onUpdate: function() {
            setStatValue(parseFloat(this.targets()[0].val.toFixed(1)));
          }
        });
      },
      once: true
    });

    // Strikethrough line draw for Panel 2
    gsap.timeline({
      scrollTrigger: {
        trigger: panel2Ref.current,
        start: "top 60%",
        toggleActions: "play none none reverse",
      }
    })
    .fromTo(strike1Ref.current, { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 0.6, ease: "power1.inOut" })
    .fromTo(strike2Ref.current, { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 0.6, ease: "power1.inOut" }, "-=0.2")
    .fromTo(strike3Ref.current, { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 0.6, ease: "power1.inOut" }, "-=0.2")
    .to({}, { duration: 0.1, onStart: () => setRevealCounterpoints(true), onReverseComplete: () => setRevealCounterpoints(false) });

    // Turning point triggers for coco in Panel 3
    ScrollTrigger.create({
      trigger: panel3Ref.current,
      start: "top 60%",
      end: "bottom center",
      onEnter: () => {
        setTriggerCocoTurn(true);
      },
      onLeaveBack: () => {
        setTriggerCocoTurn(false);
        setCocoState('sad');
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Control sequence of Coco's turning point once Panel 3 triggers
  useEffect(() => {
    if (!triggerCocoTurn) return;

    // Stage 1: walking in and feeling sad/curious
    const t1 = setTimeout(() => {
      setCocoState('curious');
    }, 1500);

    // Stage 2: touches and sparkles glow up
    const t2 = setTimeout(() => {
      setCocoState('excited');
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [triggerCocoTurn]);

  return (
    <div
      ref={containerRef}
      id="problem-trigger-container"
      className="relative w-full"
      style={{ background: '#F5ECD7' }}
    >
      {/* Noise background overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 z-[1]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      <div
        ref={scrollWrapperRef}
        className="flex flex-col w-full relative z-[2] space-y-16 sm:space-y-0"
      >
        
        {/* ================= PANEL 1: "The Shell Nobody Wanted" ================= */}
        <div
          ref={panel1Ref}
          className="w-full min-h-screen py-16 sm:py-24 flex flex-col md:flex-row items-center justify-center px-8 sm:px-20 relative text-[#3D1F0D]"
        >
          {/* Ambient Glows for Panel 1 */}
          <div className="absolute top-[10%] left-[5%] w-[380px] h-[380px] opacity-[0.18] bg-[#4A6741] rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[10%] right-[10%] w-[450px] h-[450px] opacity-[0.16] bg-[#D4A843] rounded-full blur-[120px] pointer-events-none" />

          {/* Left Half: Illustrated Pile of Discarded Shells */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative py-6 md:py-0 z-10">
            <span className="font-sans font-black uppercase tracking-[0.2em] text-[#4A6741] mb-6 text-xs sm:text-sm self-start">
              The Agricultural Waste Gap
            </span>
            
            {/* Beautiful Framed Polaroids/Paper card representing the real Agricultural Waste */}
            <div className="relative w-full max-w-[360px] aspect-square rounded-[32px] overflow-hidden border border-white/20 shadow-2xl p-3 bg-white/30 backdrop-blur-md group">
              {/* Inner container with organic clipping or styling */}
              <div className="relative w-full h-full rounded-[20px] overflow-hidden shadow-inner bg-black/10">
                <img
                  src="/images/inara/discarded_shells_waste_gap_1781203354428.jpg"
                  alt="Discarded coconut shells pile agricultural waste"
                  className="w-full h-full object-cover select-none transition-all duration-700 ease-out group-hover:scale-105 filter saturate-[0.85] sepia-[0.1]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Vintage dark film look vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none mix-blend-multiply" />
                
                {/* Steaming / Burning haze rising overlay */}
                <div className="absolute inset-0 pointer-events-none flex justify-around opacity-30 z-10">
                  <div className="w-0.5 h-1/2 bg-gradient-to-t from-white/30 to-transparent rounded animate-pulse" style={{ animationDuration: '3.5s' }} />
                  <div className="w-0.5 h-2/3 bg-gradient-to-t from-white/20 to-transparent rounded animate-pulse" style={{ animationDuration: '5s', animationDelay: '0.8s' }} />
                  <div className="w-0.5 h-1/3 bg-gradient-to-t from-white/40 to-transparent rounded animate-pulse" style={{ animationDuration: '4.2s', animationDelay: '1.6s' }} />
                </div>
              </div>
              
              {/* Little realistic distress detail sticker */}
              <div className="absolute bottom-6 left-6 rotate-[-2deg] bg-[#C4894F]/85 text-[#FAF6EE] border border-white/25 px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded-lg shadow-lg z-20">
                Abandoned Waste
              </div>
            </div>
          </div>

          {/* Right Grid: Statistical Frosted Card */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-start pl-0 md:pl-12 py-6 md:py-0 z-10">
            <div className="p-8 md:p-10 bg-white/30 backdrop-blur-xl border border-white/25 rounded-3xl shadow-2xl text-[#3D1F0D] max-w-[500px]">
              <span className="font-mono text-xs text-[#4A6741] tracking-widest uppercase block mb-2 font-bold opacity-60">India's Annual Metric</span>
              <h2 className="font-serif font-black text-[#D4A843] mb-1 leading-none" style={{ fontSize: "clamp(3.5rem, 6vw, 5rem)" }}>
                {statValue === 0 ? "..." : `${statValue}B`}
              </h2>
              <p className="font-handwritten text-xl sm:text-2xl text-[#C4894F] mb-4 font-semibold">
                coconut shells discarded annually
              </p>
              <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#3D1F0D]/80">
                Considered mere agricultural waste, massive residues from temples, stalls, and coastal homes end up either buried as waste or burned in open-air pits, heavily emitting carbon.
              </p>
            </div>
          </div>
        </div>

        {/* ================= PANEL 2: "Burned. Buried. Forgotten." ================= */}
        <div
          ref={panel2Ref}
          className="w-full min-h-screen py-16 sm:py-24 flex flex-col items-center justify-center px-8 sm:px-24 relative text-[#3D1F0D]"
        >
          {/* Ambient Glows for Panel 2 */}
          <div className="absolute top-[10%] right-[10%] w-[420px] h-[420px] opacity-[0.16] bg-[#993322] rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute bottom-[10%] left-[5%] w-[380px] h-[380px] opacity-[0.15] bg-[#3D1F0D] rounded-full blur-[100px] pointer-events-none" />

          {/* Giant Typographic content wrapped in elegant frosted glass board */}
          <div className="max-w-[850px] w-full mx-auto p-8 sm:p-12 bg-white/30 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl text-[#3D1F0D] flex flex-col space-y-6 z-10 relative">
            
            <div className="flex items-center mb-2 select-none">
              <span className="font-mono text-xs text-[#993322] tracking-widest uppercase font-black">The Destructive Fate</span>
            </div>

            {/* Giant Typographic words */}
            <div className="space-y-6 sm:space-y-8 py-2 md:py-4">
              {/* Word 1: BURNED */}
              <div className="relative inline-block group block">
                <h3 
                  className="font-distressed tracking-wider leading-none select-none transition-all duration-500 text-[#7A2B1C] hover:text-[#B53E26] hover:drop-shadow-[0_0_12px_rgba(181,62,38,0.3)]" 
                  style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)" }}
                >
                  BURNED.
                </h3>
                {/* SVG strikethrough drawing across */}
                <svg className="absolute inset-y-0 left-0 w-full h-[1.5em] pointer-events-none" viewBox="0 0 1000 40" preserveAspectRatio="none">
                  <line
                    ref={strike1Ref}
                    x1="0" y1="20" x2="1000" y2="20"
                    stroke="#D4A843" strokeWidth="6" strokeLinecap="round"
                    strokeDasharray="1000" strokeDashoffset="1000"
                  />
                </svg>
              </div>

              {/* Word 2: BURIED */}
              <div className="block">
                <div className="relative inline-block group">
                  <h3 
                    className="font-serif font-black tracking-normal leading-none select-none transition-all duration-500 text-[#422C1D] hover:text-[#6E472D]" 
                    style={{ fontSize: "clamp(3rem, 7.2vw, 6.2rem)" }}
                  >
                    BURIED.
                  </h3>
                  <svg className="absolute inset-y-0 left-0 w-full h-[1.5em] pointer-events-none" viewBox="0 0 1000 40" preserveAspectRatio="none">
                    <line
                      ref={strike2Ref}
                      x1="0" y1="20" x2="1000" y2="20"
                      stroke="#D4A843" strokeWidth="6" strokeLinecap="round"
                      strokeDasharray="1000" strokeDashoffset="1000"
                    />
                  </svg>
                </div>
              </div>

              {/* Word 3: FORGOTTEN */}
              <div className="block">
                <div className="relative inline-block group">
                  <h3 
                    className="font-display font-medium tracking-widest leading-none select-none transition-all duration-700 text-[#7C7164] hover:text-[#AE9E8B]" 
                    style={{ fontSize: "clamp(2.4rem, 6vw, 4.8rem)" }}
                  >
                    FORGOTTEN.
                  </h3>
                  <svg className="absolute inset-y-0 left-0 w-full h-[1.5em] pointer-events-none" viewBox="0 0 1000 40" preserveAspectRatio="none">
                    <line
                      ref={strike3Ref}
                      x1="0" y1="20" x2="1000" y2="20"
                      stroke="#D4A843" strokeWidth="6" strokeLinecap="round"
                      strokeDasharray="1000" strokeDashoffset="1000"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <p className="font-handwritten text-xl sm:text-2xl text-[#C4894F] max-w-[550px] leading-relaxed italic pt-2 font-bold">
              "Lost underneath layers of municipal soil, or burned into smoke columns across Kalpakkam's coastal sky..."
            </p>

            {/* Cinematic Emotional Reveal Counterpoint Block */}
            <div className="h-16 flex items-center pt-2">
              <AnimatePresence>
                {revealCounterpoints && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[#4A6741] font-serif font-black text-2xl sm:text-4xl tracking-tight select-none"
                  >
                    <span style={{ textShadow: '0 0 20px rgba(74,103,65,0.2)' }}>Repurposed.</span>
                    <span className="text-[#3D1F0D]/40 font-sans text-lg sm:text-2xl font-light select-none">•</span>
                    <span style={{ textShadow: '0 0 20px rgba(74,103,65,0.2)' }}>Reimagined.</span>
                    <span className="text-[#3D1F0D]/40 font-sans text-lg sm:text-2xl font-light select-none">•</span>
                    <span style={{ textShadow: '0 0 20px rgba(74,103,65,0.2)' }}>Remembered.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ================= PANEL 3: The Turn (COCO APPEARS) ================= */}
        <div
          ref={panel3Ref}
          className="w-full min-h-screen py-16 sm:py-24 flex flex-col items-center justify-center relative text-[#3D1F0D] overflow-hidden"
        >
          {/* Glowing backlight center-bottom */}
          <div 
            className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none blur-[150px] transition-all duration-[2000ms]" 
            style={{
              background: cocoState === 'excited' 
                ? 'radial-gradient(circle, rgba(212,168,67,0.3) 0%, rgba(212,168,67,0) 80%)' 
                : 'radial-gradient(circle, rgba(212,168,67,0.06) 0%, rgba(212,168,67,0) 80%)'
            }}
          />

          {/* Frosted Glass focal card context wrapping Coco and the trigger texts */}
          <div className="flex flex-col items-center justify-center max-w-[750px] w-full px-8 py-10 bg-white/25 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl text-center select-none z-10 relative">
            
            {/* INARA turning tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={triggerCocoTurn ? { opacity: 0.8, y: 0 } : {}}
              transition={{ duration: 1 }}
              className="font-mono text-xs tracking-[0.2em] uppercase text-[#D4A843] mb-6 font-black"
            >
              The Turning Point
            </motion.div>

            {/* Coco Interaction Area: Coco walks in from left of panel */}
            <div className="relative w-80 h-48 flex items-center justify-center mb-6">
              
              {/* Coco walking / floating transition */}
              <motion.div
                initial={{ x: -280, opacity: 0 }}
                animate={triggerCocoTurn ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 1.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-1/4 -translate-x-1/2"
              >
                <MascotCoco emotion={cocoState} size={110} />
              </motion.div>

              {/* The Discarded Shell waiting on the floor - replaced with beautiful vibrant coconut image */}
              <motion.div
                className="absolute right-1/4 translate-x-1/2 pointer-events-auto"
                animate={cocoState === 'excited' ? { scale: [1, 1.1, 1], rotate: [0, -3, 0] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-[#D4A843]/20 shadow-2xl bg-black/40">
                  <img
                    src="/images/inara/turning_point_coconut_1781024425164.png"
                    alt="Discarded coconut shell upcycled"
                    className={`w-full h-full object-cover select-none transition-all duration-1000 ${
                      cocoState === 'excited' ? 'scale-105 saturate-[1.3] brightness-105' : 'opacity-[0.65] saturate-50 brightness-90'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                  {cocoState === 'excited' && (
                    <div className="absolute inset-0 rounded-full border border-[#D4A843] animate-pulse" />
                  )}
                </div>
              </motion.div>

              {/* Connecting thread / ray of light from Coco to shell when excited */}
              {cocoState === 'excited' && (
                <motion.svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.line
                    x1="120" y1="95" x2="215" y2="95"
                    stroke="#D4A843" strokeWidth="2.5" strokeDasharray="4 3"
                  />
                  <motion.circle cx="215" cy="95" r="4" fill="#FAF6EE" />
                </motion.svg>
              )}
            </div>

            {/* Turning Point cinematic statement */}
            <h4 className="h-20 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {cocoState === 'sad' && (
                  <motion.span
                    key="text-sad"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.6 }}
                    className="font-handwritten text-xl sm:text-2xl text-[#3D1F0D]/60 italic font-bold"
                  >
                    Coco wandering through coastal scrap heaps...
                  </motion.span>
                )}
                {cocoState === 'curious' && (
                  <motion.span
                    key="text-curious"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.6 }}
                    className="font-handwritten text-xl sm:text-2xl text-[#C4894F] font-black"
                  >
                    He notices a lonely, abandoned shell...
                  </motion.span>
                )}
                {cocoState === 'excited' && (
                  <motion.span
                    key="text-excited"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.8 }}
                    className="font-handwritten text-2xl sm:text-4xl text-[#3D1F0D] font-black"
                    style={{ textShadow: '0 0 25px rgba(212,168,67,0.35)' }}
                  >
                    Until someone saw differently.
                  </motion.span>
                )}
              </AnimatePresence>
            </h4>

            {/* Glowing morph target block at the end (fades out as next section scroll in) */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={cocoState === 'excited' ? { scale: 1, opacity: 0.8 } : {}}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-16 h-16 bg-[#D4A843] rounded-full filter blur-xl absolute bottom-1/4"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
