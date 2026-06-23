"use client";

import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { LucideIcon } from "lucide-react";

/**
 * Estado "próximamente" calmado para las secciones que aún se construyen.
 * Honesto y cálido: te dice qué vivirá aquí, sin sentirse roto ni vacío.
 * Cada sección nueva debe sentirse igual de cuidada que la primera pantalla.
 */
export function ComingSoon({
  icon: Icon,
  title,
  description,
  bullets,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  bullets: string[];
}) {
  return (
    <Reveal className="mt-10">
      <div className="card-calm mx-auto max-w-xl px-8 py-12 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-rosa-50 text-rosa-600">
          <Icon size={24} />
        </span>
        <h2 className="mt-6 text-2xl">{title}</h2>
        <p className="mx-auto mt-2 max-w-md font-sans text-ink-soft">
          {description}
        </p>

        <ul className="mx-auto mt-7 grid max-w-sm gap-2.5 text-left">
          {bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-3 font-sans text-sm text-ink-soft"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-9">
          <ButtonLink href="/tablero" variant="soft">
            Volver al tablero
          </ButtonLink>
        </div>
        <p className="mt-5 font-sans text-xs text-ink-faint">
          Llegará pronto, con la misma calma de siempre.
        </p>
      </div>
    </Reveal>
  );
}
