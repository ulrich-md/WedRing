import { Reveal } from "@/components/ui/Reveal";

/** Encabezado de sección consistente: eyebrow, título serif, subtítulo. */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-2 text-[2.1rem] leading-tight">{title}</h1>
      {subtitle && (
        <p className="mt-2 max-w-xl font-sans text-ink-soft">{subtitle}</p>
      )}
      <div className="rule-gold mt-6" />
    </Reveal>
  );
}
