import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        base: {
          black: "#0A0A0B",
          ink: "#111114",
          smoke: "#1A1A1F",
          ash: "#2A2A30",
          stone: "#5C5C66",
          fog: "#A4A4AE",
          paper: "#F5F5F2",
          white: "#FFFFFF",
          // Strong blue accent from BASE deck
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
