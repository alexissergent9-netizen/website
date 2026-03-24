import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useSiteData } from '../context/SiteDataContext'
import './Header.css'

function Header() {
  const { siteNameFirst, siteNameSecond, navItems } = useSiteData()

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
            <span className="logo-first">{siteNameFirst}</span>{siteNameSecond}
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
            {activeDropdown === 'works' && (
              <div className="dropdown-menu">
                <div className="dropdown-item has-submenu">
                  <Link to="/works/digital" className="dropdown-link">digital works</Link>
                  <div className="sub-menu">
                    <Link to="/works/digital/computer-drawings" className="sub-link">computer drawings</Link>
                    <Link to="/works/digital/iphone" className="sub-link">iPhone</Link>
                    <Link to="/works/digital/ipad" className="sub-link">iPad Selects</Link>
                    <Link to="/works/digital/arrival-of-spring-woldgate" className="sub-link">arrival of spring woldgate</Link>
                    <Link to="/works/digital/yosemite-suite" className="sub-link">yosemite suite</Link>
                    <Link to="/works/digital/movies" className="sub-link">digital movies</Link>
                  </div>
                </div>
                <Link to="/works/drawings" className="dropdown-link">drawings</Link>
                <div className="dropdown-item has-submenu">
                  <Link to="/works/graphics" className="dropdown-link">graphics</Link>
                  <div className="sub-menu">
                    <Link to="/works/graphics/lithographs" className="sub-link">lithographs</Link>
                    <Link to="/works/graphics/etchings" className="sub-link">etchings</Link>
                    <Link to="/works/graphics/rakes-progress-etchings" className="sub-link">a rake's progress etchings</Link>
                    <Link to="/works/graphics/blue-guitar-etchings" className="sub-link">blue guitar etchings</Link>
                    <Link to="/works/graphics/prints" className="sub-link">homemade prints</Link>
                  </div>
                </div>
                <Link to="/works/paintings" className="dropdown-link">paintings</Link>
                <div className="dropdown-item has-submenu">
                  <Link to="/works/photos" className="dropdown-link">photographs</Link>
                  <div className="sub-menu">
                    <Link to="/works/photos/photographic-collages" className="sub-link">photographic collages</Link>
                    <Link to="/works/photos/composite-polaroids" className="sub-link">composite polaroids</Link>
                    <Link to="/works/photos/photo_drawings" className="sub-link">photographic drawings</Link>
                  </div>
                </div>
                <Link to="/works/sketchbooks" className="dropdown-link">sketchbooks</Link>
                <div className="dropdown-item has-submenu">
                  <Link to="/works/stage_design" className="dropdown-link">stage design</Link>
                  <div className="sub-menu">
                    <Link to="/works/stage_design/the-rakes-progress" className="sub-link">The Rake's Progress</Link>
                    <Link to="/works/stage_design/magic-flute" className="sub-link">Magic Flute</Link>
                    <Link to="/works/stage_design/french-triple-bill" className="sub-link">French Triple Bill</Link>
                    <Link to="/works/stage_design/stravinsky-triple-bill" className="sub-link">Stravinsky Triple Bill</Link>
                    <Link to="/works/stage_design/tristan-und-isolde" className="sub-link">Tristan und Isolde</Link>
                    <Link to="/works/stage_design/turandot" className="sub-link">Turandot</Link>
                    <Link to="/works/stage_design/die-frau-ohne-schatten" className="sub-link">Die Frau Ohne Schatten</Link>
                  </div>
                </div>
                <div className="dropdown-item has-submenu">
                  <Link to="/works/etcetera" className="dropdown-link">etcetera</Link>
                  <div className="sub-menu">
                    <Link to="/works/etcetera/pools" className="sub-link">paper pulp</Link>
                    <Link to="/works/etcetera/bmw" className="sub-link">BMW art car</Link>
                  </div>
                </div>
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
                <button className="mobile-sub-btn" onClick={() => toggleMobileSub('digital')}>
                  digital works <span className="mobile-chevron">{mobileSubExpanded === 'digital' ? '▲' : '▼'}</span>
                </button>
                {mobileSubExpanded === 'digital' && (
                  <div className="mobile-sub">
                    <button className="mobile-leaf" onClick={() => handleMobileNav('/works/digital/computer-drawings')}>computer drawings</button>
                    <button className="mobile-leaf" onClick={() => handleMobileNav('/works/digital/iphone')}>iPhone</button>
                    <button className="mobile-leaf" onClick={() => handleMobileNav('/works/digital/ipad')}>iPad Selects</button>
                    <button className="mobile-leaf" onClick={() => handleMobileNav('/works/digital/arrival-of-spring-woldgate')}>arrival of spring woldgate</button>
                    <button className="mobile-leaf" onClick={() => handleMobileNav('/works/digital/yosemite-suite')}>yosemite suite</button>
                    <button className="mobile-leaf" onClick={() => handleMobileNav('/works/digital/movies')}>digital movies</button>
                  </div>
                )}
                <button className="mobile-leaf" onClick={() => handleMobileNav('/works/drawings')}>drawings</button>
                <button className="mobile-sub-btn" onClick={() => toggleMobileSub('graphics')}>
                  graphics <span className="mobile-chevron">{mobileSubExpanded === 'graphics' ? '▲' : '▼'}</span>
                </button>
                {mobileSubExpanded === 'graphics' && (
                  <div className="mobile-sub">
                    <button className="mobile-leaf" onClick={() => handleMobileNav('/works/graphics/lithographs')}>lithographs</button>
                    <button className="mobile-leaf" onClick={() => handleMobileNav('/works/graphics/etchings')}>etchings</button>
                    <button className="mobile-leaf" onClick={() => handleMobileNav('/works/graphics/rakes-progress-etchings')}>a rake's progress etchings</button>
                    <button className="mobile-leaf" onClick={() => handleMobileNav('/works/graphics/blue-guitar-etchings')}>blue guitar etchings</button>
                    <button className="mobile-leaf" onClick={() => handleMobileNav('/works/graphics/prints')}>homemade prints</button>
                  </div>
                )}
                <button className="mobile-leaf" onClick={() => handleMobileNav('/works/paintings')}>paintings</button>
                <button className="mobile-sub-btn" onClick={() => toggleMobileSub('photos')}>
                  photographs <span className="mobile-chevron">{mobileSubExpanded === 'photos' ? '▲' : '▼'}</span>
                </button>
                {mobileSubExpanded === 'photos' && (
                  <div className="mobile-sub">
                    <button className="mobile-leaf" onClick={() => handleMobileNav('/works/photos/photographic-collages')}>photographic collages</button>
                    <button className="mobile-leaf" onClick={() => handleMobileNav('/works/photos/composite-polaroids')}>composite polaroids</button>
                    <button className="mobile-leaf" onClick={() => handleMobileNav('/works/photos/photo_drawings')}>photographic drawings</button>
                  </div>
                )}
                <button className="mobile-leaf" onClick={() => handleMobileNav('/works/sketchbooks')}>sketchbooks</button>
                <button className="mobile-sub-btn" onClick={() => toggleMobileSub('stage')}>
                  stage design <span className="mobile-chevron">{mobileSubExpanded === 'stage' ? '▲' : '▼'}</span>
                </button>
                {mobileSubExpanded === 'stage' && (
                  <div className="mobile-sub">
                    <button className="mobile-leaf" onClick={() => handleMobileNav('/works/stage_design/the-rakes-progress')}>The Rake's Progress</button>
                    <button className="mobile-leaf" onClick={() => handleMobileNav('/works/stage_design/magic-flute')}>Magic Flute</button>
                    <button className="mobile-leaf" onClick={() => handleMobileNav('/works/stage_design/french-triple-bill')}>French Triple Bill</button>
                    <button className="mobile-leaf" onClick={() => handleMobileNav('/works/stage_design/stravinsky-triple-bill')}>Stravinsky Triple Bill</button>
                    <button className="mobile-leaf" onClick={() => handleMobileNav('/works/stage_design/tristan-und-isolde')}>Tristan und Isolde</button>
                    <button className="mobile-leaf" onClick={() => handleMobileNav('/works/stage_design/turandot')}>Turandot</button>
                    <button className="mobile-leaf" onClick={() => handleMobileNav('/works/stage_design/die-frau-ohne-schatten')}>Die Frau Ohne Schatten</button>
                  </div>
                )}
                <button className="mobile-sub-btn" onClick={() => toggleMobileSub('etcetera')}>
                  etcetera <span className="mobile-chevron">{mobileSubExpanded === 'etcetera' ? '▲' : '▼'}</span>
                </button>
                {mobileSubExpanded === 'etcetera' && (
                  <div className="mobile-sub">
                    <button className="mobile-leaf" onClick={() => handleMobileNav('/works/etcetera/pools')}>paper pulp</button>
                    <button className="mobile-leaf" onClick={() => handleMobileNav('/works/etcetera/bmw')}>BMW art car</button>
                  </div>
                )}
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
