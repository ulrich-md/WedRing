"use client";

import { X, Check } from "lucide-react";
import { SectionReveal } from "@/components/landing/SectionReveal";

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
    <section className="px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Del caos a la calma</p>
          <h2 className="mt-2 text-[2rem] leading-tight sm:text-[2.5rem]">
            Planear una boda no tiene que sentirse así.
          </h2>
        </SectionReveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <SectionReveal>
            <div className="h-full rounded-3xl border border-line bg-ivory-deep/50 p-7">
              <p className="font-sans text-sm font-medium text-ink-faint">
                Sin wedRing
              </p>
              <ul className="mt-5 space-y-3.5">
                {CHAOS.map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-3 font-sans text-ink-soft"
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-declined/15 text-declined">
                      <X size={14} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.08}>
            <div className="h-full rounded-3xl border border-sage-200 bg-sage-50 p-7 shadow-calm">
              <p className="font-sans text-sm font-medium text-sage-700">
                Con wedRing
              </p>
              <ul className="mt-5 space-y-3.5">
                {CALM.map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-3 font-sans text-ink"
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sage-600 text-ivory">
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
