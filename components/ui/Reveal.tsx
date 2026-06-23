"use client";

import { motion } from "framer-motion";
import { fadeRise, stagger } from "@/lib/motion";

/**
 * Aparecer calmado: el contenido sube apenas y se desvanece hacia adentro.
 * Úsalo para que cada pantalla "respire" al entrar, sin nunca distraer.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeRise}
      initial="hidden"
      animate="show"
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** Contenedor que revela a sus hijos <RevealItem> en cascada suave. */
export function RevealStagger({
  children,
  className,
  gap = 0.08,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={stagger(gap, delay)}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={fadeRise}>
      {children}
    </motion.div>
  );
}
