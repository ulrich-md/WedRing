/**
 * Fondo "interesting AF" pero cálido: cielo de fiesta en crema con orbes de
 * color (rosa, cempasúchil, talavera, sol) que flotan suave, destellos de luz
 * y un grano finito encima para darle textura. Todo CSS → rápido.
 * Fijo detrás de todo; el hero es transparente para dejarlo respirar.
 * El movimiento se detiene solo con prefers-reduced-motion (regla global).
 */
export function FiestaBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* base: degradado crema cálido con un toque de cielo arriba */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #FFF1E0 0%, #FFF7ED 38%, #FFF7ED 100%)",
        }}
      />

      {/* orbes de color, difuminados y a la deriva */}
      <div className="absolute -left-24 -top-24 h-[34rem] w-[34rem] animate-drift rounded-full bg-rosa-300/45 blur-3xl" />
      <div className="absolute -right-28 top-[-6rem] h-[30rem] w-[30rem] animate-float rounded-full bg-coral-300/45 blur-3xl" />
      <div className="absolute left-[8%] top-[42%] h-[26rem] w-[26rem] animate-float rounded-full bg-agua-300/35 blur-3xl [animation-delay:-3s]" />
      <div className="absolute -right-20 top-[58%] h-[28rem] w-[28rem] animate-drift rounded-full bg-sol-300/45 blur-3xl [animation-delay:-7s]" />
      <div className="absolute left-[40%] top-[80%] h-[24rem] w-[24rem] animate-float rounded-full bg-rosa-200/40 blur-3xl [animation-delay:-5s]" />

      {/* destellos de luz cálidos (lens leaks) */}
      <div
        className="absolute right-[6%] top-[6%] h-[60vh] w-[12rem] rotate-[24deg] animate-shimmer blur-2xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,194,51,0.35), rgba(255,133,52,0.0))",
        }}
      />
      <div
        className="absolute left-[12%] top-[2%] h-[40vh] w-[8rem] -rotate-[18deg] animate-shimmer blur-2xl [animation-delay:-2s]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,117,178,0.30), rgba(255,117,178,0.0))",
        }}
      />

      {/* grano finito para textura premium */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
