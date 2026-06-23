// Datos por defecto y helpers de la boda. El cascarón se siente vivo desde
// el primer momento: aunque las tarjetas estén "vacías", muestran estados
// cálidos e invitan, nunca ceros fríos.

import type { Wedding, WeddingStyle } from "./types";

export const STYLES: { id: WeddingStyle; label: string; hint: string }[] = [
  { id: "hacienda", label: "Hacienda", hint: "Cantera, buganvilias, mesas largas" },
  { id: "jardin", label: "Jardín", hint: "Al aire libre, verde y luz natural" },
  { id: "playa", label: "Playa", hint: "Brisa, arena y atardecer" },
  { id: "clasica", label: "Clásica", hint: "Elegante y atemporal" },
  { id: "rustica", label: "Rústica", hint: "Madera, campo y velas" },
  { id: "moderna", label: "Moderna", hint: "Líneas limpias, minimal" },
];

export const PALETTES = [
  { name: "Sage & marfil", hex: "#6f8159" },
  { name: "Terracota", hex: "#b07a66" },
  { name: "Dorado suave", hex: "#c2a36b" },
  { name: "Azul polvo", hex: "#7c8aa0" },
  { name: "Vino tinto", hex: "#7e4a4f" },
  { name: "Blanco & verde", hex: "#8a9b73" },
];

export function defaultWedding(): Wedding {
  return {
    partners: ["", ""],
    date: null,
    location: "",
    style: "hacienda",
    palette: PALETTES[0],
    locale: "es",
    createdAt: new Date().toISOString(),
  };
}

/** "Sofía & Mateo" — con el ampersand dorado como detalle. */
export function coupleName(w: Wedding | null): string {
  if (!w) return "Tu boda";
  const [a, b] = w.partners;
  if (a && b) return `${a} & ${b}`;
  return a || b || "Tu boda";
}

export interface Countdown {
  days: number;
  hasDate: boolean;
  isPast: boolean;
}

export function countdown(date: string | null): Countdown {
  if (!date) return { days: 0, hasDate: false, isPast: false };
  const target = new Date(date + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const ms = target.getTime() - today.getTime();
  const days = Math.round(ms / 86_400_000);
  return { days: Math.abs(days), hasDate: true, isPast: days < 0 };
}

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

/** "14 de noviembre de 2026" */
export function formatLongDate(date: string | null): string {
  if (!date) return "Fecha por definir";
  const d = new Date(date + "T00:00:00");
  return `${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`;
}
