"use client";

import Link from "next/link";
import { CalendarDays, MapPin, Pencil } from "lucide-react";
import type { Wedding } from "@/lib/types";
import { countdown, formatLongDate, STYLES } from "@/lib/wedding";

/** El encabezado del tablero: sus nombres, su fecha, su cuenta regresiva. Aire. */
export function CountdownHero({ wedding }: { wedding: Wedding }) {
  const c = countdown(wedding.date);
  const styleLabel =
    STYLES.find((s) => s.id === wedding.style)?.label ?? "Boda";

  return (
    <section className="relative overflow-hidden rounded-3xl border border-line bg-card px-7 py-9 shadow-calm sm:px-10 sm:py-11">
      {/* lavado de color tenue con el sage y el dorado, nunca saturado */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(110% 90% at 100% 0%, rgba(194,163,107,0.10), transparent 55%), radial-gradient(80% 80% at 0% 100%, rgba(111,129,89,0.08), transparent 60%)",
        }}
      />
      <div className="relative">
        <p className="eyebrow">La boda de</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <h1 className="text-[2.6rem] leading-[1.05] sm:text-[3.2rem]">
            {wedding.partners[0] || "Tu boda"}
            {wedding.partners[1] && (
              <>
                {" "}
                <span className="text-gold">&</span> {wedding.partners[1]}
              </>
            )}
          </h1>

          {/* Cuenta regresiva */}
          <div className="text-right">
            {c.hasDate ? (
              <>
                <p className="font-serif text-5xl leading-none text-sage-600">
                  {c.days}
                </p>
                <p className="mt-1 font-sans text-sm text-ink-faint">
                  {c.isPast ? "días desde el gran día" : "días para el sí"}
                </p>
              </>
            ) : (
              <Link
                href="/configuracion"
                className="inline-flex items-center gap-1.5 font-sans text-sm text-sage-600 hover:text-sage-700"
              >
                <Pencil size={14} /> Pon tu fecha
              </Link>
            )}
          </div>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-sm text-ink-soft">
          <span className="inline-flex items-center gap-2">
            <CalendarDays size={16} className="text-gold-deep" />
            {formatLongDate(wedding.date)}
          </span>
          {wedding.location && (
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} className="text-gold-deep" />
              {wedding.location}
            </span>
          )}
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {styleLabel}
          </span>
        </div>
      </div>
    </section>
  );
}
