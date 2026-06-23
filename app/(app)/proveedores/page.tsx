"use client";

import { Store } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ComingSoon } from "@/components/ui/ComingSoon";

export default function ProveedoresPage() {
  return (
    <div>
      <SectionHeader
        eyebrow="Reales y verificados"
        title="Proveedores"
        subtitle="Fotógrafos, haciendas, catering, mariachi. Ordenados por lo que mejor te queda —nunca por quién pagó."
      />
      <ComingSoon
        icon={Store}
        title="Proveedores locales, verificados a mano"
        description="Aquí nadie compra el primer lugar, y eso se siente."
        bullets={[
          "Descubre proveedores reales de tu zona",
          "Aparecen justo cuando los necesitas",
          "Guarda tus favoritos",
          "Lleva el control de cotizaciones y pagos",
        ]}
      />
    </div>
  );
}
