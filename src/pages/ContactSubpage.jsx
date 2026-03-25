import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import googleSheetsService from '../services/googleSheetsService'
import Loading from '../components/Loading'
import './ContactSubpage.css'

function renderItem(item, i) {
  switch (item.type) {
    case 'section_header':
      return <h2 key={i} className="csub-section-header">{item.content}</h2>
    case 'label':
      return <p key={i}><strong>{item.content}</strong></p>
    case 'note':
      return <p key={i} className="csub-note" style={{ paddingTop: 15 }}>{item.content}</p>
    default:
      return <p key={i} className="csub-para">{item.content}</p>
  }
}

function ContactSubpage() {
  const { section } = useParams()
  const [items, setItems] = useState(null)
  const [sidebarLinks, setSidebarLinks] = useState([])
  const [pageConfig, setPageConfig] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      googleSheetsService.getContactContent(section)
        .then(data => { setItems(data) })
        .catch(() => { setItems([]) }),
      googleSheetsService.getContactLinks()
        .then(data => {
          const enabled = data
            .filter(item => {
              const val = String(item.enabled ?? 'true').toLowerCase().trim()
              return val !== 'false' && val !== '0' && val !== 'no'
            })
            .sort((a, b) => Number(a.order || 0) - Number(b.order || 0))
          setSidebarLinks(enabled)
        })
        .catch(() => {}),
      googleSheetsService.getPageConfig(`contact/${section}`)
        .then(data => { if (Object.keys(data).length > 0) setPageConfig(data) })
        .catch(() => {}),
    ]).finally(() => setLoading(false))
  }, [section])

  if (loading) return <Loading />

  const displayItems = (items || []).map(r => ({ type: r.type, content: r.content || r.question || '' }))
  const title = pageConfig.title || section?.replace(/_/g, ' ')

  return (
    <div className="csub-container">

      {/* Breadcrumb — just CONTACTS, top-right */}
      <div className="csub-breadcrumb-row">
        <Link to="/contact" className="csub-breadcrumb-link">CONTACTS</Link>
      </div>

      <hr className="csub-divider" />

      {/* Two-column layout */}
      <div className="csub-layout">

        {/* Main content (75%) */}
        <main className="csub-main">
          <h1 className="csub-title">{title}</h1>

          {displayItems.map((item, i) => renderItem(item, i))}

          {displayItems.length === 0 && (
            <p className="csub-empty">No content available for this section.</p>
          )}
        </main>

        {/* Sidebar (25%) */}
        <aside className="csub-sidebar">
          <ul className="csub-sidebar-list">
            {sidebarLinks.map((link, i) => {
              const href = link.section ? `/contact/${link.section}` : link.href
              return (
                <li key={i} className="csub-sidebar-item">
                  <h3>
                    {(link.external === 'true' || link.external === true) ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="csub-sidebar-link">
                        {link.label}
                      </a>
                    ) : (
                      <Link to={href} className={`csub-sidebar-link${href === `/contact/${section}` ? ' active' : ''}`}>
                        {link.label}
                      </Link>
                    )}
                  </h3>
                </li>
              )
            })}
          </ul>
        </aside>

      </div>
    </div>
  )
}

export default ContactSubpage
