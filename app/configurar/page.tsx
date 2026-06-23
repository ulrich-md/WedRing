"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useWedding } from "@/components/providers/WeddingProvider";
import { RingMark, Wordmark } from "@/components/brand/RingMark";
import { Button } from "@/components/ui/Button";
import { EASE_CALM } from "@/lib/motion";
import { defaultWedding, STYLES, PALETTES } from "@/lib/wedding";
import type { Wedding, WeddingStyle } from "@/lib/types";

const STEPS = ["Ustedes", "La fecha", "El estilo", "Los colores"] as const;

export default function ConfigurarPage() {
  const router = useRouter();
  const { ready, session, wedding, saveWedding } = useWedding();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Wedding>(() => wedding ?? defaultWedding());

  // Necesitas sesión para configurar; si ya hay boda, también se puede editar.
  useEffect(() => {
    if (ready && !session) router.replace("/login");
  }, [ready, session, router]);

  function set<K extends keyof Wedding>(key: K, value: Wedding[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function finish() {
    saveWedding({ ...draft, createdAt: draft.createdAt || new Date().toISOString() });
    router.push("/tablero");
  }

  const canContinue =
    step === 0 ? draft.partners[0].trim() !== "" : true;
  const isLast = step === STEPS.length - 1;

  return (
    <main className="min-h-dvh">
      {/* Cabecera tranquila con progreso por pasos */}
      <header className="mx-auto flex max-w-2xl items-center justify-between px-6 pt-8">
        <div className="flex items-center gap-2.5">
          <RingMark size={30} />
          <Wordmark className="text-xl" />
        </div>
        <button
          onClick={finish}
          className="font-sans text-sm text-ink-faint transition-colors duration-[250ms] ease-calm hover:text-ink-soft"
        >
          Saltar por ahora
        </button>
      </header>

      <div className="mx-auto mt-10 max-w-2xl px-6">
        <StepDots step={step} />

        <div className="mt-8 min-h-[22rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: EASE_CALM }}
            >
              {step === 0 && (
                <StepShell
                  eyebrow="Lo primero"
                  title="¿Quiénes se casan?"
                  hint="Sus nombres acompañarán cada pantalla. Puedes cambiarlos cuando quieras."
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <TextField
                      label="Nombre"
                      value={draft.partners[0]}
                      onChange={(v) =>
                        set("partners", [v, draft.partners[1]])
                      }
                      placeholder="Sofía"
                      autoFocus
                    />
                    <TextField
                      label="Nombre"
                      value={draft.partners[1]}
                      onChange={(v) =>
                        set("partners", [draft.partners[0], v])
                      }
                      placeholder="Mateo"
                    />
                  </div>
                  {(draft.partners[0] || draft.partners[1]) && (
                    <p className="mt-6 font-serif text-2xl text-ink-soft">
                      {draft.partners[0] || "…"}{" "}
                      <span className="text-gold">&</span>{" "}
                      {draft.partners[1] || "…"}
                    </p>
                  )}
                </StepShell>
              )}

              {step === 1 && (
                <StepShell
                  eyebrow="La fecha"
                  title="¿Ya tienen día?"
                  hint="Si todavía no lo deciden, no pasa nada. Lo defines después."
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <TextField
                      label="Fecha de la boda"
                      type="date"
                      value={draft.date ?? ""}
                      onChange={(v) => set("date", v || null)}
                    />
                    <TextField
                      label="Lugar (opcional)"
                      value={draft.location}
                      onChange={(v) => set("location", v)}
                      placeholder="Hacienda en Querétaro"
                    />
                  </div>
                </StepShell>
              )}

              {step === 2 && (
                <StepShell
                  eyebrow="El estilo"
                  title="¿Cómo te la imaginas?"
                  hint="Esto nos ayuda a sugerirte ideas y proveedores que van contigo."
                >
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {STYLES.map((s) => (
                      <ChoiceCard
                        key={s.id}
                        active={draft.style === s.id}
                        onClick={() => set("style", s.id as WeddingStyle)}
                        title={s.label}
                        hint={s.hint}
                      />
                    ))}
                  </div>
                </StepShell>
              )}

              {step === 3 && (
                <StepShell
                  eyebrow="Los colores"
                  title="Elige tu paleta"
                  hint="Le dará un toque tuyo a tu tablero y a tu web de boda."
                >
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {PALETTES.map((p) => (
                      <button
                        key={p.name}
                        onClick={() => set("palette", p)}
                        className={
                          "flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all duration-[250ms] ease-calm " +
                          (draft.palette.name === p.name
                            ? "border-rosa-300 bg-rosa-50 shadow-calm"
                            : "border-line bg-card hover:border-rosa-200")
                        }
                      >
                        <span
                          className="h-9 w-9 shrink-0 rounded-full ring-1 ring-black/5"
                          style={{ backgroundColor: p.hex }}
                        />
                        <span className="font-sans text-sm font-medium text-ink-soft">
                          {p.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </StepShell>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navegación entre pasos */}
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className={
              "inline-flex items-center gap-1.5 font-sans text-sm text-ink-faint transition-opacity duration-[250ms] ease-calm hover:text-ink-soft " +
              (step === 0 ? "pointer-events-none opacity-0" : "opacity-100")
            }
          >
            <ArrowLeft size={16} />
            Atrás
          </button>

          {isLast ? (
            <Button onClick={finish} size="lg">
              Crear mi boda
              <Check size={18} />
            </Button>
          ) : (
            <Button
              onClick={() => setStep((s) => s + 1)}
              size="lg"
              disabled={!canContinue}
            >
              Continuar
              <ArrowRight size={18} />
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}

function StepDots({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-3">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center gap-3">
          <span
            className={
              "font-sans text-sm transition-colors duration-[250ms] ease-calm " +
              (i === step
                ? "font-semibold text-rosa-700"
                : i < step
                  ? "text-rosa-500"
                  : "text-ink-faint/60")
            }
          >
            {label}
          </span>
          {i < STEPS.length - 1 && (
            <span className="h-px w-5 bg-line sm:w-8" />
          )}
        </div>
      ))}
    </div>
  );
}

function StepShell({
  eyebrow,
  title,
  hint,
  children,
}: {
  eyebrow: string;
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-2 text-[2rem] leading-tight">{title}</h1>
      <p className="mt-2 max-w-md font-sans text-ink-soft">{hint}</p>
      <div className="mt-7">{children}</div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoFocus?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-sans text-sm font-medium text-ink-soft">
        {label}
      </span>
      <input
        type={type}
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-line bg-card px-4 font-sans text-ink placeholder:text-ink-faint/70 transition-colors duration-[250ms] ease-calm focus:border-rosa-300 focus:outline-none"
      />
    </label>
  );
}

function ChoiceCard({
  active,
  onClick,
  title,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  hint: string;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-2xl border p-4 text-left transition-all duration-[250ms] ease-calm " +
        (active
          ? "border-rosa-300 bg-rosa-50 shadow-calm"
          : "border-line bg-card hover:border-rosa-200")
      }
    >
      <span className="block font-serif text-lg text-ink">{title}</span>
      <span className="mt-0.5 block font-sans text-xs leading-snug text-ink-faint">
        {hint}
      </span>
    </button>
  );
}
