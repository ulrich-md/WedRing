/**
 * Divisor en onda entre bandas de color (referencia: mosa).
 * El color se controla con una clase de texto (fill="currentColor"), p. ej.
 * <Wave className="text-cream" /> para transicionar hacia una sección crema.
 */
export function Wave({
  className = "text-cream",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <div
      className={"pointer-events-none -mb-px leading-[0] " + className}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-[60px] w-full sm:h-[90px]"
        fill="currentColor"
      >
        <path d="M0,64 C240,128 480,8 720,40 C960,72 1200,128 1440,72 L1440,120 L0,120 Z" />
      </svg>
    </div>
  );
}

/** Onda más juguetona/redondeada para acentos. */
export function WaveSoft({
  className = "text-cream",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <div
      className={"pointer-events-none -mb-px leading-[0] " + className}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-[52px] w-full sm:h-[80px]"
        fill="currentColor"
      >
        <path d="M0,48 C180,112 360,112 540,72 C760,22 920,22 1140,72 C1280,104 1360,104 1440,64 L1440,120 L0,120 Z" />
      </svg>
    </div>
  );
}
