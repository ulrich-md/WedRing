"use client";

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

export default function TableroPage() {
  const { wedding } = useWedding();
  if (!wedding) return null;

  return (
    <div className="space-y-7">
      <CountdownHero wedding={wedding} />

      <NextStepCard />

      <div>
        <p className="eyebrow">De un vistazo</p>
        <h2 className="mt-1.5 text-2xl">Tu boda, en orden</h2>
      </div>

      {/* Tarjetas tranquilas. Aún vacías, pero invitan en vez de regañar. */}
      <RevealStagger
        gap={0.07}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <SummaryCard
          href="/invitados"
          icon={Users}
          label="Invitados confirmados"
          value="0"
          sub="Aún no agregas invitados. Empieza por aquí cuando quieras."
          cta="Agregar invitados"
        />
        <SummaryCard
          href="/presupuesto"
          icon={Wallet}
          label="Presupuesto usado"
          value="0%"
          sub="Define tu total y lleva el control con tranquilidad."
          progress={0}
          cta="Definir presupuesto"
        />
        <SummaryCard
          href="/checklist"
          icon={ListChecks}
          label="Tareas completadas"
          value="0 / 0"
          sub="Un plan guiado, mes a mes, para que siempre sepas qué sigue."
          progress={0}
          cta="Ver mi checklist"
        />
        <SummaryCard
          href="/proveedores"
          icon={Store}
          label="Proveedores"
          value="0"
          sub="Descubre fotógrafos, haciendas y catering reales y verificados."
          cta="Explorar proveedores"
        />
        <SummaryCard
          href="/padrinos"
          icon={HeartHandshake}
          label="Padrinos"
          value="0"
          sub="Asigna padrinos por rol y lleva quién patrocina qué."
          cta="Asignar padrinos"
        />
        <SummaryCard
          href="/web"
          icon={Globe}
          label="Web de boda"
          value="Sin publicar"
          sub="Un sitio simple y bonito con los detalles y el RSVP."
          cta="Crear mi web"
        />
      </RevealStagger>
    </div>
  );
}
