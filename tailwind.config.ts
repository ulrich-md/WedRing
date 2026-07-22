import type { Config } from "tailwindcss";

/**
 * wedRing — quiet luxury para planear tu boda con calma.
 * Paleta: marfil cálido, verde sage, dorado suave. Tipografía serif + sans humanista.
 * Tokens reales en globals.css (CSS variables); aquí solo los exponemos a Tailwind.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Definidos como canales RGB en globals.css para que los modificadores
        // de opacidad (bg-card/60, text-ink-faint/70…) funcionen siempre.
        ivory: {
          DEFAULT: "rgb(var(--ivory) / <alpha-value>)",
          deep: "rgb(var(--ivory-deep) / <alpha-value>)",
        },
        card: "rgb(var(--card) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        // verde sage (color de marca)
        sage: {
          50: "rgb(var(--sage-50) / <alpha-value>)",
          100: "rgb(var(--sage-100) / <alpha-value>)",
          200: "rgb(var(--sage-200) / <alpha-value>)",
          300: "rgb(var(--sage-300) / <alpha-value>)",
          400: "rgb(var(--sage-400) / <alpha-value>)",
          500: "rgb(var(--sage-500) / <alpha-value>)",
          600: "rgb(var(--sage-600) / <alpha-value>)",
          700: "rgb(var(--sage-700) / <alpha-value>)",
          800: "rgb(var(--sage-800) / <alpha-value>)",
          DEFAULT: "rgb(var(--sage-600) / <alpha-value>)",
        },
        // dorado suave (único acento decorativo)
        gold: {
          soft: "rgb(var(--gold-soft) / <alpha-value>)",
          DEFAULT: "rgb(var(--gold) / <alpha-value>)",
          deep: "rgb(var(--gold-deep) / <alpha-value>)",
        },
        // tinta cálida
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          soft: "rgb(var(--ink-soft) / <alpha-value>)",
          faint: "rgb(var(--ink-faint) / <alpha-value>)",
        },
        // estados (RSVP y demás), cálidos
        confirmed: "rgb(var(--state-confirmed) / <alpha-value>)",
        pending: "rgb(var(--state-pending) / <alpha-value>)",
        declined: "rgb(var(--state-declined) / <alpha-value>)",
        maybe: "rgb(var(--state-maybe) / <alpha-value>)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Mulish", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.18em",
      },
      borderRadius: {
        xl: "1.1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        // sombras tenues, nunca duras — todo debe respirar
        calm: "0 1px 2px rgba(58, 63, 53, 0.04), 0 12px 30px -18px rgba(58, 63, 53, 0.18)",
        lift: "0 2px 6px rgba(58, 63, 53, 0.05), 0 22px 50px -24px rgba(58, 63, 53, 0.26)",
      },
      transitionTimingFunction: {
        // UNA sola curva de easing en toda la app (lección del documento)
        calm: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-rise": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(0,-18px,0) scale(1.04)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-rise": "fade-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        float: "float 9s ease-in-out infinite",
        marquee: "marquee 38s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
