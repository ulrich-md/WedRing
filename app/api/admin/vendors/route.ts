// Panel de administración — protegido con x-admin-key (WEDRING_ADMIN_KEY).

import { readDb } from "@/lib/server/db";
import { errorJson, isAdmin, json } from "@/lib/server/util";

export async function GET(req: Request) {
  if (!isAdmin(req)) return errorJson("No autorizada", 401);
  const db = await readDb();
  const vendors = Object.values(db.vendors).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
  return json({ vendors });
}
