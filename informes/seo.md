# Informe SEO — ARTERIX (sitio-growthmark-final.vercel.app)

Fecha: 2026-10-12. Modo: diagnóstico + aplicar.
Alcance: `index.html` (página única), `robots.txt`, `sitemap.xml`, `css/sales.css` (un bloque), `img/`.

Limitaciones: no hay Search Console ni Analytics. La cuota diaria de PageSpeed Insights estaba agotada (error 429), así que no hay mediciones de rendimiento. Todo lo de demanda y competencia es "estimado, no medido".

## Puntaje

| Área | Antes | Después | Qué falta para subir |
|---|---|---|---|
| 1. Indexación y técnico | 1 | 1 | Dominio propio y alta en Search Console |
| 2. On-page | 1 | 2 | — |
| 3. SEO local | 0 | 1 | Google Business Profile, redes, horarios |
| 4. Contenido e intención | 1 | 1 | Páginas por servicio |
| 5. Rendimiento visto por Google | 1 | 1 | Medir con PageSpeed y optimizar fuentes |
| 6. Visibilidad en IA | 1 | 2 | Redes reales y menciones externas |
| **Total /12** | **5** | **8** | |

### Hallazgos principales (antes)

1. **Técnico.**
   - `robots.txt` y `sitemap.xml` apuntaban a `growthmark.vercel.app`. Es otro proyecto: sirve una app de Vite "GrowthMark — Asset Engine". El sitemap le decía a Google que el sitio estaba en un dominio ajeno al canonical.
   - `site:sitio-growthmark-final.vercel.app` no devolvió ninguna página, así que probablemente no está indexado (estimado: el buscador de la herramienta no es Google).
   - `design.md`, `img/files.zip`, `lucianomattica-design/` y `assets/` estaban públicos en el deploy (respondían 200).
   - `lang="es"` genérico. Sin `theme-color`, sin apple-touch-icon y con un favicon de 244 KB.
   - Contenido `.reveal` en opacidad 0 hasta que corre JS, sin fallback `noscript`.
2. **On-page.**
   - El title tenía "Buenos Aires" pero no la zona real. La meta description no tenía CTA. Había `meta keywords` (Google la ignora).
   - El H1 es "Tu web puede vender más", sin palabra clave. Las etiquetas de sección eran genéricas ("Qué incluye", "Proceso").
   - Imágenes con alt "ARTERIX" repetido, incluido el logo del loader, y sin `width`/`height`.
   - `og:image` era el wordmark blanco transparente de 831x300, que se ve mal en WhatsApp, LinkedIn y X.
3. **Local.**
   - El teléfono y la dirección no estaban en texto visible en ninguna parte (solo en schema y en el link de WhatsApp).
   - `sameAs: []` vacío y `priceRange: "$$"` sin respaldo.
   - Sin `contactPoint`.
   - Zona declarada solo como "Buenos Aires".
4. **Contenido.** Todo en una URL. No hay una página que responda por separado "diseño web en Escobar" ni "integración CRM Tokko". La FAQ cubría Tokko con 2 preguntas.
5. **Rendimiento.**
   - Se cargan 6 pesos de Plus Jakarta Sans y 4 de Space Grotesk.
   - Hay efectos pesados en el hero: aurora, 3 capas de estrellas, orbes y cursor propio.
   - Las imágenes no tenían dimensiones, lo que provoca saltos de layout.
   - No medido.
6. **IA.** Faltaba una frase citable que junte nombre + rubro + zona + servicio. El schema no tenía `logo`, `contactPoint` ni `knowsAbout`.

### Competencia (estimado, no medido)

- "Diseño web Escobar": no aparecen agencias con base en Escobar. Salen perfiles de personas y rankings de Buenos Aires (DesignRush). La competencia local directa es baja.
- "Integración CRM Tokko": casi no hay integradores que lo ofrezcan de forma explícita. Aparecen portfolios sueltos (por ejemplo un caso de integración Tokko Broker de una agencia partner) y consultoras de otros CRM (Kommo, Creatio). Hay una oportunidad clara de nicho, pero hoy ARTERIX no tiene una página dedicada para capturarla.
- Qué tienen otros que ARTERIX no tiene: casos o portfolio, perfil de empresa en Google, reseñas, y páginas por servicio.

## Cambios aplicados

### `index.html` (head)
- `lang="es-AR"` y `theme-color`.
- Title (55 caracteres): "Diseño web e integración CRM Tokko en Escobar | ARTERIX".
- Meta description (151 caracteres): servicio + zona + CTA ("Escribinos por WhatsApp").
- Se eliminó `meta keywords`.
- Robots con `max-snippet:-1`. Se agregó hreflang `es-AR` y `x-default`.
- Open Graph y Twitter reescritos, con `og:image` nuevo de 1200x630 (`img/og-image.png`, creado), más tipo, dimensiones y alt.
- Favicons optimizados (32 px y 192 px) y apple-touch-icon (180 px), generados desde `navicon.png`.
- `<noscript>` que muestra el contenido si JS no corre.

### `index.html` (body)
- **Hero:** el eyebrow ahora dice "Diseño web y CRM Tokko en Escobar". La bajada menciona CRM Tokko. El CTA es "Ver servicios de diseño web". El H1 se mantiene (un solo H1).
- **Nosotros:** párrafo nuevo con la frase citable: "ARTERIX es una agencia con base en Escobar (El Naudir), Buenos Aires, especializada en diseño web a medida e integración y personalización del CRM Tokko para negocios e inmobiliarias de AMBA."
- **Etiquetas de sección con palabra clave:** "Servicios de diseño web", "Proceso de trabajo", "Integración CRM Tokko y automatización", "Preguntas sobre diseño web y CRM Tokko". Los H2 creativos no se tocaron.
- **Sección CRM:** se agregaron 2 bloques (qué hacemos con Tokko y quiénes lo usan) con el mismo componente `why-grid` ya existente. El CTA ahora es "Consultar por integración CRM Tokko".
- **FAQ:** de 7 a 11 preguntas, con las nuevas:
  - ¿Dónde está ARTERIX y en qué zonas trabajan?
  - ¿Ya uso Tokko, pueden personalizarlo?
  - ¿Qué es la automatización de procesos?
  - ¿Cuánto sale un sitio web o una integración con Tokko? (sin cifras)
- **Imágenes:** alt descriptivo en el logo del header, alt vacío en el loader (decorativo), `width`/`height` en todas, y `loading="lazy"` en el logo del footer.
- **Enlaces y navegación:**
  - `rel="noopener"` en todos los `target="_blank"`.
  - El menú dice "CRM Tokko". `aria-controls` en el hamburguesa.
  - Footer con anclas descriptivas, que ahora incluye el enlace a CRM y no repite 4 veces `#incluye`.
  - Email como `mailto:` (antes abría Gmail compose).
  - Sin anclas rotas.
- **NAP visible en el footer:** "Escobar (El Naudir), Buenos Aires, Argentina", teléfono `+54 11 3458-3302` y email, consistentes con el schema.
- Copyright actualizado a 2026.
- **Schema:** los 2 bloques JSON-LD se unificaron en un `@graph`: `WebSite`, `WebPage`, `ProfessionalService` y `FAQPage` (las 11 preguntas, idénticas al texto visible). Mejoras en el negocio:
  - `logo`, `contactPoint` (WhatsApp/email), `knowsAbout`.
  - `areaServed` con Escobar, El Naudir y AMBA.
  - 3 servicios con `provider` y `areaServed`.
  - Se quitó `priceRange` (dato sin respaldo) y `sameAs` vacío.
  - Todo validado como JSON parseable.
- La FAQ con schema ya no genera resultado enriquecido en Google para sitios comerciales. Se mantiene por la lectura de buscadores con IA, no por el rich result.

### Otros archivos
- `robots.txt`: sitemap con el dominio correcto. Se bloquean `lucianomattica-design`, `scrollcraft`, `assets`, `design.md`, `files.zip` e imágenes sin uso.
- `sitemap.xml`: dominio correcto, `lastmod` 2026-10-12, imagen incluida.
- `.vercelignore` (nuevo): evita subir material interno (design.md, plugin, zip, imágenes sin uso). Ojo: solo aplica a deploys por CLI. Si el deploy es por Git, esos archivos siguen públicos; para eso, sacarlos del repo o moverlos fuera de la raíz. Robots no los desindexa, solo pide que no se rastreen.
- `css/sales.css` (v=4): una regla `.footer-nap` para el texto de dirección. No se tocó diseño.

## Plan priorizado

### Lo arreglo yo con `/arterix-seo aplicar`

| Acción | Impacto | Esfuerzo | Dónde |
|---|---|---|---|
| Crear páginas `/integracion-crm-tokko` y `/diseno-web-escobar` (texto propio, FAQ propia, un H1 con la búsqueda principal) y enlazarlas desde el menú. Hoy una sola URL compite por dos búsquedas | Alto | Medio | Contenido nuevo |
| Cuando exista dominio propio: cambiar canonical, OG, sitemap, robots y schema (se reemplaza `sitio-growthmark-final.vercel.app` en 5 archivos/lugares) | Alto | Bajo | Sitio |
| Optimizar fuentes (reducir de 10 pesos a 5 o 6) y `font-display` ya está en swap; medir con PageSpeed cuando haya cuota | Medio | Bajo | Sitio |
| Páginas de privacidad y términos (el footer tiene 2 links `href="#"` que no llevan a ningún lado) | Medio | Medio | Contenido nuevo (requiere texto legal) |
| Pasar `/arterix-tecnico` para medir peso y CLS reales | Medio | Bajo | Sitio |

### Requiere acción de Gigi o del cliente

| Acción | Impacto | Esfuerzo | Dónde |
|---|---|---|---|
| Comprar y conectar un dominio propio (ej. arterix.com.ar). Una URL `*.vercel.app` rankea peor, no da confianza y no se puede mover sin perder historial | Alto | Bajo | Gigi (Vercel + NIC.ar) |
| Crear y verificar Google Business Profile como negocio de servicio (área de servicio Escobar/AMBA, sin mostrar dirección si es en casa). Categoría principal: "Diseñador de sitios web" o "Agencia de diseño web". Fotos y pedir reseñas | Alto | Medio | GBP |
| Dar de alta el sitio en Google Search Console y enviar el sitemap; chequear indexación | Alto | Bajo | Gigi |
| Perfiles en redes (Instagram/LinkedIn) y agregarlos a `sameAs` | Medio | Bajo | Gigi |
| Casos o portfolio reales de clientes y sitios hechos (hoy no hay prueba social; no se inventó ninguno) | Alto | Medio | Gigi |
| Confirmar si ARTERIX es partner o proveedor oficial de Tokko. De ser así, decirlo en el sitio; si no, mantener la redacción actual ("implementamos y personalizamos") | Medio | Bajo | Gigi |
| Verificar que `wa.me/541134583302` abra el chat (los móviles argentinos suelen usar `549`; si no abre, cambiar en todos los links) | Medio | Bajo | Gigi |

## [A CONFIRMAR]

- Dirección o área de servicio exacta para schema (hoy solo localidad: Escobar) y para el Google Business Profile.
- Horarios de atención (`openingHoursSpecification` no se agregó).
- Coordenadas `geo`: las que estaban (-34.3486, -58.7947) parecen del centro de Escobar, no del negocio. Revisar si El Naudir queda en otro punto.
- Plazo de entrega y forma de cotizar: la FAQ dice "te pasamos un presupuesto claro" y "plazo claro en la reunión de diagnóstico". Confirmar que es lo que se promete.
- La FAQ nueva dice que trabajan con "el norte del conurbano y el resto de AMBA". Confirmar que atienden fuera de Escobar.
- Si las inmobiliarias son el cliente objetivo real (hoy el copy habla de "negocios e inmobiliarias").

## Búsquedas objetivo (estimado, no medido)

| Búsqueda | Intención | Demanda | Página hoy | Página recomendada |
|---|---|---|---|---|
| integración CRM Tokko | Comparación / servicio | Baja (nicho) pero casi sin competencia | Home, sección CRM | `/integracion-crm-tokko` |
| personalizar Tokko CRM / automatización Tokko | Servicio | Baja | Home, sección CRM | misma |
| diseño web Escobar | Servicio local | Baja a media | Home | `/diseno-web-escobar` |
| agencia de diseño web zona norte / Buenos Aires | Comparación | Media, competencia alta | Home | Home |
| diseño web para inmobiliarias | Servicio / vertical | Media | No cubierto | Dentro de la página de CRM o página propia |

## Verificación

- JSON-LD: 4 nodos, parseables.
- Un solo H1 y 9 H2. Todas las anclas internas existen. Todas las imágenes tienen alt.
- Pendiente después de subir: probar en el Rich Results Test, el inspector de URL de Search Console, la vista previa de OG (WhatsApp/LinkedIn) y PageSpeed Insights.
