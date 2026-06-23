"use client";

import { useReducedMotion } from "framer-motion";
import { HERO_VIDEO, photoBg } from "@/lib/photos";

/**
 * Tarjeta de video del hero: el beso de la pareja, en loop silencioso.
 * Capas de respaldo: video local → video remoto → póster (imagen) → degradado.
 * Si la persona prefiere menos movimiento, se muestra solo el póster (sin
 * reproducir). Nunca se ve roto.
 */
export function HeroVideo({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <figure
      className={
        "rounded-2xl border border-white bg-white p-2 shadow-lift " + className
      }
    >
      <div
        className="aspect-[9/16] overflow-hidden rounded-xl bg-cover bg-center"
        style={{ backgroundImage: photoBg(HERO_VIDEO.poster) }}
      >
        {!reduce && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={HERO_VIDEO.poster.remote}
            className="h-full w-full object-cover"
          >
            <source src={HERO_VIDEO.local} type="video/mp4" />
            {HERO_VIDEO.remote ? (
              <source src={HERO_VIDEO.remote} type="video/mp4" />
            ) : null}
          </video>
        )}
      </div>
    </figure>
  );
}
