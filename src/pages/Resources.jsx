import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import googleSheetsService from '../services/googleSheetsService'
import { useSiteData } from '../context/SiteDataContext'
import './Resources.css'

const DEFAULT_CONFIG = {
  featuredImageUrl: '',
  featuredImageAlt: '',
  featuredCaption: '',
  description1: '',
  description2: '',
}

function Resources() {
  const { navSubitems } = useSiteData()
  const [config, setConfig] = useState(DEFAULT_CONFIG)

  const links = navSubitems
    .filter(i => i.section === 'resources' && (i.parent || '') === '')
    .filter(i => {
      const val = String(i.enabled ?? 'true').toLowerCase().trim()
      return val !== 'false' && val !== '0' && val !== 'no'
    })

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
              <li key={item.key}>
                {String(item.external).toLowerCase() === 'true' ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="res-link">
                    {item.label}
                  </a>
                ) : (
                  <Link to={item.url} className="res-link">{item.label}</Link>
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
