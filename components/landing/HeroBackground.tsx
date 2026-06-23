/**
 * Fondo del hero — claro y aireado (marfil cálido), pero con vida:
 * amanecer dorado, resplandores sage, manchas de color suaves y grano fino.
 * Los elementos flotantes y los mockups viven en el Hero, encima de esto.
 * Todo CSS → rápido. El movimiento se detiene con prefers-reduced-motion.
 */
export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* base: marfil cálido con amanecer dorado arriba */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, rgba(236,220,184,0.6), transparent 55%), linear-gradient(180deg, #FBF8F2 0%, #FAF6EF 58%, #F6F1E6 100%)",
        }}
      />

      {/* manchas suaves de color para que no se sienta vacío */}
      <div className="absolute -left-24 top-[16%] h-[32rem] w-[32rem] animate-float rounded-full bg-sage-200/40 blur-3xl" />
      <div className="absolute -right-28 top-[6%] h-[30rem] w-[30rem] animate-float rounded-full bg-gold-soft/45 blur-3xl [animation-delay:-4s]" />
      <div className="absolute right-[20%] top-[55%] h-[24rem] w-[24rem] animate-float rounded-full bg-sage-100/60 blur-3xl [animation-delay:-7s]" />

      {/* grano fino */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
