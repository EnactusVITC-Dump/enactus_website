import tailwindcssAnimate from "tailwindcss-animate";
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
        "sunset-peach": "oklch(0.88 0.08 65 / <alpha-value>)",
        "sunset-coral": "oklch(0.74 0.16 38 / <alpha-value>)",
        "sunset-gold": "oklch(0.82 0.14 78 / <alpha-value>)",
        "sunset-lavender": "oklch(0.55 0.10 320 / <alpha-value>)",
        "wave-foam": "oklch(0.95 0.02 200 / <alpha-value>)",
        "wave-teal": "oklch(0.62 0.08 200 / <alpha-value>)",
        "wave-deep": "oklch(0.42 0.08 230 / <alpha-value>)",
        "ocean-indigo": "oklch(0.25 0.07 255 / <alpha-value>)",
        "ocean-abyss": "oklch(0.12 0.05 255 / <alpha-value>)",
        "bio-cyan": "oklch(0.82 0.16 200 / <alpha-value>)",
        pearl: "oklch(0.96 0.02 90 / <alpha-value>)",
        border: "oklch(1 0 0 / 0.1)",
        input: "oklch(1 0 0 / 0.12)",
        ring: "oklch(0.72 0.16 200 / <alpha-value>)",
        background: "oklch(0.16 0.04 250 / <alpha-value>)",
        foreground: "oklch(0.97 0.01 90 / <alpha-value>)",
        primary: {
          DEFAULT: "oklch(0.78 0.14 55 / <alpha-value>)",
          foreground: "oklch(0.18 0.04 250 / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "oklch(0.32 0.06 230 / <alpha-value>)",
          foreground: "oklch(0.97 0.01 90 / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "oklch(0.58 0.22 27 / <alpha-value>)",
          foreground: "oklch(0.98 0 0 / <alpha-value>)",
        },
        muted: {
          DEFAULT: "oklch(0.28 0.04 240 / <alpha-value>)",
          foreground: "oklch(0.75 0.03 230 / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(0.72 0.16 200 / <alpha-value>)",
          foreground: "oklch(0.16 0.04 250 / <alpha-value>)",
        },
        popover: {
          DEFAULT: "oklch(0.22 0.05 250 / <alpha-value>)",
          foreground: "oklch(0.97 0.01 90 / <alpha-value>)",
        },
        card: {
          DEFAULT: "oklch(0.22 0.05 250 / <alpha-value>)",
          foreground: "oklch(0.97 0.01 90 / <alpha-value>)",
        },
      },
      fontFamily: {
        bebas: ["var(--font-bebas-neue)", "sans-serif"],
        syne: ["var(--font-syne)", "sans-serif"],
        "dm-sans": ["var(--font-dm-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
        handwritten: ["var(--font-handwritten)", "cursive"],
        sans: ["var(--font-sans)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        display: ["var(--font-display)", "serif"],
        distressed: ["var(--font-distressed)", "monospace"],
        choco: ["var(--font-choco)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
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
  plugins: [tailwindcssAnimate],
};

export default config;

