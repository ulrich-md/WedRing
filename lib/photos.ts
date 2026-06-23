// Fotos de parejas (inspiración/ambiente — sin testimonios ni nombres reales).
//
// Generadas con IA como placeholder. El sandbox no pudo descargarlas al repo
// (la red bloquea el CDN), así que cada foto tiene:
//   local  → /public/images/*.webp  (ponla tú; tiene prioridad)
//   remote → URL del CDN            (carga en el navegador mientras tanto)
// y si ninguna carga, se ve un degradado cálido (sin íconos rotos).
//
// Para fijarlas: descarga las imágenes y guárdalas como public/images/couple-N.webp.

export interface CouplePhoto {
  local: string;
  remote: string;
}

const CDN =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3De3RdMNZReGlmJYXAnYF4EkDFp";

export const COUPLE_PHOTOS: CouplePhoto[] = [
  { local: "/assets/couples/couple-1.webp", remote: `${CDN}/hf_20260623_035146_36f0570a-3df9-4b17-8f35-d8aebeafc6de_min.webp` },
  { local: "/assets/couples/couple-2.webp", remote: `${CDN}/hf_20260623_035146_01ac21ae-ff14-47d8-8005-58bcce26070c_min.webp` },
  { local: "/assets/couples/couple-3.webp", remote: `${CDN}/hf_20260623_035146_92d4c2b4-1083-4160-83ea-a5c36bfe4f8d_min.webp` },
  { local: "/assets/couples/couple-4.webp", remote: `${CDN}/hf_20260623_035146_2eeb209d-eac8-42bc-8b1a-1c2efd759d40_min.webp` },
];

/** Video del hero (beso de la pareja). El remoto se llena al generar. */
export const HERO_VIDEO = {
  local: "/assets/video/hero-kiss.mp4",
  // URL del CDN de Higgsfield. Carga en el navegador mientras subes el
  // archivo local (que tiene prioridad).
  remote: `${CDN}/hf_20260623_040247_ef1f74e7-5f30-4b07-ba50-a7a6aeeabb7e.mp4`,
  // póster: la imagen de origen (capas local → remoto → degradado)
  poster: COUPLE_PHOTOS[3],
};

const FALLBACK_GRADIENT =
  "linear-gradient(135deg, rgb(var(--sage-200)), rgb(var(--gold-soft)) 55%, rgb(var(--sage-100)))";

/**
 * Construye un background con prioridad: local → remoto → degradado.
 * Las imágenes de fondo que fallan no muestran ícono roto (fallan en silencio).
 */
export function photoBg(p: CouplePhoto): string {
  // capas: local (arriba) → remoto → degradado (abajo). Las que fallan son
  // transparentes y dejan ver la siguiente; el degradado nunca falla.
  return `url("${p.local}"), url("${p.remote}"), ${FALLBACK_GRADIENT}`;
}
