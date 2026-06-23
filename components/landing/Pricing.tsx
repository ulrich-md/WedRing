"use client";

import { Check } from "lucide-react";
import { SectionReveal } from "@/components/landing/SectionReveal";

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
    <section id="precio" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Gratis y generoso</p>
          <h2 className="mt-2 text-[2.1rem] leading-tight sm:text-[2.7rem]">
            Lo esencial es gratis. Para siempre.
          </h2>
          <p className="mt-4 font-sans text-lg text-ink-soft">
            El RSVP, los invitados ilimitados y tu web de boda son siempre
            gratis. Nada del núcleo se esconde detrás de un muro de pago.
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {/* Gratis */}
          <SectionReveal>
            <div className="flex h-full flex-col rounded-3xl border border-rosa-200 bg-rosa-50 p-8 shadow-calm">
              <div className="flex items-baseline justify-between">
                <h3 className="font-serif text-2xl text-ink">Gratis</h3>
                <span className="font-serif text-3xl text-rosa-600">$0</span>
              </div>
              <p className="mt-1 font-sans text-sm text-ink-soft">
                Todo lo que necesitas para tu boda.
              </p>
              <ul className="mt-6 space-y-3">
                {FREE.map((t) => (
                  <li key={t} className="flex items-center gap-3 font-sans text-ink">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rosa-600 text-cream">
                      <Check size={12} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <a
                href="#lista"
                className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-rosa-600 px-6 font-sans font-medium text-cream transition-colors duration-[250ms] ease-calm hover:bg-rosa-700"
              >
                Apúntate a la lista
              </a>
            </div>
          </SectionReveal>

          {/* Pro */}
          <SectionReveal delay={0.08}>
            <div className="flex h-full flex-col rounded-3xl border border-line bg-card p-8">
              <div className="flex items-baseline justify-between">
                <h3 className="font-serif text-2xl text-ink">Pro</h3>
                <span className="rounded-full bg-gold-soft/50 px-3 py-1 font-sans text-xs font-medium uppercase tracking-wide text-gold-deep">
                  Próximamente
                </span>
              </div>
              <p className="mt-1 font-sans text-sm text-ink-soft">
                Opcional, para quien quiera ir más allá.
              </p>
              <ul className="mt-6 space-y-3">
                {PRO.map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-3 font-sans text-ink-soft"
                  >
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rosa-50 text-rosa-500">
                      <Check size={12} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-8 font-sans text-sm text-ink-faint">
                Definiremos el precio con calma y con honestidad antes de
                lanzarlo.
              </p>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
