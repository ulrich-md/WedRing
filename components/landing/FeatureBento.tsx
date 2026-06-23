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
  SectionRevealGroup,
  RevealChild,
} from "@/components/landing/SectionReveal";
import { SectionHeading, SoftGlow } from "@/components/landing/SectionBits";

interface Feature {
  icon: LucideIcon;
  title: string;
  body: string;
  wide?: boolean;
  extra?: React.ReactNode;
}

function Avatars() {
  const tones = [
    "bg-sage-300 text-sage-800",
    "bg-gold/90 text-ink",
    "bg-sage-600 text-ivory",
    "bg-sage-100 text-sage-700",
  ];
  return (
    <div className="mt-5 flex items-center gap-2">
      <div className="flex -space-x-2">
        {["A", "R", "L", "M"].map((c, i) => (
          <span
            key={c}
            className={
              "grid h-7 w-7 place-items-center rounded-full ring-2 ring-card font-sans text-[0.62rem] font-bold " +
              tones[i]
            }
          >
            {c}
          </span>
        ))}
      </div>
      <span className="font-sans text-sm text-ink-faint">+80 confirmados</span>
    </div>
  );
}

const FEATURES: Feature[] = [
  {
    icon: Users,
    title: "Invitados & RSVP",
    body: "Importa a tus invitados, fíltralos por estado y ve los totales claros, con acompañantes y menú.",
    wide: true,
    extra: <Avatars />,
  },
  {
    icon: Wallet,
    title: "Presupuesto",
    body: "Un total, gastos por categoría y una gráfica sencilla. Claridad sobre el dinero, sin sustos.",
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
    extra: (
      <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-ivory/60 px-3 py-1.5 font-sans text-sm text-ink-soft">
        <Globe size={13} className="text-sage-600" /> wedring.app/sofia-y-mateo
      </span>
    ),
  },
];

export function FeatureBento() {
  return (
    <section id="todo" className="relative scroll-mt-24 px-5 py-24 sm:px-8">
      <SoftGlow />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Todo en un lugar"
          title={
            <>
              Tu boda completa,{" "}
              <span className="italic text-sage-600">sin abrumar.</span>
            </>
          }
          subtitle="Cada cosa importante a su tiempo. Una sola app, calmada y clara."
        />

        <SectionRevealGroup className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <RevealChild key={f.title} className={f.wide ? "lg:col-span-2" : ""}>
              <article className="group flex h-full flex-col rounded-[1.7rem] border border-line bg-card p-7 shadow-calm transition-all duration-[250ms] ease-calm hover:-translate-y-1 hover:border-sage-200 hover:shadow-lift">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-sage-100 to-sage-50 text-sage-600 ring-1 ring-sage-100 transition-transform duration-[250ms] ease-calm group-hover:scale-105">
                  <f.icon size={21} />
                </span>
                <h3 className="mt-5 font-serif text-xl text-ink">{f.title}</h3>
                <p className="mt-2 max-w-sm font-sans text-[0.95rem] leading-relaxed text-ink-soft">
                  {f.body}
                </p>
                {f.extra}
              </article>
            </RevealChild>
          ))}
        </SectionRevealGroup>
      </div>
    </section>
  );
}
