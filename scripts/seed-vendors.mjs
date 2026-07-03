// Siembra proveedores DE EJEMPLO para probar el flujo completo en dev.
// Todos llevan "(Ejemplo)" en el nombre — la honestidad de wedRing no se
// rompe ni en demo. Uso:  node scripts/seed-vendors.mjs
// Entran como "pendiente" para que practiques verificarlos en /admin.

import { promises as fs } from "fs";
import path from "path";
import { randomBytes } from "crypto";

const DB_PATH =
  process.env.WEDRING_DB_PATH ??
  path.join(process.cwd(), "data", "wedring-db.json");

const tok = (n = 9) => randomBytes(n).toString("base64url");

const SAMPLES = [
  {
    name: "Luz de Agave Fotografía (Ejemplo)",
    category: "fotografia",
    city: "Querétaro",
    description:
      "Fotografía documental de bodas: momentos reales, luz natural y cero poses forzadas. Paquetes desde 6 horas con entrega en galería privada.",
    priceRange: "$$",
    whatsapp: "5215512340001",
  },
  {
    name: "Hacienda San Roque (Ejemplo)",
    category: "venue",
    city: "Querétaro",
    description:
      "Hacienda del s. XVII con capilla, jardines y salón para 350 personas. Incluye coordinación el día del evento.",
    priceRange: "$$$",
    whatsapp: "5215512340002",
  },
  {
    name: "Cocina de Humo Catering (Ejemplo)",
    category: "catering",
    city: "CDMX",
    description:
      "Banquetes con cocina mexicana contemporánea. Menús de 3 tiempos, opciones vegetarianas y degustación previa incluida.",
    priceRange: "$$",
    whatsapp: "5215512340003",
  },
  {
    name: "Mariachi Los Cardenales (Ejemplo)",
    category: "musica",
    city: "Guadalajara",
    description:
      "Mariachi de 10 elementos para ceremonia y fiesta. Repertorio clásico y moderno; serenata sorpresa disponible.",
    priceRange: "$",
    whatsapp: "5215512340004",
  },
  {
    name: "Flor & Cantera (Ejemplo)",
    category: "flores",
    city: "San Miguel de Allende",
    description:
      "Diseño floral con flores de temporada y proveedores locales. Del ramo a la instalación completa de la ceremonia.",
    priceRange: "$$",
    whatsapp: "5215512340005",
  },
];

const raw = await fs.readFile(DB_PATH, "utf8").catch(() => null);
const db = raw ? JSON.parse(raw) : { weddings: {}, vendors: {} };
db.vendors ??= {};

let added = 0;
for (const s of SAMPLES) {
  const exists = Object.values(db.vendors).some((v) => v.name === s.name);
  if (exists) continue;
  const id = `ven_${tok(6)}`;
  db.vendors[id] = {
    id,
    editToken: tok(12),
    ...s,
    photos: [],
    status: "pendiente", // practica verificarlos en /admin
    plan: "gratis",
    createdAt: new Date().toISOString(),
  };
  added++;
}

await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
console.log(
  `✓ ${added} proveedores de ejemplo agregados (estado: pendiente).\n` +
    `  Ve a /admin para verificarlos y verlos aparecer en /proveedores.`,
);
