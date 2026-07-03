// Verificar o rechazar un proveedor. La verificación SE GANA: nunca depende
// de un pago. Solo el admin puede cambiar estados.

import { readDb, mutateDb } from "@/lib/server/db";
import { errorJson, isAdmin, json } from "@/lib/server/util";

type Ctx = { params: { id: string } };

export async function POST(req: Request, { params }: Ctx) {
  if (!isAdmin(req)) return errorJson("No autorizada", 401);

  let body: { action?: string };
  try {
    body = await req.json();
  } catch {
    return errorJson("JSON inválido", 400);
  }
  if (body.action !== "verificar" && body.action !== "rechazar") {
    return errorJson("Acción inválida", 400);
  }

  const db = await readDb();
  if (!db.vendors[params.id]) return errorJson("No encontrado", 404);

  const vendor = await mutateDb((mdb) => {
    const v = mdb.vendors[params.id];
    if (body.action === "verificar") {
      v.status = "verificado";
      v.verifiedAt = new Date().toISOString();
    } else {
      v.status = "rechazado";
      v.verifiedAt = undefined;
    }
    return v;
  });

  return json({ vendor });
}
