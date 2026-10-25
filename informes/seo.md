# Informe SEO — ARTERIX (arterix.vercel.app)

Fecha: 2026-10-25. Modo: diagnóstico + aplicar. Segundo pase: reenfoque de "CRM Tokko" a marca + agencia de sitios web + soluciones digitales + CRM.

Limitaciones: sin Search Console ni Analytics. Demanda y competencia son "estimado, no medido". No se midió rendimiento (PageSpeed no consultado en este pase).

## Puntaje

| Área | Pase 1 (inicio) | Antes de este pase | Ahora | Qué falta |
|---|---|---|---|---|
| 1. Indexación y técnico | 1 | 1 | 1 | Dominio propio, Search Console, confirmar indexación |
| 2. On-page | 1 | 2 | 2 | — |
| 3. SEO local | 0 | 1 | 1 | Google Business Profile, redes (`sameAs`), horarios |
| 4. Contenido e intención | 1 | 1 | 2 | Portfolio/casos reales, más contenido por servicio |
| 5. Rendimiento visto por Google | 1 | 1 | 1 | Medir; loader de pantalla completa y efectos del hero |
| 6. Visibilidad en IA | 1 | 2 | 2 | Redes y menciones externas |
| **Total /12** | 5 | 8 | **9** | |

## Hallazgos de este pase (antes de aplicar)

1. **Enfoque equivocado para lo que se quiere rankear.** Title, H1-eyebrow, meta y schema giraban en torno a "CRM Tokko". Ninguna página hablaba de "agencia de sitios web", "soluciones digitales" ni "zona norte". La marca ARTERIX no estaba en el H1 ni al inicio del title.
2. **Una sola URL para todo.** La home competía por diseño web y por CRM. Sin páginas de servicio.
3. **H1 sin palabra clave** ("Tu web puede vender más").
4. **Contradicción en el sitemap:** `privacidad` y `terminos` están en `noindex` pero estaban listados en `sitemap.xml`.
5. **Marca y dominio.** No existe ninguna agencia ARTERIX de diseño web en los resultados. Sí existe una "Arterix" registrada en CABA (servicios para espectáculos, rubro distinto) y nombres parecidos como "Arteixo" o "Arteria", que confunden la búsqueda. La URL `arterix.vercel.app` no contiene "arterix" y sí contiene la marca correcta.
6. **Indexación.** `site:` no devolvió nada (estimado: probablemente no indexado, el buscador de la herramienta no es Google).
7. **Competencia (estimado, no medido).** Para "agencia web Escobar" y "diseño web zona norte" no aparecen agencias locales claras: salen perfiles de otros países y directorios genéricos. La competencia local directa es baja. En "agencia de sitios web" a secas la competencia es alta (directorios y agencias grandes de Buenos Aires), así que el foco realista es Escobar, zona norte y la marca.
8. **OG image** decía "Diseño web e integración CRM Tokko".

## Cambios aplicados

### `index.html` (home: marca + agencia + soluciones digitales + zona norte)
- **Title (55):** "ARTERIX | Agencia de diseño web en Escobar y zona norte". Marca al inicio.
- **Meta description (151):** "ARTERIX es una agencia de sitios web y soluciones digitales en Escobar y zona norte: diseño web a medida, integración CRM y automatización. Escribinos."
- OG y Twitter con el mismo enfoque. `application-name` agregado.
- **H1:** el eyebrow del hero pasó a ser el único H1: "ARTERIX · Agencia de sitios web en Escobar y zona norte" (mismo aspecto visual). El titular grande "Tu web puede vender más" pasó a `<p class="hero-headline">` con el mismo estilo. No se tocó el diseño ni la animación.
- Bajada del hero con "agencia de sitios web y soluciones digitales en Escobar", con enlace a la página de CRM.
- Nosotros: frase citable "ARTERIX es una agencia web con base en Escobar (El Naudir)... para negocios de Escobar y de la zona norte", con enlaces a las dos páginas de servicio.
- Etiqueta de sección: "Soluciones digitales: diseño web, CRM y automatización". Dos botones a las páginas nuevas bajo el bento. El CTA de CRM ahora lleva a la página dedicada.
- Menú: "Diseño web" y "CRM Tokko" apuntan a las páginas nuevas (se sacó "Proceso" del menú, sigue en el footer).
- Footer: descripción nueva y enlaces a las páginas de servicio. Links legales sin `.html`.
- `<main>` agregado.
- **FAQ de 11 a 13 preguntas**, con "¿Qué es ARTERIX?" y "¿Qué son las soluciones digitales y qué incluyen?" al principio; la de zonas ahora menciona zona norte.
- **Schema (`@graph`, 4 nodos):** `WebSite` con `alternateName`, `WebPage`, `ProfessionalService` (areaServed con zona norte, `knowsAbout` ampliado, servicios con `url` a las páginas nuevas) y `FAQPage`. Las 13 preguntas son idénticas al texto visible (verificado por script).

### Páginas nuevas (contenido propio, un H1 con la búsqueda principal)
- `diseno-web-escobar.html` — "Diseño de sitios web en Escobar y zona norte | ARTERIX" (54). Meta 147. H1 "Diseño de sitios web en Escobar." Secciones: servicio, qué incluye, proceso, zona de trabajo, 7 preguntas propias. Schema: `WebPage`, `BreadcrumbList`, `Service`, `FAQPage`.
- `integracion-crm-tokko.html` — "Integración CRM Tokko en Escobar y zona norte | ARTERIX" (55). Meta 147. H1 "Integración CRM Tokko." Secciones: qué es integrar un CRM, qué hacemos con Tokko, automatización (ancla `#automatizacion`), proceso, aviso de marca ("Tokko y Tokko Broker son marcas de sus respectivos titulares"), 7 preguntas propias. Mismo schema.
- Mismos componentes, CSS y JS que la home. Se agregó un bloque `.prose` al final de `css/sales.css` (v=6) para los textos largos. Sin errores de JS en las tres páginas (probado en Chrome, escritorio y móvil).
- No se crearon páginas por barrio ni por localidad (serían doorway pages). La zona se menciona en texto dentro de la página de diseño web.

### Otros archivos
- `sitemap.xml`: home + las 2 páginas nuevas, `lastmod` 2026-10-25. Se sacaron `privacidad` y `terminos` (están en `noindex`).
- `robots.txt`: sin cambios necesarios (apunta al sitemap correcto).
- `img/og-image.png`: regenerada ("Agencia de sitios web y soluciones digitales / Escobar · Zona norte · Buenos Aires").
- `vercel.json` ya tenía `cleanUrls`, por eso las páginas se sirven sin `.html`.

## Verificación
- 3 páginas indexables, 1 H1 cada una, titles de 54 a 55 caracteres, metas de 147 a 151, anclas internas sin rotos, JSON-LD parseable y FAQ idéntica al schema.
- Pendiente después de subir: Rich Results Test, inspección de URL en Search Console, vista previa de OG en WhatsApp, PageSpeed.

## Plan priorizado

### Requiere acción de Gigi o del cliente (lo de mayor impacto está acá)

| Acción | Impacto | Esfuerzo | Dónde |
|---|---|---|---|
| Dominio propio (arterix.com.ar). Como paso rápido, agregar en Vercel el dominio `arterix.vercel.app` si está libre. Después reemplazar `arterix.vercel.app` en: `index.html`, las 2 páginas nuevas, `sitemap.xml`, `robots.txt` (el reemplazo lo hago yo con `/arterix-seo aplicar`) | Alto | Bajo | Vercel / NIC.ar |
| Alta en Google Search Console: verificar el sitio, enviar `sitemap.xml` y pedir indexación de las 3 URLs. Sin esto la home puede tardar semanas en aparecer | Alto | Bajo | Search Console |
| Google Business Profile como negocio de servicio (área: Escobar y zona norte, sin mostrar dirección si es domicilio). Categoría principal: "Diseñador de sitios web" o "Agencia de diseño web". Nombre exactamente "ARTERIX", teléfono, sitio, fotos y reseñas. Es lo que más ayuda para "ARTERIX" y "agencia web Escobar" | Alto | Medio | GBP |
| Perfiles de marca con el nombre "ARTERIX": Instagram, LinkedIn, Facebook. Luego agregar `sameAs` al schema. Ayuda a que Google asocie la marca con el sitio | Alto | Bajo | Redes |
| Casos o portfolio reales de clientes (no hay prueba social y no se inventó) | Alto | Medio | Gigi |
| Perfil en directorios (Clutch/DesignRush, Páginas Amarillas, Cámara de Comercio de Escobar) con el mismo nombre, teléfono y zona | Medio | Bajo | Externo |
| Confirmar [A CONFIRMAR] del brief (zonas, partner Tokko, horarios) | Medio | Bajo | Gigi |
| Verificar que `wa.me/541134583302` abra el chat (en Argentina los móviles suelen usar `549`) | Medio | Bajo | Gigi |

### Lo arreglo yo con `/arterix-seo aplicar` o `/arterix-tecnico`

| Acción | Impacto | Esfuerzo |
|---|---|---|
| Reemplazar el dominio en todo el sitio cuando exista | Alto | Bajo |
| Agregar `sameAs`, horarios y geo correcto cuando haya datos | Medio | Bajo |
| Medir con PageSpeed y optimizar: loader de pantalla completa (tapa el contenido ~1-2 s, puede afectar LCP), 10 pesos de fuentes, efectos del hero | Medio | Medio |
| Contenido nuevo cuando haya casos: página de portfolio y notas (por ejemplo "cuánto cuesta una página web en Argentina") | Medio | Medio |

## Búsquedas objetivo (estimado, no medido)

| Búsqueda | Intención | Demanda | Competencia local | Página |
|---|---|---|---|---|
| ARTERIX | Marca | Muy baja hoy | Baja, pero hay nombres parecidos | `/` |
| agencia de sitios web / agencia web Escobar | Comparación | Media / baja | Alta a nivel nacional, baja en Escobar | `/` |
| soluciones digitales Escobar | Servicio | Baja | Baja | `/` |
| agencia digital zona norte Buenos Aires | Comparación | Baja a media | Media | `/` |
| diseño de sitios web en Escobar | Servicio local | Baja a media | Baja | `/diseno-web-escobar` |
| diseño web zona norte | Servicio local | Media | Media | `/diseno-web-escobar` |
| integración CRM Tokko / CRM Tokko | Servicio nicho | Baja | Muy baja | `/integracion-crm-tokko` |
| integración CRM | Servicio | Media | Alta (Kommo, HubSpot, etc.) | `/integracion-crm-tokko` (difícil sin dominio y autoridad) |

## [A CONFIRMAR]
- Las páginas nombran Belén de Escobar, Garín, Ingeniero Maschwitz, Matheu, Pilar y Tigre como zonas de trabajo. Confirmar o ajustar el texto en `diseno-web-escobar.html`.
- Aviso de marca Tokko: confirmar si son partner oficial; si lo son, se puede decir y mejora la confianza.
- Dirección o área de servicio exacta, horarios y coordenadas `geo` (las actuales parecen del centro de Escobar).
- Plazos y forma de cotizar (las FAQ dicen "presupuesto claro" y "plazo en la reunión de diagnóstico").
