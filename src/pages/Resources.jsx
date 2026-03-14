import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import googleSheetsService from '../services/googleSheetsService'
import './Resources.css'

const DEFAULT_RESOURCE_LINKS = [
  { name: 'The David Hockney Foundation', href: 'http://www.thedavidhockneyfoundation.org/', external: true },
  { name: 'Galleries', href: '/resources/galleries', external: false },
  { name: "Making 'Works'", href: '/resources/making_works', external: false },
  { name: 'Publications', href: '/resources/publications', external: false },
  { name: 'Works In Public Collections', href: '/resources/public_collections', external: false },
]

const DEFAULT_CONFIG = {
  featuredImageUrl: 'https://www.hockney.com/img/gallery/paintings/70s/75C04.jpg',
  featuredImageAlt: 'Invented Man Revealing Still Life',
  featuredCaption: 'Invented Man Revealing Still Life, 2004 - oil on canvas',
  description1: "This website represents an overview of David Hockney's work from the early 1950's to the present day. It is organized by categories with sub-menus for each discipline.",
  description2: 'Although not exhaustive it is thorough and you can find current and past events, exhibitions, biographical and reference data.',
}

function Resources() {
  const [config, setConfig] = useState(DEFAULT_CONFIG)
  const [links, setLinks] = useState(DEFAULT_RESOURCE_LINKS)

  useEffect(() => {
    googleSheetsService.getPageConfig('resources')
      .then(data => { if (Object.keys(data).length > 0) setConfig({ ...DEFAULT_CONFIG, ...data }) })
      .catch(() => {})
  }, [])

  return (
    <div className="res-container">

      {/* Breadcrumb top-right */}
      <div className="res-breadcrumb-row">
        <span className="res-breadcrumb-active">RESOURCES</span>
      </div>

      <hr className="res-divider" />

      <div className="res-layout">

        {/* Columna izquierda: fondo rosa + imagen destacada */}
        <aside className="res-image-column">
          <img
            src={config.featuredImageUrl}
            alt={config.featuredImageAlt}
            className="res-featured-img"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <figure className="res-caption">
            {config.featuredCaption}
          </figure>
        </aside>

        {/* Columna derecha: fondo gris + descripción + links */}
        <main className="res-main-content">
          {config.description1 && (
            <p className="res-description"><em>{config.description1}</em></p>
          )}
          {config.description2 && (
            <p className="res-description"><em>{config.description2}</em></p>
          )}

          <p className="res-section-label">RESOURCES</p>
          <ul className="res-links-list">
            {links.map((item) => (
              <li key={item.href}>
                {item.external ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="res-link">
                    {item.name}
                  </a>
                ) : (
                  <Link to={item.href} className="res-link">{item.name}</Link>
                )}
              </li>
            ))}
          </ul>
        </main>

      </div>
    </div>
  )
}

export default Resources
