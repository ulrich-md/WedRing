"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Trash2, AlertTriangle, HeartHandshake } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { useLocalState, uid } from "@/lib/local";
import type { Padrino } from "@/lib/padrinos";

export interface Expense {
  id: string;
  label: string;
  category: string;
  amount: number;
}

const CATEGORIES = [
  "Venue",
  "Banquete",
  "Fotografía",
  "Música",
  "Flores",
  "Vestuario",
  "Anillos",
  "Papelería",
  "Otros",
];

const money = (n: number) =>
  n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });

export default function PresupuestoPage() {
  const [total, setTotal] = useLocalState<number>("wedring.budget.total", 0);
  const [expenses, setExpenses] = useLocalState<Expense[]>(
    "wedring.budget.expenses",
    [],
  );
  // Las aportaciones de padrinos suman al presupuesto disponible.
  const [padrinos] = useLocalState<Padrino[]>("wedring.padrinos", []);

  const aportaciones = useMemo(
    () => padrinos.reduce((n, p) => n + (p.amount || 0), 0),
    [padrinos],
  );
  const spent = useMemo(
    () => expenses.reduce((n, e) => n + e.amount, 0),
    [expenses],
  );
  const available = total + aportaciones;
  const remaining = available - spent;
  const pct = available > 0 ? Math.min(100, Math.round((spent / available) * 100)) : 0;
  const over = available > 0 && spent > available;

  // Gráfica: magnitud por categoría → barras horizontales, UN solo tono
  // (sage), etiqueta de texto directa en cada barra (identidad por texto,
  // nunca solo por color — validado con el método de dataviz).
  const byCategory = useMemo(() => {
    const map = new Map<string, number>();
    for (const e of expenses) map.set(e.category, (map.get(e.category) ?? 0) + e.amount);
    const max = Math.max(1, ...Array.from(map.values()));
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([cat, amt]) => ({ cat, amt, w: (amt / max) * 100 }));
  }, [expenses]);

  return (
    <div>
      <SectionHeader
        eyebrow="Tu dinero, con calma"
        title="Presupuesto"
        subtitle="Un total claro, tus gastos por categoría y cuánto te queda. Sin sustos."
      />

      {/* Resumen */}
      <Reveal className="mt-8">
        <div className="card-calm p-6 sm:p-7">
          <div className="grid gap-6 sm:grid-cols-[1fr_auto]">
            <div>
              <label className="font-sans text-sm font-medium text-ink-soft">
                Presupuesto total
              </label>
              <div className="mt-1.5 flex items-center gap-3">
                <span className="font-serif text-2xl text-ink-faint">$</span>
                <input
                  type="number"
                  min={0}
                  value={total || ""}
                  onChange={(e) => setTotal(Math.max(0, Number(e.target.value) || 0))}
                  placeholder="250000"
                  className="h-12 w-44 rounded-xl border border-line bg-ivory/60 px-4 font-serif text-2xl text-ink focus:border-sage-300 focus:outline-none"
                />
                <span className="font-sans text-xs text-ink-faint">MXN</span>
              </div>
              {aportaciones > 0 && (
                <p className="mt-2 inline-flex items-center gap-1.5 font-sans text-sm text-sage-700">
                  <HeartHandshake size={14} className="text-gold-deep" />
                  + {money(aportaciones)} de tus{" "}
                  <Link href="/padrinos" className="underline underline-offset-2">
                    padrinos
                  </Link>
                </p>
              )}
            </div>

            <div className="text-right">
              <p className="font-sans text-xs uppercase tracking-eyebrow text-ink-faint">
                {over ? "Te pasaste por" : "Te queda"}
              </p>
              <p
                className={
                  "font-serif text-4xl leading-tight " +
                  (over ? "text-declined" : "text-sage-600")
                }
              >
                {money(Math.abs(remaining))}
              </p>
              <p className="font-sans text-xs text-ink-faint">
                {money(spent)} gastado de {money(available)}
              </p>
            </div>
          </div>

          <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-sage-50">
            <div
              className={
                "h-full rounded-full transition-[width] duration-[850ms] ease-calm " +
                (over ? "bg-declined" : "bg-sage-400")
              }
              style={{ width: `${pct}%` }}
            />
          </div>
          {over && (
            <p className="mt-2 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-declined">
              <AlertTriangle size={14} /> Vas arriba del presupuesto — respira,
              ajustemos juntas.
            </p>
          )}
        </div>
      </Reveal>

      {/* Gráfica por categoría */}
      {byCategory.length > 0 && (
        <Reveal className="mt-6" delay={0.05}>
          <div className="card-calm p-6 sm:p-7">
            <h2 className="font-serif text-xl text-ink">Por categoría</h2>
            <ul className="mt-4 space-y-3">
              {byCategory.map(({ cat, amt, w }) => (
                <li key={cat}>
                  <div className="flex items-baseline justify-between font-sans text-sm">
                    <span className="font-medium text-ink">{cat}</span>
                    <span className="text-ink-soft">{money(amt)}</span>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-sage-50">
                    <div
                      className="h-full rounded-full bg-sage-400"
                      style={{ width: `${Math.max(2, w)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}

      {/* Gastos */}
      <Reveal className="mt-6" delay={0.08}>
        <div className="card-calm p-6 sm:p-7">
          <h2 className="font-serif text-xl text-ink">Tus gastos</h2>
          <AddExpense
            onAdd={(e) => setExpenses((prev) => [{ ...e, id: uid() }, ...prev])}
          />
          {expenses.length === 0 ? (
            <p className="mt-5 font-sans text-sm text-ink-faint">
              Registra tu primer gasto arriba — el anticipo del venue, por
              ejemplo.
            </p>
          ) : (
            <ul className="mt-5 divide-y divide-line">
              {expenses.map((e) => (
                <li key={e.id} className="flex items-center gap-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-sans font-medium text-ink">
                      {e.label}
                    </p>
                    <p className="font-sans text-xs text-ink-faint">{e.category}</p>
                  </div>
                  <span className="font-serif text-lg text-ink">
                    {money(e.amount)}
                  </span>
                  <button
                    onClick={() =>
                      setExpenses((prev) => prev.filter((x) => x.id !== e.id))
                    }
                    className="grid h-8 w-8 place-items-center rounded-full text-ink-faint hover:bg-declined/10 hover:text-declined"
                    title="Eliminar gasto"
                  >
                    <Trash2 size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Reveal>
    </div>
  );
}

function AddExpense({ onAdd }: { onAdd: (e: Omit<Expense, "id">) => void }) {
  const [label, setLabel] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [amount, setAmount] = useState("");

  return (
    <form
      className="mt-4 flex flex-col gap-2.5 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        const amt = Number(amount);
        if (!label.trim() || !amt || amt <= 0) return;
        onAdd({ label: label.trim(), category, amount: amt });
        setLabel("");
        setAmount("");
      }}
    >
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Anticipo del venue"
        className="h-11 flex-1 rounded-xl border border-line bg-ivory/60 px-4 font-sans text-[0.95rem] text-ink placeholder:text-ink-faint/70 focus:border-sage-300 focus:outline-none"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="h-11 rounded-xl border border-line bg-ivory/60 px-3 font-sans text-[0.95rem] text-ink focus:border-sage-300 focus:outline-none"
      >
        {CATEGORIES.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        min={1}
        placeholder="$"
        className="h-11 w-32 rounded-xl border border-line bg-ivory/60 px-4 font-sans text-[0.95rem] text-ink placeholder:text-ink-faint/70 focus:border-sage-300 focus:outline-none"
      />
      <Button type="submit" disabled={!label.trim() || !Number(amount)}>
        <Plus size={17} /> Agregar
      </Button>
    </form>
  );
}
