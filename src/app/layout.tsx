import type { Metadata } from "next"
import { Bebas_Neue, Syne, DM_Sans } from "next/font/google"
import "./globals.css"
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider"
import Navbar from "@/components/layout/Navbar"
import CustomCursor from "@/components/layout/CustomCursor"
import GlobalBackground from "@/components/layout/GlobalBackground"
import GlobalFrame from "@/components/layout/GlobalFrame"

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
      <body className="font-dm-sans bg-enactus-black text-enactus-white antialiased">
        <SmoothScrollProvider>
          <GlobalBackground />
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
