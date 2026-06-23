"use client";

import { Wallet } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ComingSoon } from "@/components/ui/ComingSoon";

export default function PresupuestoPage() {
  return (
    <div>
      <SectionHeader
        eyebrow="Tu dinero, con calma"
        title="Presupuesto"
        subtitle="Claridad tranquila sobre el dinero: cuánto llevas y cuánto te queda, sin sustos."
      />
      <ComingSoon
        icon={Wallet}
        title="Tu presupuesto, claro y sin estrés"
        description="Pronto podrás definir tu total y registrar tus gastos por categoría."
        bullets={[
          "Define un total y ve cuánto te queda",
          "Registra gastos por categoría",
          "Una gráfica sencilla, nada abrumador",
          "Las aportaciones de tus padrinos se suman aquí",
        ]}
      />
    </div>
  );
}
