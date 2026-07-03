import { readDb, mutateDb } from "@/lib/server/db";
import { errorJson, isCouple, json } from "@/lib/server/util";

type Ctx = { params: { id: string } };

/** Datos de la boda para la pareja (requiere su coupleKey). */
export async function GET(req: Request, { params }: Ctx) {
  const db = await readDb();
  const wedding = db.weddings[params.id];
  if (!wedding) return errorJson("No encontrada", 404);
  if (!isCouple(req, wedding)) return errorJson("No autorizada", 401);
  return json({ wedding });
}

/** Actualiza detalles compartidos (nombres, fecha, lugar, mensaje web). */
export async function PATCH(req: Request, { params }: Ctx) {
  const db = await readDb();
  const existing = db.weddings[params.id];
  if (!existing) return errorJson("No encontrada", 404);
  if (!isCouple(req, existing)) return errorJson("No autorizada", 401);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return errorJson("JSON inválido", 400);
  }

  const updated = await mutateDb((mdb) => {
    const w = mdb.weddings[params.id];
    if (Array.isArray(body.partners)) {
      w.partners = [
        String(body.partners[0] ?? "").slice(0, 60),
        String(body.partners[1] ?? "").slice(0, 60),
      ];
    }
    if ("date" in body) w.date = body.date ? String(body.date).slice(0, 10) : null;
    if ("location" in body) w.location = String(body.location ?? "").slice(0, 120);
    if ("webMessage" in body)
      w.webMessage = String(body.webMessage ?? "").slice(0, 600);
    return w;
  });

  return json({ wedding: updated });
}
