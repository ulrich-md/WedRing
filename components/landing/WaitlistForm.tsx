"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * Captura para la lista de espera (pre-lanzamiento). Honesta: sin números
 * inventados, sin urgencia falsa. Por ahora guarda en localStorage; el único
 * punto a cambiar para producción es submit() — apúntalo a tu endpoint
 * (API route, Formspree, Resend, Supabase…) y listo.
 */
async function submitToWaitlist(contact: string) {
  // 🔌 PRODUCCIÓN: reemplaza esto por tu backend, p. ej.:
  //   await fetch("/api/waitlist", { method: "POST", body: JSON.stringify({ contact }) });
  try {
    const key = "wedring.waitlist";
    const prev = JSON.parse(window.localStorage.getItem(key) || "[]");
    prev.push({ contact, ts: new Date().toISOString() });
    window.localStorage.setItem(key, JSON.stringify(prev));
  } catch {
    /* sin drama */
  }
}

export function WaitlistForm({
  variant = "light",
  id,
}: {
  /** "light" sobre marfil, "dark" sobre sage */
  variant?: "light" | "dark";
  id?: string;
}) {
  const [contact, setContact] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const dark = variant === "dark";

  async function handle(e: React.FormEvent) {
    e.preventDefault();
    if (!contact.trim() || busy) return;
    setBusy(true);
    await submitToWaitlist(contact.trim());
    setBusy(false);
    setDone(true);
  }

  if (done) {
    return (
      <div
        className={
          "flex items-center gap-3 rounded-full px-5 py-3.5 font-sans text-sm " +
          (dark ? "bg-ivory/12 text-ivory" : "bg-sage-50 text-sage-700")
        }
      >
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sage-600 text-ivory">
          <Check size={15} />
        </span>
        Listo, te avisamos en cuanto abramos. Sin spam, lo prometemos.
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={handle}
      className="flex w-full flex-col gap-2.5 sm:flex-row"
    >
      <label className="sr-only" htmlFor={`${id ?? "wl"}-input`}>
        Tu correo o WhatsApp
      </label>
      <input
        id={`${id ?? "wl"}-input`}
        type="text"
        inputMode="email"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        placeholder="Tu correo o WhatsApp"
        className={
          "h-12 flex-1 rounded-full px-5 font-sans text-[0.95rem] outline-none transition-colors duration-[250ms] ease-calm " +
          (dark
            ? "border border-ivory/25 bg-ivory/10 text-ivory placeholder:text-ivory/55 focus:border-gold-soft"
            : "border border-line bg-card text-ink placeholder:text-ink-faint/70 focus:border-sage-300")
        }
      />
      <Button
        type="submit"
        variant={dark ? "gold" : "primary"}
        disabled={!contact.trim() || busy}
        className="shrink-0"
      >
        Apúntame
        <ArrowRight size={17} />
      </Button>
    </form>
  );
}
