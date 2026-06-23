/**
 * Fondo inmersivo del hero — calmado pero con presencia.
 * Capas suaves (marfil → sage → dorado), un grano finito para profundidad
 * premium, y resplandores tenues. El gran anillo (motivo de wedRing) vive en
 * el Hero como capa con parallax. Todo CSS → rápido.
 */
export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* base: degradado marfil cálido con un amanecer dorado arriba */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, rgba(236,220,184,0.55), transparent 55%), linear-gradient(180deg, #FBF8F2 0%, #FAF6EF 60%, #F6F1E6 100%)",
        }}
      />

      {/* resplandores suaves de sage a los lados */}
      <div className="absolute -left-24 top-[18%] h-[32rem] w-[32rem] rounded-full bg-sage-200/35 blur-3xl" />
      <div className="absolute -right-28 top-[8%] h-[30rem] w-[30rem] rounded-full bg-gold-soft/40 blur-3xl" />

      {/* viñeta inferior para asentar el mockup */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ivory to-transparent" />

      {/* grano finito */}
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
