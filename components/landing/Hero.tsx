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
  Check,
} from "lucide-react";
import { EASE_CALM } from "@/lib/motion";
import { WaitlistForm } from "@/components/landing/WaitlistForm";
import { TableroMockup, RsvpPhoneMockup } from "@/components/landing/Mockups";
import { HeroBackground } from "@/components/landing/HeroBackground";
import { HeroVideo } from "@/components/landing/HeroVideo";

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
  const yMock = useTransform(scrollYProgress, [0, 1], [0, -90 * k]);
  const yPhone = useTransform(scrollYProgress, [0, 1], [0, -170 * k]);
  const yPol = useTransform(scrollYProgress, [0, 1], [0, -230 * k]);
  const yChip = useTransform(scrollYProgress, [0, 1], [0, -130 * k]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pt-32"
    >
      <HeroBackground />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.08fr]">
        {/* Copy */}
        <div className="relative z-10 text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_CALM }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-card/80 px-3.5 py-1.5 font-sans text-xs font-medium text-ink-soft shadow-calm backdrop-blur"
          >
            <MessageCircle size={13} className="text-sage-600" />
            La app para planear tu boda · vive en WhatsApp
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_CALM, delay: 0.05 }}
            className="mt-5 text-[clamp(2.7rem,7vw,4.8rem)] font-medium leading-[0.98] tracking-[-0.02em]"
          >
            Planea tu boda,
            <br />
            <span className="italic text-sage-600">sin el estrés.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_CALM, delay: 0.14 }}
            className="mx-auto mt-5 max-w-md font-sans text-lg leading-relaxed text-ink-soft lg:mx-0"
          >
            wedRing reúne tu boda en un solo lugar: confirma invitados con un
            link que compartes por WhatsApp, controla tu presupuesto, organiza a
            tus padrinos y encuentra proveedores verificados.
          </motion.p>

          <motion.div
            id="lista"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_CALM, delay: 0.22 }}
            className="mx-auto mt-7 max-w-md scroll-mt-28 lg:mx-0"
          >
            <WaitlistForm id="hero-wl" />
            <p className="mt-3 font-sans text-sm text-ink-faint">
              Estamos por abrir · el RSVP y tu web de boda siempre son gratis
            </p>
          </motion.div>

          {/* Diferenciadores */}
          <motion.ul
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_CALM, delay: 0.3 }}
            className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start"
          >
            {DIFFERENTIATORS.map((d) => (
              <li
                key={d.label}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-3 py-1.5 font-sans text-sm text-ink-soft backdrop-blur"
              >
                <d.icon size={14} className="text-sage-600" />
                {d.label}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Producto + elementos flotantes — entre lo primero que se ve */}
        <div className="relative mx-auto w-full max-w-xl">
          {/* navegador (principal) */}
          <motion.div style={{ y: yMock }} className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: reduce ? 0 : -1.5 }}
              animate={{ opacity: 1, y: 0, rotate: reduce ? 0 : -1.5 }}
              transition={{ duration: 1, ease: EASE_CALM, delay: 0.15 }}
              className="drop-shadow-[0_40px_80px_rgba(58,63,53,0.2)]"
            >
              <TableroMockup />
            </motion.div>
          </motion.div>

          {/* teléfono (RSVP web) asomándose */}
          <motion.div
            style={{ y: yPhone }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE_CALM, delay: 0.35 }}
            className="absolute -bottom-12 -right-2 z-20 hidden origin-bottom-right scale-[0.6] drop-shadow-[0_30px_60px_rgba(58,63,53,0.26)] sm:block"
          >
            <RsvpPhoneMockup />
          </motion.div>

          {/* video flotante: el beso de la pareja (animado desde la foto) */}
          <motion.div
            style={{ y: yPol }}
            initial={{ opacity: 0, scale: 0.9, rotate: reduce ? 0 : -5 }}
            animate={{ opacity: 1, scale: 1, rotate: reduce ? 0 : -5 }}
            transition={{ duration: 1, ease: EASE_CALM, delay: 0.45 }}
            className="absolute -left-8 -top-12 z-20 hidden w-[10.5rem] lg:block"
          >
            <HeroVideo />
          </motion.div>

          {/* chip flotante: confirmaciones */}
          <motion.div
            style={{ y: yChip }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE_CALM, delay: 0.55 }}
            className="absolute -right-4 -top-5 z-20 hidden items-center gap-2.5 rounded-2xl border border-line bg-card/90 px-3.5 py-2.5 shadow-lift backdrop-blur lg:flex"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-confirmed/15 text-confirmed">
              <Check size={16} />
            </span>
            <div className="text-left">
              <p className="font-serif text-base leading-none text-ink">84 sí</p>
              <p className="font-sans text-[0.66rem] text-ink-faint">
                confirmaron hoy
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
