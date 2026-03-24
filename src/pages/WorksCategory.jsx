import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import googleSheetsService from '../services/googleSheetsService'
import Loading from '../components/Loading'
import Lightbox from '../components/Lightbox'
import './WorksCategory.css'

/* ─── Fallback estático ─── */

const FALLBACK_CATEGORIES = {
  digital: { label: 'Digital Works', description: 'The computer is a useful tool. Photoshop is a computer tool for picture making. It in effect allows you to draw directly in a printing machine, one of its many uses. These prints are made by drawing and collage, they exist either in the computer or on a piece of paper.\n\nDavid Hockney, November 2008' },
  drawings: { label: 'Drawings', description: '' },
  graphics: { label: 'Graphics', description: '' },
  paintings: { label: 'Paintings', description: '' },
  photos: { label: 'Photographs', description: '' },
  sketchbooks: { label: 'Sketchbooks', description: '' },
  stage_design: { label: 'Stage Design', description: '' },
  etcetera: { label: 'Etcetera', description: '' },
}

const FALLBACK_SUBCATEGORIES = {
  digital: [
    { name: 'computer drawings', slug: 'computer-drawings' },
    { name: 'iPhone', slug: 'iphone' },
    { name: 'iPad Selects', slug: 'ipad' },
    { name: 'arrival of spring woldgate', slug: 'arrival-of-spring-woldgate' },
    { name: 'yosemite suite', slug: 'yosemite-suite' },
    { name: 'digital movies', slug: 'movies' },
  ],
  drawings: [
    { name: '1950s', slug: '1950s' }, { name: '1960s', slug: '1960s' },
    { name: '1970s', slug: '1970s' }, { name: '1980s', slug: '1980s' },
    { name: '1990s', slug: '1990s' }, { name: '2000s', slug: '2000s' },
    { name: '2010s', slug: '2010s' }, { name: 'arrival of spring 2013', slug: 'arrival-of-spring-2013' },
  ],
  paintings: [
    { name: '1950s', slug: '50s' }, { name: '1960s', slug: '60s' },
    { name: '1970s', slug: '70s' }, { name: '1980s', slug: '80s' },
    { name: '1990s', slug: '90s' }, { name: '2000s', slug: '00s' },
    { name: '2010s', slug: '10s' }, { name: '82 Portraits', slug: '82-portraits' },
  ],
  graphics: [
    { name: 'lithographs', slug: 'lithographs' }, { name: 'etchings', slug: 'etchings' },
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

/* ─── Componente ─── */

function WorksCategory() {
  const { category, subcategory } = useParams()
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(true)
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const [categoriesMap, setCategoriesMap] = useState(FALLBACK_CATEGORIES)
  const [subcategoriesMap, setSubcategoriesMap] = useState(FALLBACK_SUBCATEGORIES)

  useEffect(() => {
    googleSheetsService.getWorksCategories()
      .then(data => {
        if (data.length > 0) {
          const map = {}
          data.forEach(c => { map[c.slug] = { label: c.label, description: c.description || '' } })
          setCategoriesMap(map)
        }
      })
      .catch(() => {})

    googleSheetsService.getWorksSubcategories()
      .then(data => {
        if (data.length > 0) {
          const map = {}
          data.forEach(s => {
            if (!map[s.category]) map[s.category] = []
            map[s.category].push({ name: s.name, slug: s.slug })
          })
          setSubcategoriesMap(map)
        }
      })
      .catch(() => {})
  }, [])

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

  const categoryInfo = categoriesMap[category] || { label: category, description: '' }
  const categoryLabel = categoryInfo.label
  const description = categoryInfo.description
  const subcategories = subcategoriesMap[category] || []
  const subcategoryLabel = subcategory
    ? subcategories.find(s => s.slug === subcategory)?.name || subcategory
    : null

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

      <div className="wc-layout">

        <aside className="wc-image-column">
          {featuredWork ? (
            <>
              <button
                className="wc-featured-btn"
                onClick={() => setLightboxIndex(featuredIndex)}
                title="Click to enlarge"
              >
                <img
                  src={featuredWork.imageUrl}
                  alt={featuredWork.title}
                  className="wc-featured-img"
                  onError={(e) => { e.target.closest('.wc-image-column').classList.add('wc-no-img') }}
                />
              </button>
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

        <main className="wc-main-content">

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
                </div>
              )}
            </>
          )}

          {works.length > 0 && !subcategory && description && (
            <div className="wc-description">
              {description.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}

          {works.length > 0 && (subcategory || !description) && thumbnails.length > 0 && (
            <div className="wc-thumbnails">
              {thumbnails.map((work, index) => {
                const worksIdx = works.indexOf(work)
                return (
                  <button
                    key={index}
                    className={`wc-thumb-btn ${worksIdx === featuredIndex ? 'active' : ''}`}
                    onClick={() => { setFeaturedIndex(worksIdx); setLightboxIndex(worksIdx) }}
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
                )
              })}
            </div>
          )}

        </main>

      </div>

      {lightboxIndex !== null && works.length > 0 && (
        <Lightbox
          works={works}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChangeIndex={(i) => { setLightboxIndex(i); setFeaturedIndex(i) }}
        />
      )}
    </div>
  )
}

export default WorksCategory
