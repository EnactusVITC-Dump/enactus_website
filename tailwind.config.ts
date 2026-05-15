import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#F5C842",
          dim: "#C9A020",
        },
        enactus: {
          black: "#080808",
          "off-black": "#0E0E0E",
          gray: "#1A1A1A",
          white: "#F0ECE4",
        },
      },
      fontFamily: {
        bebas: ["var(--font-bebas-neue)", "sans-serif"],
        syne: ["var(--font-syne)", "sans-serif"],
        "dm-sans": ["var(--font-dm-sans)", "sans-serif"],
      },
      animation: {
        "marquee-left": "marquee-scroll 30s linear infinite",
        "marquee-right": "marquee-scroll 30s linear infinite reverse",
        "blob-drift-1": "blob-drift-1 22s ease-in-out infinite",
        "blob-drift-2": "blob-drift-2 28s ease-in-out infinite",
        "blob-drift-3": "blob-drift-3 18s ease-in-out infinite",
        "blob-drift-4": "blob-drift-4 32s ease-in-out infinite",
      },
      keyframes: {
        "marquee-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "blob-drift-1": {
          "0%, 100%": { transform: "translate(0, 0) scale(1) rotate(0deg)" },
          "33%": { transform: "translate(80px, -60px) scale(1.15) rotate(60deg)" },
          "66%": { transform: "translate(-40px, 40px) scale(0.9) rotate(120deg)" },
        },
        "blob-drift-2": {
          "0%, 100%": { transform: "translate(0, 0) scale(1) rotate(0deg)" },
          "25%": { transform: "translate(-70px, 50px) scale(1.1) rotate(-45deg)" },
          "50%": { transform: "translate(60px, -30px) scale(0.85) rotate(90deg)" },
          "75%": { transform: "translate(-30px, -50px) scale(1.05) rotate(180deg)" },
        },
        "blob-drift-3": {
          "0%, 100%": { transform: "translate(0, 0) scale(1) rotate(0deg)" },
          "50%": { transform: "translate(100px, 70px) scale(1.2) rotate(180deg)" },
        },
        "blob-drift-4": {
          "0%, 100%": { transform: "translate(0, 0) scale(1) rotate(0deg)" },
          "20%": { transform: "translate(50px, -80px) scale(0.95) rotate(40deg)" },
          "40%": { transform: "translate(-60px, -20px) scale(1.1) rotate(100deg)" },
          "60%": { transform: "translate(30px, 60px) scale(0.9) rotate(200deg)" },
          "80%": { transform: "translate(-40px, 30px) scale(1.05) rotate(280deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
