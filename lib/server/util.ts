import { randomBytes } from "crypto";
import type { WeddingRecord } from "@/lib/types";

/** Token URL-safe corto pero impredecible (~72 bits). */
export function genToken(bytes = 9): string {
  return randomBytes(bytes).toString("base64url");
}

export function genId(prefix: string): string {
  return `${prefix}_${genToken(6)}`;
}

/** "Sofía & Mateo" → "sofia-y-mateo-x3f9" (sufijo evita colisiones). */
export function makeSlug(partners: [string, string]): string {
  const base = partners
    .filter(Boolean)
    .join(" y ")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return `${base || "nuestra-boda"}-${genToken(3)}`;
}

/** Valida la paleta de la pareja (hex estricto — se inyecta en estilos). */
export function sanitizePalette(
  p?: { name?: unknown; hex?: unknown } | null,
): { name: string; hex: string } | undefined {
  if (!p) return undefined;
  const hex = String(p.hex ?? "");
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return undefined;
  return { name: String(p.name ?? "").slice(0, 40), hex };
}

/* ── Auth ── */

/** Clave del panel de administración. SIEMPRE configúrala en producción. */
export function adminKey(): string {
  return process.env.WEDRING_ADMIN_KEY || "wedring-admin-dev";
}

export function isAdmin(req: Request): boolean {
  return req.headers.get("x-admin-key") === adminKey();
}

/** La pareja autentica sus mutaciones con su coupleKey. */
export function isCouple(req: Request, wedding: WeddingRecord): boolean {
  return req.headers.get("x-couple-key") === wedding.coupleKey;
}

export function json(data: unknown, status = 200) {
  return Response.json(data, { status });
}

export function errorJson(message: string, status: number) {
  return Response.json({ error: message }, { status });
}
