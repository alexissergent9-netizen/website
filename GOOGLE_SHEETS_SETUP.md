# Guía de Configuración de Google Sheets

## Paso 1: Crear la Hoja de Cálculo

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nómbrala "Hockney Website Data" (o el nombre que prefieras)

## Paso 2: Crear las Pestañas (Sheets)

Crea las siguientes pestañas en tu hoja de cálculo:

### Pestaña 1: "Works"

Columnas:
- `title` - Título de la obra
- `category` - Categoría (digital, drawings, graphics, paintings, photos, sketchbooks, stage_design, etcetera)
- `year` - Año de creación
- `medium` - Técnica/medio utilizado
- `dimensions` - Dimensiones de la obra
- `imageUrl` - URL de la imagen

Ejemplo de datos:
```
title                                  | category   | year | medium              | dimensions        | imageUrl
Paint Trolley, L.A. 1985              | photos     | 1985 | photographic collage| 41x61 in.         | https://example.com/image1.jpg
The Entrance                          | paintings  | 2019 | acrylic on 2 canvases| 36 x 96 in. overall| https://example.com/image2.jpg
```

### Pestaña 2: "Exhibitions"

Columnas:
- `title` - Título de la exposición
- `venue` - Lugar/museo
- `location` - Ciudad, país
- `startDate` - Fecha de inicio (formato: YYYY-MM-DD)
- `endDate` - Fecha de fin (formato: YYYY-MM-DD)
- `description` - Descripción de la exposición
- `imageUrl` - URL de imagen
- `websiteUrl` - URL del sitio web

Ejemplo de datos:
```
title                                              | venue            | location         | startDate  | endDate    | description        | imageUrl | websiteUrl
David Hockney: Works from the Collections...      | Portland Art Museum| Portland, OR, USA| 2026-02-14 | 2026-07-26 | Major exhibition...| url      | https://...
```

### Pestaña 3: "Press"

Columnas:
- `title` - Título del artículo
- `date` - Fecha de publicación (formato: YYYY-MM-DD)
- `source` - Fuente/publicación
- `description` - Descripción/resumen
- `linkUrl` - URL al artículo completo

Ejemplo de datos:
```
title                           | date       | source          | description                    | linkUrl
David Hockney's New Exhibition  | 2026-03-01 | The Art Magazine| Artist unveils new works...    | https://...
```

### Pestaña 4: "Resources"

Columnas:
- `title` - Título del recurso
- `description` - Descripción (opcional)
- `linkUrl` - URL del enlace
- `type` - Tipo (external o internal)

Ejemplo de datos:
```
title                          | description                    | linkUrl                               | type
The David Hockney Foundation   | Official foundation website    | http://www.thedavidhockneyfoundation.org/ | external
Galleries                      | List of representing galleries | /resources/galleries                  | internal
```

## Paso 3: Configurar la API de Google Sheets

### 3.1 Ir a Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Dale un nombre al proyecto (ej: "Hockney Website")

### 3.2 Habilitar la API de Google Sheets

1. En el menú lateral, ve a "APIs & Services" > "Library"
2. Busca "Google Sheets API"
3. Haz clic en "Google Sheets API"
4. Haz clic en "Enable"

### 3.3 Crear Credenciales (API Key)

1. Ve a "APIs & Services" > "Credentials"
2. Haz clic en "+ CREATE CREDENTIALS"
3. Selecciona "API key"
4. Copia la API key generada
5. (Opcional) Haz clic en "Edit API key" para restringir el uso:
   - En "API restrictions", selecciona "Restrict key"
   - Marca solo "Google Sheets API"
   - Guarda los cambios

### 3.4 Hacer Pública la Hoja de Cálculo

1. Abre tu hoja de cálculo en Google Sheets
2. Haz clic en "Share" (Compartir)
3. En "General access", selecciona "Anyone with the link"
4. Establece el permiso como "Viewer"
5. Copia el ID de la hoja de cálculo desde la URL:
   ```
   https://docs.google.com/spreadsheets/d/[ESTE_ES_EL_ID]/edit
   ```

## Paso 4: Configurar el Proyecto React

1. En el proyecto, copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edita el archivo `.env` y agrega tus credenciales:
   ```
   VITE_GOOGLE_SHEETS_API_KEY=tu_api_key_aqui
   VITE_GOOGLE_SPREADSHEET_ID=id_de_tu_hoja_aqui
   ```

3. Guarda el archivo

## Paso 5: Probar la Conexión

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Abre el navegador en `http://localhost:5173`

3. Navega a las diferentes secciones para verificar que los datos se cargan correctamente

## Resolución de Problemas

### Error: "The caller does not have permission"
- Verifica que la hoja de cálculo esté compartida como "Anyone with the link"
- Asegúrate de que el ID de la hoja sea correcto

### Error: "API key not valid"
- Verifica que hayas copiado correctamente la API key
- Asegúrate de que la API de Google Sheets esté habilitada en tu proyecto

### No se muestran datos
- Verifica que los nombres de las pestañas sean exactos: "Works", "Exhibitions", "Press", "Resources"
- Asegúrate de que la primera fila contenga los nombres de las columnas exactos
- Revisa la consola del navegador para ver errores específicos

### Las fechas no se filtran correctamente
- Asegúrate de usar el formato de fecha correcto: YYYY-MM-DD (ej: 2026-03-10)

## Notas Importantes

- **Primera fila**: Siempre debe contener los nombres de las columnas (headers)
- **Nombres exactos**: Los nombres de las columnas y pestañas deben ser exactos (case-sensitive)
- **URLs de imágenes**: Deben ser URLs públicas accesibles (puedes usar servicios como Imgur, Cloudinary, etc.)
- **Fechas**: Usar siempre formato ISO (YYYY-MM-DD) para que las comparaciones funcionen correctamente

## Seguridad

⚠️ **IMPORTANTE**: 
- Nunca compartas tu archivo `.env` en repositorios públicos
- El archivo `.gitignore` ya está configurado para excluir `.env`
- Considera usar restricciones de API en Google Cloud Console para limitar el uso de tu API key
- Para producción, considera usar variables de entorno en tu plataforma de hosting
