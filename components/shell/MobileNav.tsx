"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MOBILE_NAV } from "@/lib/nav";

/** Barra inferior — solo móvil. Las 4 secciones más usadas, con mucho aire. */
export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-card/95 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-md items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {MOBILE_NAV.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-1 flex-col items-center gap-1 py-2.5"
            >
              <Icon
                size={21}
                className={
                  "transition-colors duration-[250ms] ease-calm " +
                  (active ? "text-sage-600" : "text-ink-faint")
                }
              />
              <span
                className={
                  "font-sans text-[0.68rem] transition-colors duration-[250ms] ease-calm " +
                  (active ? "font-semibold text-sage-700" : "text-ink-faint")
                }
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
