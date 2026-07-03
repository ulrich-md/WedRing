"use client";

// Formulario de perfil de proveedor — se usa en el registro (/anunciantes)
// y en el dashboard del proveedor (/proveedor/[editToken]).

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { VENDOR_CATEGORIES, type Vendor, type VendorCategory } from "@/lib/types";

export interface VendorFormValues {
  name: string;
  category: VendorCategory;
  city: string;
  description: string;
  priceRange: "$" | "$$" | "$$$";
  whatsapp: string;
  availability: string;
}

export function vendorToValues(v?: Vendor | null): VendorFormValues {
  return {
    name: v?.name ?? "",
    category: v?.category ?? "fotografia",
    city: v?.city ?? "",
    description: v?.description ?? "",
    priceRange: v?.priceRange ?? "$$",
    whatsapp: v?.whatsapp ?? "",
    availability: v?.availability ?? "",
  };
}

export function VendorForm({
  initial,
  submitLabel,
  onSubmit,
}: {
  initial: VendorFormValues;
  submitLabel: string;
  onSubmit: (values: VendorFormValues) => Promise<void>;
}) {
  const [v, setV] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const set = <K extends keyof VendorFormValues>(k: K, val: VendorFormValues[K]) =>
    setV((p) => ({ ...p, [k]: val }));

  const valid =
    v.name.trim() && v.city.trim() && v.whatsapp.trim() && v.description.trim();

  return (
    <form
      className="grid gap-3 sm:grid-cols-2"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!valid || busy) return;
        setBusy(true);
        setError("");
        try {
          await onSubmit(v);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Algo salió mal");
        } finally {
          setBusy(false);
        }
      }}
    >
      <Field label="Nombre del negocio *">
        <input
          value={v.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Estudio Luz & Cámara"
          className={inputCls}
        />
      </Field>
      <Field label="Categoría *">
        <select
          value={v.category}
          onChange={(e) => set("category", e.target.value as VendorCategory)}
          className={inputCls}
        >
          {VENDOR_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Ciudad *">
        <input
          value={v.city}
          onChange={(e) => set("city", e.target.value)}
          placeholder="Querétaro"
          className={inputCls}
        />
      </Field>
      <Field label="WhatsApp del negocio *">
        <input
          value={v.whatsapp}
          onChange={(e) => set("whatsapp", e.target.value)}
          placeholder="55 1234 5678"
          inputMode="tel"
          className={inputCls}
        />
      </Field>
      <Field label="Rango de precios *">
        <div className="flex gap-2">
          {(["$", "$$", "$$$"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => set("priceRange", p)}
              className={
                "h-11 flex-1 rounded-xl border font-sans text-sm transition-colors duration-[250ms] ease-calm " +
                (v.priceRange === p
                  ? "border-sage-300 bg-sage-50 font-semibold text-sage-700"
                  : "border-line bg-card text-ink-soft")
              }
            >
              {p}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Disponibilidad (opcional)">
        <input
          value={v.availability}
          onChange={(e) => set("availability", e.target.value)}
          placeholder="Fines de semana 2026–2027"
          className={inputCls}
        />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Descripción (qué los hace especiales) *">
          <textarea
            value={v.description}
            onChange={(e) => set("description", e.target.value)}
            rows={4}
            placeholder="Cuéntales a las parejas quiénes son, su estilo y qué incluyen sus paquetes…"
            className={inputCls + " py-3"}
          />
        </Field>
      </div>

      {error && (
        <p className="font-sans text-sm text-declined sm:col-span-2">{error}</p>
      )}

      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={!valid || busy} className="w-full sm:w-auto">
          {busy ? "Enviando…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}

const inputCls =
  "h-11 w-full rounded-xl border border-line bg-ivory/60 px-4 font-sans text-[0.95rem] text-ink placeholder:text-ink-faint/70 focus:border-sage-300 focus:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-sans text-sm font-medium text-ink-soft">
        {label}
      </span>
      {children}
    </label>
  );
}
