import { useState } from 'react'
import './SetupGuide.css'

const SHEETS = [
  { name: 'data',                 columns: 'key\tvalue' },
  { name: 'page_config',          columns: 'page\tkey\tvalue' },
  { name: 'Works',                columns: 'title\tcategory\tsubcategory\tyear\tmedium\tdimensions\timageUrl' },
  { name: 'works_categories',     columns: 'slug\tlabel\tdescription\torder' },
  { name: 'works_subcategories',  columns: 'category\tname\tslug\torder' },
  { name: 'Exhibitions',          columns: 'title\tlocation\tstartDate\tendDate\ttype\tdescription\timageUrl\turl' },
  { name: 'Press',                columns: 'title\tauthor\tsource\tdate\tyear\ttype\turltext\turl' },
  { name: 'Resources',            columns: 'type\tname\tlocation\taddress\tphone\twebsite\timageUrl\tdescription' },
  { name: 'Contact',              columns: 'label\thref\texternal' },
  { name: 'contact_content',      columns: 'section\ttype\torder\tquestion\tcontent' },
]

const FILES = [
  { file: 'SHEETS_DATA_DATA.tsv',                 sheet: 'data' },
  { file: 'SHEETS_DATA_PAGE_CONFIG.tsv',          sheet: 'page_config' },
  { file: 'SHEETS_DATA_WORKS.tsv',                sheet: 'Works' },
  { file: 'SHEETS_DATA_WORKS_CATEGORIES.tsv',     sheet: 'works_categories' },
  { file: 'SHEETS_DATA_WORKS_SUBCATEGORIES.tsv',  sheet: 'works_subcategories' },
  { file: 'SHEETS_DATA_EXHIBITIONS.tsv',          sheet: 'Exhibitions' },
  { file: 'SHEETS_DATA_PRESS.tsv',                sheet: 'Press' },
  { file: 'SHEETS_DATA_RESOURCES.tsv',            sheet: 'Resources' },
  { file: 'SHEETS_DATA_CONTACT.tsv',              sheet: 'Contact' },
  { file: 'SHEETS_DATA_CONTACT_CONTENT.tsv',      sheet: 'contact_content' },
]

const VARS = [
  { key: 'VITE_GOOGLE_SHEETS_API_KEY' },
  { key: 'VITE_GOOGLE_SPREADSHEET_ID' },
]

const SPREADSHEET_EXAMPLE = 'https://docs.google.com/spreadsheets/d/\u00A0\u00A01AbCdEfGhIjKlMnOpQrStUv\u00A0\u00A0/edit'

const CONTENT = {
  en: {
    title: 'Site Configuration Guide',
    subtitle: 'How to connect Google Sheets to the website — step by step',
    intro: 'This guide will walk you through the complete setup process. No programming experience required. Follow each step carefully and the website will automatically display the content you manage in Google Sheets.',
    overview: {
      title: 'What you will set up',
      items: [
        'A Google Cloud project with an API key',
        'A Google Spreadsheet with all the site data',
        'Two environment variables in Netlify',
      ],
    },
    tableHeaders: { tab: 'Tab name', columns: 'Columns (first row)', purpose: 'Purpose', file: 'TSV file', paste: '→ Paste into sheet' },
    sheetNotes: [
      'Site name, page title, footer copyright',
      'Featured images and texts for all pages',
      'All artworks',
      'Works category labels and descriptions',
      'Works subcategory lists',
      'Current, past and upcoming exhibitions',
      'Press articles',
      'Galleries, collections, publications, making works',
      'Contact page links',
      'FAQ and subpage texts',
    ],
    steps: [
      {
        number: '01',
        title: 'Create a Google Cloud project',
        items: [
          { text: 'Go to', link: 'https://console.cloud.google.com', linkText: 'console.cloud.google.com' },
          { text: 'Sign in with a Google account.' },
          { text: 'Click the project selector at the top (it may say "Select a project") and then click New Project.' },
          { text: 'Give it any name, for example: hockney-site. Click Create.' },
          { text: 'Wait a few seconds for the project to be created, then make sure it is selected.' },
        ],
      },
      {
        number: '02',
        title: 'Enable the Google Sheets API',
        items: [
          { text: 'In the left menu, click APIs & Services → Library.' },
          { text: 'In the search bar, type Google Sheets API and press Enter.' },
          { text: 'Click on the result named Google Sheets API.' },
          { text: 'Click the blue Enable button.' },
        ],
      },
      {
        number: '03',
        title: 'Create an API key',
        items: [
          { text: 'In the left menu, click APIs & Services → Credentials.' },
          { text: 'Click + Create Credentials at the top and choose API key.' },
          { text: 'A window will appear with your new API key. Copy it and save it somewhere safe — you will need it later.' },
          { text: 'Click Edit API key (the pencil icon) to restrict it:' },
        ],
        sub: [
          'Under API restrictions, select Restrict key.',
          'In the dropdown, check Google Sheets API.',
          'Click Save.',
        ],
        note: 'Restricting the key is optional but recommended for security.',
      },
      {
        number: '04',
        title: 'Create the Google Spreadsheet',
        items: [
          { text: 'Go to', link: 'https://sheets.google.com', linkText: 'sheets.google.com' },
          { text: 'Click the + button to create a new blank spreadsheet.' },
          { text: 'Name it anything you like, for example: David Hockney - Site Data.' },
          { text: 'Look at the URL in your browser. Copy the long ID between /d/ and /edit. This is your Spreadsheet ID.' },
        ],
        exampleLabel: '↑ this is your Spreadsheet ID',
      },
      {
        number: '05',
        title: 'Make the spreadsheet public',
        items: [
          { text: 'In the spreadsheet, click the Share button (top right, blue button).' },
          { text: 'Click Change to anyone with the link.' },
          { text: 'Make sure the role is set to Viewer.' },
          { text: 'Click Done.' },
        ],
        note: 'This allows the API to read the data without requiring login.',
      },
      {
        number: '06',
        title: 'Create the sheets (tabs)',
        description: 'For each sheet below, click the + button at the bottom of the spreadsheet to add a new tab. The tab name must be exactly as shown. Then add the column headers in the first row.',
        showSheets: true,
      },
      {
        number: '07',
        title: 'Upload the data',
        items: [
          { text: 'In the project files you will find TSV files (files ending in .tsv) for each sheet.' },
          { text: 'Open each TSV file in a text editor (like Notepad or TextEdit).' },
          { text: 'Select all the text (Ctrl+A or Cmd+A) and copy it.' },
          { text: 'Go to the corresponding sheet tab in Google Sheets.' },
          { text: 'Click on cell A1 and paste (Ctrl+V or Cmd+V). The data will fill in automatically.' },
        ],
        showFiles: true,
      },
      {
        number: '08',
        title: 'Add environment variables in Netlify',
        description: 'Environment variables are settings that tell the website which Google project and spreadsheet to use. They are stored securely in Netlify, not in the code.',
        items: [
          { text: 'Log in to your Netlify account at', link: 'https://app.netlify.com', linkText: 'app.netlify.com' },
          { text: 'Click on your site.' },
          { text: 'In the top menu, click Site configuration.' },
          { text: 'In the left menu, click Environment variables.' },
          { text: 'Click Add a variable → Add a single variable.' },
          { text: 'Add the first variable:' },
          { text: 'Repeat and add the second variable:' },
          { text: 'Click Save after each one.' },
        ],
        varLabels: ['Paste your API key from Step 03 here', 'Paste your Spreadsheet ID from Step 04 here'],
        showVars: true,
      },
      {
        number: '09',
        title: 'Redeploy the site',
        items: [
          { text: 'In Netlify, go to your site and click the Deploys tab.' },
          { text: 'Click Trigger deploy → Deploy site.' },
          { text: 'Wait for the deploy to finish (usually 1–2 minutes).' },
          { text: 'Visit your website — it will now display content from Google Sheets.' },
        ],
        note: 'After the first deploy, future content changes in Google Sheets will appear on the website automatically without needing to redeploy.',
      },
    ],
    managingContent: {
      title: 'Managing content going forward',
      items: [
        'To update text, images, or links — edit the corresponding row in Google Sheets. Changes appear on the website within minutes.',
        'To add a new exhibition — add a new row to the Exhibitions sheet with type set to current, past, or upcoming.',
        'To add new works — add rows to the Works sheet with the correct category and subcategory slugs.',
        'To add a press article — add a row to the Press sheet with type set to current or past.',
        'Do not change the column headers or sheet tab names — the website reads them exactly as shown.',
      ],
    },
    done: 'Setup complete! If anything does not work, double-check that the tab names are spelled exactly as listed in Step 06, and that the spreadsheet is set to public (Step 05).',
  },

  es: {
    title: 'Guía de configuración del sitio',
    subtitle: 'Cómo conectar Google Sheets al sitio web — paso a paso',
    intro: 'Esta guía te acompañará en todo el proceso de configuración. No se requiere experiencia en programación. Sigue cada paso con atención y el sitio web mostrará automáticamente el contenido que gestiones en Google Sheets.',
    overview: {
      title: 'Qué vas a configurar',
      items: [
        'Un proyecto en Google Cloud con una clave API',
        'Una hoja de cálculo de Google con todos los datos del sitio',
        'Dos variables de entorno en Netlify',
      ],
    },
    tableHeaders: { tab: 'Nombre de pestaña', columns: 'Columnas (primera fila)', purpose: 'Contenido', file: 'Archivo TSV', paste: '→ Pegar en la hoja' },
    sheetNotes: [
      'Nombre del sitio, título de página, copyright del pie de página',
      'Imágenes y textos de todas las páginas',
      'Todas las obras',
      'Etiquetas y descripciones de categorías de obras',
      'Listas de subcategorías de obras',
      'Exposiciones actuales, pasadas y próximas',
      'Artículos de prensa',
      'Galerías, colecciones, publicaciones, making works',
      'Links de la página de contacto',
      'FAQ y textos de las subpáginas de contacto',
    ],
    steps: [
      {
        number: '01',
        title: 'Crear un proyecto en Google Cloud',
        items: [
          { text: 'Ve a', link: 'https://console.cloud.google.com', linkText: 'console.cloud.google.com' },
          { text: 'Inicia sesión con una cuenta de Google.' },
          { text: 'Haz clic en el selector de proyectos en la parte superior (puede decir "Seleccionar un proyecto") y luego en Nuevo proyecto.' },
          { text: 'Dale cualquier nombre, por ejemplo: hockney-site. Haz clic en Crear.' },
          { text: 'Espera unos segundos a que se cree el proyecto y asegúrate de que quede seleccionado.' },
        ],
      },
      {
        number: '02',
        title: 'Activar la API de Google Sheets',
        items: [
          { text: 'En el menú de la izquierda, haz clic en APIs y servicios → Biblioteca.' },
          { text: 'En la barra de búsqueda, escribe Google Sheets API y presiona Enter.' },
          { text: 'Haz clic en el resultado llamado Google Sheets API.' },
          { text: 'Haz clic en el botón azul Habilitar.' },
        ],
      },
      {
        number: '03',
        title: 'Crear una clave API',
        items: [
          { text: 'En el menú de la izquierda, haz clic en APIs y servicios → Credenciales.' },
          { text: 'Haz clic en + Crear credenciales en la parte superior y elige Clave de API.' },
          { text: 'Aparecerá una ventana con tu nueva clave API. Cópiala y guárdala en un lugar seguro — la necesitarás más adelante.' },
          { text: 'Haz clic en Editar clave de API (el ícono de lápiz) para restringirla:' },
        ],
        sub: [
          'En Restricciones de API, selecciona Restringir clave.',
          'En el menú desplegable, marca Google Sheets API.',
          'Haz clic en Guardar.',
        ],
        note: 'Restringir la clave es opcional pero recomendado por seguridad.',
      },
      {
        number: '04',
        title: 'Crear la hoja de cálculo de Google',
        items: [
          { text: 'Ve a', link: 'https://sheets.google.com', linkText: 'sheets.google.com' },
          { text: 'Haz clic en el botón + para crear una nueva hoja de cálculo en blanco.' },
          { text: 'Ponle el nombre que quieras, por ejemplo: David Hockney - Datos del sitio.' },
          { text: 'Mira la URL en tu navegador. Copia el ID largo que aparece entre /d/ y /edit. Ese es tu ID de hoja de cálculo.' },
        ],
        exampleLabel: '↑ este es tu ID de hoja de cálculo',
      },
      {
        number: '05',
        title: 'Hacer pública la hoja de cálculo',
        items: [
          { text: 'En la hoja de cálculo, haz clic en el botón Compartir (arriba a la derecha, botón azul).' },
          { text: 'Haz clic en Cambiar a cualquier persona con el enlace.' },
          { text: 'Asegúrate de que el rol sea Lector.' },
          { text: 'Haz clic en Listo.' },
        ],
        note: 'Esto permite que la API lea los datos sin necesidad de iniciar sesión.',
      },
      {
        number: '06',
        title: 'Crear las hojas (pestañas)',
        description: 'Para cada hoja de la lista, haz clic en el botón + en la parte inferior de la hoja de cálculo para añadir una nueva pestaña. El nombre de la pestaña debe ser exactamente como se indica. Luego agrega los encabezados de columnas en la primera fila.',
        showSheets: true,
      },
      {
        number: '07',
        title: 'Subir los datos',
        items: [
          { text: 'En los archivos del proyecto encontrarás archivos TSV (archivos que terminan en .tsv) para cada hoja.' },
          { text: 'Abre cada archivo TSV en un editor de texto (como Notepad o TextEdit).' },
          { text: 'Selecciona todo el texto (Ctrl+A o Cmd+A) y cópialo.' },
          { text: 'Ve a la pestaña correspondiente en Google Sheets.' },
          { text: 'Haz clic en la celda A1 y pega (Ctrl+V o Cmd+V). Los datos se completarán automáticamente.' },
        ],
        showFiles: true,
      },
      {
        number: '08',
        title: 'Agregar las variables de entorno en Netlify',
        description: 'Las variables de entorno son configuraciones que le indican al sitio web qué proyecto de Google y qué hoja de cálculo usar. Se guardan de forma segura en Netlify, no en el código.',
        items: [
          { text: 'Inicia sesión en tu cuenta de Netlify en', link: 'https://app.netlify.com', linkText: 'app.netlify.com' },
          { text: 'Haz clic en tu sitio.' },
          { text: 'En el menú superior, haz clic en Site configuration.' },
          { text: 'En el menú de la izquierda, haz clic en Environment variables.' },
          { text: 'Haz clic en Add a variable → Add a single variable.' },
          { text: 'Agrega la primera variable:' },
          { text: 'Repite y agrega la segunda variable:' },
          { text: 'Haz clic en Save después de cada una.' },
        ],
        varLabels: ['Pega aquí tu clave API del Paso 03', 'Pega aquí el ID de tu hoja de cálculo del Paso 04'],
        showVars: true,
      },
      {
        number: '09',
        title: 'Volver a publicar el sitio',
        items: [
          { text: 'En Netlify, ve a tu sitio y haz clic en la pestaña Deploys.' },
          { text: 'Haz clic en Trigger deploy → Deploy site.' },
          { text: 'Espera a que termine la publicación (normalmente 1–2 minutos).' },
          { text: 'Visita tu sitio web — ahora mostrará el contenido desde Google Sheets.' },
        ],
        note: 'Después del primer despliegue, los cambios de contenido en Google Sheets aparecerán en el sitio automáticamente sin necesidad de volver a publicar.',
      },
    ],
    managingContent: {
      title: 'Gestionar el contenido en el futuro',
      items: [
        'Para actualizar textos, imágenes o enlaces — edita la fila correspondiente en Google Sheets. Los cambios aparecen en el sitio en minutos.',
        'Para agregar una nueva exposición — añade una fila en la hoja Exhibitions con type igual a current, past o upcoming.',
        'Para agregar nuevas obras — añade filas en la hoja Works con los slugs de categoría y subcategoría correctos.',
        'Para agregar un artículo de prensa — añade una fila en la hoja Press con type igual a current o past.',
        'No cambies los encabezados de columnas ni los nombres de las pestañas — el sitio los lee exactamente como están indicados.',
      ],
    },
    done: '¡Configuración completada! Si algo no funciona, verifica que los nombres de las pestañas estén escritos exactamente como se indica en el Paso 06, y que la hoja de cálculo esté configurada como pública (Paso 05).',
  },

  fr: {
    title: 'Guide de configuration du site',
    subtitle: 'Comment connecter Google Sheets au site web — étape par étape',
    intro: "Ce guide vous accompagne tout au long du processus de configuration. Aucune expérience en programmation n'est requise. Suivez chaque étape attentivement et le site web affichera automatiquement le contenu que vous gérez dans Google Sheets.",
    overview: {
      title: 'Ce que vous allez configurer',
      items: [
        'Un projet Google Cloud avec une clé API',
        'Une feuille de calcul Google avec toutes les données du site',
        "Deux variables d'environnement dans Netlify",
      ],
    },
    tableHeaders: { tab: 'Nom de l\'onglet', columns: 'Colonnes (première ligne)', purpose: 'Contenu', file: 'Fichier TSV', paste: '→ Coller dans la feuille' },
    sheetNotes: [
      'Nom du site, titre de page, copyright du pied de page',
      'Images et textes de toutes les pages',
      'Toutes les œuvres',
      "Labels et descriptions des catégories d'œuvres",
      'Listes de sous-catégories',
      'Expositions actuelles, passées et à venir',
      'Articles de presse',
      'Galeries, collections, publications, making works',
      'Liens de la page contact',
      'FAQ et textes des sous-pages',
    ],
    steps: [
      {
        number: '01',
        title: 'Créer un projet Google Cloud',
        items: [
          { text: 'Rendez-vous sur', link: 'https://console.cloud.google.com', linkText: 'console.cloud.google.com' },
          { text: 'Connectez-vous avec un compte Google.' },
          { text: 'Cliquez sur le sélecteur de projet en haut (il peut indiquer « Sélectionner un projet ») puis sur Nouveau projet.' },
          { text: 'Donnez-lui un nom quelconque, par exemple : hockney-site. Cliquez sur Créer.' },
          { text: "Attendez quelques secondes que le projet soit créé, puis assurez-vous qu'il est bien sélectionné." },
        ],
      },
      {
        number: '02',
        title: "Activer l'API Google Sheets",
        items: [
          { text: 'Dans le menu de gauche, cliquez sur APIs et services → Bibliothèque.' },
          { text: 'Dans la barre de recherche, tapez Google Sheets API et appuyez sur Entrée.' },
          { text: 'Cliquez sur le résultat nommé Google Sheets API.' },
          { text: 'Cliquez sur le bouton bleu Activer.' },
        ],
      },
      {
        number: '03',
        title: 'Créer une clé API',
        items: [
          { text: 'Dans le menu de gauche, cliquez sur APIs et services → Identifiants.' },
          { text: 'Cliquez sur + Créer des identifiants en haut et choisissez Clé API.' },
          { text: 'Une fenêtre apparaîtra avec votre nouvelle clé API. Copiez-la et conservez-la en lieu sûr — vous en aurez besoin plus tard.' },
          { text: "Cliquez sur Modifier la clé API (l'icône crayon) pour la restreindre :" },
        ],
        sub: [
          'Sous Restrictions relatives aux API, sélectionnez Restreindre la clé.',
          'Dans la liste déroulante, cochez Google Sheets API.',
          'Cliquez sur Enregistrer.',
        ],
        note: 'Restreindre la clé est facultatif mais recommandé pour la sécurité.',
      },
      {
        number: '04',
        title: 'Créer la feuille de calcul Google',
        items: [
          { text: 'Rendez-vous sur', link: 'https://sheets.google.com', linkText: 'sheets.google.com' },
          { text: 'Cliquez sur le bouton + pour créer une nouvelle feuille de calcul vierge.' },
          { text: 'Donnez-lui le nom de votre choix, par exemple : David Hockney - Données du site.' },
          { text: "Regardez l'URL dans votre navigateur. Copiez le long identifiant situé entre /d/ et /edit. C'est votre Identifiant de feuille de calcul." },
        ],
        exampleLabel: "↑ c'est votre Identifiant de feuille de calcul",
      },
      {
        number: '05',
        title: 'Rendre la feuille de calcul publique',
        items: [
          { text: 'Dans la feuille de calcul, cliquez sur le bouton Partager (en haut à droite, bouton bleu).' },
          { text: 'Cliquez sur Modifier pour que tout le monde ayant le lien puisse y accéder.' },
          { text: 'Assurez-vous que le rôle est défini sur Lecteur.' },
          { text: 'Cliquez sur Terminé.' },
        ],
        note: "Cela permet à l'API de lire les données sans nécessiter de connexion.",
      },
      {
        number: '06',
        title: 'Créer les feuilles (onglets)',
        description: "Pour chaque feuille ci-dessous, cliquez sur le bouton + en bas de la feuille de calcul pour ajouter un nouvel onglet. Le nom de l'onglet doit être exactement tel qu'indiqué. Ajoutez ensuite les en-têtes de colonnes dans la première ligne.",
        showSheets: true,
      },
      {
        number: '07',
        title: 'Importer les données',
        items: [
          { text: 'Dans les fichiers du projet, vous trouverez des fichiers TSV (fichiers se terminant par .tsv) pour chaque feuille.' },
          { text: 'Ouvrez chaque fichier TSV dans un éditeur de texte (comme Notepad ou TextEdit).' },
          { text: 'Sélectionnez tout le texte (Ctrl+A ou Cmd+A) et copiez-le.' },
          { text: "Allez dans l'onglet correspondant dans Google Sheets." },
          { text: 'Cliquez sur la cellule A1 et collez (Ctrl+V ou Cmd+V). Les données se rempliront automatiquement.' },
        ],
        showFiles: true,
      },
      {
        number: '08',
        title: "Ajouter les variables d'environnement dans Netlify",
        description: "Les variables d'environnement sont des paramètres qui indiquent au site web quel projet Google et quelle feuille de calcul utiliser. Elles sont stockées de manière sécurisée dans Netlify, pas dans le code.",
        items: [
          { text: 'Connectez-vous à votre compte Netlify sur', link: 'https://app.netlify.com', linkText: 'app.netlify.com' },
          { text: 'Cliquez sur votre site.' },
          { text: 'Dans le menu du haut, cliquez sur Site configuration.' },
          { text: "Dans le menu de gauche, cliquez sur Environment variables." },
          { text: 'Cliquez sur Add a variable → Add a single variable.' },
          { text: 'Ajoutez la première variable :' },
          { text: 'Recommencez et ajoutez la deuxième variable :' },
          { text: 'Cliquez sur Save après chacune.' },
        ],
        varLabels: ["Collez votre clé API de l'Étape 03 ici", "Collez l'identifiant de votre feuille de calcul de l'Étape 04 ici"],
        showVars: true,
      },
      {
        number: '09',
        title: 'Redéployer le site',
        items: [
          { text: "Dans Netlify, allez sur votre site et cliquez sur l'onglet Deploys." },
          { text: 'Cliquez sur Trigger deploy → Deploy site.' },
          { text: 'Attendez que le déploiement se termine (généralement 1 à 2 minutes).' },
          { text: 'Visitez votre site web — il affichera désormais le contenu depuis Google Sheets.' },
        ],
        note: 'Après le premier déploiement, les modifications de contenu futures dans Google Sheets apparaîtront automatiquement sur le site sans avoir besoin de redéployer.',
      },
    ],
    managingContent: {
      title: 'Gérer le contenu par la suite',
      items: [
        'Pour mettre à jour des textes, images ou liens — modifiez la ligne correspondante dans Google Sheets. Les changements apparaissent sur le site en quelques minutes.',
        "Pour ajouter une nouvelle exposition — ajoutez une ligne dans la feuille Exhibitions avec type défini sur current, past ou upcoming.",
        "Pour ajouter de nouvelles œuvres — ajoutez des lignes dans la feuille Works avec les bons slugs de catégorie et sous-catégorie.",
        "Pour ajouter un article de presse — ajoutez une ligne dans la feuille Press avec type défini sur current ou past.",
        "Ne modifiez pas les en-têtes de colonnes ni les noms des onglets — le site les lit exactement tels qu'ils sont indiqués.",
      ],
    },
    done: "Configuration terminée ! Si quelque chose ne fonctionne pas, vérifiez que les noms des onglets sont orthographiés exactement comme indiqué à l'Étape 06, et que la feuille de calcul est définie comme publique (Étape 05).",
  },
}

const LANGS = ['en', 'es', 'fr']
const LANG_LABELS = { en: 'EN', es: 'ES', fr: 'FR' }

function SetupGuide() {
  const [lang, setLang] = useState('en')
  const t = CONTENT[lang]

  return (
    <div className="guide-container">

      {/* Header */}
      <div className="guide-header">
        <div className="guide-header-top">
          <h1 className="guide-title">{t.title}</h1>
          <div className="guide-lang-switcher">
            {LANGS.map(l => (
              <button
                key={l}
                className={`guide-lang-btn ${lang === l ? 'active' : ''}`}
                onClick={() => setLang(l)}
              >
                {LANG_LABELS[l]}
              </button>
            ))}
          </div>
        </div>
        <p className="guide-subtitle">{t.subtitle}</p>
        <p className="guide-intro">{t.intro}</p>
      </div>

      {/* Overview */}
      <div className="guide-overview">
        <h2 className="guide-overview-title">{t.overview.title}</h2>
        <ul className="guide-overview-list">
          {t.overview.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>

      {/* Steps */}
      <div className="guide-steps">
        {t.steps.map((step) => (
          <div key={step.number} className="guide-step">
            <div className="guide-step-header">
              <span className="guide-step-number">{step.number}</span>
              <h2 className="guide-step-title">{step.title}</h2>
            </div>

            <div className="guide-step-body">
              {step.description && <p className="guide-step-desc">{step.description}</p>}

              {step.items && (
                <ol className="guide-step-list">
                  {step.items.map((item, i) => (
                    <li key={i}>
                      {item.text}{' '}
                      {item.link && (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="guide-link">
                          {item.linkText}
                        </a>
                      )}
                    </li>
                  ))}
                </ol>
              )}

              {step.sub && (
                <ul className="guide-step-sub">
                  {step.sub.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              )}

              {step.exampleLabel && (
                <div className="guide-code-block">
                  <pre>{SPREADSHEET_EXAMPLE}</pre>
                  <p className="guide-example-label">{step.exampleLabel}</p>
                </div>
              )}

              {step.note && <p className="guide-note">💡 {step.note}</p>}

              {step.showSheets && (
                <div className="guide-sheets-table">
                  <table>
                    <thead>
                      <tr>
                        <th>{t.tableHeaders.tab}</th>
                        <th>{t.tableHeaders.columns}</th>
                        <th>{t.tableHeaders.purpose}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SHEETS.map((s, i) => (
                        <tr key={i}>
                          <td><code className="guide-tab-name">{s.name}</code></td>
                          <td><code className="guide-columns">{s.columns.replace(/\t/g, '  |  ')}</code></td>
                          <td className="guide-sheet-note">{t.sheetNotes[i]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {step.showFiles && (
                <div className="guide-files-table">
                  <table>
                    <thead>
                      <tr>
                        <th>{t.tableHeaders.file}</th>
                        <th>{t.tableHeaders.paste}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {FILES.map((f, i) => (
                        <tr key={i}>
                          <td><code>{f.file}</code></td>
                          <td><code className="guide-tab-name">{f.sheet}</code></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {step.showVars && (
                <div className="guide-vars">
                  {VARS.map((v, i) => (
                    <div key={i} className="guide-var-row">
                      <span className="guide-var-key">{v.key}</span>
                      <span className="guide-var-sep">=</span>
                      <span className="guide-var-value">{step.varLabels[i]}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Managing content */}
      <div className="guide-managing">
        <h2 className="guide-managing-title">{t.managingContent.title}</h2>
        <ul className="guide-managing-list">
          {t.managingContent.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>

      {/* Done */}
      <div className="guide-done">
        <p>{t.done}</p>
      </div>

    </div>
  )
}

export default SetupGuide
