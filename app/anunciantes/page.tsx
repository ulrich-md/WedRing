"use client";

// Registro self-serve de proveedores. Al enviar quedan "pendiente de
// verificación" y NO son visibles hasta que el admin los apruebe.
// La verificación se gana, nunca se compra.

import { useState } from "react";
import Link from "next/link";
import { BadgeCheck, ShieldCheck, Link2, Check, Copy } from "lucide-react";
import { RingMark, Wordmark } from "@/components/brand/RingMark";
import { Reveal } from "@/components/ui/Reveal";
import { VendorForm, vendorToValues } from "@/components/vendors/VendorForm";

export default function AnunciantesPage() {
  const [result, setResult] = useState<{ editToken: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const editUrl = result
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/proveedor/${result.editToken}`
    : "";

  return (
    <main className="min-h-dvh px-5 py-10 sm:px-8">
      <header className="mx-auto flex max-w-3xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <RingMark size={30} />
          <Wordmark className="text-xl" />
        </Link>
        <span className="font-sans text-sm text-ink-faint">Para proveedores</span>
      </header>

      <div className="mx-auto mt-10 max-w-3xl">
        {result ? (
          <Reveal>
            <div className="card-calm px-7 py-10 text-center sm:px-10">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-pending/15 text-gold-deep">
                <ShieldCheck size={26} />
              </span>
              <h1 className="mt-5 text-3xl">¡Solicitud recibida!</h1>
              <p className="mx-auto mt-3 max-w-md font-sans text-ink-soft">
                Tu perfil está <b>pendiente de verificación</b>. Lo revisamos a
                mano —así cuidamos a las parejas y a los buenos proveedores. Te
                contactaremos por WhatsApp. Aún no eres visible para las parejas.
              </p>

              <div className="mx-auto mt-7 max-w-md rounded-2xl border border-gold/40 bg-gold-soft/20 px-5 py-4 text-left">
                <p className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-eyebrow text-gold-deep">
                  <Link2 size={13} /> Tu link privado de edición
                </p>
                <p className="mt-1 break-all font-sans text-sm text-ink">{editUrl}</p>
                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(editUrl).catch(() => {});
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                  className="mt-2 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-sage-600 hover:text-sage-700"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copiado" : "Copiar link"}
                </button>
                <p className="mt-2 font-sans text-xs text-ink-faint">
                  ⚠️ Guárdalo bien: es tu única llave para editar tu perfil. No lo
                  compartas.
                </p>
              </div>
            </div>
          </Reveal>
        ) : (
          <>
            <Reveal>
              <p className="eyebrow">Anúnciate en wedRing</p>
              <h1 className="mt-2 text-[2.2rem] leading-tight">
                Llega a parejas que ya están planeando su boda.
              </h1>
              <p className="mt-3 max-w-xl font-sans text-lg text-ink-soft">
                wedRing recomienda proveedores <b>verificados a mano</b> justo
                cuando la pareja los necesita. Registrarte es gratis.
              </p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    icon: BadgeCheck,
                    t: "Verificación honesta",
                    d: "Revisamos cada perfil a mano. La insignia se gana, no se compra.",
                  },
                  {
                    icon: ShieldCheck,
                    t: "Orden por mérito",
                    d: "Apareces por lo bien que encajas con la pareja — nunca por pagar.",
                  },
                  {
                    icon: Link2,
                    t: "Leads por WhatsApp",
                    d: "Las parejas te contactan directo a tu WhatsApp para cotizar.",
                  },
                ].map((b) => (
                  <li key={b.t} className="card-calm px-5 py-4">
                    <b.icon size={18} className="text-sage-600" />
                    <p className="mt-2 font-serif text-base text-ink">{b.t}</p>
                    <p className="mt-1 font-sans text-xs leading-relaxed text-ink-soft">
                      {b.d}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-8" delay={0.08}>
              <div className="card-calm p-6 sm:p-8">
                <h2 className="font-serif text-xl text-ink">Registra tu negocio</h2>
                <p className="mb-5 mt-1 font-sans text-sm text-ink-faint">
                  Los campos con * son obligatorios. Tras enviar, quedas en
                  revisión manual.
                </p>
                <VendorForm
                  initial={vendorToValues()}
                  submitLabel="Enviar a verificación"
                  onSubmit={async (values) => {
                    const res = await fetch("/api/vendors", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(values),
                    });
                    if (!res.ok) {
                      const d = await res.json().catch(() => ({}));
                      throw new Error(d.error ?? "No se pudo registrar");
                    }
                    const d = (await res.json()) as { editToken: string };
                    setResult(d);
                    window.scrollTo({ top: 0 });
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
