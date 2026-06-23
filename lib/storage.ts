// Persistencia ligera del cascarón. Todo vive en localStorage por ahora,
// detrás de un par de helpers para poder cambiar a un backend sin tocar la UI.

import type { Session, Wedding } from "./types";

const KEYS = {
  session: "wedring.session",
  wedding: "wedring.wedding",
} as const;

function read<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write<T>(key: string, value: T | null) {
  if (typeof window === "undefined") return;
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* almacenamiento lleno o bloqueado — la calma no se rompe por esto */
  }
}

export const storage = {
  getSession: () => read<Session>(KEYS.session),
  setSession: (s: Session | null) => write(KEYS.session, s),
  getWedding: () => read<Wedding>(KEYS.wedding),
  setWedding: (w: Wedding | null) => write(KEYS.wedding, w),
  clearAll: () => {
    write(KEYS.session, null);
    write(KEYS.wedding, null);
  },
};
