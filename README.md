# David Hockney Website - React Clone

Una réplica del sitio web oficial de David Hockney construida con React y administrada mediante Google Sheets.

## Estructura del Proyecto

- **src/components** - Componentes reutilizables
- **src/pages** - Páginas principales del sitio
- **src/services** - Servicios para integración con Google Sheets
- **src/styles** - Estilos globales y CSS

## Configuración de Google Sheets

### 1. Crear una hoja de cálculo de Google

Crea una hoja de cálculo con las siguientes pestañas:

#### Pestaña "Works" (Obras)
| title | category | year | medium | dimensions | imageUrl |
|-------|----------|------|--------|------------|----------|

#### Pestaña "Exhibitions" (Exposiciones)
| title | venue | location | startDate | endDate | description | imageUrl | websiteUrl |
|-------|-------|----------|-----------|---------|-------------|----------|------------|

#### Pestaña "Press" (Prensa)
| title | date | source | description | linkUrl |
|-------|------|--------|-------------|---------|

#### Pestaña "Resources" (Recursos)
| title | description | linkUrl | type |
|-------|-------------|---------|------|

### 2. Configurar Google Sheets API

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google Sheets
4. Crea credenciales (API Key)
5. Comparte tu hoja de cálculo como "Cualquiera con el enlace puede ver"

### 3. Configurar Variables de Entorno

Copia `.env.example` a `.env` y configura:

```bash
VITE_GOOGLE_SHEETS_API_KEY=tu_clave_api
VITE_GOOGLE_SPREADSHEET_ID=id_de_tu_hoja
```

El ID de la hoja se encuentra en la URL:
`https://docs.google.com/spreadsheets/d/[ESTE_ES_EL_ID]/edit`

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Producción

```bash
npm run build
npm run preview
```

## Características

- ✅ Diseño responsive
- ✅ Navegación entre secciones
- ✅ Contenido dinámico desde Google Sheets
- ✅ Galería de obras
- ✅ Lista de exposiciones
- ✅ Sección de recursos
- ✅ Cookie consent banner

## Tecnologías

- React 18
- React Router 6
- Vite
- Google Sheets API
- CSS Modules
