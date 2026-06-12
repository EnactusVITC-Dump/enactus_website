import { Metadata } from "next"
import EventsHero from "@/components/sections/EventsHero"
import EventsGrid from "@/components/sections/EventsGrid"
import Footer from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "Events | Enactus VIT Chennai",
  description: "Where entrepreneurship meets experience. Check out our upcoming and past events.",
}

export default function EventsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <EventsHero />
      <EventsGrid />
      <Footer />
    </div>
  )
}
