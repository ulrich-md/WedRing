import { mutateDb } from "@/lib/server/db";
import { genId, genToken, json, makeSlug, errorJson } from "@/lib/server/util";
import type { WeddingRecord } from "@/lib/types";

/** Crea el registro compartido de la boda. Devuelve credenciales de pareja. */
export async function POST(req: Request) {
  let body: {
    partners?: [string, string];
    date?: string | null;
    location?: string;
  };
  try {
    body = await req.json();
  } catch {
    return errorJson("JSON inválido", 400);
  }

  const partners: [string, string] = [
    String(body.partners?.[0] ?? "").slice(0, 60),
    String(body.partners?.[1] ?? "").slice(0, 60),
  ];
  if (!partners[0] && !partners[1]) {
    return errorJson("Faltan los nombres", 400);
  }

  const record: WeddingRecord = {
    id: genId("wed"),
    coupleKey: genToken(12),
    slug: makeSlug(partners),
    partners,
    date: body.date ?? null,
    location: String(body.location ?? "").slice(0, 120),
    webMessage: "",
    createdAt: new Date().toISOString(),
    guests: [],
  };

  await mutateDb((db) => {
    db.weddings[record.id] = record;
  });

  return json({ id: record.id, coupleKey: record.coupleKey, slug: record.slug });
}
