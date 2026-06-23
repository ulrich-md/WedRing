// Dirección de movimiento de wedRing.
// Una sola curva de easing en TODA la app; las duraciones escalan con el
// tamaño del elemento (UI pequeña = rápida, transiciones grandes = lentas).
// Inspirado en la disciplina de "Color & Motion Direction" del documento,
// pero aplicado con calma: nada agresivo, nada que distraiga.

import type { Transition, Variants } from "framer-motion";

export const EASE_CALM = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.25,
  base: 0.5,
  slow: 0.85,
} as const;

export const transitionCalm: Transition = {
  duration: DURATION.base,
  ease: EASE_CALM,
};

/** Aparecer subiendo apenas — el gesto base de toda la app. */
export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_CALM },
  },
};

/** Contenedor que revela a sus hijos en cascada suave (stagger). */
export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: gap, delayChildren: delay },
  },
});
