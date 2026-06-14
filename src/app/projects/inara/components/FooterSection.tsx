import React from 'react';
import { motion } from 'motion/react';
import MascotCoco from './MascotCoco';

export default function FooterSection() {
  
  // Custom fireflies offsets array
  const fireflies = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    delay: i * 1.5,
    duration: 5 + Math.random() * 4,
    left: `${15 + i * 10}%`,
    scale: 0.5 + Math.random() * 0.8
  }));

  return (
    <footer
      id="site-footer"
      className="relative w-full min-h-[50vh] bg-[#140C06] overflow-hidden flex flex-col justify-between pt-16 pb-8 px-6 sm:px-12 text-[#FAF6EE]"
    >
      {/* 25s loop ambient light sun drifting effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-color-dodge"
        style={{
          background: 'radial-gradient(circle at 50% 120%, rgba(212,168,67,0.15) 0%, rgba(212,168,67,0) 65%)',
        }}
      />

      {/* AMBIENT FIREFLIES / GOLD DUST FLICKER EFFECT */}
      {fireflies.map((ff) => (
        <motion.div
          key={ff.id}
          className="absolute pointer-events-none w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#D4A843] shadow-[0_0_8px_#D4A843]"
          style={{
            left: ff.left,
            bottom: '5%',
          }}
          animate={{
            y: [-10, -180],
            opacity: [0, 0.9, 0],
            x: [0, Math.sin(ff.id) * 30, 0]
          }}
          transition={{
            repeat: Infinity,
            delay: ff.delay,
            duration: ff.duration,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* THREE COLUMN GRAPHIC WRAPPER */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end relative z-10 w-full max-w-[1300px] mx-auto pb-12 border-b border-white/5">
        
        {/* LEFT COLUMN (ID 3): ARTISTIC PORTRAIT TAG OF VIBRANT COCONUT PALM TREE WITH 3 COCOS */}
        <div className="col-span-1 md:col-span-3 flex flex-col items-start select-none relative h-64 w-full">
          <div className="absolute bottom-0 left-0 w-36 h-full origin-bottom animate-sway flex items-end">
            <div 
              className="relative w-full h-[92%] bg-[#FAF6EE] border border-white/20 rounded-2xl p-2.5 pb-6 shadow-2xl flex flex-col items-center justify-between"
              style={{
                backgroundImage: 'url("/images/inara/paper_texture_1781015349785.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Vibrant Coconut Tree with background multiplied onto paper texture */}
              <div className="w-full h-[82%] overflow-hidden rounded-lg bg-white/40">
                <img 
                  src="/images/inara/footer_coconut_palm_tree_1781202935419.jpg"
                  alt="Vibrant coconut palm tree"
                  className="w-full h-full object-contain mix-blend-multiply opacity-95 select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <span className="font-handwritten text-xs text-[#3D1F0D] font-bold tracking-wide -rotate-1 select-none">
                Tamil Nadu Groves
              </span>

              {/* Tiny Coco 1: Sitting/climbing */}
              <div className="absolute top-[28%] left-[10%] w-7 h-7 z-20 drop-shadow-md">
                <MascotCoco emotion="happy" size="100%" />
              </div>

              {/* Tiny Coco 2: Hanging from leaf */}
              <div className="absolute top-[12%] left-[62%] w-7 h-7 rotate-[15deg] z-20 drop-shadow-md">
                <MascotCoco emotion="curious" size="100%" />
              </div>

              {/* Tiny Coco 3: Peeking from side of panel */}
              <div className="absolute top-[62%] left-[20%] w-7 h-7 z-20 drop-shadow-md">
                <MascotCoco emotion="calm" size="100%" />
              </div>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN (ID 6): PRIMARY BRAND CREDITS */}
        <div className="col-span-1 md:col-span-6 flex flex-col items-center text-center px-4 self-center justify-center">
          
          <h2 className="font-serif font-black text-[#C4894F] text-2xl tracking-normal mb-1">
            Project Inara
          </h2>
          <p className="font-handwritten text-[#FAF6EE]/80 text-base mb-6 font-semibold">
            Enactus VIT Chennai
          </p>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 font-handwritten text-lg mb-6 text-white/50">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4A843] transition-colors duration-300 pointer-events-auto cursor-pointer"
            >
              Instagram
            </a>
            <span className="opacity-15 select-none">·</span>
            <a
              href="mailto:enactusvitchennai@gmail.com"
              className="hover:text-[#D4A843] transition-colors duration-300 pointer-events-auto cursor-pointer"
            >
              Contact Us
            </a>
            <span className="opacity-15 select-none">·</span>
            <a
              href="https://wa.me/919829247989"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4A843] transition-colors duration-300 pointer-events-auto cursor-pointer"
            >
              WhatsApp Contact
            </a>
          </div>

          <p className="font-sans text-[10px] uppercase opacity-40 tracking-[0.25em]">
            From discarded shell to dignified craft
          </p>
        </div>

        {/* RIGHT COLUMN (ID 3): Stacked coconuts with hanging Coco */}
        <div className="col-span-1 md:col-span-3 flex flex-col items-end select-none relative h-56 pt-24">
          
          {/* Stacked coconuts */}
          <div className="relative w-44 h-32 flex items-end justify-center self-end">
            <svg viewBox="0 0 100 80" className="w-[120px] h-auto text-[#3D1F0D]" fill="currentColor">
              {/* Bottom Row */}
              <circle cx="25" cy="60" r="16" />
              <circle cx="55" cy="62" r="15" />
              <circle cx="80" cy="58" r="16" />
              {/* Mid Row */}
              <circle cx="40" cy="40" r="15.5" fill="#5A3A25" stroke="#3D1F0D" />
              <circle cx="68" cy="38" r="15" fill="#5A3A25" stroke="#3D1F0D" />
              {/* Top Peak */}
              <circle cx="52" cy="18" r="14.5" fill="#1A1008" stroke="#3D1F0D" />
            </svg>

            {/* Coco Sitting on Top */}
            <div className="absolute top-[-30px] left-[40%] w-12 h-12 z-20 rotate-[-8deg]">
              <MascotCoco emotion="happy" size="100%" />
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM LEGAL COPYRIGHT LINE */}
      <div className="w-full text-center pt-8 z-10 pointer-events-none">
        <p className="font-handwritten text-[#FAF6EE]/40 text-xs tracking-wide">
          © {new Date().getFullYear()} Project Inara • Handcrafted in Kalpakkam, Tamil Nadu • All Rights Reserved.
          <br/>
          <span className="font-sans text-[9px] uppercase tracking-widest mt-1.5 opacity-65 inline-block">
            Crafted with 🥥 by Enactus VIT Chennai
          </span>
        </p>
      </div>

      <style>{`
        @keyframes sway {
          0% { transform: rotate(-2deg); }
          100% { transform: rotate(2deg); }
        }
        .animate-sway {
          animation: sway 4.5s ease-in-out infinite alternate;
        }
      `}</style>
    </footer>
  );
}
