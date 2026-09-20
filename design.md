# design.md — Landing GROWTHMARK

> Documento único de diseño. Fuente de verdad antes de escribir una línea de código.
> Estructura: worldflight (una sola cámara volando por un único mundo, sin cortes).
> Estética: premium-minimal + neon tech. Tono: tuteo argentino (vos).

---

## 1. Las 3 P

**Persona.** Empresario o persona con un negocio real (recién arrancando o con años de trayectoria) que quiere atraer clientes a través de internet. No es un techie. Sabe que necesita presencia web, pero no sabe qué implica ni por dónde empezar. Le desconfía a lo genérico y a las promesas grandilocuentes.

**Dolor.** Su negocio no tiene representación digital seria, o la que tiene no le trae clientes. Siente que "existe menos" que la competencia que sí está online. Cuando alguien lo busca, no lo encuentra o encuentra algo que no lo representa. Cada mes que pasa sin sitio es un mes de clientes que fueron a otro lado.

**Promesa.** GROWTHMARK diseña, publica y deja lista una herramienta digital que representa fielmente su negocio y trabaja para atraerle más clientes — dominio, hosting y todo listo para subir a la web.

---

## 2. La oración final

**Lo que el visitante tiene que creer al final, en una sola oración:**

> **"Estos me pueden armar la web que mi negocio necesita — y la puedo tener funcionando pronto, sin dolores de cabeza."**

## 3. La frase que le diría a un amigo (peak / signature)

> **"Es el sitio donde tu propia web nace mientras hacés scroll."**

---

## 4. Recorrido — worldflight, 6 legs

Un solo mundo. Una sola cámara. Cero cortes visibles. Cada leg es un tramo de vuelo con su propio contenido de copy encima.

| # | Waypoint         | Qué ve                                                                                       | Qué siente                                | Copy en pantalla (borrador)                                                              |
|---|------------------|-----------------------------------------------------------------------------------------------|-------------------------------------------|-------------------------------------------------------------------------------------------|
| 1 | **Vacío**        | Oscuridad profunda. Un punto azul lejano flotando en la nada.                                 | Curiosidad silenciosa. *"algo falta"*     | `Tu negocio existe. Pero en internet, todavía no.`                                        |
| 2 | **Chispa**       | El punto crece. Se forma un anillo azul cobalto luminoso.                                     | Expectativa. *"algo empieza"*             | `Eso puede cambiar.`                                                                       |
| 3 | **Construcción** | Del anillo salen líneas azules que dibujan el wireframe 3D de una web flotando en el aire.    | Asombro creciente. *"esto se está armando"*| `Tu web se diseña desde cero, con vos y para tu negocio.`                                |
| 4 | **Web viva** (PEAK) | El wireframe se rellena de contenido: hero, tarjetas, botón. Una web real, encendida.       | Reconocimiento + deseo. *"esto puedo tener yo"* | `Así se ve tu negocio online.`                                                        |
| 5 | **Prueba**       | La cámara se aleja. Múltiples pantallas encendidas alrededor, todas azul cobalto sobre negro.  | Confianza. *"esto funciona de verdad"*    | `Dominio, hosting y publicación. Todo listo para subir.` (sin cifras inventadas)         |
| 6 | **Commitment**   | La cámara aterriza. El botón "Contactanos" pulsa azul cobalto. Silencio alrededor.             | Decisión. *"quiero uno, ahora"*           | `Hablemos.` — Botón `Contactanos` grande, con enlace a WhatsApp *(link pendiente)*.       |

**Peak explícito:** leg 4. Silencio previo. La cámara aloja el 40 % del scroll total ahí.

**Anti-fingerprint:** ninguna sección repite el "device" de la anterior (chispa → construcción es dibujado, dibujado → peak es rellenado con contenido, prueba es zoom-out, commitment es aterrizaje). Cuatro familias de movimiento distintas.

---

## 5. Curva de energía

```
Vacío     Chispa     Construcción   PEAK (Web viva)   Prueba     Commitment
[calmo]  [expectante]   [asombro]    [reconocimiento]  [confianza] [decisión]
   ▁          ▂             ▄              █             ▅             ▃
```

- Peak en el leg 4, con el mayor span de scroll.
- Leg 3 termina en un cuadro casi negro (silencio) antes del rellenado del peak.
- Leg 5 baja para no competir con el peak.
- Cierre resuelto: no fade-out, no footer que se cae; la cámara aterriza en el CTA y se queda ahí.

---

## 6. El momento único a recordar

**Peak visual (leg 4):** el wireframe azul se rellena en vivo con el contenido de una web real: header con el nombre "TU MARCA" en el logo, hero con un titular grande, tres tarjetas de servicios, y un botón CTA que se ilumina último. El visitante ve, con sus propios ojos, cómo se ve su negocio online sin haber contratado nada todavía.

## 7. Signature move — **"Live Wireframe"**

Una idea de movimiento única que no existe en ningún otro sitio.

**Qué es.** Durante los legs 3 y 4, el scroll **dibuja**. Cada elemento del wireframe/mockup se traza con SVG real: `stroke-dasharray` + `stroke-dashoffset` controlados por el progreso del scroll (`--sc-p`). Header → hero → tarjetas → botón, uno tras otro, al ritmo del gesto del visitante.

**Por qué acá y no en otro lado.** GROWTHMARK es una agencia de diseño web. El signature literalmente muestra el oficio: *diseñamos delante tuyo*. No es un truco visual sin razón — es la promesa hecha animación.

**Cómo se implementa (nota técnica).**
- SVG in-page con paths reales del wireframe.
- Un solo custom `--sc-p` (progreso del leg) alimenta los `stroke-dashoffset`.
- El "rellenado" del peak es un `mask` que revela una copia con más detalle debajo del wireframe.
- Cero video en este segmento del vuelo (más liviano que un mp4).
- La skill dice explícitamente: bespoke JS en la página, engine sin tocar.

---

## 8. Sistema visual

### 8.1 Paleta con roles

Todos los tokens vienen del brief del usuario, con roles asignados:

| Token CSS           | Hex      | Rol                                                                      |
|---------------------|----------|--------------------------------------------------------------------------|
| `--color-canvas`    | `#050810`| Fondo principal (negro profundo, base del mundo)                          |
| `--color-canvas-2` | `#0a0d1a`| Gradiente secundario / atmósfera                                          |
| `--color-surface`   | `#1a1f2e`| Superficies elevadas: cards, barra inferior de íconos                     |
| `--color-surface-2`| `#0d2137`| Interior del laptop / mockup — la "pantalla dentro de la pantalla"        |
| `--color-ink`       | `#ffffff`| Titulares y texto principal                                              |
| `--color-ink-soft`  | `#c8cdd8`| Body, texto secundario                                                   |
| `--color-ink-mute`  | `#6b7280`| Metadata, separadores, labels menores                                     |
| `--color-accent`    | `#00a8ff`| Azul eléctrico/neón — contornos, aros, destellos, glow principal          |
| `--color-accent-2`  | `#0080ff`| Acento en texto ("vender más") + tono del botón WhatsApp                 |
| `--color-accent-fill`| `#1565c0`| Relleno del botón CTA (Contactanos / WhatsApp)                          |
| `--color-halo`      | `#4fc3f7`| Halo luminoso difuminado (blur alrededor del acento)                     |
| `--color-ui-a`      | `#1a2744`| Barras UI interiores del mockup                                          |
| `--color-ui-b`      | `#e8edf5`| Líneas del contenido mockup (translúcido)                                |
| `--color-ui-c`      | `#1e3a5f`| Esfera/decorativo del mockup                                             |

**Regla dura:** ningún color se hardcodea en hex en el CSS de componentes. Siempre `var(--color-*)`.

### 8.2 Tipografías (máximo 2, ambas Google Fonts con `preconnect`)

- **Display + Body: Space Grotesk** (pesos `400`, `500`, `700`). Geométrica, tech, con carácter contemporáneo pero legible. Confianza + futuro.
- **Metadata / labels / números: JetBrains Mono** (peso `400`). Solo para pequeños datos, waypoints, contadores no inventados y labels tech. No para body.

**Prohibidas absolutas:** Inter, Roboto, Arial, system-ui a secas, o combinación Inter + otra cosa.

### 8.3 Escala tipográfica (fluida con `clamp()`)

```css
--fs-display-1: clamp(3rem, 8vw, 7rem);      /* hero H1 */
--fs-display-2: clamp(2.25rem, 5.5vw, 5rem); /* peak H2 */
--fs-h2:        clamp(1.75rem, 3.5vw, 3rem); /* secciones */
--fs-h3:        clamp(1.25rem, 2vw, 1.75rem);/* cards */
--fs-body:      clamp(1rem, 1.25vw, 1.125rem);
--fs-meta:      0.75rem; /* mono */
--tracking-tight: -0.03em; /* display */
--tracking-normal: 0em;
--tracking-wide:   0.08em; /* mono labels */
```

### 8.4 Espaciado — escala 8px

`8, 16, 24, 32, 48, 64, 96, 128, 192`. Ningún valor inventado tipo `padding: 37px 22px`. Tokens en CSS:

```css
--sp-1: 8px;   --sp-2: 16px;  --sp-3: 24px;  --sp-4: 32px;
--sp-5: 48px;  --sp-6: 64px;  --sp-7: 96px;  --sp-8: 128px; --sp-9: 192px;
```

### 8.5 Sombras (con color del acento, nunca gris plano)

```css
--shadow-glow-sm: 0 0 24px rgba(0, 168, 255, 0.25);
--shadow-glow-md: 0 8px 40px rgba(0, 168, 255, 0.35);
--shadow-glow-lg: 0 12px 80px rgba(21, 101, 192, 0.55);
--shadow-focus:   0 0 0 3px rgba(79, 195, 247, 0.6);
```

### 8.6 Radios y bordes

```css
--radius-sm: 8px;
--radius-md: 16px;
--radius-lg: 24px;
--radius-pill: 999px;
--border-hairline: 1px solid rgba(0, 168, 255, 0.25);
```

### 8.7 Animación — solo `transform` y `opacity`. `cubic-bezier` propio en lo destacado

```css
--ease-emphasis:  cubic-bezier(0.22, 1, 0.36, 1);   /* CTAs, revelados */
--ease-standard:  cubic-bezier(0.4, 0, 0.2, 1);
--dur-fast:  180ms;
--dur-base:  320ms;
--dur-slow:  600ms;
```

Nunca `transition: all`. Nunca animar `width`, `height`, `top`, `left`.

### 8.8 Tono de las imágenes (regla dura para assets)

- Todas en el **mismo mundo**: negro profundo `#050810` como base, luz azul cobalto direccional, halos `#4fc3f7` puntuales.
- Cero sujetos humanos (evitamos fotos de stock genéricas y facials genéricos).
- Cero 3D plástico (nada "claymation-like").
- Cero ilustración soft/vector plano.
- Estética: fotografía real + interfaces reales dibujadas en SVG. Ambiente denso.
- Cero gradientes purple → blue.
- Cero texto quemado dentro de imágenes: todo el texto es HTML.

### 8.9 Referencias visuales de la marca (aprobadas)

Autoría propia bajo delegación explícita del usuario. No son sitios web, son sensaciones de otros medios:

1. **La cinematografía de Roger Deakins en Blade Runner 2049** — azul cobalto denso, luz que sale de una sola fuente, silencio visual. "Serio, futuro, peso."
2. **Las interfaces holográficas de TRON: Legacy** — grillas azul neón sobre negro absoluto, líneas trazándose en perspectiva. "Un sistema que se construye delante de tus ojos."
3. **La sala de control de un NOC / mission control moderno** (banco tech a las 3 AM) — monitores encendidos con backlight azul cobalto, orden absoluto, foco. "Hay un equipo trabajando por vos, con precisión, siempre."

Capturas de referencia buscadas en la web y confirmadas antes de escribir esto (Bing Images: Blade Runner 2049 Deakins, Tron Legacy interface, modern control room dark blue premium, laptop wireframe blue glow).

---

## 9. Reglas duras (ship-blockers)

Estas se validan antes de dar por terminada la landing.

### Copy y contenido
- ❌ Nunca inventar cifras, precios, testimonios, nombres de clientes o casos de uso. Si no hay dato real, se omite la sección.
- ❌ Nunca "01 / 06" contadores de sección ni cue "scroll to explore".
- ❌ Nunca em-dash visible. Se usa punto, coma, dos puntos o paréntesis.

### Visual
- ❌ Nunca gradiente purple → blue.
- ❌ Nunca sombras grises planas — sombras con color del acento.
- ❌ Nunca texto centrado en todas las secciones — variar anclaje (lead, trail, split).
- ❌ Nunca todas las cards del mismo tamaño en la sección "prueba".
- ❌ Nunca full-frame overlay para arreglar contraste — un scrim local donde vive el texto.

### Tipografía
- ❌ Nunca Inter, Roboto, Arial, system-ui a secas.
- ❌ Nunca 3+ familias tipográficas. Máximo 2.
- ❌ Nunca importar Google Fonts sin `preconnect`.

### Estructura
- ❌ Nunca dos legs consecutivos con el mismo "device".
- ❌ Nunca copy centrada en 6 legs seguidos.
- ❌ Nunca CSS antes de haber terminado el mapa de layout de este documento.

### Interacción
- ❌ Nunca hover que sólo cambie `opacity` u `brightness`.
- ❌ Nunca `transition: all`.
- ❌ Nunca animar `top`, `left`, `width`, `height`. Solo `transform` y `opacity`.
- ❌ Nunca `ease` sin `cubic-bezier` propio en las animaciones destacadas.

### Accesibilidad
- ✅ `prefers-reduced-motion` implementado. En reduced-motion los clips no se fetchean, los posters cross-dissolven, el signature Live Wireframe queda estático (dibujado en su estado final).
- ✅ Contraste WCAG AA en todo el copy.
- ✅ Focus visible con `--shadow-focus` en todos los interactivos.
- ✅ Alt text descriptivo en imágenes con función informativa.

### La única acción
- ✅ Botón "Contactanos" fijo en el header (siempre visible, top-right).
- ✅ Botón WhatsApp flotante fijo bottom-right (siempre visible durante todo el scroll, salvo en el leg 6 cuando el CTA principal está en el centro — ahí sigue igual pero pierde peso visual).
- ✅ Los dos botones llevan al mismo destino WhatsApp *(link pendiente de definir por el usuario).*
- ✅ Cero formularios. Cero campos de mail. Cero segundas acciones. UNA acción.

---

## 10. Qué cambia en móvil (art direction propia, no shrink)

Mobile no es "la misma landing más chica". Es una composición propia.

### Layout
- El "mundo" del worldflight sigue funcionando, pero cada leg usa el clip mobile (`data-sc-src-mobile`) con GOP 4 y resolución vertical.
- Los mockups del laptop se convierten en **teléfono vertical** (art direction distinta).
- Ancho máximo del contenido: 100 %; padding lateral `--sp-3` (24 px).
- La constelación del leg 5 pasa de 5 pantallas horizontales a 3 pantallas apiladas.

### Copy
- Titulares más cortos donde el desktop respiraba con dos líneas: en mobile, una sola línea.
- El H1 del leg 4 baja de `clamp(3rem, 8vw, 7rem)` a `clamp(2.25rem, 12vw, 4rem)`.

### Botones
- **Contactanos del header:** colapsa a un ícono de WhatsApp inline (24 px) para no comerle espacio al logo.
- **Botón WhatsApp flotante:** 56 × 56 px (más grande que en desktop, más fácil de tocar con el pulgar), 16 px del borde inferior derecho.
- El botón del leg 6 (CTA final grande) tiene `min-height: 56px` y `padding-inline: --sp-4`.

### Movimiento
- `data-sc-lerp` para mobile: `0.12` (más suave, más margen a la latencia táctil).
- El signature Live Wireframe se conserva pero con menos elementos SVG (menos paths) para no ahogar la GPU del teléfono.
- Autoplay: mudo obligatorio. Los clips llevan `playsinline` y `muted` sin excepción.

### Sin horizontal overflow. Nunca.

---

## 11. Assets — resumen (ver `assets/README.md` para detalle)

Lo único que el usuario tiene: **logo de GROWTHMARK**. Todo lo demás hay que generar o dibujar.

Categorías:
- **Legs del worldflight** (6 clips + 6 posters + 6 versiones mobile).
- **Signature (Live Wireframe):** paths SVG hechos in-page — no requieren generación externa.
- **CTA final:** background estático + ícono WhatsApp SVG in-page.
- **Logo:** provisto por el usuario, ubicación destino `assets/logo/growthmark.svg`.
- **Favicon / OG image:** generar al final.

La lista completa con nombre exacto de archivo, formato (JPG / WebP / PNG con alpha / SVG), orientación y leg destino está en `assets/README.md`.

---

## 12. Datos abiertos / pendientes de usuario

Marcados en el documento como *(pendiente)* para no inventar:

- **Link/número de WhatsApp** — el usuario pidió no ponerlo aún. Placeholder: `href="#whatsapp-pendiente"` en dev.
- Nombre real de clientes / testimonios — se omite hasta tener datos verificables. La sección "Prueba" (leg 5) muestra pantallas mockup sin texto de terceros.
- Cifras de resultados (visitantes, conversiones, sitios entregados) — se omiten. Reemplazadas por atributos verificables del producto: *"dominio + hosting + publicación listos"*, *"diseñado a medida"*, *"para tu negocio"*.

---

## 13. Checklist pre-código

- [x] 3 P definidas.
- [x] Oración final única.
- [x] Recorrido de 6 legs con contenido y feeling por leg.
- [x] Curva de energía trazada, peak identificado y con mayor span.
- [x] Momento único a recordar escrito como frase que le diría a un amigo.
- [x] Signature move único e implementable sin tocar el engine.
- [x] Paleta con roles (13 tokens).
- [x] Tipografías: 2 familias, ambas de Google Fonts, ninguna prohibida.
- [x] Escala 8 px definida.
- [x] Sombras con color del acento.
- [x] `cubic-bezier` propio para animaciones destacadas.
- [x] `prefers-reduced-motion` planificado.
- [x] Mobile con art direction propia, no shrink.
- [x] Lista de assets a producir en `assets/README.md`.
- [ ] Link real de WhatsApp *(el usuario lo cargará después).*
- [ ] Logo colocado en `assets/logo/growthmark.svg` *(el usuario lo cargará después).*

Cuando estos dos últimos cierren, el gate para escribir código está abierto.
