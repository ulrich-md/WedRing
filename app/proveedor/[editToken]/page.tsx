"use client";

// Dashboard del proveedor: entra con su link secreto y solo ve/edita SU
// perfil. El estado (pendiente/verificado/rechazado) lo controla el admin.

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BadgeCheck, Clock, XCircle, Check } from "lucide-react";
import { RingMark, Wordmark } from "@/components/brand/RingMark";
import { Reveal } from "@/components/ui/Reveal";
import { VendorForm, vendorToValues } from "@/components/vendors/VendorForm";
import type { Vendor } from "@/lib/types";

const STATUS_UI = {
  pendiente: {
    icon: Clock,
    cls: "bg-pending/15 text-gold-deep",
    title: "Pendiente de verificación",
    body: "Estamos revisando tu perfil a mano. Aún no eres visible para las parejas; te avisaremos por WhatsApp.",
  },
  verificado: {
    icon: BadgeCheck,
    cls: "bg-confirmed/12 text-confirmed",
    title: "Verificado y activo",
    body: "¡Felicidades! Tu perfil ya aparece en las recomendaciones para parejas, ordenado por mérito.",
  },
  rechazado: {
    icon: XCircle,
    cls: "bg-declined/12 text-declined",
    title: "Solicitud rechazada",
    body: "Por ahora no pudimos verificar tu negocio. Puedes actualizar tu información — la volveremos a revisar.",
  },
} as const;

export default function ProveedorPage() {
  const { editToken } = useParams<{ editToken: string }>();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [failed, setFailed] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/vendors/me/${editToken}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { vendor: Vendor }) => setVendor(d.vendor))
      .catch(() => setFailed(true));
  }, [editToken]);

  return (
    <main className="min-h-dvh px-5 py-10 sm:px-8">
      <header className="mx-auto flex max-w-3xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <RingMark size={30} />
          <Wordmark className="text-xl" />
        </Link>
        <span className="font-sans text-sm text-ink-faint">Panel de proveedor</span>
      </header>

      <div className="mx-auto mt-10 max-w-3xl">
        {failed ? (
          <div className="card-calm px-6 py-12 text-center font-sans text-ink-soft">
            Este link no es válido. Revisa que lo hayas copiado completo.
          </div>
        ) : !vendor ? (
          <div className="card-calm px-6 py-14 text-center">
            <RingMark size={36} className="mx-auto animate-pulse opacity-60" />
          </div>
        ) : (
          <>
            <Reveal>
              {(() => {
                const s = STATUS_UI[vendor.status];
                return (
                  <div className="card-calm flex items-start gap-4 px-6 py-5">
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${s.cls}`}>
                      <s.icon size={20} />
                    </span>
                    <div>
                      <p className="font-serif text-lg text-ink">{s.title}</p>
                      <p className="font-sans text-sm text-ink-soft">{s.body}</p>
                      {vendor.plan === "destacado" && (
                        <span className="mt-2 inline-block rounded-full bg-gold-soft/60 px-3 py-1 font-sans text-xs font-semibold text-gold-deep">
                          Plan: Destacado
                        </span>
                      )}
                    </div>
                  </div>
                );
              })()}
            </Reveal>

            <Reveal className="mt-6" delay={0.06}>
              <div className="card-calm p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <h1 className="font-serif text-2xl text-ink">{vendor.name}</h1>
                  {saved && (
                    <span className="inline-flex items-center gap-1.5 font-sans text-sm text-confirmed">
                      <Check size={15} /> Guardado
                    </span>
                  )}
                </div>
                <p className="mb-5 mt-1 font-sans text-sm text-ink-faint">
                  Edita tu perfil cuando quieras — los cambios se guardan al
                  enviar.
                </p>
                <VendorForm
                  initial={vendorToValues(vendor)}
                  submitLabel="Guardar cambios"
                  onSubmit={async (values) => {
                    const res = await fetch(`/api/vendors/me/${editToken}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(values),
                    });
                    if (!res.ok) throw new Error("No se pudo guardar");
                    const d = (await res.json()) as { vendor: Vendor };
                    setVendor(d.vendor);
                    setSaved(true);
                    setTimeout(() => setSaved(false), 2200);
                  }}
                />
              </div>
            </Reveal>
          </>
        )}
      </div>
    </main>
  );
}
