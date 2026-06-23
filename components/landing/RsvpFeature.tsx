"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { Send, MousePointerClick, RefreshCw } from "lucide-react";
import { EASE_CALM } from "@/lib/motion";
import { RsvpPhoneMockup } from "@/components/landing/Mockups";
import { Polaroid } from "@/components/landing/Polaroid";
import { SectionReveal } from "@/components/landing/SectionReveal";
import { Eyebrow } from "@/components/landing/SectionBits";
import { COUPLE_PHOTOS } from "@/lib/photos";

const STEPS = [
  {
    icon: Send,
    title: "Compartes el link",
    body: "wedRing crea un link personal por invitado. Lo mandas por WhatsApp.",
  },
  {
    icon: MousePointerClick,
    title: "Confirman en segundos",
    body: "Sí, no o tal vez · cuántos van · qué van a comer. Sin apps, sin cuentas.",
  },
  {
    icon: RefreshCw,
    title: "Tu conteo se actualiza solo",
    body: "En vivo. Y con un toque, les recuerdas a quienes faltan.",
  },
];

export function RsvpFeature() {
  return (
    <section id="corazon" className="relative scroll-mt-24 px-5 py-24 sm:px-8 sm:py-28">
      {/* banda sage suave: es el corazón */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgb(var(--ivory)) 0%, rgb(var(--sage-50)) 45%, rgb(var(--ivory)) 100%)",
        }}
        aria-hidden
      />

      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1fr_1.05fr]">
        {/* escenario del teléfono */}
        <div className="order-2 lg:order-1">
          <SectionReveal className="relative mx-auto w-fit">
            {/* panel suave detrás */}
            <div className="absolute -inset-6 -z-10 rounded-[2.4rem] bg-gradient-to-br from-sage-100/80 to-gold-soft/30 blur-[2px]" />
            <RsvpPhoneMockup />

            {/* foto de pareja flotante */}
            <div className="absolute -bottom-6 -left-10 hidden w-[8.5rem] -rotate-6 sm:block">
              <Polaroid photo={COUPLE_PHOTOS[1]} />
            </div>
          </SectionReveal>
        </div>

        {/* copy */}
        <div className="order-1 lg:order-2">
          <SectionReveal>
            <Eyebrow>El corazón de wedRing</Eyebrow>
            <h2 className="mt-4 text-[clamp(2rem,4.6vw,3rem)] font-medium leading-[1.03] tracking-[-0.015em]">
              Confirma a todos por WhatsApp,{" "}
              <span className="italic text-sage-600">sin perseguir a nadie.</span>
            </h2>
            <p className="mt-4 max-w-md font-sans text-lg leading-relaxed text-ink-soft">
              En México casi nadie contesta una invitación de papel o correo. Por
              eso el RSVP de wedRing vive donde ya están tus invitados.
            </p>
          </SectionReveal>

          {/* pasos con línea conectora */}
          <div className="relative mt-9 space-y-6 before:absolute before:left-5 before:top-3 before:h-[calc(100%-2rem)] before:w-px before:bg-line">
            {STEPS.map((s, i) => (
              <SectionReveal key={s.title} delay={0.06 * i}>
                <div className="relative flex gap-4">
                  <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-card text-sage-600 shadow-calm">
                    <s.icon size={17} />
                  </span>
                  <div className="pt-1">
                    <p className="font-serif text-lg text-ink">{s.title}</p>
                    <p className="font-sans text-[0.95rem] leading-snug text-ink-soft">
                      {s.body}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.12}>
            <div className="mt-9 flex items-center gap-5 rounded-2xl border border-sage-200 bg-gradient-to-br from-sage-50 to-card px-6 py-5 shadow-calm">
              <p className="font-serif text-5xl leading-none text-sage-600">
                <CountUp to={84} />
              </p>
              <p className="font-sans text-sm leading-snug text-ink-soft">
                confirmados, de un vistazo —sin hojas de cálculo ni mensajes
                sueltos.
              </p>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

/** Cuenta ascendente al entrar en pantalla; respeta reduced-motion. */
function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.1,
      ease: EASE_CALM,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return <span ref={ref}>{val}</span>;
}
