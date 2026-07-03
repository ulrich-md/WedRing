// Almacén de datos del servidor de wedRing.
//
// Implementación MVP: un archivo JSON con escrituras serializadas. Funciona
// completo en dev y self-hosted. ⚠️ En serverless (Vercel) el filesystem es
// efímero: antes de lanzar a producción, reemplaza SOLO este módulo por una
// implementación con base de datos real (Supabase/Postgres) — el resto de la
// app habla únicamente con readDb()/mutateDb().

import { promises as fs } from "fs";
import path from "path";
import type { Vendor, WeddingRecord } from "@/lib/types";

export interface DB {
  weddings: Record<string, WeddingRecord>;
  vendors: Record<string, Vendor>;
}

const EMPTY: DB = { weddings: {}, vendors: {} };

const DB_PATH =
  process.env.WEDRING_DB_PATH ?? path.join(process.cwd(), "data", "wedring-db.json");

// Cache en memoria + cola para serializar mutaciones (evita escrituras cruzadas).
let cache: DB | null = null;
let queue: Promise<unknown> = Promise.resolve();

async function load(): Promise<DB> {
  if (cache) return cache;
  try {
    const raw = await fs.readFile(DB_PATH, "utf8");
    cache = { ...EMPTY, ...(JSON.parse(raw) as DB) };
  } catch {
    cache = structuredClone(EMPTY);
  }
  return cache;
}

async function persist(db: DB) {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  const tmp = DB_PATH + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(db, null, 2), "utf8");
  await fs.rename(tmp, DB_PATH);
}

/** Lectura (no mutar el resultado; para cambios usa mutateDb). */
export async function readDb(): Promise<DB> {
  return load();
}

/** Mutación serializada + persistida. Devuelve lo que retorne fn. */
export async function mutateDb<T>(fn: (db: DB) => T | Promise<T>): Promise<T> {
  const run = queue.then(async () => {
    const db = await load();
    const result = await fn(db);
    await persist(db);
    return result;
  });
  // La cola nunca se rompe aunque una mutación falle.
  queue = run.catch(() => {});
  return run;
}

/* ── Búsquedas frecuentes ── */

export async function findGuestByToken(token: string) {
  const db = await readDb();
  for (const wedding of Object.values(db.weddings)) {
    const guest = wedding.guests.find((g) => g.token === token);
    if (guest) return { wedding, guest };
  }
  return null;
}

export async function findWeddingBySlug(slug: string) {
  const db = await readDb();
  return Object.values(db.weddings).find((w) => w.slug === slug) ?? null;
}

export async function findVendorByEditToken(token: string) {
  const db = await readDb();
  return Object.values(db.vendors).find((v) => v.editToken === token) ?? null;
}
