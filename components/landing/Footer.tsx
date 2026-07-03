"use client";

import Link from "next/link";
import { Instagram, MessageCircle } from "lucide-react";
import { RingMark, Wordmark } from "@/components/brand/RingMark";

const COLS = [
  {
    title: "Producto",
    links: [
      { label: "RSVP por WhatsApp", href: "#corazon" },
      { label: "Qué incluye", href: "#todo" },
      { label: "Precio", href: "#precio" },
      { label: "Ver adelanto", href: "/login" },
    ],
  },
  {
    title: "wedRing",
    links: [
      { label: "Alma mexicana", href: "#alma" },
      { label: "Lista de espera", href: "#lista" },
      { label: "Para proveedores", href: "/anunciantes" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-ivory-deep/30 px-5 py-16 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <RingMark size={30} />
            <Wordmark className="text-xl" />
          </div>
          <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-ink-soft">
            El hogar tranquilo donde planeas tu boda, y vive donde ya estás:
            WhatsApp.
          </p>
          <a
            href="#lista"
            className="mt-5 inline-flex h-10 items-center justify-center rounded-full bg-sage-600 px-5 font-sans text-sm font-medium text-ivory shadow-calm transition-colors duration-[250ms] ease-calm hover:bg-sage-700"
          >
            Únete a la lista de espera
          </a>
          <div className="mt-5 flex items-center gap-2">
            {/* 🔌 Reemplaza href por tus redes reales cuando las tengas */}
            <a
              href="#"
              aria-label="Instagram de wedRing"
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-soft transition-colors duration-[250ms] ease-calm hover:bg-sage-50 hover:text-ink"
            >
              <Instagram size={16} />
            </a>
            <a
              href="#"
              aria-label="WhatsApp de wedRing"
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-soft transition-colors duration-[250ms] ease-calm hover:bg-sage-50 hover:text-ink"
            >
              <MessageCircle size={16} />
            </a>
          </div>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <p className="font-sans text-sm font-semibold text-ink">
              {col.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="font-sans text-sm text-ink-soft transition-colors duration-[250ms] ease-calm hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-line pt-6 sm:flex-row">
        <p className="font-sans text-sm text-ink-faint">
          Hecho en México · para bodas con alma
        </p>
        <p className="font-sans text-sm text-ink-faint">
          Español · English pronto · © {new Date().getFullYear()} wedRing
        </p>
      </div>
    </footer>
  );
}
