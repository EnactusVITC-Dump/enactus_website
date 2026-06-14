import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MascotCoco from './MascotCoco';
import { PRODUCTS, CocoEmotion } from '../types';

export default function ProductsSection() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Helper matching product ID to our curated photographs
  const getProductImage = (id: string) => {
    switch (id) {
      case 'bowl':
        return "/images/inara/inara_bowl_1781020977438.png";
      case 'candle':
        return "/images/inara/inara_candle_1781020995444.png";
      case 'earrings':
        return "/images/inara/inara_earrings_1781021018925.png";
      case 'keychain':
        return "/images/inara/inara_keychain_1781021039909.png";
      case 'kit':
        return "/images/inara/inara_diy_kit_1781021058839.png";
      case 'pendant':
        return "/images/inara/inara_pendant_1781021078798.png";
      default:
        return "/images/inara/inara_bowl_1781020977438.png";
    }
  };

  // Helper mapping product ID to Coco's cute interactive reaction emotion
  const getCocoEmotion = (id: string): CocoEmotion => {
    switch (id) {
      case 'bowl': return 'happy';
      case 'candle': return 'calm';
      case 'earrings': return 'proud';
      case 'keychain': return 'curious';
      case 'kit': return 'excited';
      case 'pendant': return 'calm';
      default: return 'happy';
    }
  };

  return (
    <div
      id="products-table-container"
      className="relative w-full py-24 sm:py-32 overflow-hidden flex flex-col items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(26,16,8,0.76), rgba(26,16,8,0.85)), url("/images/inara/wood_texture_1781015331172.png")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat-y',
      }}
    >
      {/* Decorative vertical grain paper noise */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.06] z-[1]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Floating Header Instructions */}
      <div className="absolute top-8 left-6 sm:left-12 z-40 max-w-[280px] pointer-events-none text-white/50 select-none hidden sm:block">
        <h5 className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#D4A843] font-black">
          Workbench Workspace
        </h5>
        <p className="font-handwritten text-xs text-[#FAF6EE]/70 mt-1 italic leading-tight">
          lift each scattered treasure closely to trace its roots...
        </p>
      </div>

      {/* MAJESTIC LUXURY EDITORIAL INTRO BOARD */}
      <div className="relative z-30 max-w-[650px] w-full px-6 text-center select-none text-white flex flex-col items-center mb-16 sm:mb-24">
        <div className="flex items-center space-x-2.5 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843] animate-ping" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D4A843] font-black">
            Elite Heritage Collective
          </span>
        </div>
        
        <h2 className="font-serif font-black text-4xl sm:text-6xl text-white tracking-tight leading-[1.05] mb-5">
          The Artisan&apos;s Table
        </h2>

        {/* Subtle gold divider with glowing midpoint */}
        <div className="relative w-48 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4A843] to-transparent mb-5">
          <div className="absolute left-1/2 -translate-x-1/2 -top-[1.5px] w-1 h-1 rounded-full bg-[#FAF6EE] animate-pulse" />
        </div>

        <p className="font-handwritten text-[#E6DECE] text-xl sm:text-2xl leading-relaxed italic max-w-[550px] font-bold">
          &quot;Sanded fine, seasoned, and hand-polished by tribal women circles using heirloom coastal techniques.&quot;
        </p>

        <div className="mt-8 flex items-center space-x-2.5 text-[9px] font-mono uppercase tracking-[0.2em] text-[#D4A843]/70 font-black animate-pulse">
          <span>Scroll Down to Inspect Materials</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* BACKGROUND WORKTOP DECORATIVE ELEMENTS SCATTERED VERTICALLY */}
      
      {/* 1. Coiled Twine - High */}
      <div className="absolute top-[18%] left-[6%] w-36 h-36 md:w-44 md:h-44 opacity-20 pointer-events-none z-10 hidden md:block">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#C4894F]">
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="3" strokeDasharray="10 5" />
          <circle cx="50" cy="50" r="24" stroke="currentColor" strokeWidth="2" strokeDasharray="8 4" />
          <circle cx="50" cy="50" r="18" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* 2. Small Chisel Tool - Middle */}
      <div className="absolute top-[48%] right-[8%] w-32 h-8 rotate-[55deg] opacity-30 pointer-events-none z-10 hidden md:block">
        <svg viewBox="0 0 120 20" fill="currentColor" className="w-full h-full text-[#A1A1A1]">
          <rect x="0" y="4" width="70" height="12" fill="#EAEAEA" stroke="#4A4A4A" />
          <path d="M 0 4 L 10 0 L 10 20 L 0 16 Z" fill="#D4D4D4" />
          <rect x="70" y="2" width="50" height="16" rx="4" fill="#8c5835" />
        </svg>
      </div>

      {/* 3. Shavings and Wood Dust - Lower */}
      <div className="absolute top-[78%] left-[8%] w-24 h-24 opacity-20 pointer-events-none z-10 hidden md:block">
        <div className="absolute w-2 h-2 bg-yellow-900 rounded-full top-2 left-6" />
        <div className="absolute w-1 h-1 bg-yellow-900 rounded-full top-10 left-12" />
        <div className="absolute w-3 h-1 bg-yellow-900 rounded top-6 left-20 rotate-12" />
        <div className="absolute w-2 h-1 bg-yellow-900 rounded top-16 left-6 -rotate-45" />
      </div>

      {/* 4. Two Whole Cracked Shells - Inner Upper */}
      <div className="absolute top-[28%] right-[5%] rotate-12 opacity-35 pointer-events-none z-10 hidden lg:block">
        <svg width="80" height="68" viewBox="0 0 100 85">
          <path d="M 10 40 C 10 75, 90 75, 90 40 Z" fill="#3D1F0D" filter="drop-shadow(0 10px 8px rgba(0,0,0,0.6))" />
          <ellipse cx="50" cy="40" rx="40" ry="12" fill="#FAF6EE" />
        </svg>
      </div>

      {/* 5. Botanical Leaf - Lower right */}
      <div className="absolute top-[85%] right-[6%] opacity-20 pointer-events-none z-10 hidden lg:block">
        <svg width="70" height="70" viewBox="0 0 100 100" className="text-[#8AAF6E] rotate-45">
          <path d="M 50 10 C 20 40, 20 80, 50 90 C 80 80, 80 40, 50 10 Z" fill="currentColor" />
          <path d="M 50 10 L 50 90" stroke="#3D1F0D" strokeWidth="1.5" />
        </svg>
      </div>

      {/* 6. Handwritten Workspace Placard - Attached near bottom */}
      <div className="absolute bottom-[4%] left-[6%] rotate-[-4deg] border border-white/10 bg-white/5 backdrop-blur-md text-amber-100 px-5 py-3 shadow-2xl rounded-2xl max-w-[170px] select-none z-20 hidden md:block">
        <span className="font-sans text-[8px] uppercase tracking-widest text-amber-200/40 block mb-0.5">Authentic Label</span>
        <p className="font-handwritten text-sm leading-tight font-black text-amber-100/90">
          &quot;made with love in Kalpakkam, TN, India&quot;
        </p>
      </div>


      {/* ================= VERTICALLY ALIGNED PRODUCTS GRID ================= */}
      <div className="relative z-30 max-w-[1100px] w-full px-6 sm:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 sm:gap-y-32">
        {PRODUCTS.map((prod) => {
          const isHovered = hoveredProduct === prod.id;
          const cocoEmotion = getCocoEmotion(prod.id);
          
          return (
            <div
              key={prod.id}
              className="relative flex flex-col items-center justify-start group mt-4"
              onMouseEnter={() => setHoveredProduct(prod.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              
              {/* Product Card Container - With subtle physics-feel tilt matching spec */}
              <motion.div
                className="w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] relative z-20 cursor-pointer"
                animate={isHovered ? {
                  scale: 1.05,
                  rotate: prod.rotation * 0.4,
                  y: -12
                } : {
                  scale: 1,
                  rotate: prod.rotation,
                  y: 0
                }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
              >
                {/* Visual Frame: Rounded borders, high-impact wood shade backing, premium picture gloss */}
                <div className="w-full h-full rounded-[28px] overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.7)] border border-white/20 relative bg-gradient-to-b from-[#3D1F0D]/40 to-[#1A1008]/95 select-none">
                  <img
                    src={getProductImage(prod.id)}
                    alt={prod.name}
                    className="w-full h-full object-cover select-none filter brightness-[1.03] contrast-[1.04] transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* High contrast gradient vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120702]/85 via-[#120702]/20 to-transparent pointer-events-none" />
                </div>

                {/* COCO MASCOT INTERACTIVE PEAKING REACTION */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, x: "-50%" }}
                      animate={{ opacity: 1, y: -45, x: "-50%" }}
                      exit={{ opacity: 0, y: 15, x: "-50%" }}
                      transition={{ type: "spring", stiffness: 200, damping: 18 }}
                      className="absolute left-1/2 pointer-events-none z-10"
                    >
                      <div className="relative">
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-black/20 blur-[1.5px]" />
                        <MascotCoco emotion={cocoEmotion} size={50} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* RUSTIC STRING-TIED HANGTAG LABEL PANEL */}
              {/* Connected visually by an elegant twine thread, swinging playfully on Hover */}
              <motion.div
                className="relative mt-8 w-full max-w-[245px] bg-[#FAF6EE] border border-[#C4894F]/25 shadow-xl rounded-2xl px-4.5 py-4 text-center select-none z-30"
                style={{ transformOrigin: "top center" }}
                animate={isHovered ? {
                  rotate: [0, -4, 3, -2, 1, 0],
                  scale: 1.025,
                  backgroundColor: "#FAF6EE"
                } : {
                  rotate: 0,
                  scale: 1,
                  backgroundColor: "#FAF6EE88"
                }}
                transition={{ duration: 0.65, ease: "easeInOut" }}
              >
                {/* Dynamic twine lines connecting hangtag upper hole to the product slot */}
                <div className="absolute top-[-26px] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
                  {/* Coir cord line thread */}
                  <div className="w-[1.5px] h-[30px] bg-gradient-to-b from-[#3D1F0D]/60 to-[#C4894F]" />
                  {/* Tag eyelet brass circle hole */}
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D4A843] border border-[#3D1F0D]/30 flex items-center justify-center -mt-1 shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-stone-800" />
                  </div>
                </div>

                <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#C4894F] font-black block">
                  {prod.tagline}
                </span>
                
                <h4 className="font-handwritten text-[#3D1F0D] text-lg sm:text-xl font-bold tracking-tight mt-1 leading-none">
                  {prod.name}
                </h4>

                <span className="w-8 h-[1px] bg-[#3D1F0D]/12 block mx-auto my-2" />

                <p className="font-sans text-[10px] text-[#3D1F0D]/75 leading-relaxed font-semibold">
                  {prod.description}
                </p>
              </motion.div>

            </div>
          );
        })}
      </div>

      {/* WOOD CONTINUATION GRADIENT DECORATIVE TRANSITION TO NEXT SECTION (IMPACT - #2A6B72 TEAL) */}
      <div 
        className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#2A6B72] to-transparent z-40 pointer-events-none" 
        style={{ mixBlendMode: 'normal' }}
      />
    </div>
  );
}
