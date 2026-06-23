# Assets de wedRing

Aquí van las imágenes y videos del sitio. Mientras no estén, las tarjetas
muestran un degradado cálido (nunca se ve roto) y, si está disponible, cargan
la versión remota generada con IA.

## ¿Dónde subo cada cosa?

### Fotos de parejas → `public/assets/couples/` ✅ (ya subidas)
Nombres usados por el sitio:

```
public/assets/couples/couple-1.png
public/assets/couples/couple-2.png
public/assets/couples/couple-3.png
public/assets/couples/couple-4.png
```

Se usan en el carrusel. Proporción ideal: vertical (3:4 o 4:5).
Si las reemplazas por fotos reales, conserva los mismos nombres (o ponlas en
`.webp` y actualiza `lib/photos.ts`). Tip de peso: estas PNG pesan ~5 MB;
conviene exportarlas como `.webp` (~200 KB) para que el sitio cargue rápido.

### Video del hero → `public/assets/video/`
El beso de la pareja que se ve flotando en el hero:

```
public/assets/video/hero-kiss.mp4
```

(Opcional, recomendado) una versión `.webm` más ligera y un póster:
```
public/assets/video/hero-kiss.webm
public/assets/video/hero-kiss-poster.webp
```

Vertical (9:16), corto (~5s), silencioso, en loop.

## ¿De dónde saco los archivos generados?

Las imágenes y el video se generaron con IA (Higgsfield) como punto de partida.
Descárgalos desde tu cuenta de Higgsfield y colócalos aquí con los nombres de
arriba. Los archivos locales **tienen prioridad** sobre las versiones remotas,
así que en cuanto los pongas, el sitio los usa y quedan permanentes.

> Sugerencia: cuando tengas fotos reales de tus bodas/usuarios, reemplázalas
> aquí mismo —el alma de wedRing es auténtica, no perfecta.
