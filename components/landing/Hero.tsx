"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import { EASE_CALM } from "@/lib/motion";
import { WaitlistForm } from "@/components/landing/WaitlistForm";
import { TableroMockup } from "@/components/landing/Mockups";

const CHIPS = [
  { label: "RSVP por WhatsApp", color: "bg-rosa-100 text-rosa-700" },
  { label: "Invitados", color: "bg-agua-100 text-agua-600" },
  { label: "Presupuesto", color: "bg-sol-100 text-coral-600" },
  { label: "Padrinos", color: "bg-coral-100 text-coral-600" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);

  return (
    <section
      ref={ref}
      className="relative px-5 pb-10 pt-28 sm:px-8 sm:pt-32"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.06fr_1fr]">
        {/* Copy */}
        <div className="relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_CALM }}
            className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-sans text-xs font-semibold text-rosa-700 shadow-calm"
          >
            <Sparkles size={13} className="text-coral-500" />
            La app mexicana para tu boda
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_CALM, delay: 0.05 }}
            className="mt-5 text-[2.9rem] font-semibold leading-[0.98] sm:text-[4.2rem]"
          >
            Tu boda, en orden.
            <br />
            <span className="text-fiesta italic">Con pura buena vibra.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_CALM, delay: 0.12 }}
            className="mt-5 max-w-lg font-sans text-lg leading-relaxed text-ink-soft"
          >
            wedRing es donde planeas tu boda sin estrés: confirma invitados por
            WhatsApp, lleva tu presupuesto, tus padrinos y tu checklist —todo en
            un solo lugar, y gratis.
          </motion.p>

          {/* chips: qué hace, de un vistazo */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_CALM, delay: 0.18 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {CHIPS.map((c) => (
              <span
                key={c.label}
                className={
                  "rounded-full px-3 py-1.5 font-sans text-sm font-medium " +
                  c.color
                }
              >
                {c.label}
              </span>
            ))}
          </motion.div>

          <motion.div
            id="lista"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_CALM, delay: 0.24 }}
            className="mt-7 max-w-md scroll-mt-28"
          >
            <WaitlistForm id="hero-wl" />
            <div className="mt-3 flex items-center gap-2 font-sans text-sm text-ink-faint">
              <MessageCircle size={15} className="text-confirmed" />
              Estamos por abrir · el RSVP y tu web de boda siempre son gratis
            </div>
            <a
              href="#corazon"
              className="mt-4 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-rosa-600 transition-colors duration-[250ms] ease-calm hover:text-rosa-700"
            >
              Ver cómo funciona
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>

        {/* Mockup flotante en vidrio + burbujas */}
        <motion.div style={{ y }} className="relative">
          <motion.div
            initial={{ opacity: 0, y: 26, rotate: reduce ? 0 : -2 }}
            animate={{ opacity: 1, y: 0, rotate: reduce ? 0 : -1.5 }}
            transition={{ duration: 0.9, ease: EASE_CALM, delay: 0.15 }}
            className="relative mx-auto max-w-md"
          >
            {/* burbujas decorativas */}
            <span className="absolute -left-6 -top-6 h-16 w-16 rounded-full bg-sol-400/80 blur-[2px]" />
            <span className="absolute -right-5 top-1/3 h-10 w-10 rounded-full bg-agua-400/80" />
            <span className="absolute -bottom-5 left-10 h-12 w-12 rounded-full bg-coral-400/80 blur-[1px]" />

            <div className="glass rounded-[1.7rem] p-3 shadow-glow">
              <TableroMockup />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
