import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      if (!isVisible) setIsVisible(true);

      // Detect if cursor is over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = 
          target.tagName === 'BUTTON' || 
          target.tagName === 'A' || 
          target.tagName === 'INPUT' || 
          target.tagName === 'TEXTAREA' ||
          target.closest('button') || 
          target.closest('a') ||
          target.closest('.group') || 
          target.closest('.interactive-tag') ||
          target.classList.contains('cursor-pointer') || 
          window.getComputedStyle(target).cursor === 'pointer';
        
        setIsHovered(!!isClickable);
      }
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    const handleMouseClick = (e: MouseEvent) => {
      // Add a click ripple/crack at the click location in physical space
      setClicks((prev) => [...prev, { id: Date.now(), x: e.clientX, y: e.clientY }]);
      
      // Auto debris cleaner
      setTimeout(() => {
        setClicks((prev) => prev.slice(1));
      }, 800);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Click cracks overlay */}
      <AnimatePresence>
        {clicks.map((clk) => (
          <div
            key={clk.id}
            className="fixed pointer-events-none z-[10000] w-16 h-16 transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: clk.x, top: clk.y }}
          >
            {/* 4 Crack lines expanding radiating outward */}
            <svg viewBox="0 0 40 40" className="w-full h-full text-[#D4A843]" fill="none">
              <motion.line
                x1="20" y1="20" x2="10" y2="10"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: [1, 0] }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <motion.line
                x1="20" y1="20" x2="30" y2="10"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: [1, 0] }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <motion.line
                x1="20" y1="20" x2="10" y2="30"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: [1, 0] }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <motion.line
                x1="20" y1="20" x2="30" y2="30"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: [1, 0] }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              {/* Optional tiny particles dust */}
              <motion.circle
                cx="20" cy="20" r="2"
                fill="#F5ECD7"
                animate={{ scale: [1, 4, 0], opacity: [1, 0.4, 0] }}
                transition={{ duration: 0.4 }}
              />
            </svg>
          </div>
        ))}
      </AnimatePresence>

      {/* Actual coconut cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full flex items-center justify-center select-none"
        style={{
          left: position.x,
          top: position.y,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          scale: isHovered ? [1, 1.25] : [1, 1],
          rotate: isHovered ? 45 : 0,
        }}
        transition={{
          scale: { duration: 0.2, ease: "easeOut" },
          rotate: { duration: 0.2, ease: "easeOut" },
        }}
      >
        {/* Beautiful high quality Minimalist 3D Half Shell Coconut Vector */}
        <svg
          width={isHovered ? 32 : 18}
          height={isHovered ? 32 : 18}
          viewBox="0 0 24 24"
          fill="none"
          stroke="none"
          className="transition-all duration-200"
        >
          {/* Outer Shell (Deep Browny Black) */}
          <circle cx="12" cy="12" r="10" fill="#3D1F0D" />
          
          {/* Inner coconut cream layer */}
          <circle cx="11.5" cy="12.5" r="7.5" fill="#FAF6EE" />
          
          {/* Deep center hollow */}
          <circle cx="11.2" cy="12.8" r="5" fill="#1A1008" opacity="0.9" />

          {/* Sparkly reflection gloss dot */}
          <circle cx="6.5" cy="7.5" r="1.5" fill="#FAF6EE" opacity="0.3" />
        </svg>
      </motion.div>
    </>
  );
}
