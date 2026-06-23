"use client";

import dynamic from "next/dynamic";

// El canvas 3D es solo de cliente (usa WebGL): lo cargamos sin SSR.
const Ring3D = dynamic(() => import("@/components/landing/Ring3D"), {
  ssr: false,
});

/**
 * Capa fija donde vive el anillo 3D. No bloquea clics (pointer-events: none)
 * y se sienta por encima del contenido para que se le vea viajar; el hueco del
 * anillo deja respirar al texto.
 */
export function RingLayer() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 hidden sm:block"
      aria-hidden
    >
      <Ring3D />
    </div>
  );
}
