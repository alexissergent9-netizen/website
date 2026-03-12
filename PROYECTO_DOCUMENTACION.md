# 📋 DOCUMENTACIÓN COMPLETA DEL PROYECTO HOCKNEY.COM

**Fecha de última actualización:** 12 de marzo de 2026  
**Estado:** Desarrollo completado, pendiente configuración de Google Sheets

---

## 📑 ÍNDICE

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Historial de Cambios](#historial-de-cambios)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Arquitectura CSS](#arquitectura-css)
5. [Integración con Google Sheets](#integración-con-google-sheets)
6. [Guía de Configuración](#guía-de-configuración)
7. [PróximosK Pasos](#próximos-pasos)
8. [Mantenimiento y Actualización](#mantenimiento-y-actualización)

---

## 🎯 RESUMEN EJECUTIVO

### Objetivo del Proyecto
Replicar el sitio web oficial de David Hockney (hockney.com) utilizando React, con gestión de contenido mediante Google Sheets API.

### Tecnologías Utilizadas
- **Frontend:** React 18.3
- **Routing:** React Router DOM 6.28
- **Build Tool:** Vite 6.0
- **Estilos:** CSS modular por componente
- **API:** Google Sheets API v4
- **HTTP Client:** Axios
- **Deployment:** Netlify (configurado con _redirects)

### Estado Actual
✅ **Completado:**
- Navegación completa con menús dropdown
- 6 páginas principales implementadas
- Integración con Google Sheets API
- Footer con copyright
- CSS modular por componente
- Datos de muestra extraídos de archivos originales

⏳ **Pendiente:**
- Configuración de Google Sheets por parte del usuario
- Población de datos reales en las hojas
- Pruebas de integración con API
- Despliegue en Netlify

---

## 📝 HISTORIAL DE CAMBIOS

### **Fase 1: Configuración Inicial**

#### 1.1 Exclusión de Archivos de Muestra
**Fecha:** Inicio del proyecto  
**Cambio:** Agregada carpeta `muestras/` a `.gitignore`  
**Razón:** Las muestras contienen archivos .mht del sitio original para referencia, no deben subirse a Git  
**Archivos modificados:**
- `.gitignore`

---

### **Fase 2: Navegación y Header**

#### 2.1 Implementación del Header
**Fecha:** Fase inicial  
**Cambio:** Creación de navegación completa con dropdowns  
**Archivos creados:**
- `src/components/Header.jsx` (173 líneas)
- `src/components/Header.css` (177 líneas)

**Estructura de navegación implementada:**
```
├── Press
│   └── Articles
│       ├── Current
│       └── Past
├── Exhibitions
│   ├── Current
│   ├── Past
│   └── Upcoming
├── Works
│   ├── Digital Works
│   │   ├── Computer Drawings
│   │   ├── iPhone
│   │   ├── iPad Selects
│   │   ├── Arrival of Spring Woldgate
│   │   ├── Yosemite Suite
│   │   └── Digital Movies
│   ├── Drawings
│   ├── Graphics
│   │   ├── Lithographs
│   │   ├── Etchings
│   │   ├── A Rake's Progress Etchings
│   │   ├── Blue Guitar Etchings
│   │   └── Homemade Prints
│   ├── Paintings
│   ├── Photographs
│   │   ├── Photographic Collages
│   │   ├── Composite Polaroids
│   │   └── Photographic Drawings
│   ├── Sketchbooks
│   ├── Stage Design
│   │   ├── The Rake's Progress
│   │   ├── Magic Flute
│   │   ├── French Triple Bill
│   │   ├── Stravinsky Triple Bill
│   │   ├── Tristan und Isolde
│   │   ├── Turandot
│   │   └── Die Frau Ohne Schatten
│   └── Etcetera
│       ├── Paper Pulp
│       └── BMW Art Car
├── Resources
│   ├── The David Hockney Foundation
│   ├── Galleries
│   ├── Making 'Works'
│   ├── Publications
│   └── Works in Public Collections
└── Contacts
```

#### 2.2 Corrección de Menús Dropdown
**Fecha:** Durante desarrollo  
**Problema:** Los menús dropdown se cerraban al mover el cursor hacia abajo  
**Solución implementada:**
1. Reducción de `margin-top` de 10px a 2px en `.dropdown-menu`
2. Implementación de delay de 100ms usando `closeTimerRef`
3. Pseudo-elemento `::after` invisible como "puente" entre elementos
4. Lógica de hover con `setTimeout/clearTimeout`

**Código clave en Header.jsx:**
```javascript
const closeTimerRef = useRef(null);

const handleMouseEnter = (menuType) => {
  if (closeTimerRef.current) {
    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  }
  setActiveMenu(menuType);
};

const handleMouseLeave = () => {
  closeTimerRef.current = setTimeout(() => {
    setActiveMenu(null);
  }, 100);
};
```

---

### **Fase 3: Google Sheets Integration**

#### 3.1 Creación del Servicio de Google Sheets
**Fecha:** Fase de integración  
**Archivos creados:**
- `src/services/googleSheetsService.js` (350+ líneas)

**Métodos implementados (30+):**

**Press:**
- `getAllPress()` - Todos los artículos
- `getPressByType(type)` - Current/Past
- `getPressByYear(year)` - Artículos por año
- `getCurrentPress()` - Artículos actuales
- `getPastPress()` - Artículos pasados

**Exhibitions:**
- `getAllExhibitions()` - Todas las exhibiciones
- `getExhibitionsByType(type)` - Current/Past/Upcoming
- `getCurrentExhibitions()` - Exhibiciones actuales
- `getPastExhibitions()` - Exhibiciones pasadas
- `getUpcomingExhibitions()` - Exhibiciones próximas

**Works:**
- `getAllWorks()` - Todas las obras
- `getWorksByCategory(category)` - Por categoría principal
- `getDigitalWorks(subcategory)` - Obras digitales
- `getGraphicWorks(subcategory)` - Obras gráficas
- `getPhotographicWorks(subcategory)` - Obras fotográficas
- `getStageDesignWorks(subcategory)` - Diseño de escenario
- `getEtceteraWorks(subcategory)` - Etcétera

**Resources:**
- `getAllResources()` - Todos los recursos
- `getResourcesByType(type)` - Por tipo

**Variables de entorno requeridas:**
```bash
VITE_GOOGLE_SHEETS_API_KEY=tu_api_key_aqui
VITE_GOOGLE_SPREADSHEET_ID=tu_spreadsheet_id_aqui
```

#### 3.2 Extracción de Datos de Muestra
**Archivos creados con datos extraídos:**
- `SHEETS_DATA_PRESS.tsv` - 18 artículos
- `SHEETS_DATA_EXHIBITIONS.tsv` - 53 exhibiciones
- `SHEETS_DATA_WORKS.tsv` - 16 obras
- `SHEETS_DATA_RESOURCES.tsv` - 12 recursos

**Formato TSV (Tab-Separated Values):**
```tsv
title	location	description	startDate	endDate	url	imageUrl	type
```

#### 3.3 Documentación Creada
**Archivos de documentación:**
1. `GOOGLE_SHEETS_DATA.md` - Estructura de datos
2. `GOOGLE_SHEETS_SERVICE_GUIDE.md` - Guía de uso del servicio
3. `GOOGLE_SHEETS_SETUP.md` - Configuración paso a paso
4. `SHEETS_IMPORT_GUIDE.md` - Cómo importar TSV
5. `SAMPLE_DATA.md` - Ejemplos de datos

---

### **Fase 4: Implementación de Páginas**

#### 4.1 Página Home
**Archivos:**
- `src/pages/Home.jsx`
- `src/pages/Home.css`

**Diseño:** 
- Imagen destacada centrada: `19D03_850x316_72.jpg`
- Caption debajo de la imagen
- Fondo gris claro (#f5f5f5)
- Responsive con breakpoints

**Clases CSS específicas:**
- `.home-container`
- `.home-main-content`
- `.home-img-responsive`
- `.home-caption`

#### 4.2 Página Press
**Archivos:**
- `src/pages/Press.jsx` (165 líneas)
- `src/pages/Press.css` (270+ líneas)

**Diseño:** Layout de dos columnas (40% / 58%)
- **Columna izquierda (40%):** Imagen fija
- **Columna derecha (58%):** Lista de artículos agrupados por año

**Estructura:**
```
┌─────────────────────────────────────────────┐
│ Breadcrumb (top-right): PRESS › ARTICLES › │
│                         CURRENT/PAST        │
├──────────────┬──────────────────────────────┤
│              │  2026                        │
│              │  • Article Title 1           │
│   Imagen     │    Source - Author, Date     │
│   (40%)      │  • Article Title 2           │
│              │    Source - Author, Date     │
│              ├──────────────────────────────┤
│              │  2025                        │
│              │  • Article Title 3           │
└──────────────┴──────────────────────────────┘
```

**Variables CSS:**
```css
--press-accent-color: #0066cc
--press-link-color: #4d94ff
--press-bg-light: #f9f9f9
```

**Características:**
- Agrupación automática por año
- Navegación Current/Past
- Links a artículos externos
- Text-align: left para contenido

#### 4.3 Página Exhibitions
**Archivos:**
- `src/pages/Exhibitions.jsx` (145 líneas)
- `src/pages/Exhibitions.css` (220+ líneas)

**Diseño:** Grid de dos columnas (50% / 50%)
- **Columna izquierda (50%):** Imagen + figure caption
- **Columna derecha (50%):** Información de exhibición

**Estructura:**
```
┌─────────────────────────────────────────────┐
│ Breadcrumb: EVENTS & EXHIBITIONS › CURRENT │
│ Subnav: CURRENT | PAST | UPCOMING          │
├─────────────────────────────────────────────┤
│                                             │
├────────────────────┬────────────────────────┤
│ [Imagen]           │ Exhibition Title       │
│ Figure caption     │ Location (bold)        │
│ (50%)              │ Dates (bold)           │
│                    │ Link                   │
├────────────────────┼────────────────────────┤
│ [Imagen]           │ Exhibition Title       │
│ Figure caption     │ Location (bold)        │
│ (50%)              │ Dates (bold)           │
│                    │ Link                   │
└────────────────────┴────────────────────────┘
```

**Variables CSS:**
```css
--exhibitions-accent-color: #0066cc
--exhibitions-bg-light: #f9f9f9
```

**Características:**
- Subnav horizontal: CURRENT | PAST | UPCOMING
- Divider horizontal (`<hr>`)
- Equal-height rows con flexbox
- Vertical centering del texto
- Responsive: columnas apiladas en móvil

**Datos de Exhibitions:**
- **CURRENT:** 4 exhibiciones
- **PAST:** 46 exhibiciones
- **UPCOMING:** 3 exhibiciones
- **TOTAL:** 53 exhibiciones

#### 4.4 Otras Páginas
**Works, Resources, Contact:**
- Estructuras básicas implementadas
- Pendiente población completa de contenido
- Integración con Google Sheets configurada

---

### **Fase 5: Footer**

#### 5.1 Implementación del Footer
**Archivos:**
- `src/components/Footer.jsx`
- `src/components/Footer.css`

**Diseño:**
- Borde superior vinotinto: 11px solid #ae2a5e
- Texto en mayúsculas, tamaño 10px
- Copyright: "All Images and Site Content Copyright © 2026 David Hockney - All Rights Reserved"

**Integración:**
Agregado en `App.jsx` después del contenido principal:
```jsx
<Routes>
  {/* ... rutas ... */}
</Routes>
<Footer />
```

---

### **Fase 6: Arquitectura CSS**

#### 6.1 Separación de Estilos por Componente
**Problema inicial:** 
CSS compartido causaba conflictos entre páginas. Clases como `.main-content` afectaban múltiples componentes.

**Solución implementada:**
Cada componente tiene sus propias clases con prefijo:

**Press:**
```css
.press-container
.press-breadcrumb
.press-layout
.press-main-content
.press-aside-content
.press-pagination-list
.press-information-list
.year-section
```

**Home:**
```css
.home-container
.home-main-content
.home-img-responsive
.home-caption
```

**Exhibitions:**
```css
.exhibitions-container
.exhibitions-breadcrumb
.exhibitions-subnav
.exhibitions-divider
.exhibitions-main-content
.exhibition-row
.exhibition-image-column
.exhibition-text-column
.exhibition-vertical-center
```

**Header:**
```css
.header
.header-nav
.dropdown
.dropdown-menu
.sub-menu
.has-submenu
```

**Footer:**
```css
.footer-nav
```

#### 6.2 Uso Mínimo de Variables CSS
**Filosofía:** 
Variables CSS solo para valores repetidos dentro del mismo componente, NO variables globales excesivas.

**Ejemplo - Press.css:**
```css
:root {
  --press-accent-color: #0066cc;
  --press-link-color: #4d94ff;
  --press-bg-light: #f9f9f9;
}
```

**Ejemplo - Exhibitions.css:**
```css
:root {
  --exhibitions-accent-color: #0066cc;
  --exhibitions-bg-light: #f9f9f9;
}
```

**Footer.css - Sin variables:**
```css
footer {
  border-top: 11px solid #ae2a5e;
  font-size: 10px;
  /* valores directos, sin variables */
}
```

---

## 🏗️ ESTRUCTURA DEL PROYECTO

```
hockney.com/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
├── DEPLOYMENT.md
├── GOOGLE_SHEETS_SETUP.md
├── SAMPLE_DATA.md
├── PROYECTO_DOCUMENTACION.md (este archivo)
│
├── public/
│   └── _redirects          # Netlify SPA routing
│
├── muestras/               # Archivos de muestra (en .gitignore)
│   ├── home.mht
│   ├── Current Exhibitions _ David Hockney.mht
│   ├── Past Exhibitions _ David Hockney.mht
│   ├── Upcoming Exhibitions _ David Hockney.mht
│   ├── Press>articles>current.mht
│   └── Press>articles>past.mht
│
├── src/
│   ├── main.jsx            # Entry point
│   ├── App.jsx             # Root component con routing
│   │
│   ├── components/
│   │   ├── Header.jsx      # Navegación principal (173 líneas)
│   │   ├── Header.css      # Estilos del header (177 líneas)
│   │   ├── Footer.jsx      # Footer con copyright
│   │   ├── Footer.css      # Estilos del footer
│   │   ├── Loading.jsx     # Componente de carga
│   │   ├── Loading.css
│   │   ├── ConsentNotice.jsx  # Aviso de cookies (futuro)
│   │   └── ConsentNotice.css
│   │
│   ├── pages/
│   │   ├── Home.jsx        # Página principal
│   │   ├── Home.css
│   │   ├── Press.jsx       # Artículos de prensa (165 líneas)
│   │   ├── Press.css       # (270+ líneas)
│   │   ├── Exhibitions.jsx # Exhibiciones (145 líneas)
│   │   ├── Exhibitions.css # (220+ líneas)
│   │   ├── Works.jsx       # Catálogo de obras
│   │   ├── Works.css
│   │   ├── WorksCategory.jsx  # Subcategorías de obras
│   │   ├── WorksCategory.css
│   │   ├── Resources.jsx   # Recursos
│   │   ├── Resources.css
│   │   ├── Contact.jsx     # Página de contacto
│   │   └── Contact.css
│   │
│   ├── services/
│   │   └── googleSheetsService.js  # API de Google Sheets (350+ líneas)
│   │
│   └── styles/
│       ├── index.css       # Estilos globales base
│       └── App.css         # Estilos del contenedor principal
│
├── SHEETS_DATA_PRESS.tsv       # 18 artículos
├── SHEETS_DATA_EXHIBITIONS.tsv # 53 exhibiciones
├── SHEETS_DATA_WORKS.tsv       # 16 obras
└── SHEETS_DATA_RESOURCES.tsv   # 12 recursos
```

---

## 🎨 ARQUITECTURA CSS

### Principios de Diseño

1. **Separación por Componente**
   - Cada componente tiene su propio archivo CSS
   - Clases con prefijo del componente (`.press-*`, `.exhibitions-*`, `.home-*`)

2. **Variables CSS Mínimas**
   - Solo para valores repetidos dentro del mismo componente
   - No usar variables globales excesivamente
   - Valores directos cuando se usan una sola vez

3. **Responsive Design**
   - Mobile-first approach
   - Breakpoints estándar:
     - `@media (max-width: 767px)` - Mobile
     - `@media (min-width: 768px)` - Tablet
     - `@media (min-width: 992px)` - Desktop

4. **Layout Patterns**
   - **Home:** Centrado, imagen destacada
   - **Press:** Dos columnas (40% / 58%)
   - **Exhibitions:** Grid 50% / 50%
   - **Works/Resources:** Pendiente implementación

### Paleta de Colores

```css
/* Colores principales */
#0066cc  /* Azul primario (links, acentos) */
#4d94ff  /* Azul claro (hover) */
#ae2a5e  /* Vinotinto (footer border) */
#f9f9f9  /* Gris claro (backgrounds) */
#f5f5f5  /* Gris más claro (home background) */
#ddd     /* Gris divisores */
#333     /* Texto oscuro */
#666     /* Texto secundario */
#000     /* Negro (textos principales) */
```

### Tipografía

```css
font-family: 'Lato', sans-serif;

/* Tamaños */
10px  /* Footer */
12px  /* Breadcrumbs, subnav */
14px  /* Texto body */
16px  /* Títulos pequeños */
18px  /* Títulos medianos */
22px  /* Títulos grandes */
```

### Espaciado

```css
/* Padding común */
15px  /* Padding estándar */
20px  /* Padding medio */
30px  /* Padding grande */

/* Gaps */
10px  /* Gap pequeño */
20px  /* Gap medio */
30px  /* Gap grande */
```

---

## 📊 INTEGRACIÓN CON GOOGLE SHEETS

### Estructura de Datos

#### **Hoja 1: Press**
```
Columnas: title | linkText | url | source | author | date | year | type
```

Ejemplo:
```tsv
title	linkText	url	source	author	date	year	type
David Hockney's New Paintings...	Read more	https://...	The New York Times	Jane Doe	2026-01-15	2026	current
```

#### **Hoja 2: Exhibitions**
```
Columnas: title | location | description | startDate | endDate | url | imageUrl | type
```

Ejemplo:
```tsv
title	location	description	startDate	endDate	url	imageUrl	type
David Hockney: Works from...	Portland Art Museum...	August 2021...	2026-02-14	2026-07-26	https://...	https://...jpg	current
```

**Totales:**
- Current: 4 exhibiciones
- Past: 46 exhibiciones
- Upcoming: 3 exhibiciones

#### **Hoja 3: Works**
```
Columnas: title | year | medium | category | subcategory | imageUrl | url
```

#### **Hoja 4: Resources**
```
Columnas: title | type | description | url
```

### API Endpoints

**Base URL:**
```
https://sheets.googleapis.com/v4/spreadsheets/{SPREADSHEET_ID}/values/{SHEET_NAME}?key={API_KEY}
```

**Nombres de hojas:**
- `Press`
- `Exhibitions`
- `Works`
- `Resources`

### Uso del Servicio

```javascript
import { 
  getCurrentPress, 
  getCurrentExhibitions,
  getDigitalWorks 
} from '../services/googleSheetsService';

// En componente
useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getCurrentExhibitions();
      setExhibitions(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  fetchData();
}, []);
```

---

## ⚙️ GUÍA DE CONFIGURACIÓN

### 1. Instalación Local

```bash
# Clonar repositorio
git clone <repository-url>
cd hockney.com

# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env
```

### 2. Configuración de Google Sheets

#### Paso 1: Crear Spreadsheet
1. Ir a [Google Sheets](https://sheets.google.com)
2. Crear nuevo spreadsheet: "Hockney Website Data"
3. Copiar el ID del spreadsheet de la URL:
   ```
   https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit
   ```

#### Paso 2: Crear Hojas
Crear 4 hojas con estos nombres exactos:
- `Press`
- `Exhibitions`
- `Works`
- `Resources`

#### Paso 3: Importar Datos
1. Abrir cada hoja
2. File → Import → Upload
3. Seleccionar archivo TSV correspondiente:
   - `SHEETS_DATA_PRESS.tsv` → hoja Press
   - `SHEETS_DATA_EXHIBITIONS.tsv` → hoja Exhibitions
   - `SHEETS_DATA_WORKS.tsv` → hoja Works
   - `SHEETS_DATA_RESOURCES.tsv` → hoja Resources
4. Import location: Replace current sheet
5. Separator type: Tab

#### Paso 4: Hacer Spreadsheet Público
1. Click en "Share" (Compartir)
2. En "Get link" → Change to "Anyone with the link"
3. Permisos: "Viewer"
4. Click "Done"

#### Paso 5: Obtener API Key
1. Ir a [Google Cloud Console](https://console.cloud.google.com)
2. Crear nuevo proyecto o seleccionar existente
3. Ir a "APIs & Services" → "Library"
4. Buscar "Google Sheets API"
5. Click "Enable"
6. Ir a "Credentials"
7. "Create Credentials" → "API Key"
8. Copiar la API key generada

#### Paso 6: Configurar Variables de Entorno
Editar archivo `.env`:
```bash
VITE_GOOGLE_SHEETS_API_KEY=TU_API_KEY_AQUI
VITE_GOOGLE_SPREADSHEET_ID=TU_SPREADSHEET_ID_AQUI
```

### 3. Desarrollo Local

```bash
# Ejecutar servidor de desarrollo
npm run dev

# Abrir en navegador
http://localhost:5173
```

### 4. Build para Producción

```bash
# Generar build
npm run build

# Preview del build
npm run preview
```

### 5. Deploy en Netlify

#### Opción A: Deploy Manual
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

#### Opción B: Deploy Automático (GitHub)
1. Conectar repositorio a Netlify
2. Configurar build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Agregar Environment Variables en Netlify:
   - `VITE_GOOGLE_SHEETS_API_KEY`
   - `VITE_GOOGLE_SPREADSHEET_ID`

---

## 🚀 PRÓXIMOS PASOS

### Inmediato (Semana 1)

1. **✅ Configurar Google Sheets**
   - [ ] Crear spreadsheet
   - [ ] Importar archivos TSV
   - [ ] Hacer público el spreadsheet
   - [ ] Obtener API key
   - [ ] Configurar variables de entorno

2. **✅ Probar Integración**
   - [ ] Verificar que datos se cargan en Press
   - [ ] Verificar que datos se cargan en Exhibitions
   - [ ] Probar navegación Current/Past/Upcoming
   - [ ] Verificar que imágenes cargan correctamente

3. **✅ Testing de Páginas**
   - [ ] Home - verificar imagen y caption
   - [ ] Press - verificar layout 40/58
   - [ ] Exhibitions - verificar grid 50/50
   - [ ] Works - probar categorías
   - [ ] Resources - verificar enlaces externos
   - [ ] Contact - validar formulario

### Corto Plazo (Semana 2-3)

4. **📱 Testing Responsive**
   - [ ] Probar en móviles (320px - 767px)
   - [ ] Probar en tablets (768px - 991px)
   - [ ] Probar en desktop (992px+)
   - [ ] Verificar menús dropdown en móvil
   - [ ] Verificar imágenes responsive

5. **🎨 Ajustes de Diseño**
   - [ ] Comparar con sitio original
   - [ ] Ajustar espaciados si es necesario
   - [ ] Verificar consistencia de colores
   - [ ] Optimizar tipografía

6. **📝 Completar Contenido**
   - [ ] Agregar más obras a Works
   - [ ] Agregar más recursos a Resources
   - [ ] Completar página Contact
   - [ ] Agregar páginas de subcategorías de Works

### Medio Plazo (Mes 1)

7. **🚀 Deployment**
   - [ ] Configurar dominio
   - [ ] Deploy en Netlify
   - [ ] Configurar SSL
   - [ ] Probar en producción

8. **📊 Analytics & SEO**
   - [ ] Configurar Google Analytics
   - [ ] Optimizar meta tags
   - [ ] Generar sitemap.xml
   - [ ] Configurar robots.txt

9. **🔧 Optimización**
   - [ ] Optimizar imágenes
   - [ ] Implementar lazy loading
   - [ ] Minimizar bundle size
   - [ ] Mejorar performance (Lighthouse)

### Largo Plazo (Mes 2+)

10. **✨ Features Adicionales**
    - [ ] Sistema de búsqueda
    - [ ] Filtros avanzados en Works
    - [ ] Newsletter signup
    - [ ] Social media integration
    - [ ] Galería lightbox para imágenes

11. **🛡️ Mantenimiento**
    - [ ] Backup regular de Google Sheets
    - [ ] Monitoreo de errores
    - [ ] Actualización de dependencias
    - [ ] Documentación de cambios

---

## 🔧 MANTENIMIENTO Y ACTUALIZACIÓN

### Agregar Nueva Exhibición

1. Abrir Google Sheets
2. Ir a hoja "Exhibitions"
3. Agregar nueva fila con:
   ```
   title | location | description | startDate | endDate | url | imageUrl | type
   ```
4. `type` debe ser: `current`, `past`, o `upcoming`
5. Guardar (auto-guarda)
6. La web se actualizará automáticamente al recargar

### Agregar Nuevo Artículo de Press

1. Abrir Google Sheets
2. Ir a hoja "Press"
3. Agregar nueva fila con:
   ```
   title | linkText | url | source | author | date | year | type
   ```
4. `type` debe ser: `current` o `past`
5. `year` debe ser numérico: `2026`, `2025`, etc.

### Agregar Nueva Obra

1. Abrir Google Sheets
2. Ir a hoja "Works"
3. Agregar nueva fila con:
   ```
   title | year | medium | category | subcategory | imageUrl | url
   ```
4. Categorías válidas:
   - `digital`
   - `drawings`
   - `graphics`
   - `paintings`
   - `photographs`
   - `sketchbooks`
   - `stage_design`
   - `etcetera`

### Actualizar Estilos CSS

1. Identificar el componente a modificar
2. Editar archivo CSS correspondiente:
   - Header → `src/components/Header.css`
   - Footer → `src/components/Footer.css`
   - Press → `src/pages/Press.css`
   - Exhibitions → `src/pages/Exhibitions.css`
   - etc.
3. Usar clases con prefijo del componente
4. Probar localmente con `npm run dev`
5. Hacer build: `npm run build`
6. Deploy

### Mover Exhibición de Current a Past

1. Abrir Google Sheets → hoja "Exhibitions"
2. Encontrar la exhibición
3. Cambiar columna `type` de `current` a `past`
4. Guardar
5. Verificar en la web que aparece en /exhibitions/past

### Backup de Datos

**Método 1: Exportar TSV**
1. Abrir cada hoja en Google Sheets
2. File → Download → Tab-separated values (.tsv)
3. Guardar en carpeta `backups/`

**Método 2: Google Sheets Revision History**
1. File → Version history → See version history
2. Restaurar versión anterior si es necesario

---

## 📱 TESTING CHECKLIST

### Funcionalidad

- [ ] Navegación principal funciona
- [ ] Dropdowns abren y cierran correctamente
- [ ] Delay de 100ms funciona en menús
- [ ] Links internos navegan correctamente
- [ ] Links externos abren en nueva pestaña
- [ ] Breadcrumbs muestran ubicación correcta
- [ ] Pagination/Subnav funciona
- [ ] Imágenes cargan correctamente
- [ ] API de Google Sheets responde
- [ ] Manejo de errores funciona
- [ ] Loading states se muestran
- [ ] Footer se muestra en todas las páginas

### Responsive

- [ ] Mobile (320px): Menú hamburguesa
- [ ] Mobile (375px): Contenido apilado
- [ ] Mobile (414px): Imágenes responsive
- [ ] Tablet (768px): Layout ajustado
- [ ] Tablet (1024px): Dos columnas
- [ ] Desktop (1200px): Layout completo
- [ ] Desktop (1920px): Max-width correcto

### Cross-Browser

- [ ] Chrome (última versión)
- [ ] Firefox (última versión)
- [ ] Safari (última versión)
- [ ] Edge (última versión)
- [ ] Chrome Mobile
- [ ] Safari iOS

### Performance

- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 90
- [ ] Lighthouse Best Practices > 90
- [ ] Lighthouse SEO > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] Bundle size < 500KB

---

## 📚 RECURSOS Y REFERENCIAS

### Documentación

- **React:** https://react.dev/
- **React Router:** https://reactrouter.com/
- **Vite:** https://vitejs.dev/
- **Google Sheets API:** https://developers.google.com/sheets/api
- **Netlify:** https://docs.netlify.com/

### Archivos del Proyecto

- `GOOGLE_SHEETS_SETUP.md` - Setup de Google Sheets
- `GOOGLE_SHEETS_SERVICE_GUIDE.md` - Guía del servicio
- `SHEETS_IMPORT_GUIDE.md` - Cómo importar TSV
- `SAMPLE_DATA.md` - Ejemplos de datos
- `DEPLOYMENT.md` - Guía de deployment

### Sitio Original

- **URL:** https://www.hockney.com
- **Archivos de muestra:** `muestras/` folder
  - home.mht
  - Current Exhibitions _ David Hockney.mht
  - Past Exhibitions _ David Hockney.mht
  - Upcoming Exhibitions _ David Hockney.mht
  - Press>articles>current.mht
  - Press>articles>past.mht

---

## 🐛 TROUBLESHOOTING

### Problema: Datos no cargan de Google Sheets

**Soluciones:**
1. Verificar que spreadsheet es público
2. Verificar API key en `.env`
3. Verificar ID del spreadsheet en `.env`
4. Verificar nombres de hojas (case-sensitive)
5. Abrir consola del navegador para ver errores
6. Verificar que Google Sheets API está habilitada en Google Cloud Console

### Problema: Menú dropdown no funciona

**Soluciones:**
1. Verificar que JavaScript está habilitado
2. Limpiar caché del navegador
3. Verificar en consola si hay errores
4. Probar en navegador diferente

### Problema: Imágenes no cargan

**Soluciones:**
1. Verificar URLs en Google Sheets
2. Verificar que URLs son públicas
3. Verificar CORS si las imágenes están en otro dominio
4. Verificar conexión a internet

### Problema: Build falla

**Soluciones:**
```bash
# Limpiar cache
rm -rf node_modules
rm -rf dist
rm package-lock.json

# Reinstalar
npm install

# Build
npm run build
```

### Problema: Deploy en Netlify falla

**Soluciones:**
1. Verificar que `.env` variables están en Netlify
2. Verificar build command: `npm run build`
3. Verificar publish directory: `dist`
4. Verificar Node version en Netlify (usar 18+)

---

## 👥 CONTACTO Y SOPORTE

### Para el Cliente

Si tienes preguntas sobre:
- **Cómo agregar contenido:** Ver sección "Mantenimiento y Actualización"
- **Problemas técnicos:** Ver sección "Troubleshooting"
- **Cambios de diseño:** Contactar al desarrollador

### Para el Desarrollador

**Archivo de configuración principal:**
- `vite.config.js` - Configuración de Vite
- `package.json` - Dependencias
- `.env` - Variables de entorno

**Servicios clave:**
- `src/services/googleSheetsService.js` - Toda la lógica de API

**Componentes principales:**
- `src/components/Header.jsx` - Navegación
- `src/App.jsx` - Routing
- `src/pages/Press.jsx` - Layout de referencia (2 columnas)
- `src/pages/Exhibitions.jsx` - Layout de referencia (grid)

---

## 📄 LICENCIA Y COPYRIGHT

Todos los contenidos, imágenes y diseño son propiedad de:

**© 2026 David Hockney - All Rights Reserved**

Este código es para uso del sitio oficial hockney.com únicamente.

---

## 🎯 RESUMEN DE INSTRUCCIONES CLAVE

### Para Empezar
1. Configurar Google Sheets (ver Guía de Configuración)
2. Agregar variables de entorno
3. `npm install && npm run dev`
4. Verificar que todo carga correctamente

### Para Agregar Contenido
1. Abrir Google Sheets
2. Agregar fila en la hoja correspondiente
3. Guardar (auto-guarda)
4. Recargar página web

### Para Hacer Cambios de Diseño
1. Encontrar archivo CSS del componente
2. Modificar usando clases con prefijo
3. Probar localmente
4. Hacer build y deploy

### Para Deploy
1. `npm run build`
2. Subir `dist/` a Netlify
3. Configurar environment variables
4. Verificar en producción

---

**FIN DE LA DOCUMENTACIÓN**

Última actualización: 12 de marzo de 2026  
Versión: 1.0  
Estado: ✅ Desarrollo completado, listo para configuración de Google Sheets
