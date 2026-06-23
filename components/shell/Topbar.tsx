"use client";

import { useState } from "react";
import { Bell, ChevronDown, LogOut, Settings } from "lucide-react";
import { RingMark } from "@/components/brand/RingMark";
import { useWedding } from "@/components/providers/WeddingProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

/**
 * Barra superior. En móvil muestra la marca; en todos lados, un saludo cálido
 * y el menú de la cuenta. Sin ruido: una cosa importante a la vez.
 */
export function Topbar({ title }: { title?: string }) {
  const { session, signOut } = useWedding();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const firstName = session?.name?.split(" ")[0] ?? "";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-line bg-cream/85 px-5 backdrop-blur sm:px-8">
      <div className="flex items-center gap-2.5">
        <span className="lg:hidden">
          <RingMark size={26} />
        </span>
        <span className="font-sans text-sm text-ink-faint">
          {title ?? (firstName ? `Hola, ${firstName}` : "Bienvenida")}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <button
          className="grid h-10 w-10 place-items-center rounded-full text-ink-faint transition-colors duration-[250ms] ease-calm hover:bg-rosa-50 hover:text-ink-soft"
          aria-label="Avisos"
        >
          <Bell size={18} />
        </button>

        <div className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-2.5 transition-colors duration-[250ms] ease-calm hover:bg-rosa-50"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-rosa-100 font-sans text-sm font-semibold text-rosa-700">
              {firstName ? firstName[0].toUpperCase() : "·"}
            </span>
            <ChevronDown size={15} className="text-ink-faint" />
          </button>

          {open && (
            <>
              <button
                className="fixed inset-0 z-10 cursor-default"
                aria-hidden
                onClick={() => setOpen(false)}
              />
              <div className="absolute right-0 z-20 mt-2 w-52 overflow-hidden rounded-2xl border border-line bg-card shadow-lift">
                <div className="border-b border-line px-4 py-3">
                  <p className="font-sans text-sm font-semibold text-ink">
                    {session?.name}
                  </p>
                  <p className="font-sans text-xs text-ink-faint">
                    {session?.contact}
                  </p>
                </div>
                <Link
                  href="/configuracion"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 font-sans text-sm text-ink-soft transition-colors duration-[250ms] ease-calm hover:bg-rosa-50"
                >
                  <Settings size={16} className="text-ink-faint" />
                  Ajustes
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    router.replace("/login");
                  }}
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 font-sans text-sm text-ink-soft transition-colors duration-[250ms] ease-calm hover:bg-rosa-50"
                >
                  <LogOut size={16} className="text-ink-faint" />
                  Cerrar sesión
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
