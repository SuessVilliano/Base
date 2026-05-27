import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // BASE palette — values resolve from CSS variables defined in
        // globals.css so they flip with the .dark class on <html>.
        base: {
          black: "rgb(var(--c-base-black) / <alpha-value>)",
          ink: "rgb(var(--c-base-ink) / <alpha-value>)",
          smoke: "rgb(var(--c-base-smoke) / <alpha-value>)",
          ash: "rgb(var(--c-base-ash) / <alpha-value>)",
          stone: "rgb(var(--c-base-stone) / <alpha-value>)",
          fog: "rgb(var(--c-base-fog) / <alpha-value>)",
          paper: "rgb(var(--c-base-paper) / <alpha-value>)",
          white: "rgb(var(--c-base-white) / <alpha-value>)",
          // Strong blue accent from BASE deck (constant across themes)
          blue: {
            DEFAULT: "#1E5BFF",
            50: "#EAF0FF",
            100: "#D0DDFF",
            200: "#A4BCFF",
            300: "#789BFF",
            400: "#4C7BFF",
            500: "#1E5BFF",
            600: "#0A41D9",
            700: "#0833A9",
            800: "#062576",
            900: "#031849",
          },
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.06em",
      },
      backgroundImage: {
        "grid-light":
          "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
        "grid-dark":
          "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
        "radial-spot":
          "radial-gradient(circle at 50% 50%, rgba(30,91,255,0.18) 0%, transparent 60%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.7" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        shimmer: "shimmer 2.4s linear infinite",
        marquee: "marquee 28s linear infinite",
        "pulse-soft": "pulse-soft 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
