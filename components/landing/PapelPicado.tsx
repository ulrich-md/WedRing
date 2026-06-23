/**
 * Papel picado: banderines de fiesta mexicana. Decorativo y alegre, en los
 * colores de la marca. Se repite para llenar el ancho.
 */
const COLORS = ["#E91E79", "#FF8534", "#0EA89D", "#FFC233", "#FF75B2"];

export function PapelPicado({ className = "" }: { className?: string }) {
  // 12 banderines alternando colores
  const flags = Array.from({ length: 12 }, (_, i) => COLORS[i % COLORS.length]);

  return (
    <div className={"flex w-full justify-center " + className} aria-hidden>
      <svg
        viewBox="0 0 720 86"
        preserveAspectRatio="xMidYMin slice"
        className="h-[58px] w-full"
      >
        {/* cuerda */}
        <path d="M0 6 H720" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
        {flags.map((c, i) => {
          const x = i * 60;
          return (
            <g key={i} transform={`translate(${x} 6)`}>
              {/* banderín rectangular con picado */}
              <path
                d="M4 0 H56 V52 L30 70 L4 52 Z"
                fill={c}
                opacity="0.95"
              />
              {/* huequitos del picado */}
              <circle cx="30" cy="18" r="5" fill="rgba(255,255,255,0.85)" />
              <circle cx="16" cy="34" r="3.5" fill="rgba(255,255,255,0.8)" />
              <circle cx="44" cy="34" r="3.5" fill="rgba(255,255,255,0.8)" />
              <circle cx="30" cy="40" r="3" fill="rgba(255,255,255,0.8)" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
