"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"

const images = [
  "/image1.png", // Replace with your first image file name
  "/image2.png", // Replace with your second image file name
]

export default function ImageSlider() {
  return (
    <section className="w-full mx-auto py-12 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee-left w-max">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`group-${i}`} className="flex gap-6 mx-3">
            {images.map((src, j) => (
              <div
                key={`${i}-${j}`}
                className="relative w-[300px] h-[200px] md:w-[600px] md:h-[400px] flex-shrink-0 rounded-[2rem] overflow-hidden bg-black/5"
              >
                <Image
                  src={src}
                  alt={`image-${j}`}
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
