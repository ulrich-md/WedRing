// Helpers de red del lado del cliente. Todas las mutaciones de la pareja
// viajan con su coupleKey; el resto son endpoints públicos tokenizados.

import type { Guest, Vendor, Wedding } from "./types";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error((data as { error?: string }).error ?? `Error ${res.status}`);
  }
  return res.json() as Promise<T>;
}

function coupleHeaders(w: Wedding): Record<string, string> {
  return { "x-couple-key": w.coupleKey ?? "" };
}

export const api = {
  /** Crea el registro del servidor para esta boda (una sola vez). */
  createWedding: (w: Wedding) =>
    request<{ id: string; coupleKey: string; slug: string }>("/api/weddings", {
      method: "POST",
      body: JSON.stringify({
        partners: w.partners,
        date: w.date,
        location: w.location,
        palette: w.palette,
      }),
    }),

  /** Sincroniza detalles compartidos (fecha, lugar, nombres, mensaje web). */
  syncWedding: (w: Wedding, extra?: { webMessage?: string }) =>
    request(`/api/weddings/${w.serverId}`, {
      method: "PATCH",
      headers: coupleHeaders(w),
      body: JSON.stringify({
        partners: w.partners,
        date: w.date,
        location: w.location,
        palette: w.palette,
        ...extra,
      }),
    }),

  listGuests: (w: Wedding) =>
    request<{ guests: Guest[] }>(`/api/weddings/${w.serverId}/guests`, {
      headers: coupleHeaders(w),
    }),

  addGuest: (w: Wedding, guest: { name: string; phone?: string }) =>
    request<{ guests: Guest[] }>(`/api/weddings/${w.serverId}/guests`, {
      method: "POST",
      headers: coupleHeaders(w),
      body: JSON.stringify(guest),
    }),

  addGuestsBulk: (w: Wedding, bulk: { name: string; phone?: string }[]) =>
    request<{ guests: Guest[] }>(`/api/weddings/${w.serverId}/guests`, {
      method: "POST",
      headers: coupleHeaders(w),
      body: JSON.stringify({ bulk }),
    }),

  updateGuest: (w: Wedding, guestId: string, patch: Partial<Guest>) =>
    request<{ guest: Guest }>(`/api/weddings/${w.serverId}/guests/${guestId}`, {
      method: "PATCH",
      headers: coupleHeaders(w),
      body: JSON.stringify(patch),
    }),

  deleteGuest: (w: Wedding, guestId: string) =>
    request<{ ok: true }>(`/api/weddings/${w.serverId}/guests/${guestId}`, {
      method: "DELETE",
      headers: coupleHeaders(w),
    }),

  /** Directorio público de proveedores verificados (orden por mérito). */
  listVendors: (filters?: { category?: string; city?: string }) => {
    const q = new URLSearchParams();
    if (filters?.category) q.set("category", filters.category);
    if (filters?.city) q.set("city", filters.city);
    const qs = q.toString();
    return request<{ vendors: (Vendor & { verified: true })[] }>(
      `/api/vendors${qs ? `?${qs}` : ""}`,
    );
  },
};

/**
 * Registra un lead real cuando la pareja toca "Cotizar por WhatsApp".
 * Fire-and-forget: nunca bloquea el gesto de contacto.
 */
export function sendLead(vendorId: string, w?: Wedding | null) {
  const coupleNames = w?.partners.filter(Boolean).join(" y ") || undefined;
  fetch(`/api/vendors/${vendorId}/lead`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ coupleNames, weddingId: w?.serverId }),
  }).catch(() => {});
}

/* ── Mensajes de WhatsApp (wa.me) ── */

export function rsvpUrl(token: string): string {
  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://wedring.app";
  return `${origin}/rsvp/${token}`;
}

export function inviteMessage(w: Wedding, guest: Guest): string {
  const names = w.partners.filter(Boolean).join(" y ");
  const fecha = w.date ? ` el ${w.date}` : "";
  return (
    `¡Hola, ${guest.name}! Somos ${names} 💍 Nos casamos${fecha} y queremos que estés. ` +
    `Confirma tu asistencia aquí (te toma un minuto): ${rsvpUrl(guest.token)}`
  );
}

export function reminderMessage(w: Wedding, guest: Guest): string {
  const names = w.partners.filter(Boolean).join(" y ");
  return (
    `¡Hola, ${guest.name}! Te escribimos ${names} 🤍 ¿Nos ayudas confirmando tu ` +
    `asistencia a la boda? Es un minuto: ${rsvpUrl(guest.token)}`
  );
}

/** Link wa.me — con teléfono va directo; sin teléfono abre el selector. */
export function waLink(message: string, phone?: string): string {
  const text = encodeURIComponent(message);
  const digits = phone?.replace(/[^\d]/g, "");
  // Sin lada asumimos México (52).
  const full = digits && digits.length === 10 ? `52${digits}` : digits;
  return full ? `https://wa.me/${full}?text=${text}` : `https://wa.me/?text=${text}`;
}
