# Guía de Uso del Servicio Google Sheets

Este documento explica cómo usar el servicio actualizado de Google Sheets para el sitio de David Hockney.

## Importar el Servicio

```javascript
import googleSheetsService from '../services/googleSheetsService';
```

## Métodos Disponibles

### Press (Artículos de Prensa)

#### Obtener todos los artículos
```javascript
const articles = await googleSheetsService.getPress();
```

#### Obtener artículos actuales (current)
```javascript
const currentArticles = await googleSheetsService.getCurrentPress();
```

#### Obtener artículos pasados (past)
```javascript
const pastArticles = await googleSheetsService.getPastPress();
```

#### Obtener artículos por año
```javascript
const articles2026 = await googleSheetsService.getPressByYear(2026);
const articles2025 = await googleSheetsService.getPressByYear('2025');
```

#### Obtener artículos por tipo (genérico)
```javascript
const articles = await googleSheetsService.getPressByType('current');
// o 'past'
```

**Estructura de datos de artículos:**
```javascript
{
  title: "David Hockney's Serpentine Show",
  linkText: "David Hockney's Serpentine show offers...",
  url: "https://...",
  source: "The Independent",
  author: "Mark Hudson",
  date: "2026-03-11",
  year: "2026",
  type: "current"
}
```

---

### Exhibitions (Exposiciones)

#### Obtener todas las exposiciones
```javascript
const exhibitions = await googleSheetsService.getExhibitions();
```

#### Obtener exposiciones actuales
```javascript
const currentExhibitions = await googleSheetsService.getCurrentExhibitions();
```

#### Obtener exposiciones pasadas
```javascript
const pastExhibitions = await googleSheetsService.getPastExhibitions();
```

#### Obtener próximas exposiciones
```javascript
const upcomingExhibitions = await googleSheetsService.getUpcomingExhibitions();
```

#### Obtener exposiciones por tipo (genérico)
```javascript
const exhibitions = await googleSheetsService.getExhibitionsByType('current');
// 'current', 'past', o 'upcoming'
```

**Estructura de datos de exposiciones:**
```javascript
{
  title: "David Hockney: Bigger & Closer",
  location: "Lightroom, London",
  description: "An immersive exhibition experience",
  startDate: "2024-11-01",
  endDate: "2025-04-30",
  url: "https://...",
  imageUrl: "https://...",
  type: "current"
}
```

---

### Works (Obras)

#### Obtener todas las obras
```javascript
const works = await googleSheetsService.getWorks();
```

#### Obtener obras por categoría
```javascript
const digitalWorks = await googleSheetsService.getWorksByCategory('digital');
const paintings = await googleSheetsService.getWorksByCategory('paintings');
```

#### Obtener obras por categoría y subcategoría
```javascript
const iphoneWorks = await googleSheetsService.getWorksByCategoryAndSubcategory('digital', 'iphone');
const lithographs = await googleSheetsService.getWorksByCategoryAndSubcategory('graphics', 'lithographs');
```

#### Métodos específicos por categoría

**Digital Works:**
```javascript
// Todas las obras digitales
const allDigital = await googleSheetsService.getDigitalWorks();

// Por subcategoría específica
const computerDrawings = await googleSheetsService.getDigitalWorks('computer-drawings');
const iphoneWorks = await googleSheetsService.getDigitalWorks('iphone');
const ipadWorks = await googleSheetsService.getDigitalWorks('ipad');
const arrivalOfSpring = await googleSheetsService.getDigitalWorks('arrival-of-spring-woldgate');
const yosemite = await googleSheetsService.getDigitalWorks('yosemite-suite');
const movies = await googleSheetsService.getDigitalWorks('movies');
```

**Drawings:**
```javascript
const drawings = await googleSheetsService.getDrawings();
```

**Graphics:**
```javascript
// Todos los gráficos
const allGraphics = await googleSheetsService.getGraphics();

// Por subcategoría
const lithographs = await googleSheetsService.getGraphics('lithographs');
const etchings = await googleSheetsService.getGraphics('etchings');
const rakesProgress = await googleSheetsService.getGraphics('rakes-progress-etchings');
const blueGuitar = await googleSheetsService.getGraphics('blue-guitar-etchings');
const prints = await googleSheetsService.getGraphics('prints');
```

**Paintings:**
```javascript
const paintings = await googleSheetsService.getPaintings();
```

**Photos:**
```javascript
// Todas las fotografías
const allPhotos = await googleSheetsService.getPhotos();

// Por subcategoría
const collages = await googleSheetsService.getPhotos('photographic-collages');
const polaroids = await googleSheetsService.getPhotos('composite-polaroids');
const photoDrawings = await googleSheetsService.getPhotos('photo_drawings');
```

**Sketchbooks:**
```javascript
const sketchbooks = await googleSheetsService.getSketchbooks();
```

**Stage Design:**
```javascript
// Todos los diseños de escenario
const allStageDesign = await googleSheetsService.getStageDesign();

// Por obra específica
const rakesProgress = await googleSheetsService.getStageDesign('the-rakes-progress');
const magicFlute = await googleSheetsService.getStageDesign('magic-flute');
const frenchTriple = await googleSheetsService.getStageDesign('french-triple-bill');
const stravinsky = await googleSheetsService.getStageDesign('stravinsky-triple-bill');
const tristan = await googleSheetsService.getStageDesign('tristan-und-isolde');
const turandot = await googleSheetsService.getStageDesign('turandot');
const frauOhne = await googleSheetsService.getStageDesign('die-frau-ohne-schatten');
```

**Etcetera:**
```javascript
// Todas las obras misceláneas
const allEtcetera = await googleSheetsService.getEtcetera();

// Por subcategoría
const pools = await googleSheetsService.getEtcetera('pools');
const bmw = await googleSheetsService.getEtcetera('bmw');
```

**Estructura de datos de obras:**
```javascript
{
  title: "The Entrance",
  category: "paintings",
  subcategory: "",
  year: "2019",
  medium: "acrylic on 2 canvases",
  dimensions: "36 x 96 in. overall",
  description: "The Entrance, 2019",
  imageUrl: "https://...",
  available: "yes"
}
```

---

### Resources (Recursos)

#### Obtener todos los recursos
```javascript
const resources = await googleSheetsService.getResources();
```

#### Obtener recursos por categoría
```javascript
const galleries = await googleSheetsService.getResourcesByCategory('galleries');
const publications = await googleSheetsService.getResourcesByCategory('publications');
```

#### Métodos específicos

```javascript
const galleries = await googleSheetsService.getGalleries();
const publications = await googleSheetsService.getPublications();
const publicCollections = await googleSheetsService.getPublicCollections();
```

**Estructura de datos de recursos:**
```javascript
{
  title: "The David Hockney Foundation",
  category: "foundation",
  description: "Official foundation supporting Hockney's legacy",
  url: "http://www.thedavidhockneyfoundation.org/",
  isExternal: "true"
}
```

---

## Ejemplo de Uso en un Componente React

### Press.jsx

```javascript
import { useState, useEffect } from 'react';
import googleSheetsService from '../services/googleSheetsService';
import Loading from '../components/Loading';

function Press() {
  const [currentArticles, setCurrentArticles] = useState([]);
  const [pastArticles, setPastArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPast, setShowPast] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const current = await googleSheetsService.getCurrentPress();
        const past = await googleSheetsService.getPastPress();
        
        setCurrentArticles(current);
        setPastArticles(past);
      } catch (error) {
        console.error('Error loading articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const articlesToShow = showPast ? pastArticles : currentArticles;

  return (
    <div className="press-page">
      <h1>Press</h1>
      
      <div className="press-tabs">
        <button 
          onClick={() => setShowPast(false)}
          className={!showPast ? 'active' : ''}
        >
          Current Articles
        </button>
        <button 
          onClick={() => setShowPast(true)}
          className={showPast ? 'active' : ''}
        >
          Past Articles
        </button>
      </div>

      <div className="articles-list">
        {articlesToShow.map((article, index) => (
          <article key={index} className="article-item">
            <h2>{article.title}</h2>
            {article.url && (
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.linkText || 'Read more'}
              </a>
            )}
            <p className="article-meta">
              {article.source && <span>{article.source}</span>}
              {article.author && <span> / {article.author}</span>}
              {article.date && <span> / {article.date}</span>}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Press;
```

### Works.jsx

```javascript
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import googleSheetsService from '../services/googleSheetsService';
import Loading from '../components/Loading';

function Works() {
  const { category, subcategory } = useParams();
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      setLoading(true);
      try {
        let data;
        
        if (category && subcategory) {
          data = await googleSheetsService.getWorksByCategoryAndSubcategory(
            category, 
            subcategory
          );
        } else if (category) {
          data = await googleSheetsService.getWorksByCategory(category);
        } else {
          data = await googleSheetsService.getWorks();
        }
        
        setWorks(data);
      } catch (error) {
        console.error('Error loading works:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, [category, subcategory]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="works-page">
      <h1>Works</h1>
      {category && <h2>{category}</h2>}
      {subcategory && <h3>{subcategory}</h3>}
      
      <div className="works-grid">
        {works.map((work, index) => (
          <div key={index} className="work-item">
            {work.imageUrl && (
              <img src={work.imageUrl} alt={work.title} />
            )}
            <h3>{work.title}</h3>
            {work.year && <p className="work-year">{work.year}</p>}
            {work.medium && <p className="work-medium">{work.medium}</p>}
            {work.dimensions && <p className="work-dimensions">{work.dimensions}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Works;
```

### Exhibitions.jsx

```javascript
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import googleSheetsService from '../services/googleSheetsService';
import Loading from '../components/Loading';

function Exhibitions() {
  const { type } = useParams(); // 'current', 'past', o 'upcoming'
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExhibitions = async () => {
      setLoading(true);
      try {
        let data;
        
        switch(type) {
          case 'current':
            data = await googleSheetsService.getCurrentExhibitions();
            break;
          case 'past':
            data = await googleSheetsService.getPastExhibitions();
            break;
          case 'upcoming':
            data = await googleSheetsService.getUpcomingExhibitions();
            break;
          default:
            data = await googleSheetsService.getExhibitions();
        }
        
        setExhibitions(data);
      } catch (error) {
        console.error('Error loading exhibitions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExhibitions();
  }, [type]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="exhibitions-page">
      <h1>{type} Exhibitions</h1>
      
      <div className="exhibitions-list">
        {exhibitions.map((exhibition, index) => (
          <div key={index} className="exhibition-item">
            {exhibition.imageUrl && (
              <img src={exhibition.imageUrl} alt={exhibition.title} />
            )}
            <h2>{exhibition.title}</h2>
            <p className="location">{exhibition.location}</p>
            <p className="dates">
              {exhibition.startDate} - {exhibition.endDate}
            </p>
            {exhibition.description && (
              <p className="description">{exhibition.description}</p>
            )}
            {exhibition.url && (
              <a href={exhibition.url} target="_blank" rel="noopener noreferrer">
                More info
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Exhibitions;
```

---

## Notas Importantes

1. **Manejo de Errores**: Todos los métodos incluyen manejo de errores y retornan arrays vacíos en caso de error.

2. **Datos Opcionales**: Los campos pueden estar vacíos. Siempre verificar antes de renderizar.

3. **Performance**: Los datos se cargan cada vez que se llama al método. Considera implementar caching si es necesario.

4. **Tipos de Datos**: Todas las fechas deben estar en formato ISO (YYYY-MM-DD) en Google Sheets.

5. **Case Insensitive**: Los filtros por categoría y tipo no distinguen entre mayúsculas y minúsculas.
