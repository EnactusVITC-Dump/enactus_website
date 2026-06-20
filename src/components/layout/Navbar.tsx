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
      <nav className="fixed top-0 left-0 right-0 z-[100] h-[100px] px-6 md:px-12 flex items-center justify-center pointer-events-none">
        <div className="flex items-center justify-between lg:justify-center w-full max-w-[1400px] mx-auto pointer-events-auto">
          {/* Spacer to push hamburger to right on mobile */}
          <div className="lg:hidden w-8" />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 bg-transparent">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative font-bebas text-[20px] font-bold uppercase tracking-[1.5px] transition-all duration-300 flex items-center justify-center group ${
                    isActive 
                      ? "bg-[#050505] text-white px-5 py-1.5" 
                      : "text-enactus-black hover:text-opacity-80 px-5 py-1.5"
                  }`}
                  data-cursor-hover
                >
                  {link.label}
                  {isActive ? (
                    <>
                      {/* Top Left Bracket */}
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.5, x: 2, y: 2 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute top-0 left-0 w-[6px] h-[6px] border-t-2 border-l-2 border-white"
                      ></motion.span>
                      {/* Top Right Bracket */}
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.5, x: -2, y: 2 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute top-0 right-0 w-[6px] h-[6px] border-t-2 border-r-2 border-white"
                      ></motion.span>
                      {/* Bottom Left Bracket */}
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.5, x: 2, y: -2 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute bottom-0 left-0 w-[6px] h-[6px] border-b-2 border-l-2 border-white"
                      ></motion.span>
                      {/* Bottom Right Bracket */}
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.5, x: -2, y: -2 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute bottom-0 right-0 w-[6px] h-[6px] border-b-2 border-r-2 border-white"
                      ></motion.span>
                    </>
                  ) : (
                    /* Floating hover underdot for inactive items */
                    <span className="absolute bottom-[-3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-enactus-black opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-[-1px] transition-all duration-300 ease-out" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden text-enactus-black"
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
