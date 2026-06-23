"use client";

import {
  Users,
  Wallet,
  MessageCircle,
  Check,
  Clock,
  X,
  HeartHandshake,
  Store,
  ChevronLeft,
} from "lucide-react";
import { RingMark } from "@/components/brand/RingMark";

/**
 * Mockups fieles y detallados construidos con el UI real de wedRing.
 * Venden el producto con honestidad: así se ve la app.
 */

function Avatar({ initial, tone }: { initial: string; tone: string }) {
  return (
    <span
      className={
        "grid h-6 w-6 place-items-center rounded-full ring-2 ring-card font-sans text-[0.6rem] font-bold " +
        tone
      }
    >
      {initial}
    </span>
  );
}

/** Mini–tablero dentro de un marco de navegador. */
export function TableroMockup() {
  return (
    <div className="w-full overflow-hidden rounded-[1.4rem] border border-line bg-card shadow-lift">
      {/* barra del navegador */}
      <div className="flex items-center gap-2 border-b border-line bg-ivory/70 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-declined/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-pending/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-confirmed/60" />
        <span className="ml-3 flex-1 truncate rounded-md border border-line bg-card px-3 py-1 text-center font-sans text-[0.7rem] text-ink-faint">
          wedring.app/tablero
        </span>
      </div>

      {/* contenido */}
      <div className="p-5 sm:p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">La boda de</p>
            <h3 className="mt-1 font-serif text-3xl leading-none text-ink sm:text-[2.2rem]">
              Sofía <span className="text-gold">&</span> Mateo
            </h3>
          </div>
          <div className="rounded-2xl bg-gold-soft/40 px-3 py-1.5 text-center">
            <p className="font-serif text-2xl leading-none text-gold-deep">148</p>
            <p className="font-sans text-[0.6rem] uppercase tracking-eyebrow text-ink-faint">
              días
            </p>
          </div>
        </div>

        {/* franja del corazón: RSVP por WhatsApp */}
        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-sage-700 px-4 py-3">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-confirmed text-ivory">
            <MessageCircle size={14} />
          </span>
          <span className="font-sans text-[0.8rem] font-medium text-ivory">
            84 confirmados por WhatsApp
          </span>
          <span className="ml-auto flex -space-x-2">
            <Avatar initial="A" tone="bg-gold/90 text-ink" />
            <Avatar initial="R" tone="bg-sage-300 text-sage-800" />
            <Avatar initial="L" tone="bg-ivory text-sage-700" />
          </span>
        </div>

        {/* stats */}
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {/* invitados */}
          <div className="rounded-xl border border-line bg-ivory/50 p-3">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-sage-50 text-sage-600">
              <Users size={14} />
            </span>
            <p className="mt-2 font-serif text-lg leading-none text-ink">84</p>
            <p className="font-sans text-[0.62rem] text-ink-faint">de 120</p>
          </div>
          {/* presupuesto */}
          <div className="rounded-xl border border-line bg-ivory/50 p-3">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-sage-50 text-sage-600">
              <Wallet size={14} />
            </span>
            <p className="mt-2 font-serif text-lg leading-none text-ink">62%</p>
            <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-sage-50">
              <div className="h-full w-[62%] rounded-full bg-gold" />
            </div>
          </div>
          {/* tareas: aro de progreso */}
          <div className="rounded-xl border border-line bg-ivory/50 p-3">
            <RingStat value={7} total={12} />
            <p className="mt-1.5 font-sans text-[0.62rem] text-ink-faint">tareas</p>
          </div>
        </div>

        {/* chips */}
        <div className="mt-3 flex gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-50 px-2.5 py-1 font-sans text-[0.66rem] font-medium text-sage-700">
            <HeartHandshake size={12} /> Padrinos · 6
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-50 px-2.5 py-1 font-sans text-[0.66rem] font-medium text-sage-700">
            <Store size={12} /> Proveedores · 4
          </span>
        </div>
      </div>
    </div>
  );
}

/** Aro de progreso pequeño (SVG). */
function RingStat({ value, total }: { value: number; total: number }) {
  const r = 11;
  const c = 2 * Math.PI * r;
  const pct = value / total;
  return (
    <div className="relative h-8 w-8">
      <svg viewBox="0 0 28 28" className="h-8 w-8 -rotate-90">
        <circle cx="14" cy="14" r={r} fill="none" stroke="rgb(var(--sage-100))" strokeWidth="3" />
        <circle
          cx="14"
          cy="14"
          r={r}
          fill="none"
          stroke="rgb(var(--sage-500))"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center font-sans text-[0.6rem] font-bold text-sage-700">
        {value}/{total}
      </span>
    </div>
  );
}

/** RSVP del invitado enmarcado como chat de WhatsApp — claro y con contraste. */
export function RsvpPhoneMockup() {
  return (
    <div className="relative mx-auto w-[16rem] sm:w-[17.5rem]">
      <div className="overflow-hidden rounded-[2.4rem] border-[7px] border-sage-800 bg-card shadow-lift">
        {/* header estilo WhatsApp (verde = contraste y "es WhatsApp") */}
        <div className="flex items-center gap-2.5 bg-confirmed px-3.5 pb-3 pt-6 text-ivory">
          <ChevronLeft size={16} className="opacity-90" />
          <span className="grid h-8 w-8 place-items-center rounded-full bg-ivory/20">
            <RingMark size={20} />
          </span>
          <div className="leading-tight">
            <p className="font-sans text-[0.78rem] font-semibold">Sofía &amp; Mateo</p>
            <p className="font-sans text-[0.6rem] text-ivory/80">vía wedRing · en línea</p>
          </div>
        </div>

        {/* área de chat */}
        <div className="space-y-2.5 bg-ivory px-3 pb-5 pt-3">
          {/* burbuja entrante */}
          <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-card px-3 py-2 shadow-calm">
            <p className="font-sans text-[0.72rem] leading-snug text-ink">
              ¡Hola! Nos casamos y queremos que estés. Confirma tu asistencia
              aquí 👇
            </p>
            <p className="mt-0.5 text-right font-sans text-[0.55rem] text-ink-faint">
              10:24
            </p>
          </div>

          {/* tarjeta RSVP */}
          <div className="rounded-2xl border border-line bg-card p-3.5 text-center shadow-calm">
            <p className="eyebrow">Estás invitada a la boda de</p>
            <h4 className="mt-1 font-serif text-xl text-ink">
              Sofía <span className="text-gold">&</span> Mateo
            </h4>
            <p className="mt-0.5 font-sans text-[0.66rem] text-ink-faint">
              14 nov · Hacienda, Querétaro
            </p>

            <div className="mt-3 space-y-1.5">
              <RsvpOption icon={<Check size={13} />} label="Sí, ahí estaré" active />
              <div className="grid grid-cols-2 gap-1.5">
                <RsvpOption icon={<Clock size={13} />} label="Tal vez" small />
                <RsvpOption icon={<X size={13} />} label="No podré" small />
              </div>
            </div>
            <p className="mt-2.5 font-sans text-[0.58rem] text-ink-faint">
              Confirmas en segundos. Sin apps, sin cuentas.
            </p>
          </div>
        </div>
      </div>

      {/* chip flotante de conteo en vivo (contraste dorado) */}
      <div className="absolute -right-3 top-16 rounded-2xl border border-line bg-card px-3 py-2 shadow-lift sm:-right-7">
        <p className="font-sans text-[0.55rem] uppercase tracking-eyebrow text-ink-faint">
          En vivo
        </p>
        <p className="font-serif text-lg leading-none text-confirmed">84 sí</p>
      </div>
    </div>
  );
}

function RsvpOption({
  icon,
  label,
  active,
  small,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  small?: boolean;
}) {
  return (
    <div
      className={
        "flex items-center justify-center gap-1.5 rounded-full font-sans " +
        (small ? "px-2 py-1.5 text-[0.66rem]" : "px-3 py-2 text-[0.74rem]") +
        " " +
        (active
          ? "bg-sage-600 font-semibold text-ivory shadow-calm"
          : "border border-line bg-card text-ink-soft")
      }
    >
      <span
        className={
          "grid h-4 w-4 place-items-center rounded-full " +
          (active ? "bg-ivory/20 text-ivory" : "bg-sage-50 text-sage-500")
        }
      >
        {icon}
      </span>
      {label}
    </div>
  );
}
