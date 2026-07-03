"use client";

// Panel de administración — SOLO para ti. Protegido con WEDRING_ADMIN_KEY.
// Aquí se revisan las solicitudes y se verifica o rechaza a cada proveedor.

import { useCallback, useEffect, useState } from "react";
import {
  ShieldCheck,
  BadgeCheck,
  XCircle,
  Clock,
  MessageCircle,
} from "lucide-react";
import { RingMark } from "@/components/brand/RingMark";
import { Button } from "@/components/ui/Button";
import { waLink } from "@/lib/api";
import { VENDOR_CATEGORIES, type Vendor, type VendorStatus } from "@/lib/types";

const label = (id: string) =>
  VENDOR_CATEGORIES.find((c) => c.id === id)?.label ?? id;

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [vendors, setVendors] = useState<Vendor[] | null>(null);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<VendorStatus>("pendiente");

  const load = useCallback(
    async (k: string) => {
      const res = await fetch("/api/admin/vendors", {
        headers: { "x-admin-key": k },
      });
      if (!res.ok) throw new Error("Clave incorrecta");
      const d = (await res.json()) as { vendors: Vendor[] };
      setVendors(d.vendors);
    },
    [],
  );

  // Restaurar sesión de admin del navegador.
  useEffect(() => {
    const saved = sessionStorage.getItem("wedring.adminKey");
    if (saved) {
      setKey(saved);
      load(saved)
        .then(() => setAuthed(true))
        .catch(() => sessionStorage.removeItem("wedring.adminKey"));
    }
  }, [load]);

  async function act(id: string, action: "verificar" | "rechazar") {
    await fetch(`/api/admin/vendors/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-key": key },
      body: JSON.stringify({ action }),
    });
    load(key).catch(() => {});
  }

  if (!authed) {
    return (
      <main className="grid min-h-dvh place-items-center px-5">
        <form
          className="card-calm w-full max-w-sm px-7 py-9 text-center"
          onSubmit={async (e) => {
            e.preventDefault();
            setError("");
            try {
              await load(key);
              sessionStorage.setItem("wedring.adminKey", key);
              setAuthed(true);
            } catch {
              setError("Clave incorrecta");
            }
          }}
        >
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-sage-50 text-sage-600">
            <ShieldCheck size={22} />
          </span>
          <h1 className="mt-4 text-2xl">Administración</h1>
          <p className="mt-1 font-sans text-sm text-ink-faint">
            Solo para el equipo de wedRing.
          </p>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Clave de administración"
            className="mt-5 h-12 w-full rounded-xl border border-line bg-ivory/60 px-4 text-center font-sans text-ink focus:border-sage-300 focus:outline-none"
          />
          {error && <p className="mt-2 font-sans text-sm text-declined">{error}</p>}
          <Button type="submit" className="mt-4 w-full" disabled={!key.trim()}>
            Entrar
          </Button>
        </form>
      </main>
    );
  }

  const list = (vendors ?? []).filter((v) => v.status === tab);
  const count = (s: VendorStatus) =>
    (vendors ?? []).filter((v) => v.status === s).length;

  return (
    <main className="min-h-dvh px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-3">
          <RingMark size={30} />
          <h1 className="text-2xl">Verificación de proveedores</h1>
        </div>
        <p className="mt-1 font-sans text-sm text-ink-soft">
          Solo los verificados aparecen para las parejas. La insignia se gana —
          nunca depende de un pago.
        </p>

        <div className="mt-6 flex gap-2">
          {(
            [
              ["pendiente", `Pendientes (${count("pendiente")})`, Clock],
              ["verificado", `Verificados (${count("verificado")})`, BadgeCheck],
              ["rechazado", `Rechazados (${count("rechazado")})`, XCircle],
            ] as [VendorStatus, string, typeof Clock][]
          ).map(([s, l, Icon]) => (
            <button
              key={s}
              onClick={() => setTab(s)}
              className={
                "inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-sans text-sm transition-colors duration-[250ms] ease-calm " +
                (tab === s
                  ? "bg-sage-600 font-medium text-ivory"
                  : "border border-line bg-card text-ink-soft")
              }
            >
              <Icon size={14} /> {l}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <div className="card-calm mt-6 px-6 py-12 text-center font-sans text-sm text-ink-faint">
            Nada por aquí. {tab === "pendiente" && "Cuando alguien se registre, aparecerá para tu revisión."}
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {list.map((v) => (
              <li key={v.id} className="card-calm px-6 py-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-serif text-lg text-ink">{v.name}</p>
                    <p className="font-sans text-sm text-ink-soft">
                      {label(v.category)} · {v.city} · {v.priceRange}
                      {v.availability ? ` · ${v.availability}` : ""}
                    </p>
                  </div>
                  <a
                    href={waLink(
                      `Hola, ${v.name} 👋 Te escribimos de wedRing sobre tu solicitud de verificación.`,
                      v.whatsapp,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-confirmed/12 px-3 py-1.5 font-sans text-xs font-medium text-confirmed hover:bg-confirmed/20"
                  >
                    <MessageCircle size={13} /> {v.whatsapp}
                  </a>
                </div>
                <p className="mt-3 font-sans text-sm leading-relaxed text-ink-soft">
                  {v.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
                  {v.status !== "verificado" && (
                    <Button onClick={() => act(v.id, "verificar")}>
                      <BadgeCheck size={16} /> Verificar
                    </Button>
                  )}
                  {v.status !== "rechazado" && (
                    <Button variant="ghost" onClick={() => act(v.id, "rechazar")}>
                      <XCircle size={16} /> Rechazar
                    </Button>
                  )}
                  <span className="ml-auto self-center font-sans text-xs text-ink-faint">
                    Solicitud: {new Date(v.createdAt).toLocaleDateString("es-MX")}
                    {" · "}Plan: {v.plan}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
