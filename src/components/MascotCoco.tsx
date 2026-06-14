import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { CocoEmotion } from '../types';

interface MascotCocoProps {
  emotion?: CocoEmotion;
  className?: string;
  size?: number | string;
}

export default function MascotCoco({ emotion = 'happy', className = '', size = 150 }: MascotCocoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; angle: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for eyes
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 120 };
  const eyeX = useSpring(mouseX, springConfig);
  const eyeY = useSpring(mouseY, springConfig);

  // Blinking loop
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, 150); // Blink state lasts 150ms
    }, 4000); // Blink every 4 seconds

    return () => clearInterval(blinkInterval);
  }, []);

  // Track absolute cursor relative to center of Coco
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalize coordinates (-6 to 6 range)
    const dx = (e.clientX - centerX) / (rect.width / 2);
    const dy = (e.clientY - centerY) / (rect.height / 2);
    
    const maxOffset = 5; // Pixels eye can shift
    mouseX.set(Math.max(-1, Math.min(1, dx)) * maxOffset);
    mouseY.set(Math.max(-1, Math.min(1, dy)) * maxOffset);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleClick = (e: React.MouseEvent) => {
    // Generate sparkle/crack particles expanding outwards
    const rect = containerRef.current?.getBoundingClientRect();
    const x = rect ? rect.width / 2 : 75;
    const y = rect ? rect.height / 2 : 75;
    
    const newSparkles = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x,
      y,
      angle: (i * 360) / 8 + (Math.random() * 20 - 10),
    }));
    
    setSparkles((prev) => [...prev, ...newSparkles]);
    
    // Clear sparkles after 600ms
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => !newSparkles.find((ns) => ns.id === s.id)));
    }, 60000); // Keep alive or let transition animate them away
  };

  // Emotion-based head tilt
  let defaultTilt = 0;
  if (emotion === 'curious') defaultTilt = 10;
  if (emotion === 'sad') defaultTilt = -5;
  if (emotion === 'excited') defaultTilt = 5;

  return (
    <div
      id="mascot-coco-container"
      ref={containerRef}
      className={`relative inline-block select-none ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Sparkles / Crack sparkles emission */}
      <AnimatePresence>
        {sparkles.map((sp) => {
          const dx = Math.cos((sp.angle * Math.PI) / 180) * 80;
          const dy = Math.sin((sp.angle * Math.PI) / 180) * 80;
          return (
            <motion.div
              key={sp.id}
              className="absolute pointer-events-none w-3 h-3 flex items-center justify-center"
              style={{ left: sp.x - 6, top: sp.y - 6 }}
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ 
                x: dx, 
                y: dy, 
                scale: [0.2, 1.2, 0], 
                opacity: [1, 1, 0] 
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Golden sparkle diamond or star */}
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#D4A843]">
                <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" fill="currentColor" />
              </svg>
            </motion.div>
          );
        })}
      </AnimatePresence>

      <motion.div
        className="w-full h-full cursor-pointer relative"
        animate={{
          y: isHovered || emotion === 'excited' ? [-2, 2, -2] : [-1, 1, -1],
          rotate: isHovered ? defaultTilt + 6 : defaultTilt,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: emotion === 'excited' ? 1.2 : 2.5,
            ease: "easeInOut",
          },
          rotate: { duration: 0.4, ease: "easeOut" },
          scale: { duration: 0.3, ease: "easeOut" },
        }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xl"
        >
          {/* DEFINITIONS for Gradients & Textures */}
          <defs>
            {/* Coconut brown shell gradient */}
            <radialGradient id="shell-grad" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
              <stop offset="0%" stopColor="#8c5835" />
              <stop offset="70%" stopColor="#3D1F0D" />
              <stop offset="100%" stopColor="#1A1008" />
            </radialGradient>
            
            {/* Coconut white flesh gradient */}
            <linearGradient id="flesh-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FAF6EE" />
              <stop offset="100%" stopColor="#E6DECE" />
            </linearGradient>

            {/* Cheek blush radial gradient */}
            <radialGradient id="blush-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E07A7A" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#E07A7A" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* SPROUTING LEAVES ON TOP */}
          <g id="coconut-leaves">
            {/* Left Leaf */}
            <motion.path
              d="M 80 35 C 50 20, 20 25, 25 5 C 40 10, 65 25, 80 35 Z"
              fill="#4A6741"
              stroke="#2E4228"
              strokeWidth="1.5"
              strokeLinejoin="round"
              animate={{ rotate: isHovered ? [-2, 2, -2] : [-0.5, 0.5, -0.5] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              style={{ originX: '80px', originY: '35px' }}
            />
            
            {/* Right Leaf */}
            <motion.path
              d="M 80 35 C 110 20, 140 25, 135 5 C 120 10, 95 25, 80 35 Z"
              fill="#8AAF6E"
              stroke="#4A6741"
              strokeWidth="1.5"
              strokeLinejoin="round"
              animate={{ rotate: isHovered ? [2, -2, 2] : [0.5, -0.5, 0.5] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              style={{ originX: '80px', originY: '35px' }}
            />

            {/* Little stem */}
            <path
              d="M 80 43 L 80 28"
              stroke="#3D1F0D"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </g>

          {/* STUBBY FEET */}
          <g id="coco-feet">
            {/* Left foot */}
            <path
              d="M 50 133 C 45 133, 40 148, 52 148 C 64 148, 60 133, 50 133 Z"
              fill="#1A1008"
              stroke="#3D1F0D"
              strokeWidth="2.5"
            />
            {/* Right foot */}
            <path
              d="M 110 133 C 100 133, 96 148, 108 148 C 120 148, 115 133, 110 133 Z"
              fill="#1A1008"
              stroke="#3D1F0D"
              strokeWidth="2.5"
            />
          </g>

          {/* STUBBY ARMS */}
          <g id="coco-arms">
            {/* Left Arm */}
            <motion.path
              d="M 33 95 C 20 98, 12 85, 23 80"
              stroke="#3D1F0D"
              strokeWidth="5"
              strokeLinecap="round"
              animate={{
                rotate: emotion === 'excited' ? [-10, 20, -10] : isHovered ? [-5, 10, -5] : [0, 0]
              }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              style={{ originX: '33px', originY: '95px' }}
            />
            {/* Right Arm */}
            <motion.path
              d="M 127 95 C 140 98, 148 85, 137 80"
              stroke="#3D1F0D"
              strokeWidth="5"
              strokeLinecap="round"
              animate={{
                rotate: emotion === 'excited' ? [10, -20, 10] : isHovered ? [5, -10, 5] : [0, 0]
              }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              style={{ originX: '127px', originY: '95px' }}
            />
          </g>

          {/* MAIN ROUND COCONUT SHELL BODY */}
          <g id="coconut-body">
            {/* Brown Shell */}
            <circle
              cx="80"
              cy="90"
              r="48"
              fill="url(#shell-grad)"
              stroke="#1A1008"
              strokeWidth="2.5"
            />

            {/* Shell lines / texture details */}
            <path d="M 45 65 C 42 75, 42 90, 48 105" stroke="#1A1008" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
            <path d="M 60 48 C 55 60, 50 80, 55 110" stroke="#1A1008" strokeWidth="0.8" strokeLinecap="round" opacity="0.2" />
            <path d="M 100 48 C 105 60, 110 80, 105 110" stroke="#1A1008" strokeWidth="0.8" strokeLinecap="round" opacity="0.2" />
            <path d="M 115 65 C 118 75, 118 90, 112 105" stroke="#1A1008" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />

            {/* Inner White Coconut Rim (Open cut at top-to-middle) */}
            <ellipse
              cx="80"
              cy="52"
              rx="40"
              ry="11"
              fill="url(#flesh-grad)"
              stroke="#3D1F0D"
              strokeWidth="1.5"
            />

            {/* Depth hollow within cut rim */}
            <ellipse
              cx="80"
              cy="52"
              rx="33"
              ry="7"
              fill="#1A1008"
              opacity="0.9"
            />
          </g>

          {/* FACIAL FEATURES */}
          <g id="coco-face">
            {/* Cheek blush */}
            <circle cx="50" cy="98" r="8" fill="url(#blush-grad)" />
            <circle cx="110" cy="98" r="8" fill="url(#blush-grad)" />

            {/* Dynamic Eyes Group */}
            <g id="coco-eyes">
              {/* Left Eye Socket Background */}
              <circle cx="58" cy="88" r="11" fill="#FAF6EE" stroke="#3D1F0D" strokeWidth="1.5" />
              
              {/* Right Eye Socket Background */}
              <circle cx="102" cy="88" r="11" fill="#FAF6EE" stroke="#3D1F0D" strokeWidth="1.5" />

              {/* Expressive Green Pupils + Highlights with dynamic mouse follow motion */}
              <motion.g style={{ x: eyeX, y: eyeY }}>
                {/* Left Pupil (Green) */}
                <circle cx="58" cy="88" r="8" fill="#4A6741" />
                {/* Inner Black Pupil */}
                <circle cx="58" cy="88" r="5" fill="#1A1008" />
                {/* Left Highlights */}
                <circle cx="55.5" cy="85.5" r="2.5" fill="white" />
                <circle cx="61" cy="91" r="1" fill="white" />

                {/* Right Pupil (Green) */}
                <circle cx="102" cy="88" r="8" fill="#4A6741" />
                {/* Inner Black Pupil */}
                <circle cx="102" cy="88" r="5" fill="#1A1008" />
                {/* Right Highlights */}
                <circle cx="99.5" cy="85.5" r="2.5" fill="white" />
                <circle cx="105" cy="91" r="1" fill="white" />
              </motion.g>

              {/* BLINK LAYER (Fades in over eye sockets to simulate blink) */}
              <motion.g
                initial={false}
                animate={{ opacity: isBlinking ? 1 : 0 }}
                transition={{ duration: 0.05 }}
              >
                {/* Blink arcs mimicking closed eyes */}
                <circle cx="58" cy="88" r="11.5" fill="#3D1F0D" />
                <path d="M 48 88 L 68 88" stroke="#FAF6EE" strokeWidth="2" strokeLinecap="round" />

                <circle cx="102" cy="88" r="11.5" fill="#3D1F0D" />
                <path d="M 92 88 L 112 88" stroke="#FAF6EE" strokeWidth="2" strokeLinecap="round" />
              </motion.g>

              {/* Sad/droopy eye lids if emotion is sad */}
              {emotion === 'sad' && (
                <g opacity="0.8">
                  <path d="M 46 78 C 52 82, 64 82, 70 78" stroke="#1A1008" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 90 78 C 96 82, 108 82, 114 78" stroke="#1A1008" strokeWidth="3" strokeLinecap="round" />
                </g>
              )}
            </g>

            {/* MOUTH */}
            <g id="coco-mouth">
              {emotion === 'sad' ? (
                // Flipped arc for sad mouth
                <path
                  d="M 74 108 C 76 103, 84 103, 86 108"
                  stroke="#1A1008"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              ) : emotion === 'excited' || isHovered ? (
                // Happy wide-open laughing mouth
                <path
                  d="M 72 101 C 72 101, 75 113, 80 113 C 85 113, 88 101, 88 101 Z"
                  fill="#E07A7A"
                  stroke="#1A1008"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                // Standard default human smile helper
                <path
                  d="M 73 102 C 75 107, 85 107, 87 102"
                  stroke="#1A1008"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              )}
            </g>
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
