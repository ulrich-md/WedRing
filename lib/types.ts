// Tipos del dominio de wedRing. Por ahora el "cascarón" vive en el navegador
// (localStorage); más adelante esto será el contrato con el backend.

export type WeddingStyle =
  | "hacienda"
  | "playa"
  | "jardin"
  | "clasica"
  | "moderna"
  | "rustica";

export interface WeddingPalette {
  /** nombre cálido de la paleta elegida en el onboarding */
  name: string;
  /** color de marca de la boda (se usa como acento personal) */
  hex: string;
}

export interface Wedding {
  /** nombres de la pareja, p. ej. ["Sofía", "Mateo"] */
  partners: [string, string];
  /** fecha de la boda en ISO (YYYY-MM-DD); null si aún no la deciden */
  date: string | null;
  /** ciudad o lugar, opcional */
  location: string;
  style: WeddingStyle;
  palette: WeddingPalette;
  /** idioma por defecto de la pareja */
  locale: "es" | "en";
  createdAt: string;
}

export interface Session {
  name: string;
  contact: string; // email o teléfono (WhatsApp)
  method: "whatsapp" | "email";
}
