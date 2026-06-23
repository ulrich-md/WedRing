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
  /** clases del "bubble" del icono (referencia: Meet the Squad de OLIPOP) */
  bubble: string;
  wide?: boolean;
}

const FEATURES: Feature[] = [
  {
    icon: Users,
    title: "Invitados & RSVP",
    body: "Importa a tus invitados, fíltralos por estado y ve los totales claros, con acompañantes y menú.",
    bubble: "bg-rosa-500 text-white",
    wide: true,
  },
  {
    icon: Wallet,
    title: "Presupuesto",
    body: "Un total, gastos por categoría y una gráfica sencilla. Claridad sobre el dinero, sin sustos.",
    bubble: "bg-sol-400 text-ink",
  },
  {
    icon: ListChecks,
    title: "Checklist con cronograma",
    body: "Un plan guiado, mes a mes, para que siempre sepas qué sigue.",
    bubble: "bg-agua-500 text-white",
  },
  {
    icon: Store,
    title: "Proveedores verificados",
    body: "Reales y a mano. Ordenados por lo que mejor te queda —nunca por quién pagó.",
    bubble: "bg-coral-500 text-white",
  },
  {
    icon: HeartHandshake,
    title: "Padrinos",
    body: "Asígnalos por rol y lleva quién patrocina qué. Sus aportaciones se suman a tu presupuesto.",
    bubble: "bg-rosa-500 text-white",
  },
  {
    icon: Globe,
    title: "Tu web de boda",
    body: "Un sitio simple y bonito con los detalles y el RSVP. Siempre gratis.",
    bubble: "bg-agua-500 text-white",
    wide: true,
  },
];

export function FeatureBento() {
  return (
    <section id="todo" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Conoce al escuadrón</p>
          <h2 className="mt-2 text-[2.2rem] font-semibold leading-tight sm:text-[2.9rem]">
            Tu boda completa, <span className="text-fiesta">sin abrumar.</span>
          </h2>
          <p className="mt-4 font-sans text-lg text-ink-soft">
            Cada cosa importante a su tiempo. Una sola app, clara y divertida.
          </p>
        </SectionReveal>

        <SectionRevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <RevealChild key={f.title} className={f.wide ? "lg:col-span-2" : ""}>
              <article className="group flex h-full flex-col rounded-[1.7rem] border border-line bg-card p-7 shadow-calm transition-all duration-[250ms] ease-calm hover:-translate-y-1 hover:shadow-lift">
                <span
                  className={
                    "grid h-14 w-14 place-items-center rounded-full shadow-calm transition-transform duration-[250ms] ease-calm group-hover:scale-110 " +
                    f.bubble
                  }
                >
                  <f.icon size={24} />
                </span>
                <h3 className="mt-5 font-serif text-xl font-semibold text-ink">
                  {f.title}
                </h3>
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
