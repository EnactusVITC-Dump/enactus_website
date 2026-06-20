"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "EVENTS", href: "/events" },
  { label: "PROJECTS", href: "/projects" },
  { label: "TEAM", href: "/team" },
  { label: "COLLABS", href: "/collaborations" },
  { label: "ABOUT US", href: "/about" },
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-6 pointer-events-none">
        <div className="flex items-center justify-center max-w-[1200px] mx-auto pointer-events-auto">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 border-2 border-enactus-black px-6 py-2 rounded-[12px] bg-transparent">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`font-syne text-[14px] font-bold uppercase tracking-[2px] transition-colors duration-300 flex items-center justify-center ${
                    isActive 
                      ? "border-2 border-enactus-black border-dashed px-4 py-1 text-enactus-black" 
                      : "text-enactus-black hover:opacity-70 px-4 py-1"
                  }`}
                  data-cursor-hover
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden text-enactus-black ml-auto"
            onClick={() => setIsMobileMenuOpen(true)}
            data-cursor-hover
            aria-label="Open menu"
          >
            <Menu size={32} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-gold flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-6 right-6 text-enactus-black"
              onClick={() => setIsMobileMenuOpen(false)}
              data-cursor-hover
              aria-label="Close menu"
            >
              <X size={32} />
            </button>

            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.5,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    className="font-bebas text-[48px] text-enactus-black hover:opacity-70 transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-cursor-hover
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
