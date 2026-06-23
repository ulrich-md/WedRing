"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Send, MousePointerClick, RefreshCw } from "lucide-react";
import { EASE_CALM } from "@/lib/motion";
import { RsvpPhoneMockup } from "@/components/landing/Mockups";
import { SectionReveal } from "@/components/landing/SectionReveal";

const STEPS = [
  {
    icon: Send,
    title: "Envías el link",
    body: "Cada invitado recibe el suyo, personal, por WhatsApp.",
  },
  {
    icon: MousePointerClick,
    title: "Confirman en segundos",
    body: "Sí, no o tal vez · cuántos van · qué van a comer. Sin apps.",
  },
  {
    icon: RefreshCw,
    title: "Tu conteo se actualiza solo",
    body: "En vivo. Y con un toque, les recuerdas a quienes faltan.",
  },
];

export function RsvpFeature() {
  return (
    <section id="corazon" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
        {/* teléfono */}
        <SectionReveal className="order-2 lg:order-1">
          <RsvpPhoneMockup />
        </SectionReveal>

        {/* copy */}
        <div className="order-1 lg:order-2">
          <SectionReveal>
            <p className="eyebrow">El corazón de wedRing</p>
            <h2 className="mt-2 text-[2.2rem] leading-tight sm:text-[2.7rem]">
              Confirma a todos por WhatsApp, sin perseguir a nadie.
            </h2>
            <p className="mt-4 max-w-md font-sans text-lg leading-relaxed text-ink-soft">
              En México casi nadie contesta una invitación de papel o correo.
              Por eso el RSVP de wedRing vive donde ya están tus invitados.
            </p>
          </SectionReveal>

          <div className="mt-8 space-y-5">
            {STEPS.map((s, i) => (
              <SectionReveal key={s.title} delay={0.06 * i}>
                <div className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sage-50 text-sage-600">
                    <s.icon size={18} />
                  </span>
                  <div>
                    <p className="font-serif text-lg text-ink">{s.title}</p>
                    <p className="font-sans text-[0.95rem] leading-snug text-ink-soft">
                      {s.body}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.1}>
            <div className="mt-9 flex items-center gap-4 rounded-2xl border border-line bg-card px-6 py-5">
              <p className="font-serif text-4xl leading-none text-sage-600">
                <CountUp to={84} />
              </p>
              <p className="font-sans text-sm text-ink-soft">
                confirmados —de un vistazo, sin hojas de cálculo ni mensajes
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
