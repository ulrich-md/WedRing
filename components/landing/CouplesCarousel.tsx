"use client";

import { SectionReveal } from "@/components/landing/SectionReveal";
import { COUPLE_PHOTOS, photoBg } from "@/lib/photos";

/**
 * Carrusel (marquee) de parejas — un desfile cálido de bodas mexicanas.
 * Imaginería de ambiente: sin testimonios ni nombres inventados.
 * Se desplaza solo; se detiene con prefers-reduced-motion (regla global).
 * Las fotos usan fondo en capas (local → remoto → degradado).
 */
export function CouplesCarousel() {
  const loop = [...COUPLE_PHOTOS, ...COUPLE_PHOTOS];

  return (
    <section className="overflow-hidden py-16 sm:py-20">
      <SectionReveal className="mx-auto mb-9 max-w-2xl px-5 text-center sm:px-8">
        <p className="eyebrow">Para bodas con alma</p>
        <h2 className="mt-2 text-[2rem] leading-tight sm:text-[2.5rem]">
          Hecho para bodas como la tuya.
        </h2>
      </SectionReveal>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ivory to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ivory to-transparent" />

        <div className="flex w-max animate-marquee gap-5 px-5">
          {loop.map((photo, i) => (
            <div
              key={i}
              className="w-[15rem] shrink-0 rounded-3xl border border-white bg-white p-2 shadow-calm sm:w-[17rem]"
            >
              <div
                className="aspect-[4/5] rounded-2xl bg-cover bg-center"
                style={{ backgroundImage: photoBg(photo) }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
