"use client";

import {
  Users,
  Wallet,
  ListChecks,
  Store,
  HeartHandshake,
  Globe,
  type LucideIcon,
} from "lucide-react";
import {
  SectionReveal,
  SectionRevealGroup,
  RevealChild,
} from "@/components/landing/SectionReveal";

interface Feature {
  icon: LucideIcon;
  title: string;
  body: string;
  wide?: boolean;
}

const FEATURES: Feature[] = [
  {
    icon: Users,
    title: "Invitados & RSVP",
    body: "Importa a tus invitados, fíltralos por estado y ve los totales claros, con acompañantes y menú.",
    wide: true,
  },
  {
    icon: Wallet,
    title: "Presupuesto",
    body: "Un total, gastos por categoría y una gráfica sencilla. Claridad tranquila sobre el dinero.",
  },
  {
    icon: ListChecks,
    title: "Checklist con cronograma",
    body: "Un plan guiado, mes a mes, para que siempre sepas qué sigue.",
  },
  {
    icon: Store,
    title: "Proveedores verificados",
    body: "Reales y a mano. Ordenados por lo que mejor te queda —nunca por quién pagó.",
  },
  {
    icon: HeartHandshake,
    title: "Padrinos",
    body: "Asígnalos por rol y lleva quién patrocina qué. Sus aportaciones se suman a tu presupuesto.",
  },
  {
    icon: Globe,
    title: "Tu web de boda",
    body: "Un sitio simple y bonito con los detalles y el RSVP. Siempre gratis.",
    wide: true,
  },
];

export function FeatureBento() {
  return (
    <section id="todo" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Todo en un lugar</p>
          <h2 className="mt-2 text-[2.1rem] leading-tight sm:text-[2.7rem]">
            Tu boda completa, sin abrumar.
          </h2>
          <p className="mt-4 font-sans text-lg text-ink-soft">
            Cada cosa importante a su tiempo. Una sola app, calmada y clara.
          </p>
        </SectionReveal>

        <SectionRevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <RevealChild
              key={f.title}
              className={f.wide ? "lg:col-span-2" : ""}
            >
              <article className="flex h-full flex-col rounded-3xl border border-line bg-card p-7 shadow-calm transition-all duration-[250ms] ease-calm hover:-translate-y-0.5 hover:border-sage-200 hover:shadow-lift">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-sage-50 text-sage-600">
                  <f.icon size={20} />
                </span>
                <h3 className="mt-5 font-serif text-xl text-ink">{f.title}</h3>
                <p className="mt-2 font-sans text-[0.95rem] leading-relaxed text-ink-soft">
                  {f.body}
                </p>
              </article>
            </RevealChild>
          ))}
        </SectionRevealGroup>
      </div>
    </section>
  );
}
