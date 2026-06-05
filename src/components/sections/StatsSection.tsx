"use client"

import { useEffect, useRef, useCallback } from "react"

const stats = [
  { value: 200, suffix: "+", label: "Active Members" },
  { value: 12, suffix: "", label: "Years Running" },
  { value: 15, suffix: "+", label: "Projects Launched" },
  { value: 10000, suffix: "+", label: "Lives Impacted" },
]

function formatNumber(num: number): string {
  if (num >= 1000) {
    return num.toLocaleString()
  }
  return num.toString()
}

export default function StatsSection() {
  const statsRef = useRef<HTMLDivElement>(null)
  const countersRef = useRef<HTMLSpanElement[]>([])
  const hasAnimated = useRef(false)

  const animateCounters = useCallback(() => {
    countersRef.current.forEach((el, i) => {
      if (!el) return
      const target = stats[i].value
      const duration = 2000
      const startTime = performance.now()

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = Math.floor(eased * target)
        el.textContent = formatNumber(current) + stats[i].suffix

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          el.textContent = formatNumber(target) + stats[i].suffix
        }
      }

      requestAnimationFrame(animate)
    })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            animateCounters()
          }
        })
      },
      { threshold: 0.3 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [animateCounters])

  return (
    <section ref={statsRef} className="relative border-y border-[rgba(245,200,66,0.12)]">
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`py-16 md:py-20 px-8 md:px-12 ${
              i < stats.length - 1
                ? "border-r border-[rgba(245,200,66,0.12)]"
                : ""
            } ${
              i < 2 ? "lg:border-b-0 border-b border-[rgba(245,200,66,0.12)] lg:border-r" : ""
            }`}
          >
            <span
              ref={(el) => {
                if (el) countersRef.current[i] = el
              }}
              className="font-bebas text-[60px] md:text-[80px] text-gold leading-none block"
            >
              0
            </span>
            <span className="font-syne text-[11px] uppercase tracking-[3px] text-[rgba(240,236,228,0.4)] mt-4 block">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
