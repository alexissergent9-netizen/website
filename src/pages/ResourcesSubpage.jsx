import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import googleSheetsService from '../services/googleSheetsService'
import Loading from '../components/Loading'
import './Resources.css'

/* ─── Datos estáticos extraídos de hockney.com ─── */

const GALLERIES = [
  {
    name: 'Annely Juda Fine Art',
    location: 'London, England',
    address: '23 Dering Street, London W1S 1AW',
    phone: '(44) 20-7629-7578',
    website: 'www.annelyjudafineart.co.uk',
    url: 'https://www.annelyjudafineart.co.uk',
  },
  {
    name: 'Gray',
    location: 'Chicago, Illinois',
    address: '875 N. Michigan Avenue, Chicago, Illinois 60611',
    phone: '312-642-8877',
    website: 'www.richardgraygallery.com',
    url: 'https://www.richardgraygallery.com',
  },
  {
    name: 'Galerie LeLong Paris',
    location: 'Paris, France',
    address: '13, rue de Téhéran, 75008 Paris, France',
    phone: '+33 1 45631319',
    website: 'galerie-lelong.com',
    url: 'https://galerie-lelong.com',
  },
  {
    name: 'L.A. Louver',
    location: 'Venice, California',
    address: '45 North Venice Boulevard, Venice, CA 90291',
    phone: '310-822-4955',
    website: 'www.lalouver.com',
    url: 'https://www.lalouver.com',
  },
  {
    name: 'Pace Gallery',
    location: 'New York',
    address: '325 East 57th Street, New York, NY 10022',
    phone: '212-421-3292',
    website: 'www.pacegallery.com',
    url: 'https://www.pacegallery.com',
  },
]

const MAKING_WORKS = [
  { name: 'Winter Tunnel with Snow', imageUrl: 'https://www.hockney.com/img/publications/slideshows/_thumbs/wintertunnel06.jpg', type: 'slideshow' },
  { name: 'The Road to Thwing', imageUrl: 'https://www.hockney.com/img/publications/slideshows/_thumbs/roadtothwing06.jpg', type: 'slideshow' },
  { name: 'Woldgate Woods lll', imageUrl: 'https://www.hockney.com/img/publications/slideshows/_thumbs/woldgatemay06.jpg', type: 'slideshow' },
  { name: 'Woldgate before Kilham', imageUrl: 'https://www.hockney.com/img/publications/slideshows/_thumbs/beforekilham07.jpg', type: 'slideshow' },
  { name: 'Three Trees near Thixendale', imageUrl: 'https://www.hockney.com/img/publications/slideshows/_thumbs/threetrees07.jpg', type: 'slideshow' },
  { name: 'Bigger Trees Nearer Warter', imageUrl: 'https://www.hockney.com/img/publications/slideshows/_thumbs/biggertrees08.jpg', type: 'slideshow' },
  { name: 'Felled Trees on Woldgate', imageUrl: 'https://www.hockney.com/img/publications/slideshows/_thumbs/felledtrees08.jpg', type: 'slideshow' },
  { name: 'Making of Bigger Trees Near Warter', imageUrl: 'https://www.hockney.com/img/gallery/digital/movies/_thumbs/biggertrees_thumb_v1.jpg', type: 'video' },
]

const PUBLICATIONS_THUMBS = [
  'DSF0029.jpg','dh-early.jpg','DSF0131.jpg','DSF0122.jpg','DSF0112.jpg','DSF0102.jpg',
  'DSF0006.jpg','DSF0105.jpg','dh-cmrawrks08.jpg','dh-china.jpg','DSF0040.jpg','DSF0118.jpg',
  'DSF0127.jpg','DSF0083.jpg','dh-sketch.jpg','DSF0053.jpg','DSF0109.jpg','DSF0111.jpg',
  'DSF0116.jpg','DSF0055.jpg','DSF0084.jpg','DSF0016.jpg','dh-retro.jpg','DSF0025.jpg',
  'DSF0028.jpg','DSF0042.jpg','DSF0043.jpg','DSF0087.jpg','DSF0088.jpg','DSF0125.jpg',
  'DSF0012.jpg','DSF0013.jpg','DSF0091.jpg','DSF0036.jpg','DSF0048.jpg','DSF0094.jpg',
  'DSF0097.jpg','dh-seeit.jpg','DSF0093.jpg','DSF0101.jpg','dh-davidhockney.jpg','DSF0060.jpg',
  'DSF0045.jpg','DSF0023.jpg','dh-drawing.jpg','DSF0058.jpg','DSF0062.jpg','DSF0072.jpg',
  'DSF0074.jpg','DSF0069.jpg','DSF0068.jpg','DSF0066.jpg','dh-dogdays.jpg','DSF0120.jpg',
  'DSF0007.jpg','DSF0128.jpg','DSF0075.jpg','DSF0050.jpg','DSF0064.jpg','DSF0022.jpg',
  'dh-scrtknow.jpg','DSF0033.jpg','dh-people.jpg','DSF0079.jpg','dh-hockpics.jpg','DSF0080.jpg',
  'DSF0003.jpg','DSF0002.jpg','DSF00162.jpg','louver0002.jpg','DSF0006_1.jpg','dhwesch_004.jpg',
  'DSF0007_1.jpg','_DSF0010.jpg','DSF0011.jpg','DSF0014.jpg','dh-ra.jpg','dh-dyoung.jpg',
  'dh-pace-arr2016.jpg','dh-pace-pntg2016.jpg','dh-erly-kas2016.jpg','dh-pntgphot2015.jpg',
  'dh-lelong2015.jpg','dh-Pace2016.jpg','dh-arles2015.jpg','dh-82por2016.jpg','dh-mghist16.jpg',
  'dh-ngv16.jpg','tate-2017.jpg','lelong2017.jpg','pomp2017.jpg','IMG_1856.jpg','IMG_1861.jpg',
  'IMG_1854.jpg','cour-pace_3362.jpg','nPg_3448.jpg','juda_3446.jpg',
].map(f => `https://www.hockney.com/img/publications/books/_thumbs/${f}`)

const COLLECTIONS = [
  { name: 'American Friends of the Israel Museum', location: 'Beverly Hills' },
  { name: 'The Art Institute of Chicago', location: 'Chicago' },
  { name: 'Art Gallery of Ontario', location: 'Toronto' },
  { name: 'Art Gallery of New South Wales', location: 'Sydney, Australia' },
  { name: 'Astrup Fearnley Museum of Modern Art', location: 'Oslo, Norway' },
  { name: 'Baltimore Museum of Art', location: 'Baltimore' },
  { name: 'Bennesse Art Site', location: 'Naoshima, Kagawa, Japan' },
  { name: 'British Council', location: 'London, England' },
  { name: 'The British Museum', location: 'London, England' },
  { name: 'The Brooklyn Museum', location: 'Brooklyn, New York' },
  { name: 'Carnegie Museum of Art', location: 'Pittsburgh, Pennsylvania' },
  { name: 'Cartwright Hall Art Gallery, Bradford Museums & Galleries', location: 'Bradford, England' },
  { name: 'Centre Georges Pompidou', location: 'Paris, France' },
  { name: 'Contemporary Art Society', location: 'Bloomsbury House, London' },
  { name: 'Contemporary Museum', location: 'Honolulu, Hawaii' },
  { name: 'Ferens Art Gallery, Hull Museums & Art Gallery', location: 'Kingston Upon Hull, England' },
  { name: 'National Galleries of Scotland', location: 'Edinburgh, Scotland' },
  { name: 'Hamburger Kunsthalle', location: 'Hamburg, Germany' },
  { name: 'Hayward Gallery: Arts Council Collection', location: 'London, England' },
  { name: 'Hirshhorn Museum and Sculpture Garden, Smithsonian Institution', location: 'Washington, D.C.' },
  { name: 'J. Paul Getty Museum', location: 'Los Angeles, California' },
  { name: 'Kansas City Art Institute', location: 'Kansas City, Missouri' },
  { name: 'Kunstmuseum, Stiftung Museum Kunstpalast', location: 'Düsseldorf, Germany' },
  { name: 'Kunstmuseum', location: 'Basel, Switzerland' },
  { name: 'Los Angeles County Museum of Art', location: 'Los Angeles, California' },
  { name: 'Louisiana Museum of Art', location: 'Humlebaek, Denmark' },
  { name: 'Ludwig Museum', location: 'Budapest, Hungary' },
  { name: 'Ludwig Museum', location: 'Cologne, Germany' },
  { name: 'Metropolitan Museum of Art', location: 'New York' },
  { name: 'Museum of Modern Art (MoMA)', location: 'New York' },
  { name: 'National Gallery of Australia', location: 'Canberra, Australia' },
  { name: 'National Museum of Wales', location: 'Cardiff, Wales' },
  { name: 'National Portrait Gallery', location: 'London, England' },
  { name: 'Norton Simon Museum', location: 'Pasadena, California' },
  { name: 'Philadelphia Museum of Art', location: 'Philadelphia, Pennsylvania' },
  { name: 'Royal Academy of Arts', location: 'London, England' },
  { name: 'Sainsbury Centre for Visual Arts', location: 'Norwich, England' },
  { name: 'San Francisco Museum of Modern Art', location: 'San Francisco, California' },
  { name: 'Seattle Art Museum', location: 'Seattle, Washington' },
  { name: 'Stedelijk Museum', location: 'Amsterdam, Netherlands' },
  { name: 'Tate Gallery', location: 'London, England' },
  { name: 'UCLA Hammer Museum', location: 'Los Angeles, California' },
  { name: 'Victoria and Albert Museum', location: 'London, England' },
  { name: 'Walker Art Center', location: 'Minneapolis, Minnesota' },
  { name: 'Whitney Museum of American Art', location: 'New York' },
  { name: 'Yale Center for British Art', location: 'New Haven, Connecticut' },
]

/* ─── Config de subpáginas ─── */

const SUBPAGES = [
  { slug: 'galleries', label: 'galleries' },
  { slug: 'making_works', label: "making 'works'" },
  { slug: 'publications', label: 'publications' },
  { slug: 'public_collections', label: 'works in public collections' },
]

const PAGE_LABELS = {
  galleries: 'GALLERIES',
  making_works: "MAKING 'WORKS'",
  publications: 'PUBLICATIONS',
  public_collections: 'WORKS IN PUBLIC COLLECTIONS',
}

const FEATURED_IMAGES = {
  galleries: {
    src: 'https://www.hockney.com/img/gallery/drawings/00s/00K01.jpg',
    caption: 'Woldgate with Red Trees, 2004 - watercolor and gouache, 29½ x 41½ in.',
  },
  making_works: {
    src: 'https://www.hockney.com/img/publications/slideshows/_thumbs/biggertrees08.jpg',
    caption: 'Bigger Trees Nearer Warter, 2008',
  },
  publications: {
    src: 'https://www.hockney.com/img/publications/books/_thumbs/DSF0029.jpg',
    caption: 'David Hockney publications',
  },
  public_collections: {
    src: 'https://www.hockney.com/img/gallery/paintings/70s/75C04.jpg',
    caption: "Kerby (After Hogarth) Useful Knowledge, 1975 - oil on canvas, 72 x 60 in.",
  },
}

/* ─── Componente principal ─── */

function ResourcesSubpage() {
  const { section } = useParams()
  const [featuredMaking, setFeaturedMaking] = useState(0)
  const [loading, setLoading] = useState(true)
  const [pageConfig, setPageConfig] = useState({})

  // Datos desde Sheets (se usan si vienen; si no, se usa el fallback estático)
  const [sheetsGalleries, setSheetsGalleries] = useState(null)
  const [sheetsCollections, setSheetsCollections] = useState(null)
  const [sheetsMaking, setSheetsMaking] = useState(null)
  const [sheetsPublications, setSheetsPublications] = useState(null)

  useEffect(() => {
    setFeaturedMaking(0)
    loadData()
    googleSheetsService.getPageConfig(`resources/${section}`)
      .then(data => { if (Object.keys(data).length > 0) setPageConfig(data) })
      .catch(() => {})
  }, [section])

  const loadData = async () => {
    setLoading(true)
    try {
      if (section === 'galleries') {
        const data = await googleSheetsService.getGalleries()
        if (data.length > 0) setSheetsGalleries(data)
      } else if (section === 'public_collections') {
        const data = await googleSheetsService.getPublicCollections()
        if (data.length > 0) setSheetsCollections(data)
      } else if (section === 'making_works') {
        const data = await googleSheetsService.getMakingWorks()
        if (data.length > 0) setSheetsMaking(data)
      } else if (section === 'publications') {
        const data = await googleSheetsService.getPublications()
        if (data.length > 0) setSheetsPublications(data)
      }
    } catch (e) {
      console.error('Error loading resources from Sheets:', e)
    } finally {
      setLoading(false)
    }
  }

  // Resolver datos: Sheets si existen, si no fallback estático
  const galleries = sheetsGalleries || GALLERIES
  const collections = sheetsCollections || COLLECTIONS
  const makingWorks = sheetsMaking
    ? sheetsMaking.map(r => ({ name: r.name, imageUrl: r.imageUrl, type: r.description }))
    : MAKING_WORKS
  const publications = sheetsPublications
    ? sheetsPublications.map(r => r.imageUrl).filter(Boolean)
    : PUBLICATIONS_THUMBS

  const label = PAGE_LABELS[section] || section?.toUpperCase()
  const staticFeatured = FEATURED_IMAGES[section] || FEATURED_IMAGES.galleries
  const featured = (section === 'making_works' && makingWorks.length > 0)
    ? { src: makingWorks[featuredMaking]?.imageUrl || '', caption: makingWorks[featuredMaking]?.name || '' }
    : {
        src: pageConfig.featuredImageUrl || staticFeatured.src,
        caption: pageConfig.featuredCaption || staticFeatured.caption,
      }

  if (loading) return <Loading />

  return (
    <div className="ressub-container">

      {/* Breadcrumb */}
      <div className="ressub-breadcrumb-row">
        <Link to="/resources" className="ressub-breadcrumb-works">RESOURCES</Link>
        <span className="ressub-breadcrumb-sep"> / </span>
        <span className="ressub-breadcrumb-active">{label}</span>
      </div>

      {/* Subnav */}
      <div className="ressub-subnav-row">
        {SUBPAGES.map((s, i) => (
          <span key={s.slug}>
            {i > 0 && <span className="ressub-subnav-sep"> / </span>}
            <Link
              to={`/resources/${s.slug}`}
              className={`ressub-subnav-link ${section === s.slug ? 'active' : ''}`}
            >
              {s.label}
            </Link>
          </span>
        ))}
      </div>

      <hr className="ressub-divider" />

      <div className="ressub-layout">

        {/* Columna izquierda: imagen destacada */}
        <aside className="ressub-image-column">
          <img
            src={featured.src}
            alt={label}
            className="ressub-featured-img"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <figure className="ressub-caption">
            <em>{featured.caption}</em>
          </figure>
        </aside>

        {/* Columna derecha: contenido según sección */}
        <main className="ressub-main-content">

          {section === 'galleries' && (
            <div className="galleries-list">
              {galleries.map((g) => (
                <div key={g.name} className="gallery-item">
                  <p className="gallery-name">{g.name}</p>
                  {g.location && <p className="gallery-location">{g.location}</p>}
                  {g.address && <p className="gallery-address">{g.address}</p>}
                  {g.phone && <p className="gallery-phone">{g.phone}</p>}
                  {(g.website || g.url) && (
                    <a
                      href={g.url || `https://${g.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gallery-website"
                    >
                      {g.website || g.url}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {section === 'making_works' && (
            <div className="making-grid">
              {makingWorks.map((item, i) => (
                <button
                  key={i}
                  className={`making-thumb ${i === featuredMaking ? 'active' : ''}`}
                  onClick={() => setFeaturedMaking(i)}
                  title={item.name}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                  <span className="making-thumb-label">{item.name}</span>
                </button>
              ))}
            </div>
          )}

          {section === 'publications' && (
            <div className="publications-full-grid">
              {publications.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Publication ${i + 1}`}
                  className="pub-cover"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
              ))}
            </div>
          )}

          {section === 'public_collections' && (
            <ul className="collections-list">
              {collections.map((c, i) => (
                <li key={i}>
                  {c.name}
                  {c.location && <span className="collection-location">{c.location}</span>}
                </li>
              ))}
            </ul>
          )}

        </main>

      </div>
    </div>
  )
}

export default ResourcesSubpage
