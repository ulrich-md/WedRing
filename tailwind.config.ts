import type { Config } from "tailwindcss";

/**
 * wedRing — identidad festiva y muy mexicana.
 * Rosa mexicano (marca) + cempasúchil (coral) + talavera (agua) + sol.
 * Tokens reales en globals.css (canales RGB); aquí los exponemos a Tailwind
 * con el placeholder <alpha-value> para que la opacidad funcione siempre.
 */
const rgb = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: rgb("--cream"), deep: rgb("--cream-deep") },
        card: rgb("--card"),
        line: rgb("--line"),
        rosa: {
          50: rgb("--rosa-50"),
          100: rgb("--rosa-100"),
          200: rgb("--rosa-200"),
          300: rgb("--rosa-300"),
          400: rgb("--rosa-400"),
          500: rgb("--rosa-500"),
          600: rgb("--rosa-600"),
          700: rgb("--rosa-700"),
          800: rgb("--rosa-800"),
          DEFAULT: rgb("--rosa-500"),
        },
        coral: {
          50: rgb("--coral-50"),
          100: rgb("--coral-100"),
          300: rgb("--coral-300"),
          400: rgb("--coral-400"),
          500: rgb("--coral-500"),
          600: rgb("--coral-600"),
          DEFAULT: rgb("--coral-500"),
        },
        agua: {
          50: rgb("--agua-50"),
          100: rgb("--agua-100"),
          300: rgb("--agua-300"),
          400: rgb("--agua-400"),
          500: rgb("--agua-500"),
          600: rgb("--agua-600"),
          DEFAULT: rgb("--agua-500"),
        },
        sol: {
          100: rgb("--sol-100"),
          300: rgb("--sol-300"),
          400: rgb("--sol-400"),
          500: rgb("--sol-500"),
          DEFAULT: rgb("--sol-400"),
        },
        gold: {
          soft: rgb("--gold-soft"),
          DEFAULT: rgb("--gold"),
          deep: rgb("--gold-deep"),
        },
        ink: {
          DEFAULT: rgb("--ink"),
          soft: rgb("--ink-soft"),
          faint: rgb("--ink-faint"),
        },
        confirmed: rgb("--state-confirmed"),
        pending: rgb("--state-pending"),
        declined: rgb("--state-declined"),
        maybe: rgb("--state-maybe"),
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Fraunces", "Georgia", "serif"],
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
        calm: "0 1px 2px rgba(43, 34, 48, 0.04), 0 14px 34px -18px rgba(167, 12, 84, 0.22)",
        lift: "0 2px 6px rgba(43, 34, 48, 0.06), 0 28px 60px -26px rgba(167, 12, 84, 0.34)",
        glow: "0 18px 50px -16px rgba(233, 30, 121, 0.45)",
      },
      transitionTimingFunction: {
        calm: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-rise": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(0,-22px,0) scale(1.05)" },
        },
        drift: {
          "0%": { transform: "translate3d(0,0,0)" },
          "33%": { transform: "translate3d(28px,-18px,0)" },
          "66%": { transform: "translate3d(-22px,14px,0)" },
          "100%": { transform: "translate3d(0,0,0)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.9" },
        },
      },
      animation: {
        "fade-rise": "fade-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        float: "float 9s ease-in-out infinite",
        drift: "drift 22s ease-in-out infinite",
        shimmer: "shimmer 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
