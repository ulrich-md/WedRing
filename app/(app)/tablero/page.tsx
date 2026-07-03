"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Wallet,
  Users,
  ListChecks,
  Store,
  HeartHandshake,
  Globe,
} from "lucide-react";
import { useWedding } from "@/components/providers/WeddingProvider";
import { CountdownHero } from "@/components/dashboard/CountdownHero";
import { NextStepCard } from "@/components/dashboard/NextStepCard";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { RevealStagger } from "@/components/ui/Reveal";
import { api } from "@/lib/api";
import { useLocalState } from "@/lib/local";
import { TOTAL_TASKS } from "@/lib/checklist";
import type { Guest } from "@/lib/types";
import type { Expense } from "@/app/(app)/presupuesto/page";
import type { Padrino } from "@/lib/padrinos";

const money = (n: number) =>
  n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });

export default function TableroPage() {
  const { wedding } = useWedding();
  const [guests, setGuests] = useState<Guest[]>([]);

  // privados (localStorage)
  const [done] = useLocalState<Record<string, boolean>>("wedring.checklist", {});
  const [total] = useLocalState<number>("wedring.budget.total", 0);
  const [expenses] = useLocalState<Expense[]>("wedring.budget.expenses", []);
  const [padrinos] = useLocalState<Padrino[]>("wedring.padrinos", []);
  const [track] = useLocalState<Record<string, { fav: boolean }>>(
    "wedring.vendorTrack",
    {},
  );

  useEffect(() => {
    if (!wedding?.serverId || !wedding.coupleKey) return;
    api
      .listGuests(wedding)
      .then(({ guests }) => setGuests(guests))
      .catch(() => {});
  }, [wedding]);

  const stats = useMemo(() => {
    const confirmados = guests
      .filter((g) => g.status === "confirmado")
      .reduce((n, g) => n + g.party, 0);
    const pendientes = guests.filter((g) => g.status === "pendiente").length;
    const aportaciones = padrinos.reduce((n, p) => n + (p.amount || 0), 0);
    const available = total + aportaciones;
    const spent = expenses.reduce((n, e) => n + e.amount, 0);
    const budgetPct =
      available > 0 ? Math.min(100, Math.round((spent / available) * 100)) : 0;
    const doneCount = Object.values(done).filter(Boolean).length;
    const checklistPct = Math.round((doneCount / TOTAL_TASKS) * 100);
    const favs = Object.values(track).filter((t) => t.fav).length;
    return {
      confirmados,
      pendientes,
      totalGuests: guests.length,
      available,
      spent,
      budgetPct,
      doneCount,
      checklistPct,
      favs,
    };
  }, [guests, done, total, expenses, padrinos, track]);

  if (!wedding) return null;

  return (
    <div className="space-y-7">
      <CountdownHero wedding={wedding} />

      <NextStepCard />

      <div>
        <p className="eyebrow">De un vistazo</p>
        <h2 className="mt-1.5 text-2xl">Tu boda, en orden</h2>
      </div>

      <RevealStagger
        gap={0.07}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <SummaryCard
          href="/invitados"
          icon={Users}
          label="Invitados confirmados"
          value={String(stats.confirmados)}
          sub={
            stats.totalGuests === 0
              ? "Aún no agregas invitados. Empieza por aquí cuando quieras."
              : stats.pendientes > 0
                ? `${stats.pendientes} por confirmar — recuérdales con un toque.`
                : "Todos han respondido. Qué paz. 🤍"
          }
          cta={stats.totalGuests === 0 ? "Agregar invitados" : "Ver RSVP en vivo"}
        />
        <SummaryCard
          href="/presupuesto"
          icon={Wallet}
          label="Presupuesto usado"
          value={`${stats.budgetPct}%`}
          sub={
            stats.available === 0
              ? "Define tu total y lleva el control con tranquilidad."
              : `${money(stats.spent)} de ${money(stats.available)}.`
          }
          progress={stats.budgetPct}
          cta={stats.available === 0 ? "Definir presupuesto" : "Ver mis gastos"}
        />
        <SummaryCard
          href="/checklist"
          icon={ListChecks}
          label="Tareas completadas"
          value={`${stats.doneCount} / ${TOTAL_TASKS}`}
          sub="Un plan guiado, mes a mes, para que siempre sepas qué sigue."
          progress={stats.checklistPct}
          cta="Ver mi checklist"
        />
        <SummaryCard
          href="/proveedores"
          icon={Store}
          label="Proveedores favoritos"
          value={String(stats.favs)}
          sub="Verificados a mano y ordenados por lo que mejor te queda."
          cta="Explorar proveedores"
        />
        <SummaryCard
          href="/padrinos"
          icon={HeartHandshake}
          label="Padrinos"
          value={String(padrinos.length)}
          sub="Asigna padrinos por rol y lleva quién patrocina qué."
          cta={padrinos.length === 0 ? "Asignar padrinos" : "Ver mis padrinos"}
        />
        <SummaryCard
          href="/web"
          icon={Globe}
          label="Web de boda"
          value={wedding.slug ? "Publicada" : "Preparando…"}
          sub={
            wedding.slug
              ? `wedring.app/boda/${wedding.slug}`
              : "Un sitio simple y bonito con los detalles y el RSVP."
          }
          cta="Ver mi web"
        />
      </RevealStagger>
    </div>
  );
}
