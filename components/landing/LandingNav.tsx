"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RingMark, Wordmark } from "@/components/brand/RingMark";
import { ButtonLink } from "@/components/ui/Button";

const LINKS = [
  { href: "#corazon", label: "RSVP" },
  { href: "#todo", label: "Qué incluye" },
  { href: "#alma", label: "Alma mexicana" },
  { href: "#precio", label: "Precio" },
];

/** Nav flotante, con separación de los bordes (regla del skill). */
export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={
          "flex w-full max-w-5xl items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-[250ms] ease-calm sm:px-5 " +
          (scrolled
            ? "glass shadow-calm"
            : "border border-transparent bg-transparent")
        }
      >
        <Link href="/" className="flex items-center gap-2.5">
          <RingMark size={28} />
          <Wordmark className="text-xl" />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-sans text-sm text-ink-soft transition-colors duration-[250ms] ease-calm hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            href="/login"
            className="hidden rounded-full px-4 py-2 font-sans text-sm text-ink-soft transition-colors duration-[250ms] ease-calm hover:bg-rosa-50 hover:text-ink sm:inline-flex"
          >
            Ver adelanto
          </Link>
          <ButtonLink href="#lista" variant="primary">
            Lista de espera
          </ButtonLink>
        </div>
      </nav>
    </div>
  );
}
