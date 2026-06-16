import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";


const SDGS = [
  { n: "01", title: "No Poverty", body: "Income for coastal women and fishers through upcycled craft." },
  { n: "08", title: "Decent Work", body: "Training Celeste artisans in seashell jewellery & net craft." },
  { n: "12", title: "Responsible Production", body: "A circular loop — ghost nets become tomorrow's gifts." },
  { n: "13", title: "Climate Action", body: "Plastic pulled from sea is plastic not in the carbon cycle." },
  { n: "14", title: "Life Below Water", body: "Every net retrieved unties a turtle, a reef, a future." },
];

function SDGPanel({
  i,
  total,
  progress,
  sdg,
}: {
  i: number;
  total: number;
  progress: MotionValue<number>;
  sdg: (typeof SDGS)[number];
}) {
  // Reveal between 0.2 and 0.95 of section progress
  const span = 0.75;
  const start = 0.2 + (i / total) * span;
  const end = 0.2 + ((i + 1) / total) * span;
  const opacity = useTransform(progress, [start - 0.04, start + 0.05, end - 0.06, end + 0.02], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, end], [40, -40]);
  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-0 bottom-[14vh] mx-auto max-w-md rounded-3xl border border-pearl/15 bg-ocean-abyss/55 p-7 text-pearl shadow-[0_30px_80px_-20px_oklch(0_0_0/0.6)] backdrop-blur-md"
    >
      <div className="font-mono-ui text-[10px] tracking-[0.4em] text-bio-cyan">SDG {sdg.n}</div>
      <h3 className="font-display mt-2 text-3xl font-bold tracking-tight">{sdg.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-pearl/75">{sdg.body}</p>
    </motion.div>
  );
}

export default function AerialBoat() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const boatX = useTransform(scrollYProgress, [0.05, 0.95], ["-10%", "100%"]);
  const boatRot = useTransform(scrollYProgress, [0, 1], [-2, 4]);
  const wakeLen = useTransform(scrollYProgress, [0.05, 0.95], [40, 600]);

  return (
    <section id="impact" ref={ref} className="relative h-[420vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ocean-abyss">
        {/* Aerial ocean texture */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(140% 100% at 50% 50%, oklch(0.18 0.08 235) 0%, oklch(0.10 0.06 250) 60%, oklch(0.06 0.04 258) 100%)",
          }}
        />
        {/* Shimmer water highlights */}
        <div className="absolute inset-0 opacity-30 mix-blend-screen">
          <svg viewBox="0 0 1440 900" className="h-full w-full" preserveAspectRatio="none">
            {Array.from({ length: 60 }).map((_, i) => (
              <line
                key={i}
                x1={(i * 31) % 1440}
                y1={(i * 71) % 900}
                x2={((i * 31) % 1440) + 24}
                y2={(i * 71) % 900}
                stroke="oklch(0.85 0.12 200 / 0.6)"
                strokeWidth="1.5"
              />
            ))}
          </svg>
        </div>
        {/* Slow caustic drift */}
        <div className="animate-wave-slow absolute inset-0 flex w-[200%] opacity-25 mix-blend-screen">
          {[0, 1].map((k) => (
            <svg key={k} viewBox="0 0 1440 900" className="h-full w-1/2" preserveAspectRatio="none">
              <defs>
                <radialGradient id={`caustic${k}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="oklch(0.82 0.16 200 / 0.6)" />
                  <stop offset="100%" stopColor="oklch(0.06 0.04 258 / 0)" />
                </radialGradient>
              </defs>
              {Array.from({ length: 14 }).map((_, i) => (
                <circle key={i} cx={(i * 113) % 1440} cy={(i * 217) % 900} r={120 + (i % 5) * 30} fill={`url(#caustic${k})`} />
              ))}
            </svg>
          ))}
        </div>

        {/* Island edge */}
        <svg viewBox="0 0 800 600" className="absolute -bottom-[5vh] left-[-8vw] w-[42vw] opacity-90">
          <path
            d="M0,600 L0,360 C60,300 140,330 220,280 C300,236 380,290 460,250 C540,210 620,260 700,230 C760,210 790,240 800,260 L800,600 Z"
            fill="oklch(0.18 0.04 80)"
          />
          <path
            d="M0,360 C60,300 140,330 220,280 C300,236 380,290 460,250 C540,210 620,260 700,230 C760,210 790,240 800,260"
            fill="none"
            stroke="oklch(0.85 0.12 200 / 0.7)"
            strokeWidth="2"
          />
        </svg>

        {/* Section heading */}
        <div className="absolute left-1/2 top-[10vh] z-20 -translate-x-1/2 px-6 text-center text-pearl">
          <div className="font-mono-ui text-[10px] tracking-[0.4em] text-bio-cyan">CHAPTER 05 — THE VOYAGE</div>
          <h2 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-6xl">
            One boat. Five oceans of impact.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-pearl/70 md:text-base">
            Scroll to set the boat in motion — and watch a trailing banner of the Sustainable Development Goals unfurl in its wake.
          </p>
        </div>

        {/* Aerial boat — top-down */}
        <motion.div
          style={{ left: boatX, rotate: boatRot }}
          className="absolute top-[42%] z-10 -translate-x-1/2"
        >
          {/* Trailing wake */}
          <motion.div
            style={{ width: wakeLen }}
            className="absolute right-[65%] top-1/2 h-12 -translate-y-1/2 rounded-full bg-gradient-to-l from-pearl/50 to-transparent blur-md"
          />
          <motion.div
            style={{ width: wakeLen }}
            className="absolute right-[65%] top-1/2 h-2 -translate-y-1/2 bg-gradient-to-l from-pearl/90 to-transparent"
          />
          <img
            src="/images/minavar/boat-aerial-new.png"
            alt=""
            aria-hidden
            draggable={false}
            className="h-auto w-[clamp(140px,16vw,260px)] select-none drop-shadow-[0_18px_40px_oklch(0_0_0/0.7)]"
            style={{ filter: "saturate(0.85) brightness(0.95)" }}
          />
        </motion.div>

        {/* SDG banner panels */}
        <div className="absolute inset-0 z-20">
          {SDGS.map((s, i) => (
            <SDGPanel key={s.n} i={i} total={SDGS.length} progress={scrollYProgress} sdg={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

