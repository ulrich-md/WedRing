# wedRing 🤍

> El hogar tranquilo donde planeas tu boda, y vive donde ya estás: **WhatsApp**.

wedRing es lo contrario al caos de planear una boda. Se siente como una amiga
que ya se casó y te dice: _"tranquila, yo te ayudo a ponerlo en orden."_

Este repositorio contiene el **cascarón** de la app: el primer paso de la
visión, con la vibe ya puesta. A partir de aquí se irá agregando todo lo demás,
de a poco, sin romper nunca la calma.

## La vibe (su alma)

- **Calma, no estrés.** Cada pantalla respira. Mucho aire, una cosa importante a la vez.
- **Cálida y humana**, nunca corporativa. Habla en "tú".
- **Quiet luxury:** marfil, verde sage, dorado suave, tipografía serif.
- **Honesta y con alma mexicana:** padrinos, haciendas, español por defecto.

## Qué incluye este cascarón

- **Intro calmado** — un anillo que se dibuja solo y revela la app (bajo 2s, respeta `prefers-reduced-motion`).
- **Inicio de sesión** — sin contraseñas; entra por WhatsApp o correo.
- **Configura tu boda** — onboarding paso a paso: nombres, fecha, estilo y colores.
- **El tablero** — sus nombres, su fecha, cuenta regresiva y tarjetas tranquilas de resumen (presupuesto, invitados, checklist, proveedores, padrinos, web).
- **Navegación entre secciones** — barra lateral en escritorio, barra inferior en móvil.
- **Ajustes** — edita los detalles de tu boda y tu cuenta.
- Las secciones por construir (Invitados/RSVP, Presupuesto, Checklist, Proveedores, Padrinos, Web) muestran un estado _"próximamente"_ cálido y honesto, igual de cuidado que el resto.

> El estado vive por ahora en el navegador (localStorage). Más adelante será el
> contrato con el backend, sin tocar la UI.

## Decisiones de diseño

| | |
|---|---|
| **Paleta** | Marfil cálido `#FAF6EF`, sage `#5C6B49`, dorado suave `#C2A36B`, tinta cálida |
| **Tipografía** | Cormorant Garamond (serif display) + Mulish (sans humanista) |
| **Movimiento** | UNA curva de easing `cubic-bezier(0.22, 1, 0.36, 1)`; duraciones que escalan con el tamaño; reveals sutiles |
| **Stack** | Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · lucide-react |

La dirección de color y movimiento sigue la disciplina del documento de
referencia (un solo acento, una sola curva, intro que marca el tono), pero
aplicada con **calma**: nada agresivo, nada que distraiga.

## Cómo correrlo

```bash
npm install
npm run dev
# abre http://localhost:3000
```

## Estructura

```
app/
  layout.tsx            # fuentes, provider, intro
  page.tsx              # ruteo según sesión/boda
  login/                # inicio de sesión
  configurar/           # onboarding de la boda
  (app)/                # cascarón autenticado (sidebar + topbar + nav móvil)
    tablero/            # el tablero (centro de calma)
    invitados/ … web/   # secciones (próximamente)
    configuracion/      # ajustes
components/             # marca, shell, dashboard, ui, providers
lib/                    # tipos, storage, datos de la boda, navegación, motion
.claude/skills/         # skill UI/UX Pro Max instalada
```

## Orden para seguir construyendo

1. ✅ El cascarón (esto).
2. El corazón: RSVP por WhatsApp completo.
3. De a poco: presupuesto → checklist → proveedores → padrinos → web → extras.

Regla de oro: cada cosa nueva debe sentirse exactamente igual de calmada y
cuidada que la primera pantalla. La vibe nunca se rompe.
