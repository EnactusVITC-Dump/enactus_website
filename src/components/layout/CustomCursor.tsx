"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const mousePos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Check for touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Hover detection for interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, [data-cursor-hover], input, textarea, select')
      setIsHovering(!!isInteractive)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mousemove", handleElementHover)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    // Animation loop
    let animationFrame: number
    const animate = () => {
      if (cursorRef.current && ringRef.current) {
        // Cursor follows mouse directly
        cursorRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px)`

        // Ring lags behind with lerp
        const lerpFactor = 0.12
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`
      }
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousemove", handleElementHover)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationFrame)
    }
  }, [isVisible])

  return (
    <>
      {/* Cursor - Enactus Logo */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300"
        style={{
          opacity: isVisible ? 1 : 0,
          willChange: "transform",
        }}
      >
        <div
          className="transition-all duration-200 ease-out"
          style={{
            width: isHovering ? 32 : 24,
            height: isHovering ? 32 : 24,
            marginLeft: isHovering ? -16 : -12,
            marginTop: isHovering ? -16 : -12,
          }}
        >
          <Image
            src="/enactus-cursor.png"
            alt=""
            width={32}
            height={32}
            className="w-full h-full object-contain"
            priority
          />
        </div>
      </div>

      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] transition-opacity duration-300"
        style={{
          opacity: isVisible ? 1 : 0,
          willChange: "transform",
        }}
      >
        <div
          className="rounded-full border transition-all duration-200 ease-out"
          style={{
            width: isHovering ? 60 : 40,
            height: isHovering ? 60 : 40,
            marginLeft: isHovering ? -30 : -20,
            marginTop: isHovering ? -30 : -20,
            borderWidth: "1.5px",
            borderColor: isHovering
              ? "rgba(245, 200, 66, 1)"
              : "rgba(245, 200, 66, 0.5)",
          }}
        />
      </div>
    </>
  )
}
