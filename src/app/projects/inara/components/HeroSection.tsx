import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import MascotCoco from './MascotCoco';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleLettersRef = useRef<HTMLSpanElement[]>([]);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const cocoRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Parallax layer refs
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const botanicalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initial Load Entry Animation (GSAP)
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Animate letters of "INARA"
    tl.fromTo(
      titleLettersRef.current,
      {
        y: 80,
        opacity: 0,
        filter: 'blur(10px)',
      },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        stagger: 0.15,
      },
      0.2
    );

    // Animate Coco falling overlay on the letter "A"
    tl.fromTo(
      cocoRef.current,
      {
        y: -100,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "bounce.out",
      },
      "-=0.4" // delay short after last letter starts
    );

    // Animate Subheading
    tl.fromTo(
      subheadingRef.current,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 0.85,
        duration: 1,
      },
      "-=0.6"
    );

    // Fade in scroll indicator
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 },
      "-=0.4"
    );

    // 2. Parallax Scrolling Animations with ScrollTrigger
    // Distribute Speeds on Scroll:
    // Layer 1 (Furthest Back) - Speed: 0.15
    gsap.to(layer1Ref.current, {
      y: () => window.innerHeight * 0.15,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Layer 2 (Mid Leaves) - Speed: 0.3
    gsap.to(layer2Ref.current, {
      y: () => window.innerHeight * 0.3,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Layer 3 (Foreground Leaves) - Speed: 0.5
    gsap.to(layer3Ref.current, {
      y: () => window.innerHeight * 0.5,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Title moving up slower on scroll (Parallax text)
    gsap.to(".hero-title-wrap", {
      y: () => window.innerHeight * 0.18,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Botanical corners parallax
    gsap.to(botanicalRef.current, {
      y: () => window.innerHeight * 0.1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Fade out scroll indicator on scroll
    gsap.to(scrollIndicatorRef.current, {
      opacity: 0,
      y: -20,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "100px top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToLetters = (el: HTMLSpanElement | null) => {
    if (el && !titleLettersRef.current.includes(el)) {
      titleLettersRef.current.push(el);
    }
  };

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, selector: string) => {
    e.preventDefault();
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(selector, { duration: 1.5 });
    } else {
      const target = document.querySelector(selector);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      ref={containerRef}
      id="hero-section"
      className="relative w-full h-screen overflow-hidden flex flex-col justify-between select-none"
      style={{
        background: 'radial-gradient(circle at center, #23120B 0%, #050100 100%)',
      }}
    >
      {/* 20s noise background overlay */}
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none z-[1]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Cinematic giant glowing gold light spot behind the main content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] h-[35vh] rounded-full bg-[#D4A843]/15 blur-[120px] pointer-events-none z-[2]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[450px] h-[450px] opacity-[0.10] bg-[#FAF6EE] rounded-full blur-[100px] pointer-events-none z-[2]" />

      {/* Navigation Header - Gold & Ivory Dark-Theme adapted */}
      <nav className="absolute top-0 w-full px-8 sm:px-12 py-8 flex justify-between items-center z-50 text-[#FAF6EE] select-none">
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#D4A843]/80">Enactus VIT Chennai Presents</span>
          <span className="text-2xl font-serif italic font-black text-[#FAF6EE] tracking-tighter drop-shadow-[0_2px_10px_rgba(35,18,11,0.6)]">Inara</span>
        </div>
        <div className="flex gap-4 sm:gap-8 items-center text-xs uppercase tracking-widest font-bold">
          <a href="#problem-trigger-container" onClick={(e) => handleNav(e, '#problem-trigger-container')} className="hover:text-[#D4A843] transition-colors pointer-events-auto">Story</a>
          <a href="#artisans-section" onClick={(e) => handleNav(e, '#artisans-section')} className="hover:text-[#D4A843] transition-colors pointer-events-auto">Artisans</a>
          <a href="#products-table-container" onClick={(e) => handleNav(e, '#products-table-container')} className="hover:text-[#D4A843] transition-colors pointer-events-auto">Crafts</a>
          <a href="#site-footer" onClick={(e) => handleNav(e, '#site-footer')} className="hidden sm:inline-block px-4 py-2 border border-[#FAF6EE]/20 rounded-full hover:bg-[#D4A843] hover:border-[#D4A843] hover:text-[#0C0603] transition-all cursor-pointer pointer-events-auto">Support Us</a>
        </div>
      </nav>

      {/* Ambient floating gold sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[4]">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-[#D4A843] rounded-full animate-pulse opacity-40 filter blur-[0.5px]"
            style={{
              width: (i % 3 === 0 ? 3.5 : 2) + 'px',
              height: (i % 3 === 0 ? 3.5 : 2) + 'px',
              top: Math.floor(Math.random() * 85) + 10 + '%',
              left: Math.floor(Math.random() * 90) + 5 + '%',
              animationDelay: (i * 0.4) + 's',
              animationDuration: (3 + (i % 4) * 1.2) + 's',
            }}
          />
        ))}
      </div>

      {/* BACKGROUND TEXTURE: Warm botanical representation (dimmed slightly for back contrast) */}
      <div
        ref={botanicalRef}
        className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-screen flex justify-between p-8 z-[3]"
      >
        {/* Top Left Organic Texture */}
        <svg width="250" height="250" viewBox="0 0 100 100" className="rotate-12 text-[#FAF6EE]">
          <path d="M0 0 C 30 30, 40 60, 50 100 C 40 80, 20 50, 0 0 Z" fill="currentColor" />
          <path d="M10 0 C 40 20, 50 50, 60 90 C 50 70, 30 40, 10 0 Z" fill="currentColor" />
        </svg>
        {/* Bottom Right Organic Texture */}
        <svg width="250" height="250" viewBox="0 0 100 100" className="self-end rotate-[190deg] text-[#FAF6EE]">
          <path d="M0 0 C 30 30, 40 60, 50 100 C 40 80, 20 50, 0 0 Z" fill="currentColor" />
          <path d="M10 0 C 40 20, 50 50, 60 90 C 50 70, 30 40, 10 0 Z" fill="currentColor" />
        </svg>
      </div>

      {/* PARALLAX LAYER 1: Deep shadow leaves */}
      <div
        ref={layer1Ref}
        className="absolute inset-0 pointer-events-none z-[5] opacity-15 filter blur-[6px]"
      >
        <svg className="absolute top-36 left-10 text-[#4A6741] w-64 h-64" viewBox="0 0 100 100">
          <path d="M20,50 C10,34 30,10 60,30 C70,40 50,70 20,50 Z" fill="currentColor" />
        </svg>
        <svg className="absolute top-64 right-16 text-[#C4894F] w-72 h-72" viewBox="0 0 100 100">
          <path d="M80,50 C90,34 70,10 40,30 C30,40 50,70 80,50 Z" fill="currentColor" opacity="0.6"/>
        </svg>
      </div>

      {/* PARALLAX LAYER 2: Medium depth leaf elements */}
      <div
        ref={layer2Ref}
        className="absolute inset-0 pointer-events-none z-[10] opacity-[0.35]"
      >
        <svg className="absolute bottom-1/4 -left-20 text-[#4A6741] w-[35vw] max-w-[400px] h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]" viewBox="0 0 120 120">
          <path d="M -10,30 C 20,30 60,50 80,90 C 40,95 10,70 -10,30" fill="currentColor" />
          <path d="M -15,10 C 15,10 50,30 70,75 C 35,80 5,55 -15,10" fill="#8AAF6E" opacity="0.3" />
        </svg>
        <svg className="absolute bottom-1/3 -right-20 text-[#4A6741] w-[30vw] max-w-[360px] h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] rotate-12" viewBox="0 0 120 120">
          <path d="M 130,30 C 100,30 60,50 40,90 C 80,95 110,70 130,30" fill="currentColor" />
          <path d="M 135,10 C 105,10 70,30 50,75 C 85,80 115,55 135,10" fill="#8AAF6E" opacity="0.3" />
        </svg>
      </div>

      {/* CORE MIDDLE SECTION: Dark Elegant Brand Typography with glowing gold characters + Mascot on letter A */}
      <div className="flex-grow flex flex-col items-center justify-center relative z-20 px-4 mt-20 hero-title-wrap">
        
        {/* INARA Main Heading Wrapper */}
        <h1 
          className="relative font-serif font-black select-none tracking-tight flex items-end justify-center pt-8 leading-[0.8]"
          style={{ fontSize: "clamp(12vw, 15vw, 18vw)" }}
        >
          {/* I */}
          <span ref={addToLetters} className="inline-block text-transparent bg-gradient-to-b from-[#FFFDF9] via-[#E6B66B] to-[#9B611C] bg-clip-text drop-shadow-[0_0_15px_rgba(212,168,67,0.35)]">I</span>
          
          {/* N */}
          <span ref={addToLetters} className="inline-block text-transparent bg-gradient-to-b from-[#FFFDF9] via-[#E6B66B] to-[#9B611C] bg-clip-text drop-shadow-[0_0_15px_rgba(212,168,67,0.35)]">N</span>
 
          {/* A (Middle of INARA with Coco sitting on top) */}
          <span ref={addToLetters} className="relative inline-block text-transparent bg-gradient-to-b from-[#FFFDF9] via-[#E6B66B] to-[#9B611C] bg-clip-text drop-shadow-[0_0_15px_rgba(212,168,67,0.35)]">
            A
            
            {/* Soft halo aura behind Mascot */}
            <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#D4A843]/20 blur-xl pointer-events-none z-[19]" />

            {/* Mascot Coco sits on A */}
            <div
              ref={cocoRef}
              className="absolute pointer-events-auto z-[25]"
              style={{
                top: "-55%", // Position precisely above/on letter's crossbar cross area
                left: "48%",
                transform: "translate(-50%, 0)",
                width: "0.62em", // Relate to word scale fluidly
                height: "0.62em",
              }}
            >
              {/* Soft visual shadow projected on the letter A */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-1/2 h-1.5 rounded-full bg-black/40 blur-[3px]" />
              
              <MascotCoco emotion="happy" size="100%" className="w-full h-full animate-bounce" />
            </div>
          </span>
 
          {/* R */}
          <span ref={addToLetters} className="inline-block text-transparent bg-gradient-to-b from-[#FFFDF9] via-[#E6B66B] to-[#9B611C] bg-clip-text drop-shadow-[0_0_15px_rgba(212,168,67,0.35)]">R</span>
          
          {/* A (Last A) */}
          <span ref={addToLetters} className="inline-block text-transparent bg-gradient-to-b from-[#FFFDF9] via-[#E6B66B] to-[#9B611C] bg-clip-text drop-shadow-[0_0_15px_rgba(212,168,67,0.35)]">A</span>
        </h1>
 
        {/* Cinematic subtitle and tagline */}
        <div className="text-center mt-6 flex flex-col items-center">
          <p
            ref={subheadingRef}
            className="font-handwritten text-xl sm:text-3xl text-[#D4A843] font-semibold tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] italic select-none opacity-0"
          >
            "from discarded shell to dignified craft"
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ delay: 1.8, duration: 1.2 }}
            className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.4em] text-[#FAF6EE]/80 font-bold mt-4 select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          >
            ENACTUS VIT CHENNAI
          </motion.div>
        </div>
      </div>

      {/* FROSTED GLASS CARDS & GOALS - Dark Theme Adapted */}
      
      {/* 1. Left side - Project Goals Indicators */}
      <div className="absolute bottom-24 left-8 md:left-12 flex flex-col gap-6 z-40 hidden md:flex select-none">
        <div className="flex flex-col gap-2">
          <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#FAF6EE]/40">Project SDG Alignments</span>
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-[#2A6B72] flex items-center justify-center text-[10px] text-[#FAF6EE] font-black shadow-md border border-white/10">12</div>
            <div className="w-8 h-8 rounded-full bg-[#8AAF6E] flex items-center justify-center text-[10px] text-[#FAF6EE] font-black shadow-md border border-white/10">13</div>
            <div className="w-8 h-8 rounded-full bg-[#D4A843] flex items-center justify-center text-[10px] text-[#FAF6EE] font-black shadow-md border border-white/10">5</div>
            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-[10px] text-[#FAF6EE] font-black border border-white/10 shadow-md">+3</div>
          </div>
        </div>
      </div>

      {/* 2. Right side - Frosted Glass Impact Card */}
      <div className="absolute bottom-24 right-8 md:right-12 w-72 p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl z-40 hidden md:block text-[#FAF6EE]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#D4A843] animate-pulse"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#FAF6EE]/60 animate-pulse">Impact Story</span>
        </div>
        <h3 className="font-serif italic font-black text-sm text-[#FAF6EE] mb-1.5">Empowering Kalpakkam</h3>
        <p className="text-[11px] leading-relaxed text-[#FAF6EE]/80">
          Hand-carved by the Irular tribal community, each product sustains a lineage of craft and provides dignified livelihoods for women.
        </p>
        <div className="mt-4 flex justify-between items-center border-t border-[#FAF6EE]/10 pt-3">
          <div className="text-center">
            <span className="block text-lg font-black text-[#D4A843]">250+</span>
            <span className="text-[8px] uppercase font-bold text-[#FAF6EE]/50">Orders</span>
          </div>
          <div className="text-center">
            <span className="block text-lg font-black text-[#D4A843]">3.7B</span>
            <span className="text-[8px] uppercase font-bold text-[#FAF6EE]/50">Waste Shells</span>
          </div>
        </div>
      </div>
 
      {/* PARALLAX LAYER 3: Dark Forest Foreground Overlap Leaves with rich glowing contrast */}
      <div
        ref={layer3Ref}
        className="absolute inset-0 pointer-events-none z-30 opacity-[0.45]"
      >
        {/* Shadowy tropical leaf blades at bottom corners */}
        <svg className="absolute -bottom-24 -left-12 text-[#120701] w-[45vw] max-w-[500px] h-auto" viewBox="0 0 100 100">
          <path d="M 0,100 C 15,60 50,45 85,60 C 50,90 20,95 0,100" fill="currentColor" stroke="#3D1F0D" strokeWidth="0.5" />
          <path d="M -10,90 C 5,50 35,40 70,55 C 35,80 10,85 -10,90" fill="#4B6741" opacity="0.25" />
        </svg>
 
        <svg className="absolute -bottom-24 -right-12 text-[#120701] w-[45vw] max-w-[500px] h-auto" viewBox="0 0 100 100">
          <path d="M 100,100 C 85,60 50,45 15,60 C 50,90 80,95 100,100" fill="currentColor" stroke="#3D1F0D" strokeWidth="0.5" />
          <path d="M 110,90 C 95,50 65,40 30,55 C 65,80 90,85 110,90" fill="#4B6741" opacity="0.25" />
        </svg>
      </div>
 
      {/* BOTTOM AREA: Scroll indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="w-full pb-10 flex flex-col items-center justify-center relative z-20 pointer-events-none opacity-0"
      >
        {/* Delicate scrolling cue icon */}
        <div className="animate-bounce duration-1000 mb-2">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            className="text-[#D4A843]"
          >
            {/* Coconut design scrolling icon */}
            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 9 L12 15 M9 12 L12 15 L15 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <span className="font-handwritten text-[#FAF6EE]/80 text-sm sm:text-base tracking-wide font-bold">
          scroll to crack open the story
        </span>
      </div>
 
      {/* Tiny light move keyframes injection */}
      <style>{`
        @keyframes sunMove {
          0% { --sun-x: 35%; --sun-y: 85%; }
          100% { --sun-x: 65%; --sun-y: 75%; }
        }
      `}</style>
    </div>
  );
}
