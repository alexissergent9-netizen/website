import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import googleSheetsService from '../services/googleSheetsService'
import { useSiteData } from '../context/SiteDataContext'
import Loading from '../components/Loading'
import './Resources.css'

function ResourcesSubpage() {
  const { section } = useParams()
  const { navSubitems } = useSiteData()

  const subnavItems = navSubitems
    .filter(i => i.section === 'resources' && (i.parent || '') === '')
    .filter(i => {
      const val = String(i.enabled ?? 'true').toLowerCase().trim()
      return val !== 'false' && val !== '0' && val !== 'no'
    })
  const [featuredMaking, setFeaturedMaking] = useState(0)
  const [loading, setLoading] = useState(true)
  const [pageConfig, setPageConfig] = useState({})

  const [sheetsGalleries, setSheetsGalleries] = useState([])
  const [sheetsCollections, setSheetsCollections] = useState([])
  const [sheetsMaking, setSheetsMaking] = useState([])
  const [sheetsPublications, setSheetsPublications] = useState([])

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
        setSheetsGalleries(data)
      } else if (section === 'public_collections') {
        const data = await googleSheetsService.getPublicCollections()
        setSheetsCollections(data)
      } else if (section === 'making_works') {
        const data = await googleSheetsService.getMakingWorks()
        setSheetsMaking(data)
      } else if (section === 'publications') {
        const data = await googleSheetsService.getPublications()
        setSheetsPublications(data)
      }
    } catch (e) {
      console.error('Error loading resources from Sheets:', e)
    } finally {
      setLoading(false)
    }
  }

  const galleries = sheetsGalleries
  const collections = sheetsCollections
  const makingWorks = sheetsMaking.map(r => ({ name: r.name, imageUrl: r.imageUrl, type: r.description }))
  const publications = sheetsPublications.map(r => r.imageUrl).filter(Boolean)

  const currentItem = subnavItems.find(i => i.key.replace(/\s+/g, '_').toLowerCase() === section)
  const label = currentItem ? currentItem.label.toUpperCase() : section?.toUpperCase()
  const featured = (section === 'making_works' && makingWorks.length > 0)
    ? { src: makingWorks[featuredMaking]?.imageUrl || '', caption: makingWorks[featuredMaking]?.name || '' }
    : {
        src: pageConfig.featuredImageUrl || '',
        caption: pageConfig.featuredCaption || '',
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
        {subnavItems.map((item, i) => {
          const slug = item.key.replace(/\s+/g, '_').toLowerCase()
          return (
            <span key={item.key}>
              {i > 0 && <span className="ressub-subnav-sep"> / </span>}
              <Link
                to={`/resources/${slug}`}
                className={`ressub-subnav-link ${section === slug ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            </span>
          )
        })}
      </div>

      <hr className="ressub-divider" />

      <div className="ressub-layout">

        {/* Columna izquierda: imagen destacada */}
        <aside className="ressub-image-column">
          {featured.src && (
            <img
              src={featured.src}
              alt={label}
              className="ressub-featured-img"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          )}
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
