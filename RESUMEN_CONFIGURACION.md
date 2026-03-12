# Resumen de Configuración - Google Sheets para David Hockney

## ✅ Cambios Completados

### 1. Estructura de Navegación Actualizada
- ✅ Logo modificado con estilo "DAVIDHOCKNEY"
- ✅ Navegación completa con dropdowns y submenus
- ✅ Estructura según archivos de muestra
- ✅ Carpeta `muestras` agregada a .gitignore

### 2. Servicio Google Sheets Actualizado
- ✅ Archivo: `src/services/googleSheetsService.js`
- ✅ 30+ métodos específicos para diferentes tipos de datos
- ✅ Soporte para Press, Exhibitions, Works, Resources

---

## 📊 Próximos Pasos - Configurar Google Sheets

### Paso 1: Crear el Google Spreadsheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea un nuevo spreadsheet llamado "David Hockney Website Data"
3. Crea 4 pestañas con estos nombres exactos:
   - `Press`
   - `Exhibitions`
   - `Works`
   - `Resources`

### Paso 2: Configurar las Pestañas

#### Pestaña: Press

**Primera fila (encabezados):**
```
title | linkText | url | source | author | date | year | type
```

**Datos de ejemplo (fila 2 en adelante):**
```
David Hockney's Serpentine Show Offers a Message of Hope | David Hockney's Serpentine show offers a message of hope in a desperate world | https://www.the-independent.com/arts-entertainment/art/reviews/david-hockney-serpentine-gallery-review-b2936516.html | The Independent | Mark Hudson | 2026-03-11 | 2026 | current
```

#### Pestaña: Exhibitions

**Primera fila (encabezados):**
```
title | location | description | startDate | endDate | url | imageUrl | type
```

**Datos de ejemplo:**
```
David Hockney: Bigger & Closer | Lightroom, London | An immersive exhibition experience | 2024-11-01 | 2025-04-30 | https://www.lightroom.uk/hockney |  | current
```

#### Pestaña: Works

**Primera fila (encabezados):**
```
title | category | subcategory | year | medium | dimensions | description | imageUrl | available
```

**Categorías válidas:**
- digital (subcategorías: computer-drawings, iphone, ipad, arrival-of-spring-woldgate, yosemite-suite, movies)
- drawings
- graphics (subcategorías: lithographs, etchings, rakes-progress-etchings, blue-guitar-etchings, prints)
- paintings
- photos (subcategorías: photographic-collages, composite-polaroids, photo_drawings)
- sketchbooks
- stage_design (subcategorías: the-rakes-progress, magic-flute, french-triple-bill, etc.)
- etcetera (subcategorías: pools, bmw)

**Datos de ejemplo:**
```
The Entrance | paintings |  | 2019 | acrylic on 2 canvases | 36 x 96 in. overall | The Entrance, 2019 |  | yes
```

#### Pestaña: Resources

**Primera fila (encabezados):**
```
title | category | description | url | isExternal
```

**Datos de ejemplo:**
```
The David Hockney Foundation | foundation | Official foundation supporting Hockney's legacy | http://www.thedavidhockneyfoundation.org/ | true
```

### Paso 3: Configurar Permisos del Spreadsheet

1. Haz clic en el botón "Compartir" (esquina superior derecha)
2. En "Acceso general", selecciona "Cualquier persona con el enlace"
3. Asegúrate de que el permiso sea "Lector" (viewer)
4. Copia el ID del spreadsheet de la URL:
   - URL: `https://docs.google.com/spreadsheets/d/XXXXXXXXXX/edit`
   - ID: `XXXXXXXXXX`

### Paso 4: Crear API Key en Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto (o usa uno existente)
3. Habilita la API:
   - Ve a "APIs & Services" > "Library"
   - Busca "Google Sheets API"
   - Haz clic en "Enable"
4. Crea credenciales:
   - Ve a "APIs & Services" > "Credentials"
   - Haz clic en "+ CREATE CREDENTIALS"
   - Selecciona "API Key"
   - Copia la key generada
5. (Opcional) Restringe la API Key:
   - Haz clic en la key creada
   - En "API restrictions", selecciona "Restrict key"
   - Marca solo "Google Sheets API"
   - Guarda los cambios

### Paso 5: Configurar Variables de Entorno

1. Crea un archivo `.env` en la raíz del proyecto (si no existe)
2. Agrega las siguientes variables:

```env
VITE_GOOGLE_SHEETS_API_KEY=tu_api_key_aquí
VITE_GOOGLE_SPREADSHEET_ID=tu_spreadsheet_id_aquí
```

3. Reemplaza `tu_api_key_aquí` con la API Key del Paso 4
4. Reemplaza `tu_spreadsheet_id_aquí` con el ID del Paso 3

---

## 📝 Archivos Creados/Actualizados

### Nuevos Archivos de Documentación:
1. **GOOGLE_SHEETS_DATA.md** - Estructura de datos y ejemplos para Google Sheets
2. **GOOGLE_SHEETS_SERVICE_GUIDE.md** - Guía completa de uso del servicio

### Archivos Actualizados:
1. **src/services/googleSheetsService.js** - Servicio expandido con 30+ métodos
2. **src/components/Header.jsx** - Navegación completa con dropdowns
3. **src/components/Header.css** - Estilos para navegación y dropdowns
4. **.gitignore** - Agregada carpeta `muestras`

---

## 🔧 Uso del Servicio en tus Componentes

### Ejemplo: Press.jsx

```javascript
import { useEffect, useState } from 'react';
import googleSheetsService from '../services/googleSheetsService';

function Press() {
  const [articles, setArticles] = useState([]);
  
  useEffect(() => {
    const loadArticles = async () => {
      const data = await googleSheetsService.getCurrentPress();
      setArticles(data);
    };
    loadArticles();
  }, []);
  
  // ... renderizar artículos
}
```

### Métodos Principales Disponibles:

**Press:**
- `getCurrentPress()` - Artículos actuales
- `getPastPress()` - Artículos pasados
- `getPressByYear(2026)` - Artículos por año

**Exhibitions:**
- `getCurrentExhibitions()` - Exposiciones actuales
- `getPastExhibitions()` - Exposiciones pasadas
- `getUpcomingExhibitions()` - Próximas exposiciones

**Works:**
- `getDigitalWorks('iphone')` - Obras digitales de iPhone
- `getPaintings()` - Pinturas
- `getGraphics('lithographs')` - Litografías
- `getStageDesign('magic-flute')` - Diseño de Magic Flute

**Resources:**
- `getGalleries()` - Galerías
- `getPublications()` - Publicaciones

Ver **GOOGLE_SHEETS_SERVICE_GUIDE.md** para la lista completa de métodos.

---

## 📋 Datos Extraídos de las Muestras

He analizado los archivos de muestra y extraído la siguiente información:

### Artículos de Press encontrados:
- David Hockney's Serpentine Show (2026)
- David Hockney at Annely Juda (2025)
- Hockney at the Halcyon (2024)
- Swimming pool symbolism (2023)
- Luna Luna exhibition (2022)
- Y muchos más...

### Estructura de navegación replicada:
- Press → Articles → Current/Past
- Exhibitions → Current/Past/Upcoming
- Works → 8 categorías principales con múltiples subcategorías
- Resources → Foundation, Galleries, Publications, etc.
- Contacts

---

## ⚠️ Notas Importantes

1. **Formato de fechas:** Usar YYYY-MM-DD (ej: 2026-03-11)
2. **Campos vacíos:** Dejar en blanco si no hay datos
3. **URLs:** Incluir protocolo completo (https://)
4. **Case sensitive:** Los nombres de las pestañas deben ser exactos
5. **Reiniciar servidor:** Después de modificar .env, reiniciar con `npm run dev`

---

## 🎯 Testing

Después de configurar todo:

1. Reinicia el servidor de desarrollo
2. Abre la consola del navegador
3. Prueba en la consola:

```javascript
import googleSheetsService from './src/services/googleSheetsService';
const articles = await googleSheetsService.getCurrentPress();
console.log(articles);
```

---

## 📚 Documentos de Referencia

- **GOOGLE_SHEETS_DATA.md** - Estructura completa de datos
- **GOOGLE_SHEETS_SERVICE_GUIDE.md** - Ejemplos de código
- **GOOGLE_SHEETS_SETUP.md** - Guía paso a paso (si existe)

---

## 🆘 Solución de Problemas

### Error: "Failed to fetch"
- Verifica que la API Key sea correcta
- Verifica que Google Sheets API esté habilitada
- Verifica que el spreadsheet sea público (viewer)

### Error: "No data found"
- Verifica que el nombre de la pestaña sea exacto
- Verifica que haya datos en la hoja
- Verifica que la primera fila contenga los encabezados

### Error: "CORS"
- Las API Keys de Google Sheets funcionan desde el navegador
- Si persiste, verifica las restricciones de la API Key
