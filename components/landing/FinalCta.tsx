"use client";

import { SectionReveal } from "@/components/landing/SectionReveal";
import { WaitlistForm } from "@/components/landing/WaitlistForm";
import { RingMark } from "@/components/brand/RingMark";
import { DarkPanelDecor } from "@/components/landing/SectionBits";

export function FinalCta() {
  return (
    <section className="px-5 py-12 sm:px-8 sm:py-16">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.4rem] bg-gradient-to-br from-sage-800 to-sage-700 px-7 py-16 text-center shadow-lift sm:px-14 sm:py-20">
        <DarkPanelDecor />
        <SectionReveal className="relative mx-auto max-w-xl">
          <RingMark size={44} className="mx-auto" />
          <h2 className="mt-6 text-[clamp(2rem,5vw,3.2rem)] font-medium leading-[1.02] tracking-[-0.015em] text-ivory">
            Empieza tu boda{" "}
            <span className="italic text-gold-soft">con calma.</span>
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
