import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import googleSheetsService from '../services/googleSheetsService'
import './Works.css'

const DEFAULT_CATEGORIES = [
  { name: 'Digital Works', slug: 'digital' },
  { name: 'Drawings', slug: 'drawings' },
  { name: 'Graphics', slug: 'graphics' },
  { name: 'Paintings', slug: 'paintings' },
  { name: 'Photographs', slug: 'photos' },
  { name: 'Sketchbooks', slug: 'sketchbooks' },
  { name: 'Stage Design', slug: 'stage_design' },
  { name: 'Etcetera', slug: 'etcetera' },
]

const DEFAULT_CONFIG = {
  featuredImageUrl: 'https://www.hockney.com/img/gallery/photos/collages/S35-A-LG.jpg',
  featuredImageAlt: 'Paint Trolley, L.A. 1985',
  featuredCaption: 'Paint Trolley, L.A. 1985, 1985 - photographic collage 41x61 in.',
  description: "This website represents an overview of David Hockney's work from the early 1950's to the present day. It is organized by categories with sub-menus for each discipline.",
}

function Works() {
  const [config, setConfig] = useState(DEFAULT_CONFIG)
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES)

  useEffect(() => {
    googleSheetsService.getPageConfig('works')
      .then(data => { if (Object.keys(data).length > 0) setConfig({ ...DEFAULT_CONFIG, ...data }) })
      .catch(() => {})

    googleSheetsService.getWorksCategories()
      .then(data => {
        if (data.length > 0) setCategories(data.map(c => ({ name: c.label, slug: c.slug })))
      })
      .catch(() => {})
  }, [])

  return (
    <div className="works-container">

      {/* Breadcrumb top-right */}
      <div className="works-breadcrumb-row">
        <span className="works-breadcrumb-active">WORKS</span>
      </div>

      <hr className="works-divider" />

      <div className="works-layout">

        {/* Columna izquierda: fondo rosa + imagen destacada */}
        <aside className="works-image-column">
          <img
            src={config.featuredImageUrl}
            alt={config.featuredImageAlt}
            className="works-featured-img"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <figure className="works-caption">
            {config.featuredCaption}
          </figure>
        </aside>

        {/* Columna derecha: fondo gris + descripción + categorías */}
        <main className="works-main-content">
          {config.description && (
            <p className="works-description">
              <em>{config.description}</em>
            </p>
          )}

          <ul className="works-categories-list">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link to={`/works/${cat.slug}`} className="works-category-link">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </main>

      </div>
    </div>
  )
}

export default Works
