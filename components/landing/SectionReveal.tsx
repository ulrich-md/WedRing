"use client";

import { motion } from "framer-motion";
import { EASE_CALM } from "@/lib/motion";

/**
 * Aparecer al hacer scroll (una sola vez). Storytelling sereno: el contenido
 * sube apenas cuando entra en pantalla. framer-motion ya respeta
 * prefers-reduced-motion saltando los transforms.
 */
export function SectionReveal({
  children,
  className,
  delay = 0,
  y = 18,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: EASE_CALM, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Variante en cascada para grupos (bento, listas de features). */
export function SectionRevealGroup({
  children,
  className,
  gap = 0.09,
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealChild({
  children,
  className,
  y = 18,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_CALM } },
      }}
    >
      {children}
    </motion.div>
  );
}
