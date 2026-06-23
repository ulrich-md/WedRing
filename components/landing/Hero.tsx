"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { MessageCircle, ChevronDown } from "lucide-react";
import { EASE_CALM } from "@/lib/motion";
import { WaitlistForm } from "@/components/landing/WaitlistForm";
import { TableroMockup, RsvpPhoneMockup } from "@/components/landing/Mockups";
import { HeroBackground } from "@/components/landing/HeroBackground";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // parallax por capas → profundidad (lección "layered" del skill, con calma)
  const k = reduce ? 0 : 1;
  const yRing = useTransform(scrollYProgress, [0, 1], [0, -60 * k]);
  const yMock = useTransform(scrollYProgress, [0, 1], [0, -120 * k]);
  const yPhone = useTransform(scrollYProgress, [0, 1], [0, -190 * k]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center overflow-hidden px-5 pt-28 sm:px-8 sm:pt-32"
    >
      <HeroBackground />

      {/* gran anillo — el motivo de wedRing, gigante y tenue, con parallax */}
      <motion.svg
        style={{ y: yRing }}
        viewBox="0 0 48 48"
        fill="none"
        className="pointer-events-none absolute top-[8%] -z-10 h-[44rem] w-[44rem] opacity-[0.10] sm:h-[56rem] sm:w-[56rem]"
        aria-hidden
      >
        <circle cx="19" cy="24" r="11" stroke="rgb(var(--sage-500))" strokeWidth="0.5" />
        <circle cx="29" cy="24" r="11" stroke="rgb(var(--gold))" strokeWidth="0.5" />
      </motion.svg>

      {/* Bloque de copy, centrado y grande */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_CALM }}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-4 py-1.5 font-sans text-xs font-medium text-ink-soft shadow-calm backdrop-blur"
        >
          <MessageCircle size={13} className="text-sage-600" />
          Planea tu boda desde WhatsApp
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_CALM, delay: 0.05 }}
          className="mt-6 text-[clamp(2.9rem,8.5vw,5.6rem)] font-medium leading-[0.98] tracking-[-0.02em]"
        >
          Tu boda, en orden.
          <br />
          <span className="italic text-sage-600">Sin el estrés.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_CALM, delay: 0.14 }}
          className="mx-auto mt-6 max-w-xl font-sans text-lg leading-relaxed text-ink-soft sm:text-xl"
        >
          El hogar tranquilo donde planeas tu boda: confirma invitados por
          WhatsApp, lleva tu presupuesto y tu checklist —todo en un solo lugar,
          a tu ritmo.
        </motion.p>

        <motion.div
          id="lista"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_CALM, delay: 0.22 }}
          className="mx-auto mt-8 max-w-md scroll-mt-28"
        >
          <WaitlistForm id="hero-wl" />
          <p className="mt-3 font-sans text-sm text-ink-faint">
            Estamos por abrir · el RSVP y tu web de boda siempre son gratis
          </p>
        </motion.div>
      </div>

      {/* Escenario flotante: navegador + teléfono, con profundidad */}
      <div className="relative mt-14 w-full max-w-4xl sm:mt-16">
        <motion.div
          style={{ y: yMock }}
          initial={{ opacity: 0, y: 40, rotate: reduce ? 0 : -1.5 }}
          animate={{ opacity: 1, y: 0, rotate: reduce ? 0 : -1.5 }}
          transition={{ duration: 1, ease: EASE_CALM, delay: 0.2 }}
          className="relative z-10 mx-auto max-w-3xl drop-shadow-[0_40px_80px_rgba(58,63,53,0.22)]"
        >
          <TableroMockup />
        </motion.div>

        {/* teléfono asomándose — solo desktop, da capas */}
        <motion.div
          style={{ y: yPhone }}
          initial={{ opacity: 0, y: 60, rotate: reduce ? 0 : 6 }}
          animate={{ opacity: 1, y: 0, rotate: reduce ? 0 : 6 }}
          transition={{ duration: 1, ease: EASE_CALM, delay: 0.35 }}
          className="absolute -bottom-10 -right-1 z-20 hidden origin-bottom-right scale-[0.62] drop-shadow-[0_30px_60px_rgba(58,63,53,0.28)] lg:block"
        >
          <RsvpPhoneMockup />
        </motion.div>
      </div>

      {/* señal de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_CALM, delay: 0.6 }}
        className="mt-12 flex flex-col items-center gap-1 pb-10 font-sans text-xs uppercase tracking-eyebrow text-ink-faint"
      >
        Descúbrelo
        <ChevronDown size={16} className="animate-bounce text-gold" />
      </motion.div>
    </section>
  );
}
