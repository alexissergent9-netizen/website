import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useSiteData } from '../context/SiteDataContext'
import './Header.css'

function Header() {
  const { siteNameFirst, siteNameSecond, navItems, worksCategories, worksSubcategories, siteLoading } = useSiteData()

  const isEnabled = (item) => {
    const val = String(item.enabled ?? 'true').toLowerCase().trim()
    return val !== 'false' && val !== '0' && val !== 'no'
  }

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
                <div className="dropdown-item has-submenu">
                  <Link to="/press/articles" className="dropdown-link">articles</Link>
                  <div className="sub-menu">
                    <Link to="/press/articles" className="sub-link">current</Link>
                    <Link to="/press/articles/past" className="sub-link">past</Link>
                  </div>
                </div>
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
                <Link to="/exhibitions/current" className="dropdown-link">current</Link>
                <Link to="/exhibitions/past" className="dropdown-link">past</Link>
                <Link to="/exhibitions/upcoming" className="dropdown-link">upcoming</Link>
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
                <a href="http://www.thedavidhockneyfoundation.org/" target="_blank" rel="noopener noreferrer" className="dropdown-link">the david hockney foundation</a>
                <Link to="/resources/galleries" className="dropdown-link">galleries</Link>
                <Link to="/resources/making_works" className="dropdown-link">making 'works'</Link>
                <Link to="/resources/publications" className="dropdown-link">publications</Link>
                <Link to="/resources/public_collections" className="dropdown-link">works in public collections</Link>
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
                <button className="mobile-sub-btn" onClick={() => toggleMobileSub('press-articles')}>
                  articles <span className="mobile-chevron">{mobileSubExpanded === 'press-articles' ? '▲' : '▼'}</span>
                </button>
                {mobileSubExpanded === 'press-articles' && (
                  <div className="mobile-sub">
                    <button className="mobile-leaf" onClick={() => handleMobileNav('/press/articles')}>current</button>
                    <button className="mobile-leaf" onClick={() => handleMobileNav('/press/articles/past')}>past</button>
                  </div>
                )}
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
                <button className="mobile-leaf" onClick={() => handleMobileNav('/exhibitions/current')}>current</button>
                <button className="mobile-leaf" onClick={() => handleMobileNav('/exhibitions/past')}>past</button>
                <button className="mobile-leaf" onClick={() => handleMobileNav('/exhibitions/upcoming')}>upcoming</button>
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
                <a href="http://www.thedavidhockneyfoundation.org/" target="_blank" rel="noopener noreferrer" className="mobile-leaf-a">the david hockney foundation</a>
                <button className="mobile-leaf" onClick={() => handleMobileNav('/resources/galleries')}>galleries</button>
                <button className="mobile-leaf" onClick={() => handleMobileNav('/resources/making_works')}>making 'works'</button>
                <button className="mobile-leaf" onClick={() => handleMobileNav('/resources/publications')}>publications</button>
                <button className="mobile-leaf" onClick={() => handleMobileNav('/resources/public_collections')}>works in public collections</button>
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
