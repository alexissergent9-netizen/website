# Datos para Google Sheets - David Hockney

## Estructura de Hojas (Sheets)

### 1. Press (Artículos de Prensa)

**Nombre de la hoja:** `Press`

**Columnas:**
| title | linkText | url | source | author | date | year | type |

**Datos de ejemplo extraídos de las muestras:**

```
title	linkText	url	source	author	date	year	type
David Hockney's Serpentine Show Offers a Message of Hope	David Hockney's Serpentine show offers a message of hope in a desperate world	https://www.the-independent.com/arts-entertainment/art/reviews/david-hockney-serpentine-gallery-review-b2936516.html	The Independent	Mark Hudson	2026-03-11	2026	current
David Hockney is "Not Afraid to Speak Up for Art"	David Hockney is "Not Afraid to Speak Up for Art"		The Independent		2026-03-11	2026	current
David Hockney's New Paintings at Annely Juda, London	David Hockney at Annely Juda Fine Art: 'The greatest living painter - he is unstoppable'	https://www.standard.co.uk/culture/exhibitions/david-hockney-review-annely-juda-fine-art-b1261175.html	The Standard	Daniel Lismore	2025-12-04	2025	current
David Hockney at 88	David Hockney at 88 — he's begun his last dance with the joy of a child	https://www.thetimes.com/culture/art/article/hockney-annely-juda-exhibition-review-9xhw9pmsf	The Times	Waldemar Januszczak	2025-11-08	2025	current
Colour, courage and cigarettes	Colour, courage and cigarettes: David Hockney's art of never slowing down	https://www.the-independent.com/arts-entertainment/art/news/david-hockney-art-work-london-new-show-b2860894.html	The Independent		2025-11-01	2025	current
David Hockney at the Halcyon	David Hockney at the Halcyon review: an invigorating immersion into six decades of the great artist's work	https://www.standard.co.uk/culture/exhibitions/david-hockney-halcyon-gallery-review-b1187401.html	The Standard		2024-10-15	2024	past
Hockney Painting Leads Sotheby's London Fall Sale	Hockney Painting, Estimated at over $9 million, to Lead Sotheby's London Fall Sale	https://www.artsy.net/article/artsy-editorial-hockney-painting-estimated-9-million-lead-sothebys-london-fall-sale	Artsy		2024-09-20	2024	past
Hockney and the enduring symbolism of the swimming pool	From David Hockney to modern horror: the enduring symbolism of the swimming pool	https://www.wallpaper.com/art/from-david-hockney-to-modern-horror-the-enduring-symbolism-of-the-swimming-pool	Wallpaper		2023-08-10	2023	past
Luna, Luna	How Drake's $100 Million Bet Saved the Long-Lost Art Carnival Luna Luna	https://www.nytimes.com/2022/11/17/arts/design/drake-luna-luna-art-amusement-park.html	The New York Times		2022-11-17	2022	past
```

---

### 2. Exhibitions (Exposiciones)

**Nombre de la hoja:** `Exhibitions`

**Columnas:**
| title | location | description | startDate | endDate | url | imageUrl | type |

**Datos de ejemplo:**

```
title	location	description	startDate	endDate	url	imageUrl	type
David Hockney: Bigger & Closer	Lightroom, London	An immersive exhibition experience	2024-11-01	2025-04-30	https://www.lightroom.uk/hockney		current
Hockney's Eye: The Art and Technology of Depiction	The Fitzwilliam Museum, Cambridge	Exploring Hockney's revolutionary approach to art	2024-01-15	2024-05-20			past
David Hockney: Drawing from Life	National Portrait Gallery, London	A comprehensive survey of Hockney's portraiture	2023-03-10	2023-06-25			past
```

---

### 3. Works (Obras)

**Nombre de la hoja:** `Works`

**Columnas:**
| title | category | subcategory | year | medium | dimensions | description | imageUrl | available |

**Categorías principales:**
- digital (subcategorías: computer-drawings, iphone, ipad, arrival-of-spring-woldgate, yosemite-suite, movies)
- drawings
- graphics (subcategorías: lithographs, etchings, rakes-progress-etchings, blue-guitar-etchings, prints)
- paintings
- photos (subcategorías: photographic-collages, composite-polaroids, photo_drawings)
- sketchbooks
- stage_design (subcategorías: the-rakes-progress, magic-flute, french-triple-bill, stravinsky-triple-bill, tristan-und-isolde, turandot, die-frau-ohne-schatten)
- etcetera (subcategorías: pools, bmw)

**Datos de ejemplo:**

```
title	category	subcategory	year	medium	dimensions	description	imageUrl	available
The Entrance	paintings		2019	acrylic on 2 canvases	36 x 96 in. overall	The Entrance, 2019		yes
A Bigger Splash	paintings		1967	acrylic on canvas	96 x 96 in.	One of Hockney's most iconic works		yes
```

---

### 4. Resources (Recursos)

**Nombre de la hoja:** `Resources`

**Columnas:**
| title | category | description | url | isExternal |

**Categorías:**
- foundation
- galleries
- making_works
- publications
- public_collections

**Datos de ejemplo:**

```
title	category	description	url	isExternal
The David Hockney Foundation	foundation	Official foundation supporting Hockney's legacy	http://www.thedavidhockneyfoundation.org/	true
Galleries representing David Hockney	galleries	List of galleries worldwide	/resources/galleries	false
Making Works	making_works	Behind the scenes of Hockney's creative process	/resources/making_works	false
Publications	publications	Books and catalogs about Hockney	/resources/publications	false
Works in Public Collections	public_collections	Museums and institutions holding Hockney works	/resources/public_collections	false
```

---

## Instrucciones para crear el Google Sheet

1. **Crear un nuevo Google Spreadsheet**
   - Nombre sugerido: "David Hockney Website Data"

2. **Crear las siguientes pestañas:**
   - Press
   - Exhibitions
   - Works
   - Resources

3. **Para cada pestaña:**
   - Copiar los encabezados de columnas en la primera fila
   - Copiar los datos de ejemplo en las siguientes filas
   - Agregar más datos según sea necesario

4. **Configurar permisos:**
   - Ir a "Compartir" → "Cualquier persona con el enlace puede ver"
   - Esto permitirá que la API pública de Google Sheets lea los datos

5. **Obtener el ID del Spreadsheet:**
   - El ID está en la URL: `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`
   - Guardar este ID en el archivo `.env` como `VITE_GOOGLE_SPREADSHEET_ID`

6. **Crear una API Key:**
   - Ir a [Google Cloud Console](https://console.cloud.google.com/)
   - Crear un proyecto nuevo (si no existe)
   - Habilitar "Google Sheets API"
   - Crear credenciales → API Key
   - Restringir la key solo para Google Sheets API
   - Guardar la key en el archivo `.env` como `VITE_GOOGLE_SHEETS_API_KEY`

---

## Formato de fechas

Para las fechas, usar formato ISO: `YYYY-MM-DD`

Ejemplo: `2026-03-11` para 11 de marzo de 2026

---

## Notas importantes

- Los campos vacíos pueden dejarse en blanco
- El campo `type` en Press indica si es "current" o "past"
- El campo `type` en Exhibitions indica si es "current", "past" o "upcoming"
- Las URLs deben incluir el protocolo (http:// o https://)
- Para enlaces internos, usar rutas relativas (ej: `/resources/galleries`)
