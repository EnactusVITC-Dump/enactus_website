"use client"

import useScreenSize from "@/hooks/use-screen-size"
import { PixelTrail } from "@/components/ui/pixel-trail"
import { GooeyFilter } from "@/components/ui/gooey-filter"

export default function GlobalBackground() {
  const screenSize = useScreenSize()

  return (
    <div className="fixed inset-0 z-[-1] bg-enactus-black overflow-hidden pointer-events-none">
      {/* Background Image/Texture if needed, for now just black */}
      <div className="absolute inset-0 bg-enactus-black opacity-100" />

      <GooeyFilter id="gooey-filter-global" strength={5} />

      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{ filter: "url(#gooey-filter-global)" }}
      >
        <PixelTrail
          pixelSize={screenSize.lessThan("md") ? 24 : 32}
          fadeDuration={0}
          delay={500}
          pixelClassName="bg-white"
        />
      </div>
    </div>
  )
}
