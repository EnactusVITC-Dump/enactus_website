"use client"

import { PoemAnimation } from "@/components/ui/3d-animation"

const repeatedText = Array(100).fill("<span>OUR</span> EVENTS ").join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");

const ANIMATION_DATA = {
    poemHTML: `<p>${repeatedText}</p>`,
    backgroundImageUrl: "https://i.ibb.co/q3XSxR9W/20250831-120144.jpg",
    boyImageUrl: "" // Removed people as requested
};

export default function EventsHero() {
  return (
    <PoemAnimation
        poemHTML={ANIMATION_DATA.poemHTML}
        backgroundImageUrl={ANIMATION_DATA.backgroundImageUrl}
        boyImageUrl={ANIMATION_DATA.boyImageUrl}
    />
  )
}
