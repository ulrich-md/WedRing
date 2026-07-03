// Registra un lead REAL: una pareja tocó "Cotizar por WhatsApp" con este
// proveedor. Endpoint público (lo dispara la app de la pareja), pero solo
// cuenta hechos: se deduplica por boda para no inflar números.

import { readDb, mutateDb } from "@/lib/server/db";
import { errorJson, genId, json } from "@/lib/server/util";

type Ctx = { params: { id: string } };

export async function POST(req: Request, { params }: Ctx) {
  const db = await readDb();
  const vendor = db.vendors[params.id];
  // Solo proveedores verificados reciben leads (los demás no son visibles).
  if (!vendor || vendor.status !== "verificado") {
    return errorJson("No encontrado", 404);
  }

  let body: { coupleNames?: string; weddingId?: string };
  try {
    body = await req.json();
  } catch {
    body = {};
  }
  const coupleNames = String(body.coupleNames ?? "").slice(0, 80) || undefined;
  const weddingId = String(body.weddingId ?? "").slice(0, 40) || undefined;

  await mutateDb((mdb) => {
    const v = mdb.vendors[params.id];
    v.leads ??= [];
    // misma boda → un solo lead por proveedor
    if (weddingId && v.leads.some((l) => l.weddingId === weddingId)) return;
    if (v.leads.length >= 500) return; // tope sano
    v.leads.push({
      id: genId("lead"),
      at: new Date().toISOString(),
      coupleNames,
      weddingId,
    });
  });

  return json({ ok: true });
}
