/**
 * Fondo inmersivo del hero — sage profundo, premium y con presencia.
 * El verde oscuro hace resaltar (contraste) los mockups claros del producto.
 * Capas: degradado sage, resplandor dorado tipo amanecer, rayos de luz suaves
 * (referencia del documento: light leaks), grano fino y resplandores de color.
 * Todo CSS → rápido. El movimiento se detiene con prefers-reduced-motion.
 */
export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* base: sage profundo cálido */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(165deg, #3d4c31 0%, #313d27 46%, #283120 100%)",
        }}
      />

      {/* amanecer dorado arriba */}
      <div
        className="absolute inset-x-0 top-0 h-[70%]"
        style={{
          background:
            "radial-gradient(90% 60% at 50% -8%, rgba(214,178,108,0.34), transparent 60%)",
        }}
      />

      {/* rayos de luz suaves (light leaks) */}
      <div
        className="absolute -top-[10%] left-[8%] h-[80vh] w-[12rem] rotate-[18deg] blur-2xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(236,220,184,0.22), rgba(236,220,184,0))",
        }}
      />
      <div
        className="absolute -top-[6%] right-[14%] h-[70vh] w-[9rem] -rotate-[14deg] blur-2xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(214,178,108,0.20), rgba(214,178,108,0))",
        }}
      />

      {/* resplandores sage para volumen */}
      <div className="absolute -left-28 top-[30%] h-[34rem] w-[34rem] rounded-full bg-sage-400/15 blur-3xl" />
      <div className="absolute -right-24 top-[40%] h-[30rem] w-[30rem] rounded-full bg-gold/10 blur-3xl" />

      {/* grano fino */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* curva inferior: derrite el hero hacia la sección marfil */}
      <div className="absolute inset-x-0 bottom-0 leading-[0] text-ivory">
        <svg
          viewBox="0 0 1440 110"
          preserveAspectRatio="none"
          className="block h-[64px] w-full sm:h-[92px]"
          fill="currentColor"
        >
          <path d="M0,70 C260,118 520,30 760,52 C1000,74 1220,120 1440,72 L1440,110 L0,110 Z" />
        </svg>
      </div>
    </div>
  );
}
