import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface IntroHookProps {
  onComplete: () => void;
}

export default function IntroHook({ onComplete }: IntroHookProps) {
  const [step, setStep] = useState<number>(0); // Steps: 0 = Pure black, 1 = Dropping, 2 = Cracked, 3 = Light Expansion, 4 = Clean Complete

  useEffect(() => {
    // Check if introduction was already played in current session
    const played = sessionStorage.getItem('project-inara-intro-played');
    if (played === 'true') {
      onComplete();
      return;
    }

    // Timeline Steps
    const t1 = setTimeout(() => setStep(1), 300);   // 0.3s -> Coconut drops
    const t2 = setTimeout(() => setStep(2), 1000);  // 1.0s -> Crack hits
    const t3 = setTimeout(() => setStep(3), 1200);  // 1.2s -> Golden light flood starts
    const t4 = setTimeout(() => {
      setStep(4);
      sessionStorage.setItem('project-inara-intro-played', 'true');
      onComplete();
    }, 3000); // 3.0s -> Complete and fade out completely

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  // If already skipped, do not render anything
  if (sessionStorage.getItem('project-inara-intro-played') === 'true') {
    return null;
  }

  return (
    <AnimatePresence>
      {step < 4 && (
        <motion.div
          id="intro-hook-container"
          className="fixed inset-0 z-[99999] bg-[#0E0703] flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* STEP 1: Dropping Coconut Silhouette */}
          {step === 1 && (
            <motion.div
              initial={{ y: -600, rotate: -45, scale: 0.8 }}
              animate={{ y: 0, rotate: 15, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.13, 0.8, 0.25, 1] }}
              className="w-48 h-48 text-[#1A1008] relative"
            >
              {/* High-quality vector cutout silohuette */}
              <svg viewBox="0 0 100 100" className="w-full h-full fill-current filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]">
                <circle cx="50" cy="50" r="40" />
                {/* Sprout Leaves cutout */}
                <path d="M50 15 C40 5, 20 5, 25 25 Z" fill="#140D07" />
                <path d="M50 15 C60 5, 80 5, 75 25 Z" fill="#140D07" />
              </svg>
            </motion.div>
          )}

          {/* STEP 2: Cracked Screen Lines */}
          {step >= 2 && (
            <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
              {/* Crack overlay SVG radiating from the exact center */}
              <svg viewBox="0 0 1000 1000" className="w-[120vw] h-[120vh] text-[#C4894F] absolute" style={{ mixBlendMode: 'screen' }}>
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Crack Paths with drawing animation stroke-dashoffset */}
                <g filter="url(#glow)">
                  <motion.path
                    d="M 500 500 L 400 420 L 350 435 L 200 380 L 120 400 L 20 300"
                    stroke="#D4A843" strokeWidth="4" strokeLinecap="round" strokeLinejoin="miter" fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                  <motion.path
                    d="M 500 500 L 590 410 L 620 430 L 780 340 L 890 380 L 980 290"
                    stroke="#D4A843" strokeWidth="4" strokeLinecap="round" strokeLinejoin="miter" fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                  <motion.path
                    d="M 500 500 L 450 620 L 490 680 L 400 810 L 420 900 L 320 980"
                    stroke="#D4A843" strokeWidth="4" strokeLinecap="round" strokeLinejoin="miter" fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                  <motion.path
                    d="M 500 500 L 610 580 L 640 560 L 790 690 L 820 740 L 950 830"
                    stroke="#D4A843" strokeWidth="4" strokeLinecap="round" strokeLinejoin="miter" fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                  {/* Subtle branching cracks */}
                  <motion.path
                    d="M 400 420 L 380 350 L 300 310"
                    stroke="#D4A843" strokeWidth="2.5" strokeLinecap="round" fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  />
                  <motion.path
                    d="M 780 340 L 800 240 L 860 210"
                    stroke="#D4A843" strokeWidth="2.5" strokeLinecap="round" fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  />
                  <motion.path
                    d="M 490 680 L 580 730 L 620 810"
                    stroke="#D4A843" strokeWidth="2.5" strokeLinecap="round" fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  />
                </g>
              </svg>
            </div>
          )}

          {/* STEP 3: Flooding Radial Gradient light expansion */}
          {step >= 3 && (
            <motion.div
              className="absolute inset-0 w-full h-full pointer-events-none"
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{ scale: [0.1, 4, 15], opacity: [0, 0.8, 1] }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              style={{
                background: "radial-gradient(circle, #FAF6EE 0%, #D4A843 35%, rgba(61,31,13,0) 70%)",
              }}
            />
          )}

          {/* Cinematic accompanying text (quietly atmospheric) */}
          <motion.div 
            className="absolute bottom-16 text-center select-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: step < 2 ? 0.35 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono tracking-widest uppercase text-[10px] text-zinc-500">
              PROJECT INARA • ENACTUS VIT CHENNAI
            </p>
            <p className="font-serif italic text-sm mt-1 text-[#F5ECD7]">
              cracking open something beautiful...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
