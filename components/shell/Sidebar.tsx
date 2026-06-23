"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RingMark, Wordmark } from "@/components/brand/RingMark";
import { NAV } from "@/lib/nav";
import { useWedding } from "@/components/providers/WeddingProvider";
import { coupleName, countdown } from "@/lib/wedding";

/** Navegación lateral tranquila — solo desktop. */
export function Sidebar() {
  const pathname = usePathname();
  const { wedding } = useWedding();
  const c = countdown(wedding?.date ?? null);

  return (
    <aside className="sticky top-0 hidden h-dvh w-[16.5rem] shrink-0 flex-col border-r border-line bg-card/60 px-4 py-6 lg:flex">
      <Link href="/tablero" className="flex items-center gap-2.5 px-2">
        <RingMark size={30} />
        <Wordmark className="text-xl" />
      </Link>

      <nav className="mt-9 flex flex-1 flex-col gap-1">
        {NAV.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 font-sans text-[0.95rem] transition-colors duration-[250ms] ease-calm " +
                (active
                  ? "bg-sage-50 text-sage-700"
                  : "text-ink-soft hover:bg-sage-50/60 hover:text-ink")
              }
            >
              <Icon
                size={18}
                className={active ? "text-sage-600" : "text-ink-faint"}
              />
              <span className="font-medium">{item.label}</span>
              {!item.ready && (
                <span className="ml-auto rounded-full bg-gold-soft/60 px-2 py-0.5 text-[0.62rem] font-medium uppercase tracking-wide text-gold-deep">
                  pronto
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Recordatorio cálido al pie: la cuenta regresiva */}
      <div className="mt-4 rounded-2xl border border-line bg-ivory px-4 py-4">
        <p className="font-serif text-lg leading-tight text-ink">
          {coupleName(wedding)}
        </p>
        <p className="mt-1 font-sans text-sm text-ink-faint">
          {c.hasDate
            ? c.isPast
              ? "¡Ya se casaron! 🤍"
              : `Faltan ${c.days} días`
            : "Fecha por definir"}
        </p>
      </div>
    </aside>
  );
}
