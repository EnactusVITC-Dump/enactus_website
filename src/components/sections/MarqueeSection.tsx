"use client"

const marqueeItems = [
  "ENACTUS",
  "VIT CHENNAI",
  "ENTREPRENEURSHIP",
  "IMPACT",
  "INNOVATION",
  "ACTION",
]

export default function MarqueeSection() {
  const content = marqueeItems.join(" · ") + " · "
  const repeatedContent = content.repeat(4)

  return (
    <section className="relative bg-enactus-off-black border-y border-[rgba(245,200,66,0.12)] py-8 overflow-hidden">
      {/* Row 1 - scrolls left */}
      <div className="flex whitespace-nowrap animate-marquee-left mb-4">
        <div className="flex items-center">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={`row1-${i}`} className="flex items-center">
              {marqueeItems.map((item, j) => (
                <span
                  key={`${i}-${j}`}
                  className={`font-bebas text-[60px] md:text-[80px] mx-4 ${
                    j % 2 === 0 ? "marquee-filled" : "marquee-outlined"
                  }`}
                >
                  {item}
                </span>
              ))}
              <span className="font-bebas text-[60px] md:text-[80px] mx-4 text-[rgba(245,200,66,0.2)]">
                ·
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 - scrolls right */}
      <div className="flex whitespace-nowrap animate-marquee-right">
        <div className="flex items-center">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={`row2-${i}`} className="flex items-center">
              {marqueeItems.map((item, j) => (
                <span
                  key={`${i}-${j}`}
                  className={`font-bebas text-[60px] md:text-[80px] mx-4 ${
                    j % 2 === 1 ? "marquee-filled" : "marquee-outlined"
                  }`}
                >
                  {item}
                </span>
              ))}
              <span className="font-bebas text-[60px] md:text-[80px] mx-4 text-[rgba(245,200,66,0.2)]">
                ·
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
