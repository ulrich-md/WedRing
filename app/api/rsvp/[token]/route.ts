// Endpoint PÚBLICO del RSVP. Seguridad: valida el token del invitado y solo
// lee/escribe el RSVP de ESE invitado. Jamás expone la lista completa ni
// teléfonos de otros. Sin token válido → 404 (sin pistas).

import { findGuestByToken, mutateDb } from "@/lib/server/db";
import { errorJson, json } from "@/lib/server/util";
import type { RsvpStatus } from "@/lib/types";

type Ctx = { params: { token: string } };

const ANSWERS: RsvpStatus[] = ["confirmado", "declinado", "talvez"];

export async function GET(_req: Request, { params }: Ctx) {
  const hit = await findGuestByToken(params.token);
  if (!hit) return errorJson("No encontrado", 404);
  const { wedding, guest } = hit;
  // Solo lo necesario para la página del invitado.
  return json({
    wedding: {
      partners: wedding.partners,
      date: wedding.date,
      location: wedding.location,
    },
    guest: {
      name: guest.name,
      status: guest.status,
      party: guest.party,
      menu: guest.menu ?? null,
      note: guest.note ?? null,
    },
  });
}

export async function POST(req: Request, { params }: Ctx) {
  const hit = await findGuestByToken(params.token);
  if (!hit) return errorJson("No encontrado", 404);

  let body: { status?: string; party?: number; menu?: string; note?: string };
  try {
    body = await req.json();
  } catch {
    return errorJson("JSON inválido", 400);
  }

  if (!ANSWERS.includes(body.status as RsvpStatus)) {
    return errorJson("Respuesta inválida", 400);
  }
  const party = Math.min(12, Math.max(1, Math.round(Number(body.party) || 1)));

  const guest = await mutateDb((db) => {
    const w = db.weddings[hit.wedding.id];
    const g = w.guests.find((x) => x.token === params.token);
    if (!g) return null;
    g.status = body.status as RsvpStatus;
    g.party = g.status === "confirmado" ? party : 1;
    g.menu = String(body.menu ?? "").slice(0, 60) || undefined;
    g.note = String(body.note ?? "").slice(0, 500) || undefined;
    g.updatedAt = new Date().toISOString();
    return g;
  });

  if (!guest) return errorJson("No encontrado", 404);
  return json({
    guest: {
      name: guest.name,
      status: guest.status,
      party: guest.party,
      menu: guest.menu ?? null,
      note: guest.note ?? null,
    },
  });
}
