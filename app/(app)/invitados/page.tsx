"use client";

import { Users } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ComingSoon } from "@/components/ui/ComingSoon";

export default function InvitadosPage() {
  return (
    <div>
      <SectionHeader
        eyebrow="El corazón"
        title="Invitados & RSVP"
        subtitle="Aquí vivirá la función estrella de wedRing: confirmar a todos por WhatsApp, sin invitaciones de papel que nadie contesta."
      />
      <ComingSoon
        icon={Users}
        title="Tu lista de invitados, en camino"
        description="Estamos construyendo el corazón de wedRing con todo el cariño. Será lo siguiente."
        bullets={[
          "Agrega o importa a tus invitados en segundos",
          "Cada uno recibe su link personal por WhatsApp",
          "Confirman sí / no / tal vez, cuántos van y qué van a comer",
          "Tu conteo se actualiza solo, en vivo",
          "Un toque para recordarle a quien no ha contestado",
        ]}
      />
    </div>
  );
}
