"use client";

import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * El corazón de wedRing destacado con cariño: el RSVP por WhatsApp.
 * Es la razón de ser de la app, así que en el tablero tiene su propio espacio
 * cálido —sin gritar, invitando.
 */
export function NextStepCard() {
  return (
    <Reveal>
      <Link
        href="/invitados"
        className="group relative block overflow-hidden rounded-3xl bg-sage-700 px-7 py-8 shadow-calm transition-all duration-[250ms] ease-calm hover:-translate-y-0.5 hover:shadow-lift sm:px-9"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(100% 90% at 100% 0%, rgba(194,163,107,0.22), transparent 55%)",
          }}
        />
        <div className="relative flex items-center justify-between gap-6">
          <div className="max-w-lg">
            <span className="inline-flex items-center gap-2 rounded-full bg-ivory/10 px-3 py-1 font-sans text-xs font-medium uppercase tracking-wide text-gold-soft">
              <MessageCircle size={13} /> El corazón
            </span>
            <h2 className="mt-3 font-serif text-[1.7rem] leading-tight text-ivory">
              Confirma a tus invitados por WhatsApp
            </h2>
            <p className="mt-2 font-sans text-sage-100/90">
              Cada invitado recibe su link personal y confirma en segundos. Tu
              conteo se actualiza solo. Empecemos por aquí.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 font-sans text-sm font-semibold text-ivory">
              Crear mi lista de invitados
              <ArrowRight
                size={17}
                className="transition-transform duration-[250ms] ease-calm group-hover:translate-x-1"
              />
            </span>
          </div>

          {/* anillos decorativos, discretos */}
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            className="hidden shrink-0 opacity-90 sm:block"
            aria-hidden
          >
            <circle cx="48" cy="60" r="30" stroke="rgba(236,220,184,0.8)" strokeWidth="2" />
            <circle cx="74" cy="60" r="30" stroke="rgba(255,253,249,0.55)" strokeWidth="2" />
          </svg>
        </div>
      </Link>
    </Reveal>
  );
}
