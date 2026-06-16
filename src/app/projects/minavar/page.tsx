"use client";

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import './minavar.css';

const HeroOcean = dynamic(() => import('./components/minavar/HeroOcean'), { ssr: false });
const UnderwaterDive = dynamic(() => import('./components/minavar/UnderwaterDive'), { ssr: false });
const AerialBoat = dynamic(() => import('./components/minavar/AerialBoat'), { ssr: false });
const Craft = dynamic(() => import('./components/minavar/Craft'), { ssr: false });
const OceanFooter = dynamic(() => import('./components/minavar/OceanFooter'), { ssr: false });

export default function MinavarPage() {
  // Isolate Minavar from global Enactus UI
  useEffect(() => {
    document.body.classList.add('minavar-standalone');
    return () => document.body.classList.remove('minavar-standalone');
  }, []);

  return (
    <main className="relative w-full bg-ocean-abyss text-pearl antialiased min-h-screen">
      <HeroOcean />
      <UnderwaterDive />
      <AerialBoat />
      <Craft />
      <OceanFooter />
    </main>
  );
}
