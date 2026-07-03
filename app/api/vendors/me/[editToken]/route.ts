// El proveedor accede SOLO a su propio perfil vía su editToken secreto.

import { findVendorByEditToken, mutateDb } from "@/lib/server/db";
import { errorJson, json } from "@/lib/server/util";
import { VENDOR_CATEGORIES, type VendorCategory } from "@/lib/types";

type Ctx = { params: { editToken: string } };
const CATEGORY_IDS = VENDOR_CATEGORIES.map((c) => c.id);

export async function GET(_req: Request, { params }: Ctx) {
  const vendor = await findVendorByEditToken(params.editToken);
  if (!vendor) return errorJson("No encontrado", 404);
  return json({ vendor });
}

export async function PATCH(req: Request, { params }: Ctx) {
  const vendor = await findVendorByEditToken(params.editToken);
  if (!vendor) return errorJson("No encontrado", 404);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return errorJson("JSON inválido", 400);
  }

  const updated = await mutateDb((db) => {
    const v = db.vendors[vendor.id];
    if (typeof body.name === "string" && body.name.trim())
      v.name = body.name.trim().slice(0, 80);
    if (CATEGORY_IDS.includes(body.category as VendorCategory))
      v.category = body.category as VendorCategory;
    if (typeof body.city === "string" && body.city.trim())
      v.city = body.city.trim().slice(0, 60);
    if (typeof body.description === "string")
      v.description = body.description.trim().slice(0, 600);
    if ((["$", "$$", "$$$"] as const).includes(body.priceRange as "$"))
      v.priceRange = body.priceRange as "$";
    if (typeof body.whatsapp === "string")
      v.whatsapp = body.whatsapp.replace(/[^\d+]/g, "").slice(0, 16) || v.whatsapp;
    if ("availability" in body)
      v.availability = String(body.availability ?? "").slice(0, 200) || undefined;
    if (Array.isArray(body.photos)) v.photos = body.photos.map(String).slice(0, 6);
    // Nota: el estado y el plan NO se tocan desde aquí. Solo el admin.
    return v;
  });

  return json({ vendor: updated });
}
