"use client";

import { SectionReveal } from "@/components/landing/SectionReveal";
import { Eyebrow, DarkPanelDecor } from "@/components/landing/SectionBits";
import { Polaroid } from "@/components/landing/Polaroid";
import { COUPLE_PHOTOS } from "@/lib/photos";

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
    <section id="alma" className="scroll-mt-24 px-5 py-12 sm:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.4rem] bg-gradient-to-br from-sage-800 to-sage-700 px-7 py-14 shadow-lift sm:px-12 sm:py-16">
        <DarkPanelDecor />

        <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* copy */}
          <div>
            <SectionReveal>
              <Eyebrow invert>Con alma mexicana</Eyebrow>
              <h2 className="mt-4 text-[clamp(2rem,4.6vw,3rem)] font-medium leading-[1.03] tracking-[-0.015em] text-ivory">
                Lo que ninguna app{" "}
                <span className="italic text-gold-soft">gringa tiene.</span>
              </h2>
              <p className="mt-4 max-w-lg font-sans text-lg leading-relaxed text-sage-100/90">
                wedRing entiende cómo nos casamos aquí: de padrinos, de haciendas,
                de celebrar en grande y en familia.
              </p>
            </SectionReveal>

            <div className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {ITEMS.map((it, i) => (
                <SectionReveal key={it.title} delay={0.05 * i}>
                  <div className="border-l-2 border-gold/60 pl-4">
                    <h3 className="font-serif text-lg text-ivory">{it.title}</h3>
                    <p className="mt-1 font-sans text-[0.92rem] leading-relaxed text-sage-100/80">
                      {it.body}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>

          {/* foto */}
          <SectionReveal delay={0.1} className="relative mx-auto hidden w-full max-w-sm lg:block">
            <div className="rotate-2">
              <Polaroid photo={COUPLE_PHOTOS[2]} />
            </div>
            {/* segunda foto pequeña, da capas */}
            <div className="absolute -bottom-8 -left-8 w-[8rem] -rotate-6">
              <Polaroid photo={COUPLE_PHOTOS[0]} />
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
