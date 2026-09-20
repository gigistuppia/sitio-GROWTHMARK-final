# assets/ — GROWTHMARK

Lista completa de imágenes / clips / SVG que la landing necesita para verse profesional. Cada entrada tiene: **nombre de archivo, formato, orientación, sección, y qué muestra**.

**Estado inicial:** solo el logo. El resto se genera o se dibuja. Marcado con `[ ]` = pendiente, `[x]` = provisto por el usuario.

---

## 1. Logo y marca

| # | Ruta                            | Formato       | Orientación | Estado | Descripción                                                   |
|---|---------------------------------|---------------|-------------|--------|----------------------------------------------------------------|
| 1.1 | `logo/growthmark.svg`         | SVG           | libre       | [ ] esperando al usuario | Logo principal, en versión monocromática blanca (para fondos oscuros). |
| 1.2 | `logo/growthmark-mark.svg`    | SVG           | cuadrado    | [ ] esperando al usuario | Isotipo solo (el aro/símbolo, sin wordmark). Para favicon y OG. |
| 1.3 | `logo/growthmark-wordmark.svg`| SVG           | horizontal  | [ ] esperando al usuario | Solo texto "GROWTHMARK" en la tipografía de marca.             |
| 1.4 | `favicon.ico`                 | ICO 32×32     | cuadrado    | [ ] generar             | Derivado de `growthmark-mark.svg`, fondo `#050810`.            |
| 1.5 | `og-image.jpg`                | JPG 1200×630  | horizontal  | [ ] generar             | Imagen para redes sociales / preview. Isotipo azul cobalto sobre negro profundo. |

---

## 2. Legs del worldflight

Seis tramos de vuelo. Cada tramo son **dos clips (desktop + mobile) + un poster WebP**. Los clips se encodean con `encode.sh` (GOP 8 desktop, GOP 4 mobile). Los posters se extraen del mp4 encoded con `ffmpeg`, no del render original.

### Leg 1 — Vacío

| # | Ruta                          | Formato        | Orientación         | Estado    | Descripción                                                                                       |
|---|-------------------------------|----------------|---------------------|-----------|----------------------------------------------------------------------------------------------------|
| 2.1.1 | `legs/leg1.mp4`             | MP4 H.264 GOP 8 | 1920×1080 horizontal| [ ] generar | 3-4s. Cámara flota lentamente hacia adelante en oscuridad casi total (`#050810`). Al fondo, un punto de luz azul cobalto muy pequeño, apenas perceptible. Sin objetos. Sin sujetos. Silencio visual. |
| 2.1.2 | `legs/leg1-m.mp4`           | MP4 H.264 GOP 4 | 1080×1920 vertical  | [ ] generar | Misma escena, framing vertical, el punto azul un poco más grande relativo al frame.               |
| 2.1.3 | `legs/leg1.webp`            | WebP           | 1920×1080 horizontal| [ ] extraer con `ffmpeg -i legs/leg1.mp4 -frames:v 1 legs/leg1.webp` | Primer frame como poster. |

### Leg 2 — Chispa

| # | Ruta                          | Formato        | Orientación         | Estado    | Descripción                                                                                       |
|---|-------------------------------|----------------|---------------------|-----------|----------------------------------------------------------------------------------------------------|
| 2.2.1 | `legs/leg2.mp4`             | MP4 H.264 GOP 8 | 1920×1080 horizontal| [ ] generar | 4-5s. El punto crece. Se forma un anillo azul cobalto (`#00a8ff` contorno, `#4fc3f7` halo difuminado). Fondo negro profundo. Sin más elementos. |
| 2.2.2 | `legs/leg2-m.mp4`           | MP4 H.264 GOP 4 | 1080×1920 vertical  | [ ] generar | Misma escena vertical. Anillo centrado.                                                            |
| 2.2.3 | `legs/leg2.webp`            | WebP           | 1920×1080 horizontal| [ ] extraer | Poster.                                                                                            |

### Leg 3 — Construcción (parte del signature "Live Wireframe")

Este leg **no necesita clip de video generado**. El scroll dibuja SVG en vivo (ver §4 del `design.md`, sección "Signature move"). Solo se necesita un poster estático de fondo.

| # | Ruta                          | Formato        | Orientación         | Estado    | Descripción                                                                                       |
|---|-------------------------------|----------------|---------------------|-----------|----------------------------------------------------------------------------------------------------|
| 2.3.1 | `legs/leg3-bg.webp`         | WebP           | 1920×1080 horizontal| [ ] generar | Fondo estático: negro profundo `#050810` con un gradiente muy sutil hacia `#0a0d1a` en las esquinas. Sin objetos. El wireframe se dibuja encima con SVG. |
| 2.3.2 | `legs/leg3-bg-m.webp`       | WebP           | 1080×1920 vertical  | [ ] generar | Versión vertical del fondo.                                                                        |
| 2.3.3 | `wireframes/leg3-wireframe.svg` | SVG puro   | 1920×1080           | [ ] dibujar in-place | Wireframe 3D de un sitio web: header, hero, tres tarjetas, footer. Trazado con líneas `stroke="#00a8ff"` `stroke-width="1.5"`. Todos los paths con `stroke-dasharray` para animar el trazado por scroll. |

### Leg 4 — Web viva (PEAK)

| # | Ruta                          | Formato        | Orientación         | Estado    | Descripción                                                                                       |
|---|-------------------------------|----------------|---------------------|-----------|----------------------------------------------------------------------------------------------------|
| 2.4.1 | `legs/leg4-bg.webp`         | WebP           | 1920×1080 horizontal| [ ] generar | Fondo negro profundo con un halo suave azul cobalto centrado. La web viva se compone encima con HTML/SVG real. |
| 2.4.2 | `legs/leg4-bg-m.webp`       | WebP           | 1080×1920 vertical  | [ ] generar | Versión vertical del fondo.                                                                        |
| 2.4.3 | `mockup/livesite.html`        | Fragmento HTML | —                   | [ ] armar con HTML/SVG in-page | Mini-site mockup: header con `TU MARCA`, hero con titular fake genérico ("Tu negocio en internet, con carácter"), tres tarjetas de servicios sin cifras, botón CTA azul cobalto. Todo con la paleta y las fuentes del design system real, para que se vea coherente con el sitio de GROWTHMARK. |

### Leg 5 — Prueba

| # | Ruta                          | Formato        | Orientación         | Estado    | Descripción                                                                                       |
|---|-------------------------------|----------------|---------------------|-----------|----------------------------------------------------------------------------------------------------|
| 2.5.1 | `legs/leg5.mp4`             | MP4 H.264 GOP 8 | 1920×1080 horizontal| [ ] generar | 4-5s. Cámara se aleja del laptop del peak. Se revelan 4-5 pantallas más flotando en el espacio, todas encendidas con contenido diferente (todas con la paleta GROWTHMARK). Sin números inventados en las pantallas. |
| 2.5.2 | `legs/leg5-m.mp4`           | MP4 H.264 GOP 4 | 1080×1920 vertical  | [ ] generar | Versión vertical: 3 pantallas apiladas en lugar de 5 horizontales.                                 |
| 2.5.3 | `legs/leg5.webp`            | WebP           | 1920×1080 horizontal| [ ] extraer | Poster.                                                                                            |

### Leg 6 — Commitment

| # | Ruta                          | Formato        | Orientación         | Estado    | Descripción                                                                                       |
|---|-------------------------------|----------------|---------------------|-----------|----------------------------------------------------------------------------------------------------|
| 2.6.1 | `legs/leg6.mp4`             | MP4 H.264 GOP 8 | 1920×1080 horizontal| [ ] generar | 3-4s. Cámara aterriza suavemente. Fondo se aquieta. Todo negro profundo con un solo halo azul cobalto centrado, donde va el botón CTA. Puede ser incluso una imagen estática con un push-in muy sutil. |
| 2.6.2 | `legs/leg6-m.mp4`           | MP4 H.264 GOP 4 | 1080×1920 vertical  | [ ] generar | Versión vertical.                                                                                  |
| 2.6.3 | `legs/leg6.webp`            | WebP           | 1920×1080 horizontal| [ ] extraer | Poster.                                                                                            |

---

## 3. UI in-page (SVG dibujados a mano, no generados)

| # | Ruta                          | Formato | Orientación | Estado | Descripción                                                                            |
|---|-------------------------------|---------|-------------|--------|-----------------------------------------------------------------------------------------|
| 3.1 | `ui/whatsapp-icon.svg`       | SVG     | 24×24       | [ ] dibujar | Ícono de WhatsApp en color `#0080ff` (accent-2). Path oficial simplificado.            |
| 3.2 | `ui/arrow-right.svg`         | SVG     | 24×24       | [ ] dibujar | Flecha ir a la derecha para el botón CTA. Trazo `#ffffff`.                              |
| 3.3 | `ui/ring.svg`                | SVG     | 200×200     | [ ] dibujar | El anillo del leg 2, aislado, para reutilizar como microacento del footer.              |

---

## 4. Referencias sensoriales (inspiración, NO usar directamente)

Se documentan como referencia interna para el equipo de diseño. **Nunca se muestran ni se copian pixel-perfect.** Solo para alinear la vibra durante la generación de los legs.

Guardar capturas aprobadas en `assets/references/` con estos nombres:

| # | Ruta                                         | Descripción                                                                                          |
|---|----------------------------------------------|-------------------------------------------------------------------------------------------------------|
| 4.1 | `references/blade-runner-2049.jpg`         | Escena nocturna azul cobalto de Blade Runner 2049 (Deakins). Referencia de iluminación densa y silencio visual. |
| 4.2 | `references/tron-legacy.jpg`               | Interfaz azul neón sobre negro absoluto de TRON: Legacy. Referencia del wireframe y las líneas trazándose. |
| 4.3 | `references/control-room.jpg`              | Sala de control tech premium con backlight azul cobalto. Referencia del "orden" y "confianza" del sistema. |
| 4.4 | `references/blueprint-glow.jpg`            | Wireframe luminoso azul de edificio/objeto construido con líneas. Referencia directa del signature Live Wireframe. |

Ya se buscaron y capturaron en Bing Images durante la fase de brief. Ver historial de la conversación de diseño.

---

## 5. Prioridad de producción

Orden sugerido para no bloquearse:

1. **Fase 1 — puede empezar código:** el logo (usuario) + los SVGs UI (3.x) + `mockup/livesite.html` (2.4.3) + `wireframes/leg3-wireframe.svg` (2.3.3).
   Con esto se puede armar la landing en estado de "worldflight con posters estáticos y signature funcionando". Ya se puede pasar por Playwright y validar composición.

2. **Fase 2 — riqueza cinematográfica:** los 6 clips de video (2.1.1, 2.2.1, 2.5.1, 2.6.1, más los mobile).
   Requiere `KIE_AI_API_KEY` seteada (o alternativa: fotografiar tomas reales / usar footage licenciado). Sin esto, la landing sigue siendo funcional con posters + signature — solo pierde el vuelo continuo.

3. **Fase 3 — cierre:** favicon (1.4), OG image (1.5), extracción de posters con `ffmpeg`.

---

## 6. Reglas para generar (si se usa IA)

Cuando se generen assets con `kie.mjs` u otro modelo, **usar un solo style preamble** reusado verbatim en cada prompt. Esto es lo que hace que 6 imágenes distintas parezcan una sola sesión de foto. Borrador:

> *"Cinematic photograph, ultra-dark environment (deep black #050810), single directional cobalt blue light source (#1565c0), electric blue accents (#00a8ff), light halo bloom (#4fc3f7), no humans, no faces, no plastic 3D, high contrast controlled, moody sci-fi realism in the tradition of Roger Deakins in Blade Runner 2049 and Territory Studio interfaces from TRON Legacy, minimalist composition, clean negative space, professional and premium mood, no text in image, no logo in image."*

Reglas:
- Sin humanos.
- Sin texto quemado (todo el texto es HTML).
- Sin logos de terceros.
- Sin colores cálidos dominantes (nada de naranja o rojo). Excepción: destellos mínimos aceptables si aportan contraste, nunca dominantes.
- Ratio: 16:9 desktop / 9:16 mobile.

---

## Ubicación relativa desde la raíz del proyecto

```
sitio-growthmark-prueba/
├── design.md
├── assets/
│   ├── README.md          ← este archivo
│   ├── favicon.ico
│   ├── og-image.jpg
│   ├── logo/
│   │   ├── growthmark.svg
│   │   ├── growthmark-mark.svg
│   │   └── growthmark-wordmark.svg
│   ├── legs/
│   │   ├── leg1.mp4 · leg1-m.mp4 · leg1.webp
│   │   ├── leg2.mp4 · leg2-m.mp4 · leg2.webp
│   │   ├── leg3-bg.webp · leg3-bg-m.webp
│   │   ├── leg4-bg.webp · leg4-bg-m.webp
│   │   ├── leg5.mp4 · leg5-m.mp4 · leg5.webp
│   │   └── leg6.mp4 · leg6-m.mp4 · leg6.webp
│   ├── wireframes/
│   │   └── leg3-wireframe.svg
│   ├── mockup/
│   │   └── livesite.html
│   ├── ui/
│   │   ├── whatsapp-icon.svg
│   │   ├── arrow-right.svg
│   │   └── ring.svg
│   └── references/
│       ├── blade-runner-2049.jpg
│       ├── tron-legacy.jpg
│       ├── control-room.jpg
│       └── blueprint-glow.jpg
```
