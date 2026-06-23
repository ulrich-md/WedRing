"use client";

import { RingMark } from "@/components/brand/RingMark";
import { SectionReveal } from "@/components/landing/SectionReveal";

const ITEMS = [
  {
    title: "Padrinos por rol",
    body: "De lazo, de anillos, de arras, de ramo. Con su registro y sus aportaciones.",
  },
  {
    title: "Pensado para haciendas",
    body: "Y para invitados internacionales: tu web de boda y el RSVP también en inglés.",
  },
  {
    title: "Vive en WhatsApp",
    body: "Donde ya estás. Nada de descargar apps que nadie abre.",
  },
  {
    title: "En español, de verdad",
    body: "No es una app gringa traducida. Habla como hablas tú.",
  },
];

export function MexicanSoul() {
  return (
    <section id="alma" className="scroll-mt-24 px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-sage-700 px-7 py-14 sm:px-14 sm:py-16">
        <SectionReveal className="max-w-2xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ivory/10">
              <RingMark size={24} />
            </span>
            <span className="font-sans text-sm font-medium uppercase tracking-eyebrow text-gold-soft">
              Con alma mexicana
            </span>
          </div>
          <h2 className="text-[2.1rem] leading-tight text-ivory sm:text-[2.6rem]">
            Lo que ninguna app gringa tiene.
          </h2>
          <p className="mt-4 max-w-lg font-sans text-lg text-sage-100/90">
            wedRing entiende cómo nos casamos aquí: de padrinos, de haciendas, de
            celebrar en grande y en familia.
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {ITEMS.map((it, i) => (
            <SectionReveal key={it.title} delay={0.05 * i}>
              <div className="border-l-2 border-gold/50 pl-5">
                <h3 className="font-serif text-xl text-ivory">{it.title}</h3>
                <p className="mt-1.5 font-sans text-[0.95rem] leading-relaxed text-sage-100/85">
                  {it.body}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
