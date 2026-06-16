import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";




const ZONES = ["SURFACE", "SUNLIGHT ZONE", "TWILIGHT ZONE", "MIDNIGHT ZONE", "ABYSSAL ZONE"];

const STAGES = [
  {
    kicker: "CHAPTER 01 — DESCENT",
    title: "We descend\nbeneath the\nsurface.",
    body: "Below the warm skin of the sea lies a world entangled. Discarded fishing gear — ghost nets — drift like silent shadows, catching everything they touch.",
  },
  {
    kicker: "CHAPTER 02 — THE GHOST",
    title: "Nets that outlive\ntheir keepers.",
    body: "A single lost net keeps fishing for centuries, strangling reefs, suffocating turtles, choking the breath of coastal ecosystems.",
  },
  {
    kicker: "CHAPTER 03 — A NAME",
    title: "Minavar.\nThe word for\nfisherman.",
    body: "In Tamil, ‘Minavar’ honours the people who live with the sea. Our project began with upcycled nets and grew into a movement of restoration and livelihood.",
  },
  {
    kicker: "CHAPTER 04 — THE TURN",
    title: "Waste becomes\nwarmth, becomes\nwork.",
    body: "Each net is hand-cleaned, untangled, and rewoven by coastal artisans and the women of Celeste — into keychains, jewellery, and stories.",
  },
];

function ZoneDot({ label, index, active }: { label: string; index: number; active: MotionValue<number> }) {
  const opacity = useTransform(active, (a) => (Math.round(a) === index ? 1 : 0.3));
  const scale = useTransform(active, (a) => (Math.round(a) === index ? 1.6 : 1));
  return (
    <motion.div style={{ opacity }} className="flex items-center gap-3">
      <motion.span style={{ scale }} className="block h-2 w-2 rounded-full border border-pearl/70 bg-bio-cyan/40" />
      {label}
    </motion.div>
  );
}

function Stage({ i, total, progress, s }: { i: number; total: number; progress: MotionValue<number>; s: (typeof STAGES)[number] }) {
  const start = i / total;
  const end = (i + 1) / total;
  const opacity = useTransform(progress, [start - 0.04, start + 0.05, end - 0.05, end + 0.02], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, end], [40, -40]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col items-center justify-center text-center">
      <span className="mb-6 font-mono-ui text-[10px] tracking-[0.4em] text-bio-cyan">{s.kicker}</span>
      <h2 className="font-display whitespace-pre-line text-[clamp(40px,7vw,96px)] font-bold leading-[0.95] tracking-[-0.03em] text-pearl">
        {s.title}
      </h2>
      <p className="mt-8 max-w-xl text-base leading-relaxed text-pearl/75 md:text-lg">{s.body}</p>
    </motion.div>
  );
}

/** Dolphin arcs across the screen — synced to scroll */
function DolphinArc({ p }: { p: MotionValue<number> }) {
  // Active between 0.55 – 0.95
  const t = useTransform(p, [0.55, 0.95], [0, 1]);
  const x = useTransform(t, (v) => `${85 - v * 80}vw`); // right→left
  const y = useTransform(t, (v) => {
    // Semicircle arc: parabola
    const arc = -Math.sin(v * Math.PI) * 60; // negative = upward
    return `${50 + arc}vh`;
  });
  const rot = useTransform(t, (v) => -Math.cos(v * Math.PI) * 60);
  const opacity = useTransform(p, [0.53, 0.58, 0.92, 0.96], [0, 1, 1, 0]);

  return (
    <motion.div
      style={{ x, y, rotate: rot, opacity }}
      className="pointer-events-none absolute left-0 top-0 z-30"
    >
      <svg width="180" height="80" viewBox="0 0 180 80" className="drop-shadow-[0_8px_24px_oklch(0_0_0/0.6)]">
        <defs>
          <linearGradient id="dolphinBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.50 0.04 240)" />
            <stop offset="60%" stopColor="oklch(0.28 0.04 250)" />
            <stop offset="100%" stopColor="oklch(0.85 0.02 200)" />
          </linearGradient>
        </defs>
        {/* Body */}
        <path
          d="M10,42 C40,20 90,18 130,30 C150,36 170,44 175,52 C160,52 140,54 120,56 C95,60 65,60 35,54 C22,52 14,48 10,42 Z"
          fill="url(#dolphinBody)"
        />
        {/* Dorsal fin */}
        <path d="M70,28 L82,12 L94,30 Z" fill="oklch(0.32 0.04 245)" />
        {/* Tail */}
        <path d="M168,46 L182,28 L178,50 L182,72 Z" fill="oklch(0.30 0.04 245)" />
        {/* Eye */}
        <circle cx="40" cy="38" r="1.6" fill="oklch(0.10 0.02 250)" />
        {/* Belly highlight */}
        <ellipse cx="80" cy="54" rx="50" ry="4" fill="oklch(0.92 0.02 200 / 0.4)" />
      </svg>
    </motion.div>
  );
}

export default function UnderwaterDive() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const depth = useTransform(scrollYProgress, [0, 1], [0, 4200]);
  const psi = useTransform(scrollYProgress, [0, 1], [14.5, 420]);
  const depthText = useTransform(depth, (v) => Math.round(v).toLocaleString());
  const psiText = useTransform(psi, (v) => v.toFixed(1));
  const activeZone = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 4]);

  const bg = useTransform(scrollYProgress, [0, 1], [
    "linear-gradient(to bottom, oklch(0.20 0.07 240) 0%, oklch(0.16 0.08 245) 50%, oklch(0.10 0.06 252) 100%)",
    "linear-gradient(to bottom, oklch(0.06 0.03 258) 0%, oklch(0.04 0.02 260) 60%, oklch(0.02 0.01 262) 100%)",
  ]);

  // Turtle slow drift
  // Path hugs the lower edge of the viewport, far below the centered storytelling text
  const turtleX = useTransform(scrollYProgress, [0, 1], ["-15vw", "110vw"]);
  const turtleY = useTransform(scrollYProgress, [0, 0.5, 1], ["72vh", "82vh", "70vh"]);

  return (
    <section id="story" ref={ref} className="relative h-[560vh] w-full text-pearl">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div className="absolute inset-0" style={{ background: bg }} />

        {/* God rays — denser */}
        <div className="pointer-events-none absolute inset-0 opacity-70 mix-blend-screen">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="absolute -top-[10vh] h-[140vh] w-[16vw] origin-top blur-2xl animate-shimmer"
              style={{
                left: `${4 + i * 11}%`,
                transform: `rotate(${i % 2 ? 6 : -4}deg)`,
                background:
                  "linear-gradient(to bottom, oklch(0.88 0.13 200 / 0.5), oklch(0.85 0.12 200 / 0.15) 60%, transparent 90%)",
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Caustic shimmer overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-25 mix-blend-screen">
          <div
            className="h-full w-full animate-caustic"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 30%, oklch(0.85 0.14 200 / 0.6), transparent 30%), radial-gradient(circle at 70% 60%, oklch(0.85 0.14 220 / 0.5), transparent 35%)",
              backgroundSize: "60% 60%, 50% 50%",
              backgroundRepeat: "repeat",
            }}
          />
        </div>

        {/* Particles + bubbles */}
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 70 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-bio-cyan/45 blur-[1px] animate-drift-up"
              style={{
                left: `${(i * 53) % 100}%`,
                width: `${2 + (i % 5)}px`,
                height: `${2 + (i % 5)}px`,
                animationDelay: `${-((i * 1.3) % 22)}s`,
                animationDuration: `${14 + (i % 9) * 2}s`,
                bottom: `-10vh`,
              }}
            />
          ))}
        </div>

        {/* Whale silhouette — deep background */}
        <svg viewBox="0 0 600 200" className="absolute left-[4%] top-[58%] w-[34vw] opacity-25 animate-float">
          <path
            d="M40,120 C120,80 220,70 340,90 C440,108 520,120 560,140 C520,150 460,156 380,158 C300,160 200,158 120,150 C80,144 50,134 40,120 Z M560,140 L590,118 L588,148 Z"
            fill="oklch(0.04 0.02 258)"
          />
        </svg>

        {/* Multiple fish schools — both directions */}
        <motion.div
          animate={{ x: ["-15%", "115%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute top-[28%] flex gap-3"
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <svg key={i} width="22" height="10" viewBox="0 0 22 10" className="opacity-70" style={{ transform: `translateY(${Math.sin(i * 0.8) * 12}px)` }}>
              <path d="M0,5 C6,0 14,0 18,5 C14,10 6,10 0,5 Z M18,5 L22,0 L22,10 Z" fill="oklch(0.85 0.16 200 / 0.85)" />
            </svg>
          ))}
        </motion.div>
        <motion.div
          animate={{ x: ["115%", "-15%"] }}
          transition={{ duration: 52, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute top-[44%] flex gap-4"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <svg key={i} width="28" height="12" viewBox="0 0 22 10" className="opacity-60 -scale-x-100" style={{ transform: `translateY(${Math.cos(i * 0.7) * 10}px) scaleX(-1)` }}>
              <path d="M0,5 C6,0 14,0 18,5 C14,10 6,10 0,5 Z M18,5 L22,0 L22,10 Z" fill="oklch(0.78 0.14 60 / 0.7)" />
            </svg>
          ))}
        </motion.div>
        <motion.div
          animate={{ x: ["-10%", "110%"] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute top-[68%] flex gap-2"
        >
          {Array.from({ length: 22 }).map((_, i) => (
            <svg key={i} width="14" height="6" viewBox="0 0 22 10" className="opacity-50" style={{ transform: `translateY(${Math.sin(i * 1.2) * 6}px)` }}>
              <path d="M0,5 C6,0 14,0 18,5 C14,10 6,10 0,5 Z M18,5 L22,0 L22,10 Z" fill="oklch(0.55 0.10 220 / 0.8)" />
            </svg>
          ))}
        </motion.div>

        {/* Sea turtle — colored illustration, drifting along the lower edge so it never crosses the headline */}
        <motion.div style={{ x: turtleX, y: turtleY }} className="pointer-events-none absolute z-[5]">
          <motion.div
            animate={{ rotate: [-4, 6, -4], y: [-10, 10, -10] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="opacity-95 drop-shadow-[0_20px_40px_oklch(0_0_0/0.6)]"
          >
            <img src="/images/minavar/turtle-cutout.png" alt="Sea Turtle" className="w-[clamp(140px,18vw,320px)] h-auto select-none" style={{ filter: "saturate(1.05) brightness(0.92) drop-shadow(0 0 28px oklch(0.78 0.16 200 / 0.45))" }} draggable={false} />
          </motion.div>
        </motion.div>

        {/* Coral silhouettes */}
        <svg viewBox="0 0 1440 200" className="pointer-events-none absolute inset-x-0 bottom-0 h-[22vh] w-full opacity-80" preserveAspectRatio="none">
          <defs>
            <linearGradient id="reefG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.10 0.04 280)" />
              <stop offset="100%" stopColor="oklch(0.02 0.01 262)" />
            </linearGradient>
          </defs>
          <path
            d="M0,200 L0,140 C40,120 80,150 120,110 C160,80 180,140 220,90 C260,60 300,140 340,100 C380,70 420,150 460,110 C500,80 540,160 580,120 C620,90 660,150 700,100 C740,60 780,160 820,120 C860,90 900,150 940,110 C980,80 1020,150 1060,110 C1100,80 1140,150 1180,110 C1220,80 1260,140 1300,100 C1340,80 1400,140 1440,120 L1440,200 Z"
            fill="url(#reefG)"
          />
        </svg>

        {/* Ghost net — translucent */}
        <svg viewBox="0 0 400 400" className="absolute right-[6%] top-[18%] w-[24vw] opacity-45 animate-float">
          <g stroke="oklch(0.95 0.04 60 / 0.55)" strokeWidth="0.6" fill="none">
            {Array.from({ length: 18 }).map((_, i) => (
              <path key={i} d={`M${i * 22},0 Q${i * 22 + 10},200 ${i * 22 - 6},400`} />
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
              <path key={`h${i}`} d={`M0,${i * 35} Q200,${i * 35 + 18} 400,${i * 35 - 8}`} />
            ))}
          </g>
        </svg>

        {/* Jellyfish — strict edge columns, faded so they read as distant atmosphere */}
        {[
          { src: "/images/minavar/jellyfish1.svg", l: "-2%", t: "18%", d: 0, w: 140, blur: 2.5, op: 0.45, hue: 220 },
          { src: "/images/minavar/jellyfish2.svg", l: "88%", t: "28%", d: 4, w: 160, blur: 1.5, op: 0.55, hue: 250 },
          { src: "/images/minavar/jellyfish1.svg", l: "92%", t: "64%", d: 2, w: 110, blur: 3.5, op: 0.40, hue: 280 },
          { src: "/images/minavar/jellyfish2.svg", l: "-4%", t: "72%", d: 6, w: 130, blur: 2,   op: 0.45, hue: 200 },
          { src: "/images/minavar/jellyfish1.svg", l: "86%", t: "6%",  d: 5, w: 80,  blur: 4.5, op: 0.32, hue: 240 },
        ].map((j, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -30, 0], x: [0, 12, 0] }}
            transition={{ duration: 9 + i * 1.5, repeat: Infinity, ease: "easeInOut", delay: j.d }}
            className="pointer-events-none absolute z-[5]"
            style={{ left: j.l, top: j.t }}
          >
            <div className="animate-jelly origin-top">
              <img
                src={j.src}
                alt=""
                aria-hidden
                draggable={false}
                style={{
                  width: j.w,
                  height: "auto",
                  opacity: j.op,
                  filter: `blur(${j.blur}px) saturate(0.7) brightness(0.95) hue-rotate(${j.hue}deg) drop-shadow(0 0 ${30 + j.blur * 4}px oklch(0.82 0.18 ${j.hue} / 0.55))`,
                }}
              />
            </div>
          </motion.div>
        ))}

        {/* Seaweed at bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[24vh]">
          {[10, 24, 38, 52, 66, 80, 92].map((l, i) => (
            <div
              key={l}
              className="absolute bottom-0 origin-bottom animate-sway"
              style={{ left: `${l}%`, animationDelay: `${i * 0.4}s`, animationDuration: `${4 + (i % 3)}s` }}
            >
              <svg width="20" height={`${120 + (i % 3) * 40}`} viewBox="0 0 20 200">
                <path
                  d={`M10,200 Q${4 + (i % 3) * 3},150 10,100 Q${16 - (i % 3) * 2},50 10,0`}
                  stroke="oklch(0.30 0.10 150 / 0.7)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          ))}
        </div>

        {/* Dolphin arc */}
        <DolphinArc p={scrollYProgress} />

        {/* Zones nav */}
        <aside className="absolute left-8 top-1/2 hidden -translate-y-1/2 space-y-4 font-mono-ui text-[10px] tracking-[0.3em] text-pearl/80 md:block">
          {ZONES.map((z, i) => (
            <ZoneDot key={z} label={z} index={i} active={activeZone} />
          ))}
        </aside>

        {/* Depth readout */}
        <aside className="absolute right-8 top-1/2 hidden -translate-y-1/2 text-right font-mono-ui text-pearl/85 md:block">
          <div className="font-display text-6xl font-bold text-pearl tabular-nums">
            <motion.span>{depthText}</motion.span>
          </div>
          <div className="text-[10px] tracking-[0.3em]">METERS</div>
          <div className="mt-3 text-[10px] tracking-[0.3em] tabular-nums">
            <motion.span>{psiText}</motion.span> ATM
          </div>
        </aside>

        {/* Storytelling — sits above marine decoration so text is always readable */}
        <div className="absolute inset-0 z-40 flex items-center justify-center px-6">
          <div className="relative h-[60vh] w-full max-w-3xl">
            {STAGES.map((s, i) => (
              <Stage key={i} i={i} total={STAGES.length} progress={scrollYProgress} s={s} />
            ))}
          </div>
        </div>

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_55%,oklch(0_0_0/0.55)_100%)]" />
      </div>
    </section>
  );
}


