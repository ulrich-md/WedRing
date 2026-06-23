"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  MessageCircle,
  HeartHandshake,
  Store,
  Wallet,
  ChevronDown,
} from "lucide-react";
import { EASE_CALM } from "@/lib/motion";
import { WaitlistForm } from "@/components/landing/WaitlistForm";
import { TableroMockup, RsvpPhoneMockup } from "@/components/landing/Mockups";
import { HeroBackground } from "@/components/landing/HeroBackground";

const DIFFERENTIATORS = [
  { icon: MessageCircle, label: "RSVP por WhatsApp" },
  { icon: HeartHandshake, label: "Padrinos por rol" },
  { icon: Store, label: "Proveedores verificados" },
  { icon: Wallet, label: "Presupuesto claro" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const k = reduce ? 0 : 1;
  const yRing = useTransform(scrollYProgress, [0, 1], [0, -60 * k]);
  const yMock = useTransform(scrollYProgress, [0, 1], [0, -110 * k]);
  const yPhone = useTransform(scrollYProgress, [0, 1], [0, -180 * k]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center overflow-hidden px-5 pb-28 pt-28 sm:px-8 sm:pt-32"
    >
      <HeroBackground />

      {/* gran anillo, motivo de wedRing, sobre el sage oscuro */}
      <motion.svg
        style={{ y: yRing }}
        viewBox="0 0 48 48"
        fill="none"
        className="pointer-events-none absolute top-[6%] -z-10 h-[42rem] w-[42rem] opacity-[0.14] sm:h-[52rem] sm:w-[52rem]"
        aria-hidden
      >
        <circle cx="19" cy="24" r="11" stroke="rgb(var(--gold))" strokeWidth="0.45" />
        <circle cx="29" cy="24" r="11" stroke="rgb(var(--gold-soft))" strokeWidth="0.45" />
      </motion.svg>

      {/* Copy — claro y grande, sobre sage profundo */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_CALM }}
          className="inline-flex items-center gap-2 rounded-full border border-ivory/20 bg-ivory/10 px-4 py-1.5 font-sans text-xs font-medium uppercase tracking-eyebrow text-gold-soft backdrop-blur"
        >
          <MessageCircle size={13} />
          La app para planear tu boda · vive en WhatsApp
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_CALM, delay: 0.05 }}
          className="mt-6 text-[clamp(2.9rem,8.5vw,5.6rem)] font-medium leading-[0.98] tracking-[-0.02em] text-ivory"
        >
          Planea tu boda,
          <br />
          <span className="italic text-gold-soft">sin el estrés.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_CALM, delay: 0.14 }}
          className="mx-auto mt-6 max-w-xl font-sans text-lg leading-relaxed text-ivory/85 sm:text-xl"
        >
          wedRing reúne tu boda en un solo lugar: confirma invitados por
          WhatsApp, controla tu presupuesto, organiza a tus padrinos y encuentra
          proveedores verificados.
        </motion.p>

        <motion.div
          id="lista"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_CALM, delay: 0.22 }}
          className="mx-auto mt-8 max-w-md scroll-mt-28"
        >
          <WaitlistForm id="hero-wl" variant="dark" />
          <p className="mt-3 font-sans text-sm text-ivory/65">
            Estamos por abrir · el RSVP y tu web de boda siempre son gratis
          </p>
        </motion.div>

        {/* Diferenciadores — qué nos distingue, de un vistazo */}
        <motion.ul
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_CALM, delay: 0.3 }}
          className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-2.5"
        >
          {DIFFERENTIATORS.map((d) => (
            <li
              key={d.label}
              className="inline-flex items-center gap-2 rounded-full border border-ivory/15 bg-ivory/10 px-3.5 py-1.5 font-sans text-sm text-ivory backdrop-blur"
            >
              <d.icon size={14} className="text-gold" />
              {d.label}
            </li>
          ))}
        </motion.ul>
      </div>

      {/* Escenario flotante: mockups claros que resaltan sobre el sage */}
      <div className="relative mt-14 w-full max-w-4xl sm:mt-16">
        {/* resplandor dorado tras el producto */}
        <div className="pointer-events-none absolute inset-0 -z-10 mx-auto h-full max-w-2xl rounded-full bg-gold/15 blur-3xl" />

        <motion.div
          style={{ y: yMock }}
          initial={{ opacity: 0, y: 40, rotate: reduce ? 0 : -1.5 }}
          animate={{ opacity: 1, y: 0, rotate: reduce ? 0 : -1.5 }}
          transition={{ duration: 1, ease: EASE_CALM, delay: 0.2 }}
          className="relative z-10 mx-auto max-w-3xl drop-shadow-[0_40px_90px_rgba(20,28,14,0.5)]"
        >
          <TableroMockup />
        </motion.div>

        {/* teléfono asomándose — solo desktop */}
        <motion.div
          style={{ y: yPhone }}
          initial={{ opacity: 0, y: 60, rotate: reduce ? 0 : 6 }}
          animate={{ opacity: 1, y: 0, rotate: reduce ? 0 : 6 }}
          transition={{ duration: 1, ease: EASE_CALM, delay: 0.35 }}
          className="absolute -bottom-12 -right-1 z-20 hidden origin-bottom-right scale-[0.62] drop-shadow-[0_30px_70px_rgba(20,28,14,0.55)] lg:block"
        >
          <RsvpPhoneMockup />
        </motion.div>
      </div>

      {/* señal de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_CALM, delay: 0.6 }}
        className="mt-12 flex flex-col items-center gap-1 font-sans text-xs uppercase tracking-eyebrow text-ivory/55"
      >
        Descúbrelo
        <ChevronDown size={16} className="animate-bounce text-gold" />
      </motion.div>
    </section>
  );
}
