"use client";

import { Globe } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ComingSoon } from "@/components/ui/ComingSoon";

export default function WebPage() {
  return (
    <div>
      <SectionHeader
        eyebrow="Para tus invitados"
        title="Tu web de boda"
        subtitle="Un sitio simple y bonito con los detalles de tu boda y el RSVP."
      />
      <ComingSoon
        icon={Globe}
        title="Una web tan calmada como tu boda"
        description="Tus invitados la visitan para conocer los detalles y confirmar su asistencia."
        bullets={[
          "Los detalles de tu boda, claros y bonitos",
          "RSVP integrado para tus invitados",
          "En español e inglés, para invitados internacionales",
          "Tu paleta de colores, reflejada en el sitio",
        ]}
      />
    </div>
  );
}
