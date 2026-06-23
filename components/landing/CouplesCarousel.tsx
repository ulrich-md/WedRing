"use client";

import { SectionHeading } from "@/components/landing/SectionBits";
import { COUPLE_PHOTOS, photoBg } from "@/lib/photos";

/**
 * Carrusel (marquee) de parejas — un desfile cálido de bodas mexicanas.
 * Imaginería de ambiente: sin testimonios ni nombres inventados.
 * Se desplaza solo; se detiene con prefers-reduced-motion (regla global).
 */
export function CouplesCarousel() {
  const loop = [...COUPLE_PHOTOS, ...COUPLE_PHOTOS];

  return (
    <section className="overflow-hidden py-20 sm:py-24">
      <SectionHeading
        eyebrow="Para bodas con alma"
        title={
          <>
            Hecho para bodas{" "}
            <span className="italic text-sage-600">como la tuya.</span>
          </>
        }
        className="mb-12 px-5 sm:px-8"
      />

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ivory to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ivory to-transparent sm:w-28" />

        <div className="flex w-max animate-marquee gap-5 px-5">
          {loop.map((photo, i) => (
            <div
              key={i}
              className="w-[15rem] shrink-0 rounded-3xl border border-white bg-white p-2 shadow-calm transition-shadow duration-[250ms] ease-calm hover:shadow-lift sm:w-[17rem]"
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
