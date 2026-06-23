import { photoBg, type CouplePhoto } from "@/lib/photos";

/**
 * Tarjeta tipo "polaroid" para fotos de parejas. Usa un fondo en capas
 * (local → remoto → degradado), así que siempre se ve bien aunque la foto
 * aún no esté, y sin íconos rotos.
 */
export function Polaroid({
  photo,
  className = "",
  framed = true,
}: {
  photo: CouplePhoto;
  className?: string;
  framed?: boolean;
}) {
  return (
    <figure
      className={
        (framed ? "border border-white bg-white p-2 shadow-lift " : "") +
        "rounded-2xl " +
        className
      }
    >
      <div
        className="aspect-[3/4] rounded-xl bg-cover bg-center"
        style={{ backgroundImage: photoBg(photo) }}
      />
    </figure>
  );
}
