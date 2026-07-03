"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Trash2, HeartHandshake, Wallet } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { useLocalState, uid } from "@/lib/local";
import { DEFAULT_ROLES, type Padrino } from "@/lib/padrinos";

const money = (n: number) =>
  n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });

export default function PadrinosPage() {
  const [padrinos, setPadrinos] = useLocalState<Padrino[]>("wedring.padrinos", []);
  const total = useMemo(
    () => padrinos.reduce((n, p) => n + (p.amount || 0), 0),
    [padrinos],
  );

  return (
    <div>
      <SectionHeader
        eyebrow="El alma local"
        title="Padrinos"
        subtitle="De lazo, de anillos, de arras, de ramo —o el rol que ustedes quieran. Lo que ninguna app gringa entiende."
      />

      {/* Resumen de aportaciones */}
      <Reveal className="mt-8">
        <div className="card-calm flex flex-wrap items-center gap-x-6 gap-y-2 px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-soft/50 text-gold-deep">
              <HeartHandshake size={19} />
            </span>
            <div>
              <p className="font-serif text-2xl leading-none text-ink">
                {padrinos.length}
              </p>
              <p className="font-sans text-xs text-ink-faint">padrinos asignados</p>
            </div>
          </div>
          {total > 0 && (
            <div className="ml-auto text-right">
              <p className="font-serif text-2xl leading-none text-sage-600">
                {money(total)}
              </p>
              <p className="font-sans text-xs text-ink-faint">
                en aportaciones —ya sumadas a tu{" "}
                <Link href="/presupuesto" className="text-sage-600 underline underline-offset-2">
                  presupuesto
                </Link>
              </p>
            </div>
          )}
        </div>
      </Reveal>

      {/* Alta */}
      <Reveal className="mt-6" delay={0.05}>
        <div className="card-calm p-6">
          <h2 className="font-serif text-xl text-ink">Asignar padrino</h2>
          <AddPadrino
            onAdd={(p) => setPadrinos((prev) => [...prev, { ...p, id: uid() }])}
          />
        </div>
      </Reveal>

      {/* Lista */}
      <Reveal className="mt-6" delay={0.08}>
        {padrinos.length === 0 ? (
          <div className="card-calm px-6 py-12 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gold-soft/40 text-gold-deep">
              <HeartHandshake size={22} />
            </span>
            <p className="mt-4 font-serif text-xl text-ink">
              Tus padrinos vivirán aquí
            </p>
            <p className="mx-auto mt-1 max-w-sm font-sans text-sm text-ink-soft">
              Asigna a cada quien su rol y, si patrocinan algo, llévalo claro y
              con cariño.
            </p>
          </div>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {padrinos.map((p) => (
              <li key={p.id} className="card-calm px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-sans text-xs font-semibold uppercase tracking-eyebrow text-gold-deep">
                      {p.role}
                    </p>
                    <p className="mt-1 font-serif text-lg leading-tight text-ink">
                      {p.name}
                    </p>
                    {p.contact && (
                      <p className="font-sans text-xs text-ink-faint">📱 {p.contact}</p>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      setPadrinos((prev) => prev.filter((x) => x.id !== p.id))
                    }
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-faint hover:bg-declined/10 hover:text-declined"
                    title="Quitar"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                {(p.sponsors || p.amount) && (
                  <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-line pt-3">
                    {p.sponsors && (
                      <span className="rounded-full bg-sage-50 px-3 py-1 font-sans text-xs text-sage-700">
                        Patrocina: {p.sponsors}
                      </span>
                    )}
                    {p.amount ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gold-soft/50 px-3 py-1 font-sans text-xs font-medium text-gold-deep">
                        <Wallet size={11} /> {money(p.amount)}
                      </span>
                    ) : null}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </Reveal>
    </div>
  );
}

function AddPadrino({ onAdd }: { onAdd: (p: Omit<Padrino, "id">) => void }) {
  const [role, setRole] = useState(DEFAULT_ROLES[0]);
  const [customRole, setCustomRole] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [sponsors, setSponsors] = useState("");
  const [amount, setAmount] = useState("");
  const isCustom = role === "__otro__";
  const finalRole = isCustom ? customRole.trim() : role;

  return (
    <form
      className="mt-4 grid gap-2.5 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (!name.trim() || !finalRole) return;
        onAdd({
          role: finalRole,
          name: name.trim(),
          contact: contact.trim() || undefined,
          sponsors: sponsors.trim() || undefined,
          amount: Number(amount) > 0 ? Number(amount) : undefined,
        });
        setName("");
        setContact("");
        setSponsors("");
        setAmount("");
        setCustomRole("");
      }}
    >
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="h-11 rounded-xl border border-line bg-ivory/60 px-3 font-sans text-[0.95rem] text-ink focus:border-sage-300 focus:outline-none"
      >
        {DEFAULT_ROLES.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
        <option value="__otro__">Otro rol…</option>
      </select>
      {isCustom && (
        <input
          value={customRole}
          onChange={(e) => setCustomRole(e.target.value)}
          placeholder="Padrinos de… (escríbelo)"
          className="h-11 rounded-xl border border-line bg-ivory/60 px-4 font-sans text-[0.95rem] text-ink placeholder:text-ink-faint/70 focus:border-sage-300 focus:outline-none"
        />
      )}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre(s)"
        className="h-11 rounded-xl border border-line bg-ivory/60 px-4 font-sans text-[0.95rem] text-ink placeholder:text-ink-faint/70 focus:border-sage-300 focus:outline-none"
      />
      <input
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        placeholder="WhatsApp (opcional)"
        inputMode="tel"
        className="h-11 rounded-xl border border-line bg-ivory/60 px-4 font-sans text-[0.95rem] text-ink placeholder:text-ink-faint/70 focus:border-sage-300 focus:outline-none"
      />
      <input
        value={sponsors}
        onChange={(e) => setSponsors(e.target.value)}
        placeholder="¿Qué patrocinan? (opcional)"
        className="h-11 rounded-xl border border-line bg-ivory/60 px-4 font-sans text-[0.95rem] text-ink placeholder:text-ink-faint/70 focus:border-sage-300 focus:outline-none"
      />
      <div className="flex gap-2.5">
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          min={0}
          placeholder="Aportación $ (opcional)"
          className="h-11 flex-1 rounded-xl border border-line bg-ivory/60 px-4 font-sans text-[0.95rem] text-ink placeholder:text-ink-faint/70 focus:border-sage-300 focus:outline-none"
        />
        <Button type="submit" disabled={!name.trim() || !finalRole}>
          <Plus size={17} /> Asignar
        </Button>
      </div>
    </form>
  );
}
