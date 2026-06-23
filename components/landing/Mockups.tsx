"use client";

import { Users, Wallet, MessageCircle, Check, Clock, X } from "lucide-react";
import { RingMark } from "@/components/brand/RingMark";

/**
 * Mockups fieles construidos con el UI real de wedRing (aún no hay screenshots).
 * Venden el producto con honestidad: es exactamente cómo se ve la app.
 */

/** Mini–tablero dentro de un marco de navegador. */
export function TableroMockup() {
  return (
    <div className="w-full overflow-hidden rounded-[1.4rem] border border-line bg-card shadow-lift">
      {/* barra del navegador */}
      <div className="flex items-center gap-2 border-b border-line bg-ivory/70 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-declined/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-pending/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-confirmed/60" />
        <span className="ml-3 flex-1 truncate rounded-md bg-card px-3 py-1 text-center font-sans text-[0.7rem] text-ink-faint">
          wedring.app/tablero
        </span>
      </div>

      {/* contenido */}
      <div className="p-5 sm:p-7">
        <p className="eyebrow">La boda de</p>
        <div className="mt-1 flex items-end justify-between gap-4">
          <h3 className="font-serif text-3xl leading-none text-ink sm:text-[2.4rem]">
            Sofía <span className="text-gold">&</span> Mateo
          </h3>
          <div className="text-right">
            <p className="font-serif text-3xl leading-none text-sage-600 sm:text-4xl">
              148
            </p>
            <p className="font-sans text-[0.68rem] text-ink-faint">días</p>
          </div>
        </div>

        {/* franja del corazón: RSVP */}
        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-sage-700 px-4 py-3">
          <MessageCircle size={16} className="shrink-0 text-gold-soft" />
          <span className="font-sans text-[0.8rem] text-ivory">
            84 confirmados por WhatsApp
          </span>
        </div>

        {/* mini tarjetas */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <MiniCard
            icon={<Users size={15} />}
            label="Invitados"
            value="84 / 120"
          />
          <MiniCard
            icon={<Wallet size={15} />}
            label="Presupuesto"
            value="62%"
            progress={62}
          />
        </div>
      </div>
    </div>
  );
}

function MiniCard({
  icon,
  label,
  value,
  progress,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  progress?: number;
}) {
  return (
    <div className="rounded-xl border border-line bg-ivory/50 p-3.5">
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-sage-50 text-sage-600">
        {icon}
      </span>
      <p className="mt-2.5 font-sans text-[0.68rem] text-ink-faint">{label}</p>
      <p className="font-serif text-lg leading-none text-ink">{value}</p>
      {typeof progress === "number" && (
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-sage-50">
          <div
            className="h-full rounded-full bg-sage-400"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

/** Pantalla de RSVP del invitado, dentro de un teléfono. */
export function RsvpPhoneMockup() {
  return (
    <div className="relative mx-auto w-[16rem] sm:w-[17.5rem]">
      <div className="overflow-hidden rounded-[2.2rem] border-[6px] border-sage-800 bg-card shadow-lift">
        {/* notch */}
        <div className="relative bg-ivory pt-5">
          <span className="absolute left-1/2 top-2 h-1 w-12 -translate-x-1/2 rounded-full bg-line" />
          <div className="px-5 pb-6 pt-2 text-center">
            <RingMark size={30} className="mx-auto" />
            <p className="eyebrow mt-3">Estás invitada a la boda de</p>
            <h4 className="mt-1.5 font-serif text-2xl text-ink">
              Sofía <span className="text-gold">&</span> Mateo
            </h4>
            <p className="mt-1 font-sans text-[0.72rem] text-ink-faint">
              14 de noviembre · Hacienda
            </p>

            <p className="mt-5 font-sans text-[0.78rem] font-medium text-ink-soft">
              ¿Nos acompañas?
            </p>

            <div className="mt-3 space-y-2">
              <RsvpOption
                icon={<Check size={14} />}
                label="Sí, ahí estaré"
                active
              />
              <RsvpOption icon={<Clock size={14} />} label="Tal vez" />
              <RsvpOption icon={<X size={14} />} label="No podré" />
            </div>

            <p className="mt-4 font-sans text-[0.66rem] text-ink-faint">
              Confirmas en segundos. Sin apps, sin cuentas.
            </p>
          </div>
        </div>
      </div>

      {/* chip flotante de conteo en vivo */}
      <div className="absolute -right-3 top-10 rounded-2xl border border-line bg-card px-3 py-2 shadow-calm sm:-right-8">
        <p className="font-sans text-[0.6rem] uppercase tracking-eyebrow text-ink-faint">
          En vivo
        </p>
        <p className="font-serif text-xl leading-none text-sage-600">+1</p>
      </div>
    </div>
  );
}

function RsvpOption({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={
        "flex items-center gap-2.5 rounded-full px-4 py-2.5 font-sans text-[0.8rem] " +
        (active
          ? "bg-sage-600 font-medium text-ivory"
          : "border border-line bg-card text-ink-soft")
      }
    >
      <span
        className={
          "grid h-5 w-5 place-items-center rounded-full " +
          (active ? "bg-ivory/20 text-ivory" : "bg-sage-50 text-sage-500")
        }
      >
        {icon}
      </span>
      {label}
    </div>
  );
}
