import type { Metadata } from "next"
import { Bebas_Neue, Syne, DM_Sans } from "next/font/google"
import "./globals.css"
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider"
import Navbar from "@/components/layout/Navbar"
import CustomCursor from "@/components/layout/CustomCursor"

import GlobalFrame from "@/components/layout/GlobalFrame"
import ParticleField from "@/components/three/ParticleField"

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
  display: "swap",
})

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Enactus VIT Chennai | Entrepreneurial Action for Social Impact",
  description:
    "Enactus VIT Chennai is a student entrepreneurship & social impact club that uses entrepreneurial action to transform lives and shape a better, more sustainable world.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${syne.variable} ${dmSans.variable}`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Bagel+Fat+One&amp;family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,800;9..144,900&amp;family=Inter:wght@300;400;500;600&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap" rel="stylesheet" />
      </head>
      <body className="font-dm-sans bg-enactus-black text-enactus-white antialiased">
        <SmoothScrollProvider>

          <ParticleField />
          <CustomCursor />
          <GlobalFrame />
          <Navbar />
          
          {/* Main content sits inside the yellow frame */}
          <main className="relative z-[10] pt-[120px] px-[20px] pb-[20px] min-h-screen">
            <div className="bg-transparent rounded-t-[40px] overflow-hidden">
              {children}
            </div>
          </main>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}

