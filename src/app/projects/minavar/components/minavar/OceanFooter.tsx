export default function OceanFooter() {
  return (
    <footer
      id="deep"
      className="relative w-full overflow-hidden bg-black pt-32 pb-12 text-pearl"
    >
      {/* Deep glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[120vh] w-[120vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ocean-indigo/40 blur-3xl" />
      </div>

      {/* Drifting jellyfish silhouettes — edges only */}
      <div className="pointer-events-none absolute inset-0 opacity-25">
        {[6, 88].map((l, i) => (
          <div
            key={l}
            className="absolute animate-float"
            style={{ left: `${l}%`, top: `${20 + i * 30}%`, animationDelay: `${i * 2}s` }}
          >
            <div className="h-16 w-20 rounded-t-full bg-bio-cyan/40 blur-md" />
          </div>
        ))}
      </div>

      {/* Particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-bio-cyan/40 blur-[1px] animate-drift-up"
            style={{
              left: `${(i * 47) % 100}%`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              animationDelay: `${-((i * 1.7) % 22)}s`,
              animationDuration: `${18 + (i % 6) * 2}s`,
              bottom: `-10vh`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <h2 className="font-display mx-auto max-w-4xl text-center text-[clamp(48px,9vw,140px)] font-bold leading-[0.9] tracking-[-0.04em]">
          The sea
          <br />
          <em className="not-italic text-bio-cyan">remembers</em>
          <br />
          every kindness.
        </h2>

        <p className="mx-auto mt-10 max-w-xl text-center text-pearl/65">
          Follow the journey — ghost nets reclaimed, coastal livelihoods restored, one tide at a time.
        </p>

        {/* Social icons */}
        <div className="mt-12 flex items-center justify-center gap-5">
          <a
            href="https://www.instagram.com/enactusvitc/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-pearl/20 bg-pearl/5 backdrop-blur-sm transition-all hover:scale-110 hover:border-bio-cyan/60 hover:bg-bio-cyan/10"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-pearl/80 transition-colors group-hover:text-bio-cyan">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/company/enactusvitc/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-pearl/20 bg-pearl/5 backdrop-blur-sm transition-all hover:scale-110 hover:border-bio-cyan/60 hover:bg-bio-cyan/10"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-pearl/80 transition-colors group-hover:text-bio-cyan">
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.45c0-1.3-.02-2.97-1.81-2.97-1.82 0-2.1 1.42-2.1 2.88V21h-4V9z" />
            </svg>
          </a>
        </div>

        <div className="mt-20 flex flex-col items-center justify-center gap-3 border-t border-pearl/10 pt-8 text-center text-xs text-pearl/55">
          <div className="font-display text-base italic text-pearl/80">
            Crafted with 🐚 by Minavar
          </div>
          <div className="font-mono-ui tracking-[0.3em] text-pearl/45">
            ENACTUS VIT CHENNAI · PROJECT MINAVAR
          </div>
        </div>
      </div>
    </footer>
  );
}
