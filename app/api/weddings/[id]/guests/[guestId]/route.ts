import { readDb, mutateDb } from "@/lib/server/db";
import { errorJson, isCouple, json } from "@/lib/server/util";
import type { RsvpStatus } from "@/lib/types";

type Ctx = { params: { id: string; guestId: string } };

const STATUSES: RsvpStatus[] = ["pendiente", "confirmado", "declinado", "talvez"];

/** La pareja edita nombre/teléfono (y puede corregir estado a mano). */
export async function PATCH(req: Request, { params }: Ctx) {
  const db = await readDb();
  const wedding = db.weddings[params.id];
  if (!wedding) return errorJson("No encontrada", 404);
  if (!isCouple(req, wedding)) return errorJson("No autorizada", 401);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return errorJson("JSON inválido", 400);
  }

  const updated = await mutateDb((mdb) => {
    const g = mdb.weddings[params.id].guests.find((x) => x.id === params.guestId);
    if (!g) return null;
    if (typeof body.name === "string" && body.name.trim())
      g.name = body.name.trim().slice(0, 80);
    if ("phone" in body)
      g.phone =
        String(body.phone ?? "").replace(/[^\d+]/g, "").slice(0, 16) || undefined;
    if (STATUSES.includes(body.status as RsvpStatus)) {
      g.status = body.status as RsvpStatus;
      g.updatedAt = new Date().toISOString();
    }
    return g;
  });

  if (!updated) return errorJson("Invitado no encontrado", 404);
  return json({ guest: updated });
}

export async function DELETE(req: Request, { params }: Ctx) {
  const db = await readDb();
  const wedding = db.weddings[params.id];
  if (!wedding) return errorJson("No encontrada", 404);
  if (!isCouple(req, wedding)) return errorJson("No autorizada", 401);

  const removed = await mutateDb((mdb) => {
    const w = mdb.weddings[params.id];
    const before = w.guests.length;
    w.guests = w.guests.filter((g) => g.id !== params.guestId);
    return w.guests.length < before;
  });

  if (!removed) return errorJson("Invitado no encontrado", 404);
  return json({ ok: true });
}
