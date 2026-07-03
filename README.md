# wedRing 🤍

> El hogar tranquilo donde planeas tu boda, y vive donde ya estás: **WhatsApp**.

wedRing es lo contrario al caos de planear una boda. Se siente como una amiga
que ya se casó y te dice: _"tranquila, yo te ayudo a ponerlo en orden."_

## La vibe (su alma)

- **Calma, no estrés.** Cada pantalla respira. Mucho aire, una cosa importante a la vez.
- **Cálida y humana**, nunca corporativa. Habla en "tú".
- **Quiet luxury:** marfil, verde sage, dorado suave, tipografía serif.
- **Honesta:** sin números inventados, sin "paga para salir primero".
- **Con alma mexicana:** padrinos, haciendas, español por defecto.

## Qué está construido

**Lado pareja (gratis, el núcleo):**
- **Cascarón:** login sin contraseñas, onboarding (nombres/fecha/estilo/colores), tablero con cuenta regresiva y tarjetas **en vivo**.
- **RSVP por WhatsApp (el corazón):** cada invitado tiene un link único `/rsvp/{token}`; botón *wa.me* con mensaje pre-llenado + copiar link; página pública mobile-first **ES/EN** (sí/no/tal vez, acompañantes, menú, notas); el conteo se actualiza solo; *"Recordar a pendientes"*.
- **Invitados:** agregar/importar (pegar lista), filtros por estado, totales con acompañantes y menú.
- **Checklist con cronograma** (12→1 meses), % de avance y **proveedores verificados en contexto** dentro de las tareas.
- **Presupuesto:** total, gastos por categoría, gastado vs restante, gráfica simple. Las aportaciones de padrinos suman solas.
- **Padrinos por rol** (lazo, anillos, arras, ramo… editable) con patrocinios y aportaciones.
- **Web de boda** pública `/boda/{slug}` con detalles + RSVP explicado. Tema básico gratis.

**Lado negocio (panel de anunciantes):**
- **Registro self-serve** en `/anunciantes` → entra **pendiente de verificación** (NO visible).
- **Panel de administración** `/admin` (clave `WEDRING_ADMIN_KEY`): verificar / rechazar.
- Solo **verificados** aparecen para parejas, ordenados por **mérito** — nunca por pago.
- **Dashboard del proveedor** `/proveedor/{editToken}` (link secreto): edita solo su perfil.
- Plomería de monetización lista pero **apagada**: campo `plan: gratis|destacado`. Hoy todos gratis.

**Seguridad:**
- La página pública de RSVP valida el token y **solo** lee/escribe el RSVP de ese invitado. Nunca expone la lista.
- Mutaciones de la pareja → header `x-couple-key`. Admin → `x-admin-key`. Proveedor → su `editToken`.

## Cómo correrlo

```bash
npm install
cp .env.example .env      # pon tu WEDRING_ADMIN_KEY
npm run dev               # http://localhost:3000
npm run seed              # (opcional) 5 proveedores "(Ejemplo)" para probar /admin
```

Flujo de prueba: crea tu boda → agrega una invitada → copia su link → ábrelo en
incógnito y confirma → mira el tablero actualizarse. Luego `npm run seed` →
`/admin` (clave `wedring-admin-dev` en dev) → verifica → míralos en `/proveedores`
y dentro del checklist.

## Arquitectura de datos (léelo antes de lanzar)

- **Compartido** (invitados/RSVP, boda pública, proveedores) → servidor, vía API routes.
- **Privado de la pareja** (checklist, presupuesto, padrinos) → localStorage.
- El almacén del servidor es un **JSON en `data/`** con interfaz limpia
  (`lib/server/db.ts`). ⚠️ **En serverless (Vercel) el filesystem es efímero:**
  antes de producción, reemplaza solo ese módulo por Supabase/Postgres. Nada
  más de la app cambia.

## Lo que NO se construyó (a propósito)

Luna de miel y notas de agradecimiento (cortadas), mesa de regalos, plan de
mesas y galería QR (futuras Pro), comparador de venues (cuando haya densidad
de proveedores). El foco es el núcleo que mueve el negocio.

## Regla de oro

Cada cosa nueva debe sentirse exactamente igual de calmada y cuidada que la
primera pantalla. La vibe nunca se rompe.
