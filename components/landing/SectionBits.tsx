"use client";

import { SectionReveal } from "@/components/landing/SectionReveal";

function cx(...p: (string | false | undefined)[]) {
  return p.filter(Boolean).join(" ");
}

/** Eyebrow consistente: una raya dorada + etiqueta en mayúsculas. */
export function Eyebrow({
  children,
  invert = false,
  center = false,
}: {
  children: React.ReactNode;
  invert?: boolean;
  center?: boolean;
}) {
  return (
    <span className={cx("inline-flex items-center gap-2.5", center && "justify-center")}>
      <span className={cx("h-px w-6", invert ? "bg-gold-soft/70" : "bg-gold/80")} />
      <span
        className={cx(
          "font-sans text-[0.72rem] font-semibold uppercase tracking-eyebrow",
          invert ? "text-gold-soft" : "text-gold-deep",
        )}
      >
        {children}
      </span>
    </span>
  );
}

/**
 * Encabezado de sección al nivel del hero: eyebrow + titular serif grande
 * (clamp) + subtítulo. Anima al entrar. `invert` para paneles oscuros.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
  invert = false,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  center?: boolean;
  invert?: boolean;
  className?: string;
}) {
  return (
    <SectionReveal
      className={cx(center ? "mx-auto max-w-2xl text-center" : "max-w-2xl", className)}
    >
      {eyebrow && (
        <div className={center ? "flex justify-center" : ""}>
          <Eyebrow invert={invert}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2
        className={cx(
          "mt-4 text-[clamp(2rem,4.6vw,3rem)] font-medium leading-[1.03] tracking-[-0.015em]",
          invert ? "text-ivory" : "text-ink",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cx(
            "mt-4 font-sans text-lg leading-relaxed",
            invert ? "text-sage-100/85" : "text-ink-soft",
          )}
        >
          {subtitle}
        </p>
      )}
    </SectionReveal>
  );
}

/** Resplandores suaves de fondo para secciones claras (sage + dorado). */
export function SoftGlow({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={"pointer-events-none absolute inset-0 -z-10 overflow-hidden " + className}
      aria-hidden
    >
      <div className="absolute -left-24 top-4 h-80 w-80 rounded-full bg-sage-100/50 blur-3xl" />
      <div className="absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-gold-soft/35 blur-3xl" />
    </div>
  );
}

/** Capa premium para paneles oscuros: degradado + resplandor + grano + anillo. */
export function DarkPanelDecor() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(90% 70% at 85% 0%, rgba(194,163,107,0.22), transparent 55%), radial-gradient(70% 60% at 0% 100%, rgba(138,155,115,0.18), transparent 60%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="pointer-events-none absolute -right-10 -top-12 h-72 w-72 opacity-[0.12]"
        aria-hidden
      >
        <circle cx="19" cy="24" r="11" stroke="rgb(var(--gold))" strokeWidth="0.5" />
        <circle cx="29" cy="24" r="11" stroke="rgb(var(--gold-soft))" strokeWidth="0.5" />
      </svg>
    </>
  );
}
