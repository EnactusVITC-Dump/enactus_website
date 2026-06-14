import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MascotCoco from './MascotCoco';

gsap.registerPlugin(ScrollTrigger);

export default function ArtisansSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // Line refs for sequential reveal
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const line4Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Sequential fade-in animation for lines of the quote as they scroll into view
    const lines = [line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current];
    lines.forEach((line, index) => {
      gsap.fromTo(
        line,
        { opacity: 0.15, y: index * 2 + 4 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: line,
            start: "top 85%",
            end: "top 65%",
            scrub: true,
          },
        }
      );
    });

    // Give a elegant staggered entry to the three cards inside the gallery
    const children = cardsContainerRef.current?.children;
    if (children) {
      Array.from(children).forEach((childElement) => {
        const child = childElement as HTMLElement;
        gsap.fromTo(
          child,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: child,
              start: "top 80%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={sectionRef} 
      id="artisans-section" 
      className="relative bg-[#F5ECD7] w-full py-16 sm:py-24 border-b border-[#3D1F0D]/10 overflow-hidden"
    >
      
      {/* High-quality generated parchment background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: `url("/images/inara/paper_texture_1781015349785.png")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'multiply'
        }}
      />

      {/* Decorative Warm Botanical Accent Bottom-Left */}
      <div className="absolute bottom-0 left-0 w-[20vw] max-w-[180px] h-auto pointer-events-none opacity-[0.10] text-[#4A6741]">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M0,100 C30,70 60,80 50,20 C40,40 20,70 0,100" fill="currentColor" />
        </svg>
      </div>

      {/* Decorative Warm Botanical Accent Top-Right */}
      <div className="absolute top-0 right-0 w-[20vw] max-w-[180px] h-auto pointer-events-none opacity-[0.10] text-[#4A6741] rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M0,100 C30,70 60,80 50,20 C40,40 20,70 0,100" fill="currentColor" />
        </svg>
      </div>

      {/* Main active vertical content area (Tightly structured to avoid empty spaces) */}
      <div className="max-w-[1200px] w-full mx-auto px-6 sm:px-12 relative z-10 flex flex-col items-center">
        
        {/* TOP QUOTE BLOCK IN CENTRED COLUMN */}
        <div className="w-full max-w-3xl text-center flex flex-col items-center mb-16">
          
          <div className="flex items-center space-x-2 select-none mb-4">
            <span className="w-8 h-[1px] bg-[#3D1F0D]" />
            <span className="font-mono text-[10px] text-[#3D1F0D]/60 tracking-widest uppercase font-bold">
              The Hands of Kalpakkam
            </span>
            <span className="w-8 h-[1px] bg-[#3D1F0D]" />
          </div>

          <h3 className="font-handwritten text-[#3D1F0D] leading-[1.3] text-center select-none" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)" }}>
            <span ref={line1Ref} className="block block-line transition-all duration-300">
              "What was once a discarded coconut shell
            </span>
            <span ref={line2Ref} className="block block-line transition-all duration-300 mt-1">
              has been polished, cut, and carved
            </span>
            <span ref={line3Ref} className="block block-line transition-all duration-300 mt-1">
              by skilful hands into a charming
            </span>
            <span ref={line4Ref} className="block block-line transition-all duration-300 mt-1 font-bold text-[#C4894F]">
              eco-friendly treasure — just for you."
            </span>
          </h3>

          <div className="mt-6 font-sans text-[10px] sm:text-xs text-[#3D1F0D]/50 uppercase tracking-[0.18em] font-bold">
            IRULAR WOMEN EMPOWERMENT INITIATIVE
          </div>
        </div>

        {/* BOTTOM RESPONSIVE ROW OF 3 ARTISAN IMAGES (Perfect compact bento horizontal fill) */}
        <div 
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12 w-full justify-items-center items-start mt-4"
        >
          
          {/* IMAGE 1: Artisan Portrait */}
          <div className="flex flex-col items-center w-full max-w-[280px] sm:max-w-[320px]">
            <div 
              className="w-full aspect-square overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer relative group border-[5px] border-[#3D1F0D]/5"
              style={{
                clipPath: 'ellipse(48% 46% at 50% 50%)',
                filter: 'sepia(10%) saturate(1.4) contrast(1.15)'
              }}
            >
              <img
                src="/images/inara/artisan_portrait_1781015651521.png"
                alt="Irular Tribal Artisan Kalpakkam Portrait"
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
              {/* Cinematic amber overlay on hover */}
              <div className="absolute inset-0 bg-[#D4A843]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            {/* Handcrafted sign labels below matching paper labels texture */}
            <div className="mt-6 border border-white/25 px-4 py-1.5 rotate-[-2deg] bg-white/30 backdrop-blur-md shadow-lg rounded-xl">
              <span className="font-handwritten text-xs sm:text-sm text-[#3D1F0D] font-bold">
                Irular Tribal Artisan, Kalpakkam
              </span>
            </div>
          </div>

          {/* IMAGE 2: Hands carving shells */}
          <div className="flex flex-col items-center w-full max-w-[280px] sm:max-w-[320px]">
            <div 
              className="w-full aspect-square overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer relative group border-[5px] border-[#3D1F0D]/5"
              style={{
                clipPath: 'polygon(15% 0%, 95% 10%, 85% 90%, 5% 85%)',
                filter: 'sepia(10%) saturate(1.4) contrast(1.15)'
              }}
            >
              <img
                src="/images/inara/artisan_hands_1781015631507.png"
                alt="Artisan hands carving upcycled coconut shells"
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-[#D4A843]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="mt-6 border border-white/25 px-4 py-1.5 rotate-[3deg] bg-white/30 backdrop-blur-md shadow-lg rounded-xl">
              <span className="font-handwritten text-xs sm:text-sm text-[#3D1F0D] font-bold">
                Skill Empowerment Circle
              </span>
            </div>
          </div>

          {/* IMAGE 3: Coconut tree background aesthetic */}
          <div className="flex flex-col items-center w-full max-w-[280px] sm:max-w-[320px]">
            <div 
              className="w-full aspect-square overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer relative group border-[5px] border-[#3D1F0D]/5"
              style={{
                clipPath: 'ellipse(42% 48% at 50% 50%)',
                filter: 'sepia(10%) saturate(1.4) contrast(1.15)'
              }}
            >
              <img
                src="/images/inara/coconut_tree_1781015370709.png"
                alt="Raw materials - coconut palm beach in Tamil Nadu"
                className="w-full h-full object-cover select-none bg-[#3D1F0D]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-[#D4A843]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="mt-6 border border-white/25 px-4 py-1.5 rotate-[-1deg] bg-white/30 backdrop-blur-md shadow-lg rounded-xl">
              <span className="font-handwritten text-xs sm:text-sm text-[#3D1F0D] font-bold">
                Sourced from Kalpakkam Groves
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* COCO IN CORNER: Calm and peaceful, holding quote board */}
      <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 z-20 flex items-center space-x-3 opacity-80 hover:opacity-100 transition-opacity">
        <MascotCoco emotion="calm" size={75} />
        {/* Tiny handdrawn-looking placard */}
        <div className="bg-white/30 backdrop-blur-md border border-white/20 px-3 py-1 rotate-[4deg] shadow-lg rounded-xl max-w-[120px] select-none text-center">
          <p className="font-handwritten text-[11px] text-[#3D1F0D] font-bold">
            Made with love 🤍
          </p>
        </div>
      </div>

    </div>
  );
}
