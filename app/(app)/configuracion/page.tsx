"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, LogOut } from "lucide-react";
import { useWedding } from "@/components/providers/WeddingProvider";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { STYLES, PALETTES, defaultWedding } from "@/lib/wedding";
import type { Wedding, WeddingStyle } from "@/lib/types";

export default function ConfiguracionPage() {
  const router = useRouter();
  const { wedding, session, saveWedding, signOut } = useWedding();
  const [draft, setDraft] = useState<Wedding>(wedding ?? defaultWedding());
  const [saved, setSaved] = useState(false);

  function set<K extends keyof Wedding>(key: K, value: Wedding[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
    setSaved(false);
  }

  function save() {
    saveWedding(draft);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2400);
  }

  return (
    <div>
      <SectionHeader
        eyebrow="A tu ritmo"
        title="Ajustes"
        subtitle="Los detalles de tu boda y de tu cuenta. Cámbialos cuando quieras."
      />

      <Reveal className="mt-8 space-y-6">
        {/* Tu boda */}
        <Panel title="Tu boda">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Nombre"
              value={draft.partners[0]}
              onChange={(v) => set("partners", [v, draft.partners[1]])}
              placeholder="Sofía"
            />
            <Field
              label="Nombre"
              value={draft.partners[1]}
              onChange={(v) => set("partners", [draft.partners[0], v])}
              placeholder="Mateo"
            />
            <Field
              label="Fecha de la boda"
              type="date"
              value={draft.date ?? ""}
              onChange={(v) => set("date", v || null)}
            />
            <Field
              label="Lugar"
              value={draft.location}
              onChange={(v) => set("location", v)}
              placeholder="Hacienda en Querétaro"
            />
          </div>

          <Subtitle>Estilo</Subtitle>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {STYLES.map((s) => (
              <button
                key={s.id}
                onClick={() => set("style", s.id as WeddingStyle)}
                className={
                  "rounded-xl border px-4 py-3 text-left font-sans text-sm transition-all duration-[250ms] ease-calm " +
                  (draft.style === s.id
                    ? "border-rosa-300 bg-rosa-50 font-medium text-rosa-700"
                    : "border-line bg-card text-ink-soft hover:border-rosa-200")
                }
              >
                {s.label}
              </button>
            ))}
          </div>

          <Subtitle>Paleta</Subtitle>
          <div className="flex flex-wrap gap-2.5">
            {PALETTES.map((p) => (
              <button
                key={p.name}
                onClick={() => set("palette", p)}
                title={p.name}
                className={
                  "flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3.5 transition-all duration-[250ms] ease-calm " +
                  (draft.palette.name === p.name
                    ? "border-rosa-300 bg-rosa-50"
                    : "border-line bg-card hover:border-rosa-200")
                }
              >
                <span
                  className="h-6 w-6 rounded-full ring-1 ring-black/5"
                  style={{ backgroundColor: p.hex }}
                />
                <span className="font-sans text-sm text-ink-soft">
                  {p.name}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-7 flex items-center gap-4">
            <Button onClick={save}>
              {saved ? (
                <>
                  <Check size={17} /> Guardado
                </>
              ) : (
                "Guardar cambios"
              )}
            </Button>
            {saved && (
              <span className="font-sans text-sm text-rosa-600">
                Listo, todo en orden.
              </span>
            )}
          </div>
        </Panel>

        {/* Tu cuenta */}
        <Panel title="Tu cuenta">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-sans font-medium text-ink">{session?.name}</p>
              <p className="font-sans text-sm text-ink-faint">
                {session?.contact}
                {session?.method === "whatsapp" ? " · WhatsApp" : " · Correo"}
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                signOut();
                router.replace("/login");
              }}
            >
              <LogOut size={16} /> Cerrar sesión
            </Button>
          </div>
        </Panel>
      </Reveal>
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="card-calm p-6 sm:p-8">
      <h2 className="text-xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Subtitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2.5 mt-6 font-sans text-sm font-medium text-ink-soft">
      {children}
    </p>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-sans text-sm font-medium text-ink-soft">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-line bg-card px-4 font-sans text-ink placeholder:text-ink-faint/70 transition-colors duration-[250ms] ease-calm focus:border-rosa-300 focus:outline-none"
      />
    </label>
  );
}
