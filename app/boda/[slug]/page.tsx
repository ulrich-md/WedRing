// Web de boda PÚBLICA — server component: lee la DB directo (sin API).
// Tema básico gratis: los detalles + cómo confirmar. Aquí los invitados
// (y sus amigas comprometidas 😉) conocen wedRing.

import Link from "next/link";
import type { Metadata } from "next";
import { findWeddingBySlug } from "@/lib/server/db";
import { RingMark } from "@/components/brand/RingMark";
import { CalendarDays, MapPin, MessageCircle } from "lucide-react";

export const dynamic = "force-dynamic";

const MESES = [
  "enero","febrero","marzo","abril","mayo","junio",
  "julio","agosto","septiembre","octubre","noviembre","diciembre",
];

function longDate(date: string | null) {
  if (!date) return "Fecha por confirmar";
  const d = new Date(date + "T00:00:00");
  return `${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`;
}

function daysLeft(date: string | null) {
  if (!date) return null;
  const ms = new Date(date + "T00:00:00").getTime() - Date.now();
  const days = Math.ceil(ms / 86_400_000);
  return days > 0 ? days : null;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const w = await findWeddingBySlug(params.slug);
  if (!w) return { title: "Boda no encontrada — wedRing" };
  const names = w.partners.filter(Boolean).join(" & ");
  return {
    title: `La boda de ${names}`,
    description: `${longDate(w.date)}${w.location ? ` · ${w.location}` : ""} — con wedRing`,
  };
}

export default async function BodaPage({
  params,
}: {
  params: { slug: string };
}) {
  const wedding = await findWeddingBySlug(params.slug);

  if (!wedding) {
    return (
      <main className="grid min-h-dvh place-items-center bg-ivory px-5">
        <div className="text-center">
          <RingMark size={40} className="mx-auto opacity-60" />
          <p className="mt-4 font-sans text-ink-soft">
            No encontramos esta boda. Revisa el link.
          </p>
        </div>
      </main>
    );
  }

  const days = daysLeft(wedding.date);

  return (
    <main className="min-h-dvh bg-ivory">
      {/* Portada */}
      <section className="relative overflow-hidden px-5 pb-16 pt-20 text-center sm:pt-28">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(90% 60% at 50% -5%, rgba(236,220,184,0.55), transparent 60%)",
          }}
        />
        <RingMark size={44} className="mx-auto" />
        <p className="eyebrow mt-6">Nos casamos</p>
        <h1 className="mx-auto mt-3 max-w-3xl text-[clamp(2.6rem,8vw,4.6rem)] leading-[1.02]">
          {wedding.partners[0]} <span className="text-gold">&</span>{" "}
          {wedding.partners[1]}
        </h1>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-sans text-ink-soft">
          <span className="inline-flex items-center gap-2">
            <CalendarDays size={16} className="text-gold-deep" />
            {longDate(wedding.date)}
          </span>
          {wedding.location && (
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} className="text-gold-deep" />
              {wedding.location}
            </span>
          )}
        </div>

        {days !== null && (
          <div className="mx-auto mt-9 inline-block rounded-3xl border border-line bg-card px-10 py-6 shadow-calm">
            <p className="font-serif text-5xl leading-none text-sage-600">{days}</p>
            <p className="mt-1 font-sans text-xs uppercase tracking-eyebrow text-ink-faint">
              días para el sí
            </p>
          </div>
        )}

        {wedding.webMessage && (
          <p className="mx-auto mt-9 max-w-xl font-serif text-xl italic leading-relaxed text-ink-soft">
            “{wedding.webMessage}”
          </p>
        )}
      </section>

      {/* RSVP */}
      <section className="px-5 pb-16">
        <div className="card-calm mx-auto max-w-xl px-7 py-8 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-confirmed/12 text-confirmed">
            <MessageCircle size={22} />
          </span>
          <h2 className="mt-4 text-2xl">Confirma tu asistencia</h2>
          <p className="mx-auto mt-2 max-w-md font-sans text-sm leading-relaxed text-ink-soft">
            Tu invitación llegó por WhatsApp con un <b>link personal</b> — ábrelo
            y confirma en un minuto. ¿No lo encuentras? Escríbenos y te lo
            reenviamos con gusto. 🤍
          </p>
        </div>
      </section>

      <footer className="border-t border-line px-5 py-8 text-center">
        <p className="font-sans text-xs text-ink-faint">
          Hecha con calma en{" "}
          <Link href="/" className="font-semibold text-sage-600 hover:text-sage-700">
            wedRing
          </Link>{" "}
          · planea tu boda sin estrés
        </p>
      </footer>
    </main>
  );
}
