"use client";

import { ListChecks } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ComingSoon } from "@/components/ui/ComingSoon";

export default function ChecklistPage() {
  return (
    <div>
      <SectionHeader
        eyebrow="Siempre sabes qué sigue"
        title="Checklist con cronograma"
        subtitle="Un plan guiado, mes a mes, para que nunca te sientas perdida."
      />
      <ComingSoon
        icon={ListChecks}
        title="Tu plan, organizado por meses"
        description="12 meses, 10 meses, 8 meses… cada tarea en su momento, sin que tengas que pensarlo todo de golpe."
        bullets={[
          "Tareas agrupadas por mes antes de la boda",
          "Vas palomeando y viendo tu avance",
          "Los proveedores aparecen justo cuando los necesitas",
          "Sin sentirte perdida, nunca",
        ]}
      />
    </div>
  );
}
