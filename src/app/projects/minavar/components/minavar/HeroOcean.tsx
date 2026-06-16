/* eslint-disable react-hooks/exhaustive-deps */
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";



function WaveBand({
  d,
  fill,
  className = "",
  speed = "animate-wave-med",
  opacity = 1,
}: {
  d: string;
  fill: string;
  className?: string;
  speed?: string;
  opacity?: number;
}) {
  return (
    <div className={`absolute inset-x-0 ${className}`} style={{ opacity }}>
      <div className={`relative flex w-[200%] ${speed}`}>
        <svg viewBox="0 0 1440 320" className="w-1/2 shrink-0 block" preserveAspectRatio="none">
          <path d={d} fill={fill} />
        </svg>
        <svg viewBox="0 0 1440 320" className="w-1/2 shrink-0 block" preserveAspectRatio="none">
          <path d={d} fill={fill} />
        </svg>
      </div>
    </div>
  );
}

/** Real boat image, gently bobbing on the swell, plus scroll-driven net throw */
function BoatWithNet({ p }: { p: MotionValue<number> }) {
  // bobbing — slow sine
  // (used via animate prop on outer wrapper)

  // Net animation phases — released later for a more peaceful feel
  const armRot = useTransform(p, [0, 0.4, 0.7, 1], [-15, -55, 50, 65]);
  const netHeld = useTransform(p, [0, 0.7], [1, 0]);
  const netFlying = useTransform(p, [0.7, 1], [0, 1]);
  const netX = useTransform(p, [0.7, 1], [0, 220]);
  const netY = useTransform(p, [0.7, 0.9, 1], [0, 80, 160]);
  const netSpread = useTransform(p, [0.7, 1], [0.25, 1.5]);
  const netRot = useTransform(p, [0.7, 1], [0, 30]);
  const splash = useTransform(p, [0.9, 1], [0, 1]);

  return (
    <motion.div
      animate={{ rotate: [-1.2, 1.2, -1.2], y: [-8, 8, -8] }}
      transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-1/2 top-[30%] z-[9999] -translate-x-1/2 w-[300px]"
    >
      {/* Warm rim glow behind boat */}
      <div className="pointer-events-none absolute inset-0 -z-10 blur-2xl opacity-70"
        style={{ background: "radial-gradient(60% 50% at 50% 60%, oklch(0.85 0.16 55 / 0.55), transparent 70%)" }} />

      {/* Boat photo */}
      <img
        src="/images/minavar/boat-fisherman.png"
        alt="Lone fisherman drifting on a small red boat at sunset"
        className="block w-full h-auto select-none drop-shadow-[0_30px_40px_oklch(0.04_0.02_255/0.7)]"
        draggable={false}
      />

      {/* Soft water shadow under boat */}
      <div className="pointer-events-none absolute left-[18%] right-[18%] -bottom-2 h-3 rounded-full bg-black/40 blur-md" />

      {/* Subtle ripple rings */}
      <svg viewBox="0 0 300 60" className="pointer-events-none absolute left-1/2 -bottom-6 h-6 w-[80%] -translate-x-1/2 opacity-60">
        <ellipse cx="150" cy="30" rx="120" ry="6" fill="none" stroke="oklch(0.95 0.04 60 / 0.6)" strokeWidth="0.8" />
        <ellipse cx="150" cy="34" rx="90" ry="4" fill="none" stroke="oklch(0.95 0.04 60 / 0.35)" strokeWidth="0.6" />
      </svg>

      {/* Invisible arm pivot — net release from approximate fisherman position */}
      <motion.div
        style={{ rotate: armRot }}
        className="pointer-events-none absolute left-[48%] top-[68%] w-[1px] h-[1px] origin-center"
      >
        <motion.div style={{ opacity: netHeld }} className="absolute -translate-x-1/2 -translate-y-1/2">
          <div className="h-8 w-6 rounded-b-full border border-pearl/40 bg-pearl/10" />
        </motion.div>
      </motion.div>

      {/* Flying net */}
      <motion.div
        style={{ x: netX, y: netY, scale: netSpread, rotate: netRot, opacity: netFlying }}
        className="pointer-events-none absolute left-[55%] top-[58%] origin-center"
      >
        <svg width="240" height="180" viewBox="0 0 240 180">
          <defs>
            <radialGradient id="netSheen" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="oklch(0.96 0.08 60 / 0.55)" />
              <stop offset="60%" stopColor="oklch(0.85 0.10 50 / 0.22)" />
              <stop offset="100%" stopColor="oklch(0.85 0.10 50 / 0)" />
            </radialGradient>
          </defs>
          <ellipse cx="120" cy="95" rx="108" ry="62" fill="url(#netSheen)" />
          <g stroke="oklch(0.96 0.05 65 / 0.75)" strokeWidth="0.6" fill="none">
            {Array.from({ length: 24 }).map((_, i) => {
              const a = (i / 24) * Math.PI * 2;
              return <line key={i} x1="120" y1="95" x2={120 + Math.cos(a) * 108} y2={95 + Math.sin(a) * 62} />;
            })}
            {[22, 44, 66, 88].map((r, i) => (
              <ellipse key={i} cx="120" cy="95" rx={r * 1.22} ry={r * 0.7} />
            ))}
          </g>
          <ellipse cx="120" cy="95" rx="108" ry="62" fill="none" stroke="oklch(0.42 0.10 45)" strokeWidth="1.2" />
          {Array.from({ length: 14 }).map((_, i) => {
            const a = (i / 14) * Math.PI * 2;
            return <circle key={i} cx={120 + Math.cos(a) * 108} cy={95 + Math.sin(a) * 62} r="2" fill="oklch(0.85 0.16 55)" />;
          })}
        </svg>
      </motion.div>

      {/* Splash */}
      <motion.svg
        style={{ opacity: splash }}
        width="260"
        height="60"
        viewBox="0 0 260 60"
        className="pointer-events-none absolute left-[78%] top-[110%] -translate-x-1/2"
      >
        <ellipse cx="130" cy="36" rx="110" ry="9" fill="oklch(0.95 0.02 200 / 0.55)" />
        <ellipse cx="130" cy="36" rx="76" ry="5" fill="oklch(0.96 0.04 60 / 0.7)" />
        {Array.from({ length: 14 }).map((_, i) => (
          <circle key={i} cx={50 + i * 14} cy={34 - (i % 3) * 6} r={1 + (i % 3)} fill="oklch(0.95 0.02 200 / 0.85)" />
        ))}
      </motion.svg>
    </motion.div>
  );
}

/** Painterly cloud band using uploaded clouds asset (blue checker killed via screen blend) */
function CloudBand({
  className = "",
  speedSec = 110,
  opacity = 0.5,
  scale = 1,
  yOffset = 0,
}: {
  className?: string;
  speedSec?: number;
  opacity?: number;
  scale?: number;
  yOffset?: number;
}) {
  const fadeMask =
    "linear-gradient(to bottom, transparent 0%, black 22%, black 55%, transparent 100%)";
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 overflow-hidden ${className}`}
      style={{
        opacity,
        maskImage: fadeMask,
        WebkitMaskImage: fadeMask,
      }}
    >
      <motion.div
        className="flex w-[220%]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speedSec, repeat: Infinity, ease: "linear" }}
        style={{ transform: `translateY(${yOffset}px)` }}
      >
        {[0, 1].map((k) => (
          <img
            key={k}
            src="/images/minavar/clouds.png"
            alt=""
            aria-hidden
            className="block w-1/2 h-auto shrink-0"
            style={{ transform: `scale(${scale})`, filter: "blur(0.3px) drop-shadow(0 6px 18px rgba(255,180,120,0.18))" }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function HeroOcean() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 22, mass: 0.7 });

  const sunY = useTransform(smooth, [0, 1], [0, 220]);
  const skyOpacity = useTransform(smooth, [0, 0.85, 1], [1, 1, 0.0]);
  const titleY = useTransform(smooth, [0, 1], [0, -120]);
  const titleBlur = useTransform(smooth, [0, 1], ["blur(0px)", "blur(14px)"]);
  const cloudsFar = useTransform(smooth, [0, 1], ["0%", "-12%"]);
  const cloudsNear = useTransform(smooth, [0, 1], ["0%", "-22%"]);

  return (
    <section
      ref={ref}
      aria-label="Minavar — ocean at sunset"
      className="relative h-[280vh] w-full"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* SKY — richer painterly gradient */}
        <motion.div style={{ opacity: skyOpacity }} className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(160% 95% at 50% 105%, oklch(0.92 0.10 70 / 0.95) 0%, oklch(0.82 0.16 55 / 0.92) 18%, oklch(0.70 0.18 30 / 0.88) 38%, oklch(0.50 0.14 12 / 0.85) 58%, oklch(0.36 0.12 318 / 0.92) 78%, oklch(0.18 0.08 268 / 1) 100%)",
            }}
          />
          {/* Peach haze band */}
          <div className="absolute inset-x-0 top-[20%] h-[40vh] opacity-80 mix-blend-screen blur-3xl"
            style={{ background: "linear-gradient(to bottom, oklch(0.92 0.10 68 / 0.7), oklch(0.78 0.16 38 / 0.4) 50%, transparent)" }} />
          {/* Lavender top wash */}
          <div className="absolute inset-x-0 top-0 h-[35vh] opacity-50 mix-blend-soft-light"
            style={{ background: "linear-gradient(to bottom, oklch(0.55 0.12 320 / 0.7), transparent)" }} />

          {/* CLOUDS — three parallax layers using uploaded asset */}
          <motion.div style={{ x: cloudsFar }} className="absolute inset-0">
            <CloudBand className="top-[6%] h-[34vh]" speedSec={180} opacity={0.32} scale={1.2} />
          </motion.div>
          <motion.div style={{ x: cloudsFar }} className="absolute inset-0">
            <CloudBand className="top-[18%] h-[30vh]" speedSec={140} opacity={0.45} scale={1} />
          </motion.div>
          <motion.div style={{ x: cloudsNear }} className="absolute inset-0">
            <CloudBand className="top-[30%] h-[26vh]" speedSec={95} opacity={0.55} scale={0.85} />
          </motion.div>

          {/* Atmospheric volumetric haze near horizon */}
          <div className="absolute inset-x-0 top-[44%] h-[24vh] bg-gradient-to-b from-sunset-coral/35 via-sunset-coral/15 to-transparent blur-3xl" />

          {/* Distant birds */}
          {[0, 1, 2].map((i) => (
            <svg
              key={i}
              viewBox="0 0 60 20"
              className="absolute h-[18px] w-[60px] opacity-50 animate-bird"
              style={{
                top: `${24 + i * 7}%`,
                animationDelay: `${-i * 18}s`,
                animationDuration: `${65 + i * 10}s`,
              }}
            >
              <path d="M2,14 Q12,2 22,12 Q32,2 42,14" stroke="oklch(0.18 0.04 250)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            </svg>
          ))}
        </motion.div>

        {/* SUN — larger, softer */}
        <motion.div
          style={{ y: sunY, opacity: skyOpacity }}
          className="absolute left-1/2 top-[36%] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative animate-bloom">
            {/* Outer corona */}
            <div
              className="absolute left-1/2 top-1/2 h-[180%] w-[180%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-75 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.92 0.14 55 / 0.75), transparent 65%)",
              }}
            />
            <div
              className="h-[clamp(280px,36vw,560px)] w-[clamp(280px,36vw,560px)] rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 50% 45%, oklch(0.98 0.04 80) 0%, oklch(0.93 0.10 55) 32%, oklch(0.82 0.18 35 / 0.88) 65%, oklch(0.78 0.18 30 / 0) 100%)",
              }}
            />
          </div>
          {/* Sun reflection on water */}
          <div
            className="pointer-events-none absolute left-1/2 top-[60%] h-[80vh] w-[26vw] -translate-x-1/2 opacity-85 mix-blend-screen blur-md animate-shimmer"
            style={{
              background:
                "linear-gradient(to bottom, oklch(0.95 0.10 60 / 0.8), oklch(0.88 0.14 50 / 0.4) 40%, transparent 85%)",
            }}
          />
          {/* Reflection streaks */}
          <div className="pointer-events-none absolute left-1/2 top-[64%] h-[60vh] w-[14vw] -translate-x-1/2 opacity-70 mix-blend-screen">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className="absolute inset-x-0 h-[2px] animate-shimmer"
                style={{
                  top: `${i * 7 + (i % 3)}%`,
                  background:
                    "linear-gradient(to right, transparent, oklch(0.95 0.10 65 / 0.7), transparent)",
                  animationDelay: `${-i * 0.3}s`,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* MINAVAR title — handcrafted, embedded into ocean */}
        <motion.div
          style={{ y: titleY, filter: titleBlur }}
          className="absolute inset-x-0 top-[42%] z-20 select-none"
        >
          <h1
            className="font-choco text-center text-[clamp(110px,23vw,400px)] leading-[0.82]"
            style={{
              color: "oklch(0.97 0.04 75)",
              textShadow:
                "0 4px 0 oklch(0.32 0.12 30 / 0.55), 0 10px 0 oklch(0.22 0.08 25 / 0.35), 0 18px 60px oklch(0.18 0.08 250 / 0.7), 0 2px 20px oklch(0.88 0.16 55 / 0.75)",
              WebkitTextStroke: "1.5px oklch(0.30 0.10 25 / 0.55)",
              filter: "drop-shadow(0 0 30px oklch(0.88 0.14 55 / 0.35))",
            }}
          >
            MINAVAR
          </h1>
          {/* Water reflection (flipped, faded, distorted) */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-[80%] overflow-hidden opacity-35 blur-[2px]"
            style={{
              maskImage:
                "linear-gradient(to bottom, oklch(0 0 0 / 0.75), transparent 75%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, oklch(0 0 0 / 0.75), transparent 75%)",
            }}
          >
            <div
              className="font-choco text-center text-[clamp(110px,23vw,400px)] leading-[0.82] animate-shimmer"
              style={{
                color: "oklch(0.88 0.12 55)",
                transform: "scaleY(-1)",
              }}
            >
              MINAVAR
            </div>
          </div>
        </motion.div>

        {/* OCEAN — layered painterly waves */}
        <div className="absolute inset-x-0 top-[52%] h-[10vh] bg-gradient-to-b from-sunset-coral/40 via-sunset-coral/15 to-transparent blur-2xl" />

        {/* Distant wave band — BEHIND title bottom */}
        <WaveBand
          className="top-[56%] z-10"
          speed="animate-wave-slow"
          opacity={0.85}
          fill="oklch(0.46 0.08 220)"
          d="M0,180 C180,140 320,210 540,180 C760,150 900,220 1140,190 C1300,170 1380,210 1440,190 L1440,320 L0,320 Z"
        />
        <WaveBand
          className="top-[61%] z-10"
          speed="animate-wave-slow"
          opacity={0.78}
          fill="oklch(0.38 0.08 230)"
          d="M0,160 C180,128 360,200 540,170 C760,142 900,210 1100,180 C1280,158 1380,200 1440,180 L1440,320 L0,320 Z"
        />

        {/* Mid band — overlaps lower half of title to "submerge" it */}
        <WaveBand
          className="top-[65%] z-30"
          speed="animate-wave-med"
          opacity={0.95}
          fill="oklch(0.28 0.08 240)"
          d="M0,140 C200,80 380,200 620,150 C820,108 980,210 1200,160 C1340,128 1400,180 1440,160 L1440,320 L0,320 Z"
        />

        {/* Boat (real image) — between mid wave and front wave */}
        <BoatWithNet p={smooth} />

        {/* Front wave — passes IN FRONT of title bottom */}
        <WaveBand
          className="top-[71%] z-50"
          speed="animate-wave-fast"
          opacity={1}
          fill="oklch(0.20 0.07 248)"
          d="M0,120 C200,40 420,200 660,140 C880,90 1080,210 1280,150 C1380,124 1420,160 1440,150 L1440,320 L0,320 Z"
        />

        {/* Foam highlights */}
        <div className="absolute inset-x-0 top-[71%] z-[55] h-[5vh] opacity-80 mix-blend-screen">
          <div className="animate-wave-fast flex w-[200%] h-full">
            {[0, 1].map((k) => (
              <svg key={k} viewBox="0 0 1440 80" className="w-1/2 h-full" preserveAspectRatio="none">
                <path
                  d="M0,40 C200,4 420,72 660,40 C880,12 1080,72 1280,40 L1280,56 C1080,84 880,28 660,58 C420,90 200,18 0,54 Z"
                  fill="oklch(0.95 0.02 200 / 0.9)"
                />
                <path
                  d="M0,52 C200,22 420,68 660,46 C880,24 1080,70 1280,48"
                  fill="none"
                  stroke="oklch(0.98 0.02 200 / 0.5)"
                  strokeWidth="1"
                />
              </svg>
            ))}
          </div>
        </div>

        {/* Bottom deep band */}
        <div className="absolute inset-x-0 bottom-0 top-[76%] z-[60] bg-[linear-gradient(to_bottom,oklch(0.16_0.07_248)_0%,oklch(0.10_0.05_255)_100%)]" />

        {/* Sea spray */}
        <div className="pointer-events-none absolute inset-x-0 top-[70%] z-[65] h-[10vh]">
          {Array.from({ length: 22 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-[2px] w-[2px] rounded-full bg-pearl/80 blur-[0.6px] animate-drift-up"
              style={{
                left: `${(i * 41) % 100}%`,
                bottom: 0,
                animationDelay: `${-Math.abs(Math.sin(i * 1.1)) * 12}s`,
                animationDuration: `${8 + Math.abs(Math.sin(i * 2.2)) * 6}s`,
              }}
            />
          ))}
        </div>

        {/* Ambient mist */}
        <div className="pointer-events-none absolute inset-0 z-[70]">
          {Array.from({ length: 38 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-pearl/45 blur-[1px] animate-drift-up"
              style={{
                left: `${(i * 37) % 100}%`,
                bottom: `-${Math.abs(Math.sin(i * 3.3)) * 20}vh`,
                width: `${1 + Math.abs(Math.sin(i * 4.4)) * 2.8}px`,
                height: `${1 + Math.abs(Math.sin(i * 5.5)) * 2.8}px`,
                animationDelay: `${-Math.abs(Math.sin(i * 6.6)) * 22}s`,
                animationDuration: `${20 + Math.abs(Math.sin(i * 7.7)) * 14}s`,
              }}
            />
          ))}
        </div>

        {/* Cinematic vignette */}
        <div className="pointer-events-none absolute inset-0 z-[80] bg-[radial-gradient(120%_80%_at_50%_50%,transparent_50%,oklch(0.08_0.05_255/0.7)_100%)]" />

        {/* Nav */}
        <header className="absolute inset-x-0 top-0 z-[90] flex items-center justify-between px-8 py-7 text-pearl/90">
          <div className="flex items-center gap-3 font-mono-ui text-xs">
            <span className="h-2 w-2 rounded-full bg-bio-cyan shadow-[0_0_12px_oklch(0.82_0.16_200)]" />
            ENACTUS · VIT CHENNAI
          </div>
          <nav className="hidden gap-8 font-mono-ui text-xs md:flex">
            <button onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-bio-cyan transition-colors">STORY</button>
            <button onClick={() => document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-bio-cyan transition-colors">IMPACT</button>
            <button onClick={() => document.getElementById('craft')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-bio-cyan transition-colors">CRAFT</button>
            <button onClick={() => document.getElementById('deep')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-bio-cyan transition-colors">DIVE</button>
          </nav>
        </header>

        {/* Scroll cue */}
        <div className="pointer-events-none absolute inset-x-0 bottom-10 z-[90] flex flex-col items-center gap-3 text-center text-pearl/85">
          <p className="max-w-md px-6 font-display text-lg italic leading-snug">
            A cinematic ocean poem about ghost nets, restored reefs,
            <br className="hidden sm:block" />
            and the hands that turn waste into livelihood.
          </p>
          <span className="font-mono-ui text-[10px] tracking-[0.4em] text-pearl/70">
            SCROLL TO CAST THE NET
          </span>
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity }}
            className="h-8 w-px bg-pearl/60"
          />
        </div>
      </div>
    </section>
  );
}






