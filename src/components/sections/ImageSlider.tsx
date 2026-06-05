"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"

const images = [
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781f?auto=format&fit=crop&w=1600&q=80"
]

export default function ImageSlider() {

  const [index, setIndex] = useState(0)
  const timeoutRef = useRef<number | null>(null)
  const slideInterval = 2500 // 2.5s

  useEffect(() => {
    timeoutRef.current = window.setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, slideInterval)

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [index])

  return (
    <section className="w-full max-w-[1200px] mx-auto px-4 py-12">
      <div className="relative w-full h-[60vh] min-h-[400px] overflow-hidden rounded-[2rem]">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ width: `${images.length * 100}%`, transform: `translateX(-${(index * 100) / images.length}%)` }}
        >
          {images.map((src, i) => (
            <div key={i} className="relative w-full h-full flex-shrink-0">
              <Image
                src={src}
                alt={`slide-${i}`}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
