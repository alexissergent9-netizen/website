import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import googleSheetsService from '../services/googleSheetsService'
import Loading from '../components/Loading'
import './WorksCategory.css'

const CATEGORY_LABELS = {
  digital: 'Digital Works',
  drawings: 'Drawings',
  graphics: 'Graphics',
  paintings: 'Paintings',
  photos: 'Photographs',
  sketchbooks: 'Sketchbooks',
  stage_design: 'Stage Design',
  etcetera: 'Etcetera',
}

const CATEGORY_DESCRIPTIONS = {
  digital: 'The computer is a useful tool. Photoshop is a computer tool for picture making. It in effect allows you to draw directly in a printing machine, one of its many uses. These prints are made by drawing and collage, they exist either in the computer or on a piece of paper.\n\nDavid Hockney, November 2008',
  drawings: '',
  graphics: '',
  paintings: '',
  photos: '',
  sketchbooks: '',
  stage_design: '',
  etcetera: '',
}

const SUBCATEGORIES = {
  digital: [
    { name: 'computer drawings', slug: 'computer-drawings' },
    { name: 'iPhone', slug: 'iphone' },
    { name: 'iPad Selects', slug: 'ipad' },
    { name: 'arrival of spring woldgate', slug: 'arrival-of-spring-woldgate' },
    { name: 'yosemite suite', slug: 'yosemite-suite' },
    { name: 'digital movies', slug: 'movies' },
  ],
  drawings: [
    { name: '1950s', slug: '1950s' },
    { name: '1960s', slug: '1960s' },
    { name: '1970s', slug: '1970s' },
    { name: '1980s', slug: '1980s' },
    { name: '1990s', slug: '1990s' },
    { name: '2000s', slug: '2000s' },
    { name: '2010s', slug: '2010s' },
    { name: 'arrival of spring 2013', slug: 'arrival-of-spring-2013' },
  ],
  paintings: [
    { name: '1950s', slug: '50s' },
    { name: '1960s', slug: '60s' },
    { name: '1970s', slug: '70s' },
    { name: '1980s', slug: '80s' },
    { name: '1990s', slug: '90s' },
    { name: '2000s', slug: '00s' },
    { name: '2010s', slug: '10s' },
    { name: '82 Portraits', slug: '82-portraits' },
  ],
  graphics: [
    { name: 'lithographs', slug: 'lithographs' },
    { name: 'etchings', slug: 'etchings' },
    { name: "a rake's progress etchings", slug: 'rakes-progress-etchings' },
    { name: 'blue guitar etchings', slug: 'blue-guitar-etchings' },
    { name: 'homemade prints', slug: 'prints' },
  ],
  photos: [
    { name: 'photographic collages', slug: 'photographic-collages' },
    { name: 'composite polaroids', slug: 'composite-polaroids' },
    { name: 'photographic drawings', slug: 'photo_drawings' },
  ],
  stage_design: [
    { name: "the rake's progress", slug: 'the-rakes-progress' },
    { name: 'magic flute', slug: 'magic-flute' },
    { name: 'french triple bill', slug: 'french-triple-bill' },
    { name: 'stravinsky triple bill', slug: 'stravinsky-triple-bill' },
    { name: 'tristan und isolde', slug: 'tristan-und-isolde' },
    { name: 'turandot', slug: 'turandot' },
    { name: 'die frau ohne schatten', slug: 'die-frau-ohne-schatten' },
  ],
  etcetera: [
    { name: 'paper pulp', slug: 'pools' },
    { name: 'BMW art car', slug: 'bmw' },
  ],
}

function WorksCategory() {
  const { category, subcategory } = useParams()
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(true)
  const [featuredIndex, setFeaturedIndex] = useState(0)

  useEffect(() => {
    setFeaturedIndex(0)
    loadWorks()
  }, [category, subcategory])

  const loadWorks = async () => {
    setLoading(true)
    try {
      let data
      if (subcategory) {
        data = await googleSheetsService.getWorksByCategoryAndSubcategory(category, subcategory)
      } else {
        data = await googleSheetsService.getWorksByCategory(category)
      }
      setWorks(data)
    } catch (error) {
      console.error('Error loading works:', error)
      setWorks([])
    } finally {
      setLoading(false)
    }
  }

  const categoryLabel = CATEGORY_LABELS[category] || category
  const subcategoryLabel = subcategory
    ? SUBCATEGORIES[category]?.find(s => s.slug === subcategory)?.name || subcategory
    : null
  const subcategories = SUBCATEGORIES[category] || []
  const description = CATEGORY_DESCRIPTIONS[category] || ''

  const featuredWork = works[featuredIndex] || null
  const thumbnails = works.filter((_, i) => i !== featuredIndex)

  if (loading) {
    return <Loading />
  }

  return (
    <div className="wc-container">

      {/* Breadcrumb top-right */}
      <div className="wc-breadcrumb-row">
        <Link to="/works" className="wc-breadcrumb-works">WORKS</Link>
        <span className="wc-breadcrumb-sep"> / </span>
        <span className={subcategory ? 'wc-breadcrumb-link' : 'wc-breadcrumb-active'}>
          {subcategory
            ? <Link to={`/works/${category}`} className="wc-breadcrumb-link">{categoryLabel.toUpperCase()}</Link>
            : categoryLabel.toUpperCase()
          }
        </span>
        {subcategoryLabel && (
          <>
            <span className="wc-breadcrumb-sep"> / </span>
            <span className="wc-breadcrumb-active">{subcategoryLabel.toUpperCase()}</span>
          </>
        )}
      </div>

      {/* Subnav de subcategorías */}
      {subcategories.length > 0 && (
        <div className="wc-subnav-row">
          {subcategories.map((sub, i) => (
            <span key={sub.slug}>
              {i > 0 && <span className="wc-subnav-sep"> / </span>}
              <Link
                to={`/works/${category}/${sub.slug}`}
                className={`wc-subnav-link ${subcategory === sub.slug ? 'active' : ''}`}
              >
                {sub.name}
              </Link>
            </span>
          ))}
        </div>
      )}

      <hr className="wc-divider" />

      {/* Layout principal */}
      <div className="wc-layout">

        {/* Columna izquierda: fondo rosa + imagen grande */}
        <aside className="wc-image-column">
          {featuredWork ? (
            <>
              <img
                src={featuredWork.imageUrl}
                alt={featuredWork.title}
                className="wc-featured-img"
                onError={(e) => { e.target.parentElement.classList.add('wc-no-img') }}
              />
              <figure className="wc-featured-caption">
                {featuredWork.title}
                {(featuredWork.year || featuredWork.medium) && (
                  <em>
                    {', '}
                    {[featuredWork.year, featuredWork.medium, featuredWork.dimensions]
                      .filter(Boolean).join(' - ')}
                  </em>
                )}
              </figure>
            </>
          ) : (
            <div className="wc-no-works-img">
              <p>{categoryLabel}</p>
            </div>
          )}
        </aside>

        {/* Columna derecha: fondo gris + thumbnails o descripción */}
        <main className="wc-main-content">

          {/* Sin obras: mostrar descripción */}
          {works.length === 0 && (
            <>
              {description ? (
                <div className="wc-description">
                  {description.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              ) : (
                <div className="wc-empty">
                  <p>No works available in this category yet.</p>
                  <p className="wc-hint">
                    Add works to Google Sheets under category: <em>{category}</em>
                    {subcategory && <> / subcategory: <em>{subcategory}</em></>}
                  </p>
                </div>
              )}
            </>
          )}

          {/* Con obras: si es página de categoría y tiene descripción, mostrar descripción */}
          {works.length > 0 && !subcategory && description && (
            <div className="wc-description">
              {description.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}

          {/* Con obras: thumbnails (solo si hay subcategoría o no hay descripción) */}
          {works.length > 0 && (subcategory || !description) && thumbnails.length > 0 && (
            <div className="wc-thumbnails">
              {thumbnails.map((work, index) => (
                <button
                  key={index}
                  className={`wc-thumb-btn ${works.indexOf(work) === featuredIndex ? 'active' : ''}`}
                  onClick={() => setFeaturedIndex(works.indexOf(work))}
                  title={work.title}
                >
                  {work.imageUrl ? (
                    <img
                      src={work.imageUrl}
                      alt={work.title}
                      className="wc-thumb-img"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                  ) : (
                    <div className="wc-thumb-placeholder" />
                  )}
                </button>
              ))}
            </div>
          )}

        </main>

      </div>
    </div>
  )
}

export default WorksCategory
