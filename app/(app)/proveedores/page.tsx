"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  BadgeCheck,
  Heart,
  MessageCircle,
  Store,
  MapPin,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { api, sendLead, waLink } from "@/lib/api";
import { useLocalState } from "@/lib/local";
import { useWedding } from "@/components/providers/WeddingProvider";
import { VENDOR_CATEGORIES, type Vendor } from "@/lib/types";

/** Seguimiento de cotizaciones/pagos por proveedor (privado de la pareja). */
interface VendorTrack {
  fav: boolean;
  stage?: "cotizado" | "apartado" | "pagado";
  note?: string;
}

const STAGES = ["cotizado", "apartado", "pagado"] as const;

export default function ProveedoresPage() {
  return (
    <Suspense fallback={null}>
      <ProveedoresInner />
    </Suspense>
  );
}

function ProveedoresInner() {
  const { wedding } = useWedding();
  const params = useSearchParams();
  const [category, setCategory] = useState(params.get("categoria") ?? "");
  const [city, setCity] = useState("");
  const [vendors, setVendors] = useState<Vendor[] | null>(null);
  const [track, setTrack] = useLocalState<Record<string, VendorTrack>>(
    "wedring.vendorTrack",
    {},
  );
  const [onlyFavs, setOnlyFavs] = useState(false);

  useEffect(() => {
    api
      .listVendors({ category: category || undefined, city: city || undefined })
      .then(({ vendors }) => setVendors(vendors))
      .catch(() => setVendors([]));
  }, [category, city]);

  const visible = useMemo(
    () => (vendors ?? []).filter((v) => !onlyFavs || track[v.id]?.fav),
    [vendors, onlyFavs, track],
  );

  const favCount = useMemo(
    () => Object.values(track).filter((t) => t.fav).length,
    [track],
  );

  function setT(id: string, patch: Partial<VendorTrack>) {
    setTrack((prev) => {
      const current: VendorTrack = prev[id] ?? { fav: false };
      return { ...prev, [id]: { ...current, ...patch } };
    });
  }

  return (
    <div>
      <SectionHeader
        eyebrow="Reales y verificados"
        title="Proveedores"
        subtitle="Cada uno revisado a mano. Ordenados por lo que mejor te queda — aquí nadie compra el primer lugar."
      />

      {/* Filtros */}
      <Reveal className="mt-8">
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-11 rounded-xl border border-line bg-card px-3 font-sans text-sm text-ink focus:border-sage-300 focus:outline-none"
          >
            <option value="">Todas las categorías</option>
            {VENDOR_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Ciudad"
            className="h-11 w-40 rounded-xl border border-line bg-card px-4 font-sans text-sm text-ink placeholder:text-ink-faint/70 focus:border-sage-300 focus:outline-none"
          />
          <button
            onClick={() => setOnlyFavs((v) => !v)}
            className={
              "ml-auto inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-sans text-sm transition-colors duration-[250ms] ease-calm " +
              (onlyFavs
                ? "bg-sage-600 font-medium text-ivory"
                : "border border-line bg-card text-ink-soft")
            }
          >
            <Heart size={14} className={onlyFavs ? "fill-current" : ""} />
            Mis favoritos ({favCount})
          </button>
        </div>
      </Reveal>

      {/* Lista */}
      <Reveal className="mt-6" delay={0.06}>
        {vendors === null ? (
          <div className="card-calm px-6 py-10 text-center font-sans text-sm text-ink-faint">
            Buscando proveedores verificados…
          </div>
        ) : visible.length === 0 ? (
          <div className="card-calm px-6 py-12 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-sage-50 text-sage-600">
              <Store size={22} />
            </span>
            <p className="mt-4 font-serif text-xl text-ink">
              {onlyFavs
                ? "Aún no guardas favoritos"
                : "Estamos verificando proveedores"}
            </p>
            <p className="mx-auto mt-1 max-w-md font-sans text-sm text-ink-soft">
              {onlyFavs
                ? "Toca el corazón de un proveedor para guardarlo aquí."
                : "Revisamos cada negocio a mano antes de recomendarlo — sin atajos ni pagos por aparecer. ¿Conoces un buen proveedor?"}
            </p>
            {!onlyFavs && (
              <Link
                href="/anunciantes"
                className="mt-4 inline-block font-sans text-sm font-medium text-sage-600 hover:text-sage-700"
              >
                Invítalo a registrarse →
              </Link>
            )}
          </div>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {visible.map((v) => {
              const t = track[v.id];
              return (
                <li key={v.id} className="card-calm flex flex-col px-5 py-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="inline-flex flex-wrap items-center gap-1.5 font-serif text-lg leading-tight text-ink">
                        {v.name}
                        <BadgeCheck size={16} className="text-confirmed" />
                        {/* Etiqueta clara estilo anuncio: jamás altera el orden */}
                        {v.plan === "destacado" && (
                          <span className="rounded-full bg-gold-soft/60 px-2 py-0.5 font-sans text-[0.6rem] font-semibold uppercase tracking-wide text-gold-deep">
                            Destacado
                          </span>
                        )}
                      </p>
                      <p className="mt-0.5 font-sans text-xs text-ink-faint">
                        {VENDOR_CATEGORIES.find((c) => c.id === v.category)?.label}
                        {" · "}
                        <MapPin size={11} className="inline" /> {v.city} ·{" "}
                        {v.priceRange}
                      </p>
                    </div>
                    <button
                      onClick={() => setT(v.id, { fav: !t?.fav })}
                      className={
                        "grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-[250ms] ease-calm " +
                        (t?.fav
                          ? "bg-declined/12 text-declined"
                          : "bg-sage-50 text-ink-faint hover:text-declined")
                      }
                      title="Favorito"
                    >
                      <Heart size={16} className={t?.fav ? "fill-current" : ""} />
                    </button>
                  </div>

                  <p className="mt-3 line-clamp-3 font-sans text-sm leading-relaxed text-ink-soft">
                    {v.description}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4">
                    <a
                      href={waLink(
                        `Hola, ${v.name} 👋 Los vimos en wedRing y queremos cotizar para nuestra boda.`,
                        v.whatsapp,
                      )}
                      onClick={() => sendLead(v.id, wedding)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-confirmed/12 px-3.5 py-2 font-sans text-sm font-medium text-confirmed hover:bg-confirmed/20"
                    >
                      <MessageCircle size={14} /> Cotizar por WhatsApp
                    </a>

                    {/* seguimiento de la pareja */}
                    {t?.fav && (
                      <select
                        value={t.stage ?? ""}
                        onChange={(e) =>
                          setT(v.id, {
                            stage: (e.target.value || undefined) as VendorTrack["stage"],
                          })
                        }
                        className="ml-auto h-9 rounded-full border border-line bg-card px-3 font-sans text-xs text-ink-soft focus:outline-none"
                      >
                        <option value="">Sin seguimiento</option>
                        {STAGES.map((s) => (
                          <option key={s} value={s}>
                            {s[0].toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Reveal>

      <p className="mt-8 text-center font-sans text-xs text-ink-faint">
        ¿Tienes un negocio de bodas?{" "}
        <Link href="/anunciantes" className="text-sage-600 hover:text-sage-700">
          Regístrate gratis y gana tu verificación
        </Link>
      </p>
    </div>
  );
}
