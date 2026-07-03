"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check, Store, MessageCircle } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { useLocalState } from "@/lib/local";
import { CHECKLIST_TEMPLATE, TOTAL_TASKS } from "@/lib/checklist";
import { api, waLink } from "@/lib/api";
import { VENDOR_CATEGORIES, type Vendor } from "@/lib/types";

export default function ChecklistPage() {
  const [done, setDone] = useLocalState<Record<string, boolean>>(
    "wedring.checklist",
    {},
  );
  // Proveedores verificados por categoría (para sugerencias contextuales).
  const [vendors, setVendors] = useState<Record<string, Vendor[]>>({});

  useEffect(() => {
    api
      .listVendors()
      .then(({ vendors }) => {
        const by: Record<string, Vendor[]> = {};
        for (const v of vendors) (by[v.category] ??= []).push(v);
        setVendors(by);
      })
      .catch(() => {});
  }, []);

  const doneCount = useMemo(
    () => Object.values(done).filter(Boolean).length,
    [done],
  );
  const pct = Math.round((doneCount / TOTAL_TASKS) * 100);

  return (
    <div>
      <SectionHeader
        eyebrow="Siempre sabes qué sigue"
        title="Checklist con cronograma"
        subtitle="Un plan guiado, mes a mes. Palomea a tu ritmo — sin sentirte perdida."
      />

      {/* Avance */}
      <Reveal className="mt-8">
        <div className="card-calm flex items-center gap-5 px-6 py-5">
          <p className="font-serif text-4xl leading-none text-sage-600">{pct}%</p>
          <div className="flex-1">
            <div className="h-2 w-full overflow-hidden rounded-full bg-sage-50">
              <div
                className="h-full rounded-full bg-sage-400 transition-[width] duration-[850ms] ease-calm"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-1.5 font-sans text-xs text-ink-faint">
              {doneCount} de {TOTAL_TASKS} tareas · cada palomita es un paso menos
              de estrés
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-8 space-y-8">
        {CHECKLIST_TEMPLATE.map((section, si) => (
          <Reveal key={section.monthsBefore} delay={0.04 * si}>
            <p className="eyebrow">{section.title}</p>
            <ul className="mt-3 space-y-2.5">
              {section.tasks.map((task) => {
                const isDone = !!done[task.id];
                const suggestions = task.vendorCategory
                  ? (vendors[task.vendorCategory] ?? []).slice(0, 3)
                  : [];
                return (
                  <li key={task.id} className="card-calm px-5 py-4">
                    <button
                      onClick={() =>
                        setDone((d) => ({ ...d, [task.id]: !d[task.id] }))
                      }
                      className="flex w-full items-center gap-3.5 text-left"
                    >
                      <span
                        className={
                          "grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-all duration-[250ms] ease-calm " +
                          (isDone
                            ? "border-sage-600 bg-sage-600 text-ivory"
                            : "border-line bg-card text-transparent")
                        }
                      >
                        <Check size={13} />
                      </span>
                      <span
                        className={
                          "font-sans transition-colors duration-[250ms] ease-calm " +
                          (isDone ? "text-ink-faint line-through" : "text-ink")
                        }
                      >
                        {task.label}
                      </span>
                    </button>

                    {/* Proveedores verificados, en contexto. Orden por mérito. */}
                    {!isDone && suggestions.length > 0 && (
                      <div className="ml-9 mt-3 border-l-2 border-gold/40 pl-4">
                        <p className="font-sans text-xs font-semibold uppercase tracking-eyebrow text-gold-deep">
                          Verificados para esto
                        </p>
                        <ul className="mt-2 space-y-2">
                          {suggestions.map((v) => (
                            <li
                              key={v.id}
                              className="flex flex-wrap items-center gap-x-3 gap-y-1"
                            >
                              <span className="font-sans text-sm font-medium text-ink">
                                {v.name}
                              </span>
                              <span className="font-sans text-xs text-ink-faint">
                                {v.city} · {v.priceRange}
                              </span>
                              <a
                                href={waLink(
                                  `Hola, ${v.name} 👋 Los vimos en wedRing y nos gustaría cotizar para nuestra boda.`,
                                  v.whatsapp,
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 rounded-full bg-confirmed/12 px-2.5 py-1 font-sans text-xs font-medium text-confirmed hover:bg-confirmed/20"
                              >
                                <MessageCircle size={12} /> Cotizar
                              </a>
                            </li>
                          ))}
                        </ul>
                        <Link
                          href={`/proveedores?categoria=${task.vendorCategory}`}
                          className="mt-2 inline-block font-sans text-xs text-sage-600 hover:text-sage-700"
                        >
                          Ver todos →
                        </Link>
                      </div>
                    )}
                    {!isDone && task.vendorCategory && suggestions.length === 0 && (
                      <p className="ml-9 mt-2 inline-flex items-center gap-1.5 font-sans text-xs text-ink-faint">
                        <Store size={12} />
                        Aún estamos verificando{" "}
                        {VENDOR_CATEGORIES.find(
                          (c) => c.id === task.vendorCategory,
                        )?.label.toLowerCase()}{" "}
                        — pronto aparecerán aquí.
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
