import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useSiteData } from '../context/SiteDataContext'
import './Header.css'

function Header() {
  const { siteNameFirst, siteNameSecond, navItems, navSubitems, worksCategories, worksSubcategories, siteLoading } = useSiteData()

  const isEnabled = (item) => {
    const val = String(item.enabled ?? 'true').toLowerCase().trim()
    return val !== 'false' && val !== '0' && val !== 'no'
  }

  const getSubitems = (section, parent = '') =>
    navSubitems
      .filter(i => i.section === section && (i.parent || '') === parent)
      .filter(isEnabled)

  const getCategorySubs = (categorySlug) =>
    worksSubcategories
      .filter(s => String(s.category).toLowerCase() === categorySlug.toLowerCase())
      .filter(isEnabled)

  // Helper: find a nav item by key (case-insensitive)
  const findNav = (key) => navItems?.find(n => String(n.key).toLowerCase().trim() === key.toLowerCase())

  // Helper: get label for a nav key (falls back to capitalized key)
  const navLabel = (key) => {
    const item = findNav(key)
    return item?.label || key.charAt(0).toUpperCase() + key.slice(1)
  }

  // Helper: check if a nav key is enabled
  const navEnabled = (key) => {
    const item = findNav(key)
    if (!item) return true
    const val = String(item.enabled).toLowerCase().trim()
    return val !== 'false' && val !== '0' && val !== 'no'
  }
  const navigate = useNavigate()

  // Desktop hover state
  const [activeDropdown, setActiveDropdown] = useState(null)
  const closeTimerRef = useRef(null)

  // Mobile state
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const [mobileSubExpanded, setMobileSubExpanded] = useState(null)

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  const handleMouseEnter = (dropdown) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setActiveDropdown(dropdown)
  }

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 100)
  }

  const toggleMobile = () => {
    setMobileOpen(o => !o)
    setMobileExpanded(null)
    setMobileSubExpanded(null)
  }

  const toggleMobileSection = (key) => {
    setMobileExpanded(prev => prev === key ? null : key)
    setMobileSubExpanded(null)
  }

  const toggleMobileSub = (key) => {
    setMobileSubExpanded(prev => prev === key ? null : key)
  }

  const handleMobileNav = (path) => {
    navigate(path)
    setMobileOpen(false)
    setMobileExpanded(null)
    setMobileSubExpanded(null)
  }

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/home" className="logo" onClick={() => setMobileOpen(false)}>
          <div className="logo-text">
            {siteLoading ? (
              <span className="logo-loading" />
            ) : (
              <><span className="logo-first">{siteNameFirst}</span>{siteNameSecond}</>
            )}
          </div>
        </Link>

        {/* Hamburger button — mobile only */}
        <button
          className={`hamburger${mobileOpen ? ' is-open' : ''}`}
          onClick={toggleMobile}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>

        {/* Desktop nav */}
        <nav className="main-nav">
          {/* Press */}
          {navEnabled('press') && (
          <div
            className="nav-item dropdown"
            onMouseEnter={() => handleMouseEnter('press')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/press/articles" className="nav-link">{navLabel('press')}</Link>
            {activeDropdown === 'press' && (
              <div className="dropdown-menu">
                {getSubitems('press').map(item => {
                  const children = getSubitems('press', item.key)
                  return children.length > 0 ? (
                    <div key={item.key} className="dropdown-item has-submenu">
                      <Link to={item.url} className="dropdown-link">{item.label}</Link>
                      <div className="sub-menu">
                        {children.map(child => (
                          <Link key={child.key} to={child.url} className="sub-link">{child.label}</Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link key={item.key} to={item.url} className="dropdown-link">{item.label}</Link>
                  )
                })}
              </div>
            )}
          </div>
          )}

          {/* Exhibitions */}
          {navEnabled('exhibitions') && (
          <div
            className="nav-item dropdown"
            onMouseEnter={() => handleMouseEnter('exhibitions')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/exhibitions/current" className="nav-link">{navLabel('exhibitions')}</Link>
            {activeDropdown === 'exhibitions' && (
              <div className="dropdown-menu">
                {getSubitems('exhibitions').map(item => (
                  <Link key={item.key} to={item.url} className="dropdown-link">{item.label}</Link>
                ))}
              </div>
            )}
          </div>
          )}

          {/* Works */}
          {navEnabled('works') && (
          <div
            className="nav-item dropdown"
            onMouseEnter={() => handleMouseEnter('works')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/works" className="nav-link">{navLabel('works')}</Link>
            {activeDropdown === 'works' && worksCategories.length > 0 && (
              <div className="dropdown-menu">
                {worksCategories.filter(isEnabled).map(cat => {
                  const subs = getCategorySubs(cat.slug)
                  return subs.length > 0 ? (
                    <div key={cat.slug} className="dropdown-item has-submenu">
                      <Link to={`/works/${cat.slug}`} className="dropdown-link">{cat.label}</Link>
                      <div className="sub-menu">
                        {subs.map(sub => (
                          <Link key={sub.slug} to={`/works/${cat.slug}/${sub.slug}`} className="sub-link">{sub.label || sub.name}</Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link key={cat.slug} to={`/works/${cat.slug}`} className="dropdown-link">{cat.label}</Link>
                  )
                })}
              </div>
            )}
          </div>
          )}

          {/* Resources */}
          {navEnabled('resources') && (
          <div
            className="nav-item dropdown"
            onMouseEnter={() => handleMouseEnter('resources')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/resources" className="nav-link">{navLabel('resources')}</Link>
            {activeDropdown === 'resources' && (
              <div className="dropdown-menu">
                {getSubitems('resources').map(item =>
                  String(item.external).toLowerCase() === 'true' ? (
                    <a key={item.key} href={item.url} target="_blank" rel="noopener noreferrer" className="dropdown-link">{item.label}</a>
                  ) : (
                    <Link key={item.key} to={item.url} className="dropdown-link">{item.label}</Link>
                  )
                )}
              </div>
            )}
          </div>
          )}

          {/* Contacts */}
          {navEnabled('contacts') && (
          <div className="nav-item">
            <Link to="/contact" className="nav-link">{navLabel('contacts')}</Link>
          </div>
          )}
        </nav>
      </div>

      {/* Mobile nav panel */}
      {mobileOpen && (
        <nav className="mobile-nav">
          {/* Press */}
          {navEnabled('press') && (
          <div className="mobile-nav-item">
            <button className="mobile-nav-btn" onClick={() => toggleMobileSection('press')}>
              {navLabel('press')} <span className="mobile-chevron">{mobileExpanded === 'press' ? '▲' : '▼'}</span>
            </button>
            {mobileExpanded === 'press' && (
              <div className="mobile-dropdown">
                {getSubitems('press').map(item => {
                  const children = getSubitems('press', item.key)
                  return children.length > 0 ? (
                    <div key={item.key}>
                      <button className="mobile-sub-btn" onClick={() => toggleMobileSub(`press-${item.key}`)}>
                        {item.label} <span className="mobile-chevron">{mobileSubExpanded === `press-${item.key}` ? '▲' : '▼'}</span>
                      </button>
                      {mobileSubExpanded === `press-${item.key}` && (
                        <div className="mobile-sub">
                          {children.map(child => (
                            <button key={child.key} className="mobile-leaf" onClick={() => handleMobileNav(child.url)}>{child.label}</button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button key={item.key} className="mobile-leaf" onClick={() => handleMobileNav(item.url)}>{item.label}</button>
                  )
                })}
              </div>
            )}
          </div>
          )}

          {/* Exhibitions */}
          {navEnabled('exhibitions') && (
          <div className="mobile-nav-item">
            <button className="mobile-nav-btn" onClick={() => toggleMobileSection('exhibitions')}>
              {navLabel('exhibitions')} <span className="mobile-chevron">{mobileExpanded === 'exhibitions' ? '▲' : '▼'}</span>
            </button>
            {mobileExpanded === 'exhibitions' && (
              <div className="mobile-dropdown">
                {getSubitems('exhibitions').map(item => (
                  <button key={item.key} className="mobile-leaf" onClick={() => handleMobileNav(item.url)}>{item.label}</button>
                ))}
              </div>
            )}
          </div>
          )}

          {/* Works */}
          {navEnabled('works') && (
          <div className="mobile-nav-item">
            <button className="mobile-nav-btn" onClick={() => toggleMobileSection('works')}>
              {navLabel('works')} <span className="mobile-chevron">{mobileExpanded === 'works' ? '▲' : '▼'}</span>
            </button>
            {mobileExpanded === 'works' && (
              <div className="mobile-dropdown">
                {worksCategories.filter(isEnabled).map(cat => {
                  const subs = getCategorySubs(cat.slug)
                  return subs.length > 0 ? (
                    <div key={cat.slug}>
                      <button className="mobile-sub-btn" onClick={() => toggleMobileSub(cat.slug)}>
                        {cat.label} <span className="mobile-chevron">{mobileSubExpanded === cat.slug ? '▲' : '▼'}</span>
                      </button>
                      {mobileSubExpanded === cat.slug && (
                        <div className="mobile-sub">
                          {subs.map(sub => (
                            <button key={sub.slug} className="mobile-leaf" onClick={() => handleMobileNav(`/works/${cat.slug}/${sub.slug}`)}>
                              {sub.label || sub.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button key={cat.slug} className="mobile-leaf" onClick={() => handleMobileNav(`/works/${cat.slug}`)}>
                      {cat.label}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
          )}

          {/* Resources */}
          {navEnabled('resources') && (
          <div className="mobile-nav-item">
            <button className="mobile-nav-btn" onClick={() => toggleMobileSection('resources')}>
              {navLabel('resources')} <span className="mobile-chevron">{mobileExpanded === 'resources' ? '▲' : '▼'}</span>
            </button>
            {mobileExpanded === 'resources' && (
              <div className="mobile-dropdown">
                {getSubitems('resources').map(item =>
                  String(item.external).toLowerCase() === 'true' ? (
                    <a key={item.key} href={item.url} target="_blank" rel="noopener noreferrer" className="mobile-leaf-a">{item.label}</a>
                  ) : (
                    <button key={item.key} className="mobile-leaf" onClick={() => handleMobileNav(item.url)}>{item.label}</button>
                  )
                )}
              </div>
            )}
          </div>
          )}

          {/* Contacts */}
          {navEnabled('contacts') && (
          <div className="mobile-nav-item">
            <button className="mobile-nav-btn mobile-nav-leaf" onClick={() => handleMobileNav('/contact')}>
              {navLabel('contacts')}
            </button>
          </div>
          )}
        </nav>
      )}
    </header>
  )
}

export default Header
