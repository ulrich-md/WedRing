"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_CALM } from "@/lib/motion";

/**
 * Intro cinematográfico, pero CALMADO.
 * Los primeros segundos marcan el tono (lección del documento), así que en
 * vez de un contador frenético, dejamos que el anillo se dibuje solo y un
 * panel de marfil se retire con suavidad para revelar la app.
 * Se muestra una sola vez por sesión y respeta prefers-reduced-motion.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Ya se vio en esta sesión del navegador → no volver a mostrar.
    if (typeof window !== "undefined" && sessionStorage.getItem("wedring.intro")) {
      setDone(true);
      return;
    }
    const t = setTimeout(
      () => {
        setDone(true);
        try {
          sessionStorage.setItem("wedring.intro", "1");
        } catch {
          /* sin problema */
        }
      },
      reduce ? 200 : 1700,
    );
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ivory"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: EASE_CALM }}
        >
          <motion.svg
            width="72"
            height="72"
            viewBox="0 0 48 48"
            fill="none"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE_CALM }}
          >
            <motion.circle
              cx="19"
              cy="24"
              r="11"
              stroke="rgb(var(--sage-500))"
              strokeWidth="1.6"
              pathLength={1}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, ease: EASE_CALM }}
            />
            <motion.circle
              cx="29"
              cy="24"
              r="11"
              stroke="rgb(var(--gold))"
              strokeWidth="1.6"
              pathLength={1}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, ease: EASE_CALM, delay: 0.18 }}
            />
          </motion.svg>

          <motion.span
            className="mt-5 font-serif text-2xl tracking-tight text-ink"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_CALM, delay: 0.4 }}
          >
            wed<span className="text-sage-600">Ring</span>
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
