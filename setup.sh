#!/bin/bash

# Script de configuración inicial del proyecto Hockney

echo "🎨 Configurando proyecto David Hockney Website..."
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null
then
    echo "❌ Node.js no está instalado. Por favor instala Node.js primero."
    echo "   Descarga desde: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js detectado: $(node --version)"
echo "✅ npm detectado: $(npm --version)"
echo ""

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencias instaladas correctamente"
else
    echo "❌ Error instalando dependencias"
    exit 1
fi

echo ""

# Verificar si existe .env
if [ ! -f .env ]; then
    echo "⚙️  Creando archivo .env desde .env.example..."
    cp .env.example .env
    echo "✅ Archivo .env creado"
    echo ""
    echo "⚠️  IMPORTANTE: Edita el archivo .env y agrega tus credenciales de Google Sheets:"
    echo "   - VITE_GOOGLE_SHEETS_API_KEY"
    echo "   - VITE_GOOGLE_SPREADSHEET_ID"
    echo ""
    echo "   Lee GOOGLE_SHEETS_SETUP.md para instrucciones detalladas"
else
    echo "✅ Archivo .env ya existe"
fi

echo ""
echo "🎉 ¡Configuración completada!"
echo ""
echo "📚 Próximos pasos:"
echo "   1. Configura Google Sheets siguiendo GOOGLE_SHEETS_SETUP.md"
echo "   2. Edita .env con tus credenciales"
echo "   3. Ejecuta: npm run dev"
echo "   4. Abre http://localhost:5173 en tu navegador"
echo ""
echo "📖 Documentación adicional:"
echo "   - README.md - Información general del proyecto"
echo "   - SAMPLE_DATA.md - Datos de ejemplo para Google Sheets"
echo "   - DEPLOYMENT.md - Guía de despliegue"
echo ""
