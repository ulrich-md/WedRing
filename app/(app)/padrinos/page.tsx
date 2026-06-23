"use client";

import { HeartHandshake } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ComingSoon } from "@/components/ui/ComingSoon";

export default function PadrinosPage() {
  return (
    <div>
      <SectionHeader
        eyebrow="El alma local"
        title="Padrinos"
        subtitle="Lo que ninguna app gringa tiene: padrinos de lazo, de anillos, de arras, de ramo."
      />
      <ComingSoon
        icon={HeartHandshake}
        title="Tus padrinos, por rol"
        description="Asigna a cada quien su papel y lleva el registro de quién patrocina qué."
        bullets={[
          "Padrinos de lazo, anillos, arras, ramo y más",
          "Registra quién patrocina qué",
          "Sus aportaciones se suman a tu presupuesto",
          "Parte del corazón mexicano de wedRing",
        ]}
      />
    </div>
  );
}
