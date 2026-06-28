"use client"

import Link from "next/link"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Globe2,
  Handshake,
  Network,
  Sparkles,
  Target,
  Users,
} from "lucide-react"
import Footer from "@/components/layout/Footer"

const CollaborationGlobe = dynamic(
  () => import("@/components/three/CollaborationGlobe"),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto flex aspect-[16/10] w-full max-w-[620px] items-center justify-center">
        <div className="h-48 w-48 rounded-full border border-[rgba(245,200,66,0.35)] bg-[radial-gradient(circle,rgba(245,200,66,0.2),transparent_68%)]" />
      </div>
    ),
  }
)

const impactWords = [
  { label: "TRUST", className: "text-[clamp(42px,6vw,78px)] ml-[18%]" },
  { label: "PARTNERSHIP", className: "text-[clamp(54px,8vw,112px)]" },
  { label: "COLLABORATOR", className: "text-[clamp(32px,4.5vw,62px)] ml-[12%]" },
  { label: "INNOVATION", className: "text-[clamp(30px,4vw,56px)] ml-[22%]" },
  { label: "IMPACT", className: "text-[clamp(64px,9vw,126px)] ml-[18%]" },
  { label: "SUPPORT", className: "text-[clamp(42px,6vw,78px)] ml-[24%]" },
  { label: "GROWTH", className: "text-[clamp(34px,5vw,68px)] ml-[32%]" },
]

const heroStats = [
  { value: "5+", label: "Partners", Icon: Users },
  { value: "50+", label: "Events Supported", Icon: Handshake },
  { value: "1000+", label: "Students Impacted", Icon: Globe2 },
]

const collaborationCards = [
  {
    title: "Strategic Partnerships",
    eyebrow: "Institutional Allies",
    description:
      "Long-term collaborations that help scale entrepreneurial action, mentorship, and sustainable community projects.",
    metric: "12+",
    metricLabel: "Impact programs enabled",
  },
  {
    title: "Event Collaborations",
    eyebrow: "Campus & Community",
    description:
      "High-trust partners who support workshops, competitions, outreach drives, and student-led innovation showcases.",
    metric: "50+",
    metricLabel: "Experiences supported",
  },
]

const sponsorCards = [
  {
    name: "Innovation Partner",
    tier: "Principal Sponsor",
    description: "Backing student founders with resources, mentorship, and launch support.",
  },
  {
    name: "Impact Partner",
    tier: "Community Sponsor",
    description: "Supporting field work, outreach, and sustainable project implementation.",
  },
  {
    name: "Growth Partner",
    tier: "Event Sponsor",
    description: "Helping Enactus experiences reach more students and more communities.",
  },
]

const logoMarquee = [
  "ENACTUS",
  "INNOVATION",
  "IMPACT",
  "SUPPORT",
  "GROWTH",
  "TRUST",
  "PARTNER",
  "COLLAB",
]

const particles = Array.from({ length: 28 }, (_, index) => ({
  left: `${(index * 37) % 100}%`,
  top: `${(index * 19) % 100}%`,
  delay: (index % 7) * 0.22,
  size: 3 + (index % 3),
}))

const cubes = [
  { left: "9%", top: "18%", size: 24, delay: 0 },
  { left: "50%", top: "10%", size: 18, delay: 0.45 },
  { left: "88%", top: "24%", size: 28, delay: 0.2 },
  { left: "22%", top: "75%", size: 18, delay: 0.65 },
  { left: "78%", top: "78%", size: 22, delay: 0.35 },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-4 inline-flex items-center gap-2 font-syne text-[11px] font-bold uppercase tracking-[1.5px] text-enactus-white">
      <span className="h-5 w-[2px] bg-gold" />
      {children}
    </span>
  )
}

function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(245,200,66,0.18),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(245,200,66,0.12),transparent_24%),linear-gradient(135deg,rgba(245,200,66,0.05),transparent_45%)]" />
      {particles.map((particle, index) => (
        <motion.span
          key={`particle-${index}`}
          className="absolute rounded-full bg-gold shadow-[0_0_16px_rgba(245,200,66,0.9)]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={{ y: [-12, 14, -12], opacity: [0.2, 0.9, 0.2] }}
          transition={{
            duration: 4 + (index % 5),
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
      {cubes.map((cube, index) => (
        <motion.span
          key={`cube-${index}`}
          className="absolute border border-[rgba(245,200,66,0.45)] bg-[rgba(245,200,66,0.06)] shadow-[0_0_28px_rgba(245,200,66,0.16)]"
          style={{
            left: cube.left,
            top: cube.top,
            width: cube.size,
            height: cube.size,
          }}
          animate={{
            rotate: [0, 90, 180, 270, 360],
            y: [0, -18, 8, 0],
            x: [0, 8, -10, 0],
          }}
          transition={{
            duration: 10 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: cube.delay,
          }}
        />
      ))}
      <motion.div
        className="absolute left-[8%] top-[15%] h-40 w-40 rounded-full border border-[rgba(245,200,66,0.14)]"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-[10%] right-[10%] h-56 w-56 rounded-full border border-dashed border-[rgba(245,200,66,0.18)]"
        animate={{ rotate: -360 }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

export default function SponsorsPage() {
  const marqueeItems = [...logoMarquee, ...logoMarquee, ...logoMarquee]

  return (
    <>
      <div className="relative z-10 -mx-5 -mt-5 overflow-hidden bg-enactus-black">
        <section className="relative bg-gold px-5 pb-8 pt-4 md:px-8 md:pb-12">
          <motion.div
            className="relative mx-auto min-h-[calc(100vh-126px)] max-w-[1600px] overflow-hidden rounded-b-[44px] rounded-t-[18px] bg-enactus-black px-6 py-16 shadow-[0_28px_80px_rgba(0,0,0,0.55)] md:px-10 lg:px-12"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <AnimatedBackground />
            <div className="relative z-10 grid min-h-[560px] items-center gap-12 lg:grid-cols-[1fr_0.88fr]">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  <SectionLabel>Partnerships</SectionLabel>
                  <h1 className="font-bebas leading-[0.9] tracking-[0.03em] text-enactus-white">
                    <span className="block text-[clamp(54px,9vw,132px)]">OUR</span>
                    <span className="block text-[clamp(42px,10.5vw,156px)] text-gold">
                      COLLABORATIONS
                    </span>
                  </h1>
                  <p className="mt-6 max-w-xl font-syne text-[13px] font-bold uppercase leading-[2] tracking-[1px] text-[rgba(240,236,228,0.58)] md:text-[15px]">
                    Partners who support innovation, entrepreneurship and social impact.
                  </p>
                  <Link
                    href="#collaborations"
                    className="mt-8 inline-flex items-center gap-3 rounded-full bg-[rgba(240,236,228,0.12)] px-8 py-3 font-syne text-[12px] font-bold uppercase tracking-[1px] text-enactus-white transition-all duration-300 hover:bg-gold hover:text-enactus-black hover:shadow-[0_0_32px_rgba(245,200,66,0.35)]"
                    data-cursor-hover
                  >
                    Explore Partners
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </div>

              <motion.div
                className="relative min-h-[360px] lg:min-h-[520px]"
                initial={{ opacity: 0, x: 36 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
              >
                <div className="absolute inset-0 rounded-full bg-gold/10 blur-[80px]" />
                <div className="relative flex h-full flex-col justify-center overflow-hidden font-bebas leading-[0.82] text-[rgba(240,236,228,0.1)]">
                  {impactWords.map((word, index) => (
                    <motion.span
                      key={word.label}
                      className={word.className}
                      animate={{ x: index % 2 === 0 ? [0, 12, 0] : [0, -12, 0] }}
                      transition={{
                        duration: 5 + index * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {word.label}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              className="relative z-10 mx-auto mt-4 max-w-4xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              <div className="grid grid-cols-1 gap-5 border-b border-gold pb-5 shadow-[0_18px_36px_-30px_rgba(245,200,66,1)] md:grid-cols-3 md:gap-0">
                {heroStats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`flex items-center justify-center gap-4 px-4 ${
                      index !== heroStats.length - 1
                        ? "md:border-r md:border-[rgba(240,236,228,0.28)]"
                        : ""
                    }`}
                  >
                    <stat.Icon className="h-10 w-10 text-gold md:h-12 md:w-12" strokeWidth={1.8} />
                    <div>
                      <div className="font-syne text-3xl font-bold leading-none text-enactus-white md:text-4xl">
                        {stat.value}
                      </div>
                      <div className="mt-1 font-dm-sans text-xs font-bold text-[rgba(240,236,228,0.72)]">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-center font-syne text-[8px] font-bold uppercase tracking-[1.5px] text-enactus-white">
                Scroll to explore
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section
          id="collaborations"
          className="relative scroll-mt-[140px] bg-gold px-5 py-12 md:px-8 md:py-16"
        >
          <div className="mx-auto max-w-[1600px] overflow-hidden rounded-[44px] bg-enactus-black px-6 pb-14 pt-28 md:px-10 md:pt-32 lg:px-12">
            <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1fr]">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7 }}
              >
                <SectionLabel>Our Partners</SectionLabel>
                <h2 className="font-bebas text-[clamp(52px,7vw,104px)] leading-[0.9] tracking-[0.02em] text-enactus-white">
                  STRONGER TOGETHER
                  <br />
                  <span className="text-gold">GREATER IMPACT</span>
                </h2>
                <p className="mt-5 max-w-xl font-syne text-[12px] font-bold uppercase leading-[2] tracking-[0.8px] text-enactus-white md:text-[13px]">
                  We collaborate with organizations and individuals who believe in our
                  vision and empower us to create meaningful change.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              >
                <CollaborationGlobe />
              </motion.div>
            </div>

            <div className="mt-12 flex items-center justify-center gap-3 font-bebas text-[30px] text-enactus-white md:text-[36px]">
              <span className="h-px w-12 bg-enactus-white" />
              OUR <span className="text-gold">COLLABORATIONS</span>
              <span className="h-px w-12 bg-enactus-white" />
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {collaborationCards.map((card, index) => (
                <motion.article
                  key={card.title}
                  className="group relative min-h-[280px] overflow-hidden rounded-[26px] border border-[rgba(245,200,66,0.12)] bg-[#4b4747] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[rgba(245,200,66,0.45)] hover:bg-[#565151] hover:shadow-[0_26px_70px_rgba(0,0,0,0.45)] md:p-9"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  data-cursor-hover
                >
                  <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-gold/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                      <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-enactus-black/50 px-4 py-2 font-syne text-[10px] font-bold uppercase tracking-[1.5px] text-gold">
                        <Network size={14} />
                        {card.eyebrow}
                      </div>
                      <h3 className="font-bebas text-[44px] leading-[0.92] text-enactus-white md:text-[58px]">
                        {card.title}
                      </h3>
                      <p className="mt-4 max-w-xl font-dm-sans text-[14px] leading-[1.8] text-[rgba(240,236,228,0.72)]">
                        {card.description}
                      </p>
                    </div>
                    <div className="mt-8 flex items-end justify-between border-t border-[rgba(245,200,66,0.2)] pt-5">
                      <div>
                        <div className="font-syne text-4xl font-bold text-gold">{card.metric}</div>
                        <div className="font-syne text-[10px] font-bold uppercase tracking-[1px] text-[rgba(240,236,228,0.58)]">
                          {card.metricLabel}
                        </div>
                      </div>
                      <ArrowRight className="text-gold transition-transform duration-300 group-hover:translate-x-2" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative bg-gold px-5 pb-12 pt-4 md:px-8 md:pb-16">
          <div className="mx-auto max-w-[1600px] overflow-hidden rounded-[44px] bg-enactus-black px-6 pb-14 pt-28 md:px-10 md:pt-32 lg:px-12">
            <div className="grid gap-6 lg:grid-cols-3">
              {sponsorCards.map((card, index) => (
                <motion.article
                  key={card.name}
                  className="group relative min-h-[260px] overflow-hidden rounded-[26px] bg-[#4b4747] p-7 transition-all duration-500 hover:-translate-y-2 hover:bg-[#565151] hover:shadow-[0_0_46px_rgba(245,200,66,0.16)]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  data-cursor-hover
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(245,200,66,0.22),transparent_28%)] opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-enactus-black/55 px-4 py-2 font-syne text-[10px] font-bold uppercase tracking-[1.4px] text-gold">
                        {card.tier}
                      </span>
                      <Sparkles className="text-gold" size={22} />
                    </div>
                    <div>
                      <h3 className="font-bebas text-[48px] leading-none text-enactus-white">
                        {card.name}
                      </h3>
                      <p className="mt-4 font-dm-sans text-sm leading-[1.8] text-[rgba(240,236,228,0.72)]">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="mt-14 overflow-hidden border-y border-[rgba(245,200,66,0.16)] py-5">
              <div className="flex w-max whitespace-nowrap animate-marquee-left">
                {marqueeItems.map((item, index) => (
                  <span
                    key={`${item}-${index}`}
                    className={`mx-6 font-bebas text-[46px] md:text-[68px] ${
                      index % 2 === 0 ? "text-gold" : "marquee-outlined"
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <motion.div
              className="relative mx-auto mt-12 overflow-hidden rounded-[32px] bg-[#343434] px-6 py-8 text-center md:px-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7 }}
            >
              <div className="absolute left-0 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-gold/18 blur-3xl" />
              <div className="absolute right-0 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-gold/18 blur-3xl" />
              <div className="relative z-10">
                <p className="font-syne text-[11px] font-bold uppercase tracking-[1px] text-gold">
                  Let&apos;s collaborate
                </p>
                <h2 className="mx-auto mt-2 max-w-4xl font-syne text-[18px] font-bold uppercase tracking-[1.2px] text-enactus-white md:text-[28px]">
                  Together we can create a better tomorrow
                </h2>
                <Link
                  href="mailto:enactusvitc@gmail.com?subject=Sponsor%20Enactus%20VIT%20Chennai"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-syne text-[11px] font-bold uppercase tracking-[0.6px] text-enactus-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(245,200,66,0.45)]"
                  data-cursor-hover
                >
                  Become a Sponsor
                  <Target size={15} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
