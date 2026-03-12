# Guía de Despliegue

Esta guía te ayudará a desplegar tu aplicación David Hockney en diferentes plataformas.

## Opción 1: Vercel (Recomendado)

Vercel es ideal para aplicaciones React y ofrece un plan gratuito generoso.

### Pasos:

1. **Crear cuenta en Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Regístrate con GitHub, GitLab o Bitbucket

2. **Preparar el repositorio**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Hockney website"
   git remote add origin [tu-repositorio-url]
   git push -u origin main
   ```

3. **Importar proyecto en Vercel**
   - En Vercel, haz clic en "New Project"
   - Importa tu repositorio de GitHub/GitLab/Bitbucket
   - Vercel detectará automáticamente que es un proyecto Vite

4. **Configurar variables de entorno**
   - En la configuración del proyecto, ve a "Settings" > "Environment Variables"
   - Agrega:
     - `VITE_GOOGLE_SHEETS_API_KEY`: tu API key
     - `VITE_GOOGLE_SPREADSHEET_ID`: tu spreadsheet ID

5. **Deploy**
   - Haz clic en "Deploy"
   - Vercel construirá y desplegará tu aplicación automáticamente

## Opción 2: Netlify

### Pasos:

1. **Crear cuenta en Netlify**
   - Ve a [netlify.com](https://netlify.com)
   - Regístrate con GitHub, GitLab o Bitbucket

2. **Preparar el repositorio** (igual que en Vercel)

3. **Importar proyecto en Netlify**
   - Haz clic en "Add new site" > "Import an existing project"
   - Conecta tu repositorio

4. **Configurar build settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

5. **Configurar variables de entorno**
   - Ve a "Site settings" > "Environment variables"
   - Agrega las mismas variables que en Vercel

6. **Deploy**
   - Haz clic en "Deploy site"

## Opción 3: GitHub Pages

### Pasos:

1. **Instalar gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Actualizar package.json**
   Agrega en la sección "scripts":
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Actualizar vite.config.js**
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/nombre-de-tu-repositorio/'
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Configurar GitHub Pages**
   - Ve a tu repositorio en GitHub
   - Settings > Pages
   - Source: selecciona "gh-pages" branch
   - Configura las variables de entorno en GitHub Secrets

## Opción 4: Servidor Propio (VPS)

### Requisitos:
- Servidor con Node.js instalado
- Nginx o Apache
- Certificado SSL (Let's Encrypt)

### Pasos:

1. **Construir la aplicación**
   ```bash
   npm run build
   ```

2. **Subir archivos al servidor**
   ```bash
   scp -r dist/* usuario@tu-servidor:/var/www/hockney
   ```

3. **Configurar Nginx**
   ```nginx
   server {
       listen 80;
       server_name tudominio.com;
       
       root /var/www/hockney;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. **Configurar SSL con Let's Encrypt**
   ```bash
   sudo certbot --nginx -d tudominio.com
   ```

## Variables de Entorno en Producción

⚠️ **IMPORTANTE**: Nunca expongas tu API key directamente en el código.

### Configuración segura:

1. **En plataformas de hosting** (Vercel, Netlify, etc.)
   - Usa sus interfaces para configurar variables de entorno
   - Las variables se inyectan en tiempo de build

2. **Rotación de API keys**
   - Considera rotar tu API key periódicamente
   - Usa restricciones en Google Cloud Console

3. **Restricciones de API**
   En Google Cloud Console:
   - Limita la API key a solo Google Sheets API
   - Agrega restricciones de referrer HTTP para tu dominio
   - Ejemplo: `https://tudominio.com/*`

## Monitoreo Post-Despliegue

### Verificaciones:

1. **Funcionalidad**
   - ✅ Todas las páginas cargan correctamente
   - ✅ Los datos se obtienen de Google Sheets
   - ✅ Las imágenes se muestran correctamente
   - ✅ La navegación funciona en todas las rutas
   - ✅ El diseño es responsive

2. **Rendimiento**
   - Usa [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)
   - Verifica tiempos de carga
   - Optimiza imágenes si es necesario

3. **SEO (opcional)**
   - Agrega meta tags en `index.html`
   - Configura un sitemap.xml
   - Agrega archivo robots.txt

## Actualización de Contenido

### Flujo de trabajo:

1. **Actualizar Google Sheets**
   - Edita la hoja de cálculo directamente
   - Los cambios se reflejan inmediatamente en el sitio

2. **Actualizar código**
   ```bash
   git add .
   git commit -m "Descripción de cambios"
   git push
   ```
   - La mayoría de plataformas redesplegarán automáticamente

## Solución de Problemas

### El sitio no carga datos:

1. Verifica las variables de entorno en la plataforma
2. Revisa la consola del navegador para errores
3. Confirma que la hoja de Google Sheets es pública
4. Verifica que la API key tenga los permisos correctos

### Error 404 en rutas:

- Asegúrate de que el servidor esté configurado para SPA (Single Page Application)
- En Vercel/Netlify esto es automático
- En servidores propios, usa rewrite rules

### Imágenes no cargan:

- Verifica que las URLs en Google Sheets sean públicas
- Prueba las URLs directamente en el navegador
- Considera usar un CDN para imágenes

## Mejoras Futuras

- Agregar caché para reducir llamadas a la API
- Implementar paginación para grandes conjuntos de datos
- Agregar búsqueda y filtros
- Implementar modo oscuro
- Agregar animaciones y transiciones
- Implementar PWA (Progressive Web App)
