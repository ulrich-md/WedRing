"use client";

import { X, Check, ArrowRight } from "lucide-react";
import { SectionReveal } from "@/components/landing/SectionReveal";
import { SectionHeading, SoftGlow } from "@/components/landing/SectionBits";

const CHAOS = [
  "Invitaciones que nadie contesta",
  "Hojas de cálculo imposibles de mantener",
  "No saber cuánto llevas gastado",
  "Mil apps, grupos y notas sueltas",
];

const CALM = [
  "RSVP por WhatsApp que sí contestan",
  "Tu lista de invitados, siempre al día",
  "Presupuesto claro, sin sustos",
  "Todo en un solo lugar ordenado",
];

export function ChaosToCalm() {
  return (
    <section className="relative px-5 py-20 sm:px-8 sm:py-24">
      <SoftGlow />
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Del caos a la calma"
          title={
            <>
              Planear una boda no tiene
              <br className="hidden sm:block" /> que sentirse{" "}
              <span className="italic text-sage-600">así.</span>
            </>
          }
        />

        <div className="relative mt-14 grid items-stretch gap-5 md:grid-cols-2">
          {/* Sin wedRing */}
          <SectionReveal>
            <div className="h-full rounded-[1.7rem] border border-line bg-ivory-deep/60 p-8">
              <p className="font-sans text-xs font-semibold uppercase tracking-eyebrow text-ink-faint">
                Sin wedRing
              </p>
              <ul className="mt-6 space-y-4">
                {CHAOS.map((t) => (
                  <li key={t} className="flex items-center gap-3 font-sans text-ink-soft">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-declined/12 text-declined">
                      <X size={14} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>

          {/* flecha central */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-line bg-card text-sage-600 shadow-lift">
              <ArrowRight size={20} />
            </span>
          </div>

          {/* Con wedRing */}
          <SectionReveal delay={0.08}>
            <div className="h-full rounded-[1.7rem] border border-sage-200 bg-gradient-to-br from-sage-50 to-card p-8 shadow-lift">
              <p className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-eyebrow text-sage-700">
                <Check size={13} className="text-sage-600" /> Con wedRing
              </p>
              <ul className="mt-6 space-y-4">
                {CALM.map((t) => (
                  <li key={t} className="flex items-center gap-3 font-sans font-medium text-ink">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sage-600 text-ivory shadow-calm">
                      <Check size={14} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
