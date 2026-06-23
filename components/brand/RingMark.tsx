// Marca de wedRing: dos anillos entrelazados. Sutil, dorado suave sobre sage.
// Sin estridencias — es un detalle, no un logo gritón.

export function RingMark({
  className,
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="19" cy="24" r="11" stroke="rgb(var(--sage-500))" strokeWidth="2" />
      <circle cx="29" cy="24" r="11" stroke="rgb(var(--gold))" strokeWidth="2" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={
        "font-serif text-[1.55rem] leading-none tracking-tight text-ink " +
        (className ?? "")
      }
    >
      wed<span className="text-sage-600">Ring</span>
    </span>
  );
}
