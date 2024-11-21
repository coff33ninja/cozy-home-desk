import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        'dynamic-xs': 'clamp(0.75rem, 1vw, 0.875rem)',
        'dynamic-sm': 'clamp(0.875rem, 1.2vw, 1rem)',
        'dynamic-base': 'clamp(1rem, 1.5vw, 1.125rem)',
        'dynamic-lg': 'clamp(1.125rem, 2vw, 1.25rem)',
        'dynamic-xl': 'clamp(1.25rem, 2.5vw, 1.5rem)',
        'dynamic-2xl': 'clamp(1.5rem, 3vw, 2rem)',
      },
      spacing: {
        'dynamic-1': 'clamp(0.25rem, 0.5vw, 0.5rem)',
        'dynamic-2': 'clamp(0.5rem, 1vw, 1rem)',
        'dynamic-4': 'clamp(1rem, 2vw, 2rem)',
        'dynamic-8': 'clamp(2rem, 4vw, 4rem)',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#111111",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "#9b87f5",
          light: "#E5DEFF",
        },
        category: {
          work: "#F2FCE2",
          entertainment: "#FEF7CD",
          social: "#FEC6A1",
          productivity: "#E5DEFF",
        },
        dark: {
          DEFAULT: "#111111",
          card: "#1a1a1a",
          border: "#333333",
        },
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;