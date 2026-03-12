# Cómo Importar Datos a Google Sheets

Este directorio contiene archivos TSV (Tab-Separated Values) listos para importar directamente en Google Sheets.

## Archivos Disponibles

- **SHEETS_DATA_PRESS.tsv** - 18 artículos de prensa de ejemplo
- **SHEETS_DATA_EXHIBITIONS.tsv** - 5 exposiciones de ejemplo
- **SHEETS_DATA_WORKS.tsv** - 16 obras de ejemplo
- **SHEETS_DATA_RESOURCES.tsv** - 12 recursos de ejemplo

## Método 1: Copiar y Pegar (Más Rápido)

### Paso a Paso:

1. **Abre el archivo TSV** en VS Code o cualquier editor de texto

2. **Selecciona todo el contenido** (Ctrl+A o Cmd+A)

3. **Copia** (Ctrl+C o Cmd+C)

4. **Ve a tu Google Spreadsheet**
   - Abre la pestaña correspondiente (Press, Exhibitions, Works, o Resources)
   - Haz clic en la celda A1
   
5. **Pega** (Ctrl+V o Cmd+V)
   - Google Sheets detectará automáticamente las tabulaciones
   - Los datos se organizarán en columnas

6. **Verifica** que los datos estén correctamente distribuidos en columnas

## Método 2: Importar Archivo (Alternativo)

### Paso a Paso:

1. **En Google Sheets**, ve a `Archivo` → `Importar`

2. **Sube el archivo TSV**:
   - Selecciona la pestaña "Subir"
   - Arrastra el archivo .tsv o haz clic en "Selecciona un archivo desde tu dispositivo"

3. **Configura las opciones de importación**:
   - **Ubicación de importación**: "Reemplazar hoja actual"
   - **Tipo de separador**: "Detectar automáticamente" o "Tabulación"
   - **Convertir texto a números y fechas**: ✓ (marcado)

4. **Haz clic en "Importar datos"**

5. **Verifica** que los datos se importaron correctamente

## Estructura de Datos

### Press (Artículos)
- 18 artículos de prensa
- Rango de años: 2019-2026
- Incluye artículos "current" y "past"
- Fuentes: The Independent, The Times, NY Times, etc.

### Exhibitions (Exposiciones)
- 5 exposiciones de ejemplo
- Incluye exposiciones actuales y pasadas
- Galerías: Lightroom London, Royal Academy, NPG, etc.

### Works (Obras)
- 16 obras representativas
- Categorías: paintings, digital, photos, graphics, etcetera
- Incluye obras icónicas como "A Bigger Splash"

### Resources (Recursos)
- 12 recursos
- Categorías: foundation, galleries, publications, public_collections
- Enlaces a galerías y museos importantes

## Personalización de Datos

Después de importar los datos de ejemplo, puedes:

1. **Agregar más filas**: Simplemente escribe en nuevas filas manteniendo la estructura
2. **Editar datos**: Haz clic en cualquier celda para modificar
3. **Eliminar datos**: Selecciona filas y haz clic derecho → "Eliminar fila"
4. **Ordenar**: Usa Data → Sort range para ordenar por fecha, año, etc.

## Formato de Datos

### Press
- **date**: Formato YYYY-MM-DD (ej: 2026-03-11)
- **year**: Número de 4 dígitos
- **type**: "current" o "past"
- **url**: URL completa con https://

### Exhibitions
- **startDate**: Formato YYYY-MM-DD
- **endDate**: Formato YYYY-MM-DD
- **type**: "current", "past", o "upcoming"

### Works
- **category**: debe coincidir con las categorías del sistema
- **subcategory**: puede estar vacío o ser una subcategoría válida
- **available**: "yes" o "no"

### Resources
- **isExternal**: "true" o "false"
- **url**: puede ser URL completa (https://) o ruta relativa (/)

## Validación

Después de importar, verifica:

- ✅ Primera fila contiene los encabezados
- ✅ No hay columnas vacías entre datos
- ✅ Las fechas tienen formato YYYY-MM-DD
- ✅ Los valores booleanos son "true"/"false" o "yes"/"no"
- ✅ Las URLs tienen el protocolo correcto

## Solución de Problemas

### Los datos están en una sola columna
- **Causa**: Google Sheets no detectó las tabulaciones
- **Solución**: Usa Método 2 (importar archivo) y selecciona "Tabulación" como separador

### Las fechas aparecen raras
- **Causa**: Google Sheets interpretó las fechas en formato local
- **Solución**: Selecciona las columnas de fecha → Format → Number → Plain text

### Caracteres extraños
- **Causa**: Codificación del archivo
- **Solución**: Asegúrate de que el archivo esté en UTF-8

## Próximo Paso

Una vez importados los datos:

1. Configura los permisos del spreadsheet (ver RESUMEN_CONFIGURACION.md)
2. Obtén el Spreadsheet ID
3. Crea la API Key
4. Configura las variables en .env
5. Prueba la integración

## Recursos Adicionales

- **GOOGLE_SHEETS_DATA.md** - Descripción completa de la estructura
- **GOOGLE_SHEETS_SERVICE_GUIDE.md** - Cómo usar el servicio en código
- **RESUMEN_CONFIGURACION.md** - Guía completa de configuración
