"use client";

import { Check, Sparkles } from "lucide-react";
import { SectionReveal } from "@/components/landing/SectionReveal";
import { SectionHeading, SoftGlow } from "@/components/landing/SectionBits";

const FREE = [
  "RSVP por WhatsApp",
  "Invitados ilimitados",
  "Tu web de boda",
  "Tablero, presupuesto y checklist",
  "Padrinos y proveedores",
];

const PRO = [
  "Extras no esenciales para quien los quiera",
  "Más personalización de tu web",
  "Herramientas avanzadas de planeación",
];

export function Pricing() {
  return (
    <section id="precio" className="relative scroll-mt-24 px-5 py-24 sm:px-8">
      <SoftGlow />
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Gratis y generoso"
          title={
            <>
              Lo esencial es gratis.{" "}
              <span className="italic text-sage-600">Para siempre.</span>
            </>
          }
          subtitle="El RSVP, los invitados ilimitados y tu web de boda son siempre gratis. Nada del núcleo se esconde detrás de un muro de pago."
        />

        <div className="mt-14 grid items-stretch gap-5 md:grid-cols-2">
          {/* Gratis — destacado */}
          <SectionReveal>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[1.7rem] border border-sage-300 bg-gradient-to-br from-sage-50 to-card p-8 shadow-lift">
              <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-gold-soft/60 px-3 py-1 font-sans text-[0.66rem] font-semibold uppercase tracking-wide text-gold-deep">
                <Sparkles size={12} /> Siempre gratis
              </span>
              <h3 className="font-serif text-2xl text-ink">Gratis</h3>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="font-serif text-5xl text-sage-600">$0</span>
                <span className="font-sans text-sm text-ink-faint">/ siempre</span>
              </div>
              <p className="mt-2 font-sans text-sm text-ink-soft">
                Todo lo que necesitas para tu boda.
              </p>
              <ul className="mt-6 space-y-3.5">
                {FREE.map((t) => (
                  <li key={t} className="flex items-center gap-3 font-sans text-ink">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sage-600 text-ivory">
                      <Check size={12} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <a
                href="#lista"
                className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-sage-600 px-6 font-sans font-medium text-ivory shadow-calm transition-colors duration-[250ms] ease-calm hover:bg-sage-700"
              >
                Apúntate a la lista
              </a>
            </div>
          </SectionReveal>

          {/* Pro */}
          <SectionReveal delay={0.08}>
            <div className="flex h-full flex-col rounded-[1.7rem] border border-line bg-card p-8 transition-all duration-[250ms] ease-calm hover:-translate-y-0.5 hover:shadow-calm">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl text-ink">Pro</h3>
                <span className="rounded-full bg-ivory-deep px-3 py-1 font-sans text-xs font-medium uppercase tracking-wide text-ink-faint">
                  Próximamente
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="font-serif text-5xl text-ink-faint">—</span>
              </div>
              <p className="mt-2 font-sans text-sm text-ink-soft">
                Opcional, para quien quiera ir más allá.
              </p>
              <ul className="mt-6 space-y-3.5">
                {PRO.map((t) => (
                  <li key={t} className="flex items-center gap-3 font-sans text-ink-soft">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sage-50 text-sage-500">
                      <Check size={12} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-8 font-sans text-sm text-ink-faint">
                Definiremos el precio con calma y honestidad antes de lanzarlo.
              </p>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
