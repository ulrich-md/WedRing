"use client";

import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { RevealItem } from "@/components/ui/Reveal";

/**
 * Tarjeta tranquila de resumen. Una métrica clara, una línea de contexto,
 * y un camino suave hacia la sección. Nada de ceros fríos: cuando está vacía,
 * invita en vez de regañar.
 */
export function SummaryCard({
  href,
  icon: Icon,
  label,
  value,
  sub,
  progress,
  cta,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  value: string;
  sub: string;
  /** 0–100; si se da, dibuja una barra calmada en sage */
  progress?: number;
  cta?: string;
}) {
  return (
    <RevealItem>
      <Link
        href={href}
        className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 shadow-calm transition-all duration-[250ms] ease-calm hover:-translate-y-0.5 hover:border-sage-200 hover:shadow-lift"
      >
        <div className="flex items-center justify-between">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-sage-50 text-sage-600">
            <Icon size={19} />
          </span>
          <ArrowUpRight
            size={18}
            className="text-ink-faint/50 transition-colors duration-[250ms] ease-calm group-hover:text-gold-deep"
          />
        </div>

        <p className="mt-5 font-sans text-sm font-medium text-ink-faint">
          {label}
        </p>
        <p className="mt-1 font-serif text-3xl leading-none text-ink">
          {value}
        </p>

        {typeof progress === "number" && (
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-sage-50">
            <div
              className="h-full rounded-full bg-sage-400 transition-[width] duration-[850ms] ease-calm"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        )}

        <p className="mt-3 font-sans text-sm leading-snug text-ink-soft">
          {sub}
        </p>

        {cta && (
          <span className="mt-auto pt-4 font-sans text-sm font-medium text-sage-600">
            {cta}
          </span>
        )}
      </Link>
    </RevealItem>
  );
}
