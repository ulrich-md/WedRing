// Verificar o rechazar un proveedor. La verificación SE GANA: nunca depende
// de un pago. Solo el admin puede cambiar estados.

import { readDb, mutateDb } from "@/lib/server/db";
import { errorJson, isAdmin, json } from "@/lib/server/util";

type Ctx = { params: { id: string } };

export async function POST(req: Request, { params }: Ctx) {
  if (!isAdmin(req)) return errorJson("No autorizada", 401);

  let body: { action?: string; plan?: string };
  try {
    body = await req.json();
  } catch {
    return errorJson("JSON inválido", 400);
  }
  const validAction =
    body.action === "verificar" ||
    body.action === "rechazar" ||
    (body.action === "plan" && (body.plan === "gratis" || body.plan === "destacado"));
  if (!validAction) return errorJson("Acción inválida", 400);

  const db = await readDb();
  if (!db.vendors[params.id]) return errorJson("No encontrado", 404);

  const vendor = await mutateDb((mdb) => {
    const v = mdb.vendors[params.id];
    if (body.action === "verificar") {
      v.status = "verificado";
      v.verifiedAt = new Date().toISOString();
    } else if (body.action === "rechazar") {
      v.status = "rechazado";
      v.verifiedAt = undefined;
    } else {
      // Plomería de monetización: cambia la ETIQUETA, jamás el orden orgánico
      // (el GET público ordena por mérito e ignora el plan).
      v.plan = body.plan as "gratis" | "destacado";
    }
    return v;
  });

  return json({ vendor });
}
