"use client";

import './inara.css';
import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import IntroHook from './components/IntroHook';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import ArtisansSection from './components/ArtisansSection';
import SdgSection from './components/SdgSection';
import ProductsSection from './components/ProductsSection';
import ImpactSection from './components/ImpactSection';
import CollabsSection from './components/CollabsSection';
import FooterSection from './components/FooterSection';
import MascotCoco from './components/MascotCoco';
import { motion, AnimatePresence } from 'motion/react';

export default function InaraPage() {
  const [loading, setLoading] = useState(true);
  const [introCompleted, setIntroCompleted] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Isolate Inara from global Enactus UI
  useEffect(() => {
    document.body.classList.add('inara-standalone');
    return () => document.body.classList.remove('inara-standalone');
  }, []);

  // 1. Simulate asset loading progression
  useEffect(() => {
    // Check if introduction was already played (skip preloader wait if so)
    const introPlayed = sessionStorage.getItem('project-inara-intro-played') === 'true';
    if (introPlayed) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIntroCompleted(true);
      return;
    }

    const interval = setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300); // Small buffer for visual transition
          return 100;
        }
        return prev + 10;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // 2. Initialize Lenis Smooth Scroll
  useEffect(() => {
    // Only construct smooth scroll once preloader and introductory hook complete
    if (loading || !introCompleted) return;

    const lenis = new Lenis({
      duration: 1.5,
      lerp: 0.08, // Buttery smooth response rate
      infinite: false,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).lenis = lenis;

    const rafLoop = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(rafLoop);
    };

    requestAnimationFrame(rafLoop);

    return () => {
      lenis.destroy();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).lenis = null;
    };
  }, [loading, introCompleted]);

  return (
    <div className="relative min-h-screen bg-[#110602] font-body text-zinc-100 selection:bg-[#D4A843] selection:text-white overflow-x-hidden">
      
      {/* GLOBAL 1: Custom Coconut Cursor */}
      <CustomCursor />

      {/* STATE 1: Deep cinematic Preloader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            className="fixed inset-0 z-[999999] bg-[#0C0603] flex flex-col items-center justify-center p-6"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Centered bouncing mascot */}
            <div className="relative mb-6">
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-20 h-2 rounded-full bg-black/40 blur-[4px] animate-pulse" />
              <MascotCoco emotion="excited" size={130} />
            </div>

            {/* Fills up coconut shell preloader helper */}
            <div className="w-56 h-[10px] bg-white/5 border border-white/10 rounded-full overflow-hidden mt-6 relative select-none">
              <motion.div
                className="h-full bg-gradient-to-r from-[#C4894F] to-[#D4A843] shadow-[0_0_8px_#D4A843]"
                initial={{ width: '0%' }}
                animate={{ width: `${loadProgress}%` }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              />
            </div>

            <span className="font-handwritten text-lg tracking-wide text-[#FAF6EE]/80 mt-4 animate-pulse">
              cracking open something beautiful... {loadProgress}%
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STATE 2: Introduction Cinematic Crack Hook */}
      {!loading && !introCompleted && (
        <IntroHook onComplete={() => setIntroCompleted(true)} />
      )}

      {/* STATE 3: Main Page sections (Fades in once intro completes) */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={introCompleted ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full relative"
      >
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ArtisansSection />
        <SdgSection />
        <ProductsSection />
        <ImpactSection />
        <CollabsSection />
        <FooterSection />
      </motion.main>

    </div>
  );
}

