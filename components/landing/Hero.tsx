"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { EASE_CALM } from "@/lib/motion";
import { WaitlistForm } from "@/components/landing/WaitlistForm";
import { TableroMockup } from "@/components/landing/Mockups";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // parallax sutil del mockup — el único "momento" de movimiento del hero
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-5 pb-16 pt-32 sm:px-8 sm:pt-36"
    >
      {/* lavado de color tenue, sage + dorado, nunca saturado */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(80% 55% at 50% -5%, rgba(194,163,107,0.14), transparent 60%), radial-gradient(70% 60% at 90% 20%, rgba(111,129,89,0.10), transparent 65%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        {/* Copy */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_CALM }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 font-sans text-xs font-medium text-ink-soft"
          >
            <MessageCircle size={13} className="text-sage-600" />
            Planea tu boda desde WhatsApp
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_CALM, delay: 0.05 }}
            className="mt-5 text-[2.7rem] leading-[1.04] sm:text-[3.6rem]"
          >
            Tu boda, en orden.
            <br />
            <span className="text-sage-600">Sin el estrés.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_CALM, delay: 0.12 }}
            className="mt-5 max-w-md font-sans text-lg leading-relaxed text-ink-soft"
          >
            wedRing es el hogar tranquilo donde planeas tu boda. Confirma
            invitados por WhatsApp, lleva tu presupuesto y tu checklist —todo en
            un solo lugar, a tu ritmo.
          </motion.p>

          <motion.div
            id="lista"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_CALM, delay: 0.2 }}
            className="mt-8 max-w-md scroll-mt-28"
          >
            <WaitlistForm id="hero-wl" />
            <p className="mt-3 font-sans text-sm text-ink-faint">
              Estamos por abrir. Déjanos tu correo y serás de las primeras en
              entrar —el RSVP y la web de boda siempre son gratis.
            </p>
          </motion.div>
        </div>

        {/* Mockup: parallax (capa externa) + entrada suave (capa interna),
            en elementos separados para que no choquen los transforms. */}
        <motion.div style={{ y }} className="relative">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_CALM, delay: 0.15 }}
          >
            <TableroMockup />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
