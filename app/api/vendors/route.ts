import { readDb, mutateDb } from "@/lib/server/db";
import { errorJson, genId, genToken, json } from "@/lib/server/util";
import { VENDOR_CATEGORIES, type Vendor, type VendorCategory } from "@/lib/types";

const CATEGORY_IDS = VENDOR_CATEGORIES.map((c) => c.id);

/**
 * Directorio PÚBLICO: solo proveedores VERIFICADOS.
 * Orden por mérito: rating (cuando exista, real) y antigüedad de verificación.
 * `plan=destacado` NUNCA altera este orden — la etiqueta es cosa de la UI.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const category = url.searchParams.get("category");
  const city = url.searchParams.get("city")?.toLowerCase().trim();

  const db = await readDb();
  let list = Object.values(db.vendors).filter((v) => v.status === "verificado");
  if (category) list = list.filter((v) => v.category === category);
  if (city) list = list.filter((v) => v.city.toLowerCase().includes(city));

  list.sort((a, b) => {
    const ra = a.rating ?? -1;
    const rb = b.rating ?? -1;
    if (rb !== ra) return rb - ra;
    return (a.verifiedAt ?? "").localeCompare(b.verifiedAt ?? "");
  });

  return json({
    // Público: sin editToken, sin estado interno y SIN leads (privados del
    // proveedor). El plan viaja solo para etiquetar "Destacado" en la UI.
    vendors: list.map(({ editToken: _e, status: _s, leads: _l, ...pub }) => ({
      ...pub,
      verified: true as const,
    })),
  });
}

/** Registro self-serve. Entra como "pendiente": NO visible hasta verificar. */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return errorJson("JSON inválido", 400);
  }

  const name = String(body.name ?? "").trim().slice(0, 80);
  const category = String(body.category ?? "") as VendorCategory;
  const city = String(body.city ?? "").trim().slice(0, 60);
  const whatsapp = String(body.whatsapp ?? "").replace(/[^\d+]/g, "").slice(0, 16);
  const description = String(body.description ?? "").trim().slice(0, 600);
  const priceRange = (["$", "$$", "$$$"] as const).includes(
    body.priceRange as "$",
  )
    ? (body.priceRange as Vendor["priceRange"])
    : "$$";

  if (!name || !city || !whatsapp || !description) {
    return errorJson("Faltan campos obligatorios", 400);
  }
  if (!CATEGORY_IDS.includes(category)) {
    return errorJson("Categoría inválida", 400);
  }

  const vendor: Vendor = {
    id: genId("ven"),
    editToken: genToken(12),
    name,
    category,
    city,
    description,
    priceRange,
    whatsapp,
    photos: Array.isArray(body.photos)
      ? body.photos.map(String).slice(0, 6)
      : [],
    availability: String(body.availability ?? "").slice(0, 200) || undefined,
    status: "pendiente", // ← invisible hasta que el admin verifique
    plan: "gratis", // ← hoy todos entran gratis; destacado es plomería futura
    createdAt: new Date().toISOString(),
  };

  await mutateDb((db) => {
    db.vendors[vendor.id] = vendor;
  });

  return json({ id: vendor.id, editToken: vendor.editToken }, 201);
}
