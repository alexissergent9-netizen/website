import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import googleSheetsService from '../services/googleSheetsService'
import Loading from '../components/Loading'
import './Contact.css'

const STATIC_LINKS = [
  { label: 'Frequently Asked Questions', href: '/contact/faqs', external: false },
  { label: 'A Word of Warning Concerning NFTs', href: '/contact/NFT_report', external: false },
  { label: 'Galleries', href: '/resources/galleries', external: false },
  { label: 'Information Requests', href: '/contact/information_request', external: false },
  { label: 'Reproduction Requests', href: '/contact/repro_request', external: false },
  { label: 'Privacy Notice', href: '/contact/privacy_notice', external: false },
]

const DEFAULT_CONFIG = {
  featuredImageUrl: '',
  featuredImageAlt: '',
  featuredCaption: '',
  contactEmail: '',
}

function Contact() {
  const [links, setLinks] = useState(null)
  const [config, setConfig] = useState(DEFAULT_CONFIG)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      googleSheetsService.getContactLinks()
        .then(data => { if (data.length > 0) setLinks(data) })
        .catch(() => {}),
      googleSheetsService.getPageConfig('contact')
        .then(data => { if (Object.keys(data).length > 0) setConfig({ ...DEFAULT_CONFIG, ...data }) })
        .catch(() => {}),
    ]).finally(() => setLoading(false))
  }, [])

  const displayLinks = links || STATIC_LINKS

  if (loading) return <Loading />

  return (
    <div className="contact-container">

      {/* Breadcrumb top-right */}
      <div className="contact-breadcrumb-row">
        <span className="contact-breadcrumb-active">CONTACTS</span>
      </div>

      <hr className="contact-divider" />

      <div className="contact-layout">

        {/* Columna izquierda: fondo rosa + imagen */}
        <aside className="contact-image-column">
          <img
            src={config.featuredImageUrl}
            alt={config.featuredImageAlt}
            className="contact-featured-img"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <figure className="contact-caption">
            {config.featuredCaption}
          </figure>
          {config.contactEmail && (
            <a href={`mailto:${config.contactEmail}`} target="_blank" rel="noopener noreferrer" className="contact-email">
              {config.contactEmail}
            </a>
          )}
          <p className="contact-dev">
            Site developed by{' '}
            <a href="https://luiscodev.com" target="_blank" rel="noopener noreferrer" className="contact-dev-link">
              luiscodev
            </a>
          </p>
        </aside>

        {/* Columna derecha: fondo gris + links */}
        <main className="contact-main-content">
          <ul className="contact-links-list">
            {displayLinks.map((item, i) => (
              <li key={i}>
                <h3>
                  {(item.external === 'true' || item.external === true) ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="contact-link">
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.href} className="contact-link">
                      {item.label}
                    </Link>
                  )}
                </h3>
              </li>
            ))}
          </ul>
        </main>

      </div>
    </div>
  )
}

export default Contact
