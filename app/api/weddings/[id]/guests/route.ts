import { readDb, mutateDb } from "@/lib/server/db";
import { errorJson, genId, genToken, isCouple, json } from "@/lib/server/util";
import type { Guest } from "@/lib/types";

type Ctx = { params: { id: string } };

function newGuest(name: string, phone?: string): Guest {
  return {
    id: genId("gst"),
    token: genToken(),
    name: name.slice(0, 80),
    phone: phone?.replace(/[^\d+]/g, "").slice(0, 16) || undefined,
    status: "pendiente",
    party: 1,
  };
}

/** Lista completa de invitados — SOLO para la pareja. */
export async function GET(req: Request, { params }: Ctx) {
  const db = await readDb();
  const wedding = db.weddings[params.id];
  if (!wedding) return errorJson("No encontrada", 404);
  if (!isCouple(req, wedding)) return errorJson("No autorizada", 401);
  return json({ guests: wedding.guests });
}

/** Agrega un invitado {name, phone} o varios {bulk: [{name, phone}]}. */
export async function POST(req: Request, { params }: Ctx) {
  const db = await readDb();
  const wedding = db.weddings[params.id];
  if (!wedding) return errorJson("No encontrada", 404);
  if (!isCouple(req, wedding)) return errorJson("No autorizada", 401);

  let body: { name?: string; phone?: string; bulk?: { name: string; phone?: string }[] };
  try {
    body = await req.json();
  } catch {
    return errorJson("JSON inválido", 400);
  }

  const items = body.bulk
    ? body.bulk.filter((b) => b?.name?.trim()).slice(0, 300)
    : body.name?.trim()
      ? [{ name: body.name, phone: body.phone }]
      : [];
  if (items.length === 0) return errorJson("Falta el nombre", 400);

  const added = await mutateDb((mdb) => {
    const w = mdb.weddings[params.id];
    const created = items.map((i) => newGuest(i.name.trim(), i.phone?.trim()));
    w.guests.push(...created);
    return created;
  });

  return json({ guests: added }, 201);
}
