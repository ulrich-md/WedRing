"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Scroll suave estilo "buttery" (lección del documento, vía Lenis), pero
 * calmado. Se desactiva por completo si la persona prefiere menos movimiento
 * — la calma también es accesibilidad.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      // misma sensación que nuestra curva de easing: salida suave
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
