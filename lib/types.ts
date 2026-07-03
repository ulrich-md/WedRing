// Tipos del dominio de wedRing.
// Regla de arquitectura: lo que se COMPARTE (invitados/RSVP, boda pública,
// proveedores) vive en el servidor; lo privado de la pareja (checklist,
// presupuesto, padrinos) vive en localStorage por ahora.

export type WeddingStyle =
  | "hacienda"
  | "playa"
  | "jardin"
  | "clasica"
  | "moderna"
  | "rustica";

export interface WeddingPalette {
  name: string;
  hex: string;
}

/** La boda del lado del cliente (sesión de la pareja). */
export interface Wedding {
  partners: [string, string];
  date: string | null; // ISO YYYY-MM-DD
  location: string;
  style: WeddingStyle;
  palette: WeddingPalette;
  locale: "es" | "en";
  createdAt: string;
  // vínculo con el registro del servidor (se crea al terminar el onboarding)
  serverId?: string;
  coupleKey?: string; // secreto de la pareja para editar sus invitados
  slug?: string; // URL pública de la web de boda
}

export interface Session {
  name: string;
  contact: string;
  method: "whatsapp" | "email";
}

/* ────────────────────────── RSVP / Invitados ────────────────────────── */

export type RsvpStatus = "pendiente" | "confirmado" | "declinado" | "talvez";

export const MENU_OPTIONS = ["Res", "Pollo", "Vegetariano"] as const;

export interface Guest {
  id: string;
  /** token del link personal /rsvp/{token} — es el único acceso del invitado */
  token: string;
  name: string;
  phone?: string;
  status: RsvpStatus;
  /** cuántas personas van (incluyéndole) */
  party: number;
  menu?: string;
  note?: string;
  updatedAt?: string;
}

/** Registro de la boda en el servidor (lo mínimo que se comparte). */
export interface WeddingRecord {
  id: string;
  coupleKey: string;
  slug: string;
  partners: [string, string];
  date: string | null;
  location: string;
  /** mensaje de bienvenida de la web de boda */
  webMessage: string;
  /** paleta elegida en el onboarding — transforma el tablero y la web pública */
  palette?: WeddingPalette;
  createdAt: string;
  guests: Guest[];
}

/* ─────────────────────────── Proveedores ─────────────────────────── */

export const VENDOR_CATEGORIES = [
  { id: "fotografia", label: "Fotografía y video" },
  { id: "venue", label: "Venue / Hacienda" },
  { id: "catering", label: "Banquete / Catering" },
  { id: "musica", label: "Música / Mariachi / DJ" },
  { id: "flores", label: "Flores y decoración" },
  { id: "planeacion", label: "Planeación de bodas" },
  { id: "pastel", label: "Pastel y repostería" },
  { id: "belleza", label: "Belleza / Maquillaje" },
  { id: "otros", label: "Otros" },
] as const;

export type VendorCategory = (typeof VENDOR_CATEGORIES)[number]["id"];

/** pendiente → NO visible. Solo "verificado" aparece para las parejas. */
export type VendorStatus = "pendiente" | "verificado" | "rechazado";

/** Monetización futura: existe el campo, pero HOY todos entran gratis y
 *  "destacado" jamás altera el orden orgánico. */
export type VendorPlan = "gratis" | "destacado";

/** Una pareja interesada que tocó "Cotizar por WhatsApp". Solo hechos reales. */
export interface VendorLead {
  id: string;
  at: string;
  /** nombres de pila de la pareja (ella inició el contacto) */
  coupleNames?: string;
  /** para deduplicar: una boda cuenta una sola vez por proveedor */
  weddingId?: string;
}

export interface Vendor {
  id: string;
  /** link secreto de edición /proveedor/{editToken} — su único acceso */
  editToken: string;
  name: string;
  category: VendorCategory;
  city: string;
  description: string;
  priceRange: "$" | "$$" | "$$$";
  whatsapp: string;
  /** URLs de portafolio (opcional en el MVP) */
  photos: string[];
  availability?: string;
  status: VendorStatus;
  plan: VendorPlan;
  /** para el orden por mérito cuando exista reseña real; nunca inventado */
  rating?: number;
  createdAt: string;
  verifiedAt?: string;
  /** leads reales acumulados (parejas que tocaron "Cotizar") */
  leads?: VendorLead[];
}

/** Lo que ve el público (sin tokens, leads ni datos internos). */
export type PublicVendor = Omit<Vendor, "editToken" | "status" | "leads"> & {
  verified: true;
};
