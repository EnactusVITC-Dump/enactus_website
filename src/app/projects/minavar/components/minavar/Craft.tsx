import { motion } from "framer-motion";


type Exhibit = {
  name: string;
  catalog: string;
  img: string;
  // pad lets us normalize visual weight per piece (smaller pad = bigger render)
  pad: number;
  drift: number;
  tilt: number;
};

const EXHIBITS: Exhibit[] = [
  { name: "Ghost Net Keychain",       catalog: "Specimen N°01 · Recovered Nylon",      img: "/images/minavar/product-keychain.jpg",    pad: 0, drift: 9,  tilt: -3 },
  { name: "Utility Pouches",          catalog: "Specimen N°02 · Woven Net Fibre",       img: "/images/minavar/utility-pouch.png",       pad: 0, drift: 11, tilt: 2  },
  { name: "Tote Bags",                catalog: "Specimen N°03 · Hand-Loomed Net",       img: "/images/minavar/tote-bag.png",        pad: 0, drift: 10, tilt: -2 },
  { name: "Bottle Cap Mosaic",        catalog: "Specimen N°04 · Reclaimed Plastic",     img: "/images/minavar/mosaic.png",      pad: 0,  drift: 12, tilt: 1  },
];

/** Small watercolor shell used only as accent — never as a platform */
function Shell({
  size,
  rotate,
  opacity = 0.55,
  className,
  style,
}: {
  size: number;
  rotate: number;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <img
      src="/images/minavar/shell-watercolor.png"
      alt=""
      aria-hidden
      draggable={false}
      className={`pointer-events-none select-none ${className ?? ""}`}
      style={{
        width: size,
        height: "auto",
        opacity,
        transform: `rotate(${rotate}deg)`,
        filter: "drop-shadow(0 4px 10px oklch(0 0 0 / 0.35))",
        ...style,
      }}
    />
  );
}

/** Brass + glass porthole — uniform aquarium exhibit window */
function Porthole({ e, i }: { e: Exhibit; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay: i * 0.15, ease: [0.2, 0.7, 0.2, 1] }}
      className="relative flex flex-col items-center"
    >
      {/* Frame — fixed square, identical across exhibits */}
      <div
        className="relative aspect-square w-full max-w-[280px]"
        style={{ filter: "drop-shadow(0 30px 50px oklch(0 0 0 / 0.55))" }}
      >
        {/* Brass outer ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 210deg, oklch(0.55 0.10 70), oklch(0.78 0.13 78) 25%, oklch(0.42 0.08 65) 50%, oklch(0.82 0.14 80) 75%, oklch(0.50 0.09 68))",
            boxShadow:
              "inset 0 0 0 1px oklch(0.30 0.05 60 / 0.6), inset 0 6px 14px oklch(1 0 0 / 0.18), inset 0 -8px 18px oklch(0 0 0 / 0.5)",
          }}
        />

        {/* Rivets */}
        {Array.from({ length: 12 }).map((_, r) => {
          const a = (r / 12) * Math.PI * 2;
          return (
            <span
              key={r}
              className="absolute h-2 w-2 rounded-full"
              style={{
                left: `calc(50% + ${Math.cos(a) * 46}% )`,
                top: `calc(50% + ${Math.sin(a) * 46}% )`,
                transform: "translate(-50%, -50%)",
                background:
                  "radial-gradient(circle at 30% 30%, oklch(0.92 0.12 80), oklch(0.40 0.08 60) 70%)",
                boxShadow: "inset 0 -1px 1px oklch(0 0 0 / 0.6), 0 1px 1px oklch(0 0 0 / 0.5)",
              }}
            />
          );
        })}

        {/* Glass interior — deep aquarium water */}
        <div
          className="absolute inset-[6%] overflow-hidden rounded-full"
          style={{
            background:
              "radial-gradient(120% 90% at 30% 20%, oklch(0.40 0.10 220 / 0.65), oklch(0.12 0.06 252) 60%, oklch(0.06 0.03 258) 100%)",
            boxShadow:
              "inset 0 0 60px oklch(0 0 0 / 0.65), inset 0 0 0 1px oklch(0.85 0.12 200 / 0.18)",
          }}
        >
          {/* Caustic shimmer inside the porthole */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-screen animate-caustic"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 30%, oklch(0.85 0.14 200 / 0.6), transparent 35%), radial-gradient(circle at 70% 60%, oklch(0.85 0.14 220 / 0.5), transparent 40%)",
              backgroundSize: "70% 70%, 55% 55%",
            }}
          />

          {/* Glass highlight */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 40% at 32% 22%, oklch(1 0 0 / 0.18), transparent 60%)",
            }}
          />

          {/* Tiny bubbles inside the glass */}
          {Array.from({ length: 5 }).map((_, b) => (
            <span
              key={b}
              className="absolute rounded-full bg-bio-cyan/60 blur-[1px] animate-drift-up"
              style={{
                left: `${15 + b * 16}%`,
                width: `${3 + (b % 2)}px`,
                height: `${3 + (b % 2)}px`,
                bottom: "-4%",
                animationDelay: `${-(b * 2 + i)}s`,
                animationDuration: `${9 + b}s`,
              }}
            />
          ))}

          {/* Product — gently drifting, uniform pad so visual weight is equal */}
          <motion.div
            animate={{ y: [-6, 6, -6], rotate: [e.tilt - 1.5, e.tilt + 1.5, e.tilt - 1.5] }}
            transition={{ duration: e.drift, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ padding: `${e.pad}%` }}
          >
            <img
              src={e.img}
              alt={e.name}
              loading="lazy"
              draggable={false}
              className="absolute inset-0 h-full w-full select-none object-cover rounded-full"
              style={{
                filter:
                  "drop-shadow(0 16px 24px oklch(0 0 0 / 0.55)) drop-shadow(0 0 18px oklch(0.82 0.16 200 / 0.25))",
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Engraved brass nameplate */}
      <div
        className="relative mt-6 inline-block px-6 py-2.5"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.40 0.06 65) 0%, oklch(0.28 0.05 60) 50%, oklch(0.38 0.06 65) 100%)",
          borderRadius: "3px",
          boxShadow:
            "inset 0 1px 0 oklch(0.85 0.10 75 / 0.45), inset 0 -1px 0 oklch(0 0 0 / 0.5), 0 8px 16px oklch(0 0 0 / 0.5)",
        }}
      >
        {/* corner screws */}
        {[
          { l: 6, t: 6 },
          { r: 6, t: 6 },
          { l: 6, b: 6 },
          { r: 6, b: 6 },
        ].map((p, k) => (
          <span
            key={k}
            className="absolute h-[5px] w-[5px] rounded-full"
            style={{
              left: p.l, top: p.t, right: p.r, bottom: p.b,
              background:
                "radial-gradient(circle at 30% 30%, oklch(0.85 0.10 80), oklch(0.30 0.05 60) 70%)",
            }}
          />
        ))}
        <div
          className="font-display text-sm leading-tight tracking-wide"
          style={{
            color: "oklch(0.92 0.06 80)",
            textShadow:
              "0 1px 0 oklch(0 0 0 / 0.8), 0 -1px 0 oklch(0.92 0.10 75 / 0.25)",
          }}
        >
          {e.name}
        </div>
        <div
          className="mt-0.5 font-mono-ui text-[9px] tracking-[0.2em]"
          style={{ color: "oklch(0.78 0.05 78 / 0.85)" }}
        >
          {e.catalog}
        </div>
      </div>
    </motion.div>
  );
}

export default function Craft() {
  return (
    <section
      id="craft"
      className="relative w-full overflow-hidden bg-gradient-to-b from-ocean-abyss via-[oklch(0.10_0.06_250)] to-ocean-abyss pt-32 pb-40"
    >
      {/* Ambient depths */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/3 h-[70vh] w-[70vh] rounded-full bg-bio-cyan/12 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[60vh] w-[60vh] rounded-full bg-sunset-coral/10 blur-3xl" />
      </div>

      {/* God rays */}
      <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute -top-[10vh] h-[140vh] w-[14vw] origin-top blur-2xl animate-shimmer"
            style={{
              left: `${10 + i * 18}%`,
              transform: `rotate(${i % 2 ? 5 : -3}deg)`,
              background:
                "linear-gradient(to bottom, oklch(0.88 0.13 200 / 0.4), oklch(0.85 0.12 200 / 0.10) 60%, transparent 90%)",
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}
      </div>

      {/* Drifting particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-bio-cyan/40 blur-[1px] animate-drift-up"
            style={{
              left: `${(i * 41) % 100}%`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              animationDelay: `${-((i * 1.7) % 22)}s`,
              animationDuration: `${20 + (i % 5) * 2}s`,
              bottom: `-10vh`,
            }}
          />
        ))}
      </div>

      {/* Section intro */}
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <div className="font-mono-ui text-[10px] tracking-[0.4em] text-bio-cyan">
          MINAVAR · OCEAN MUSEUM
        </div>
        <h2 className="font-display mx-auto mt-4 max-w-3xl text-5xl font-bold leading-[0.95] tracking-tight text-pearl md:text-7xl">
          Specimens of <em className="not-italic text-bio-cyan">restoration.</em>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-pearl/70 md:text-lg">
          Each piece on display has been pulled from the sea, cleaned by hand,
          and rewoven by coastal artisans into something quietly defiant.
        </p>
      </div>

      {/* Exhibit hall — uniform porthole grid */}
      <div className="relative mx-auto mt-20 w-full max-w-6xl px-6">
        {/* Top row — 3 specimens */}
        <div className="relative grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-3">
          {/* Accent shells in corners */}
          <Shell size={88} rotate={-22} opacity={0.32} className="absolute -left-6 -top-10 hidden md:block" />
          <Shell size={70} rotate={18} opacity={0.28} className="absolute -right-4 top-4 hidden md:block" />

          {EXHIBITS.slice(0, 3).map((e, i) => (
            <Porthole key={e.name} e={e} i={i} />
          ))}
        </div>

        {/* Bottom — centered specimen */}
        <div className="relative mt-20 flex justify-center">
          <Shell size={64} rotate={-14} opacity={0.3} className="absolute -left-2 bottom-0 hidden md:block" />
          <Shell size={80} rotate={22} opacity={0.32} className="absolute -right-2 -top-6 hidden md:block" />
          <div className="w-full max-w-[280px]">
            <Porthole e={EXHIBITS[3]} i={3} />
          </div>
        </div>
      </div>

      {/* Seafloor */}
      <svg
        viewBox="0 0 1440 200"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[14vh] w-full opacity-90"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="floorG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.10 0.04 260)" />
            <stop offset="100%" stopColor="oklch(0.04 0.02 262)" />
          </linearGradient>
        </defs>
        <path
          d="M0,200 L0,140 C120,100 260,160 420,120 C580,80 720,150 900,110 C1080,80 1240,150 1440,120 L1440,200 Z"
          fill="url(#floorG)"
        />
      </svg>
    </section>
  );
}
