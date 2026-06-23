"use client";

import { SectionReveal } from "@/components/landing/SectionReveal";
import { WaitlistForm } from "@/components/landing/WaitlistForm";
import { RingMark } from "@/components/brand/RingMark";

export function FinalCta() {
  return (
    <section className="px-5 py-12 sm:px-8 sm:py-16">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-sage-700 px-7 py-16 text-center sm:px-14 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(90% 80% at 50% 0%, rgba(194,163,107,0.18), transparent 55%)",
          }}
        />
        <SectionReveal className="relative mx-auto max-w-xl">
          <RingMark size={40} className="mx-auto" />
          <h2 className="mt-6 text-[2.2rem] leading-tight text-ivory sm:text-[2.8rem]">
            Empieza tu boda con calma.
          </h2>
          <p className="mx-auto mt-4 max-w-md font-sans text-lg text-sage-100/90">
            Estamos por abrir. Déjanos tu correo o WhatsApp y serás de las
            primeras en entrar.
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <WaitlistForm id="final-wl" variant="dark" />
          </div>
          <p className="mt-4 font-sans text-sm text-sage-200/70">
            Sin spam. Solo un aviso cálido cuando abramos.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
