import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useSiteData } from '../context/SiteDataContext'
import './Header.css'

function Header() {
  const { siteNameFirst, siteNameSecond } = useSiteData()
  const [activeDropdown, setActiveDropdown] = useState(null)
  const closeTimerRef = useRef(null)

  // Limpiar el timer al desmontar el componente
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current)
      }
    }
  }, [])

  const handleMouseEnter = (dropdown) => {
    // Cancelar cualquier temporizador de cierre pendiente
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setActiveDropdown(dropdown)
  }

  const handleMouseLeave = () => {
    // Agregar un pequeño delay antes de cerrar para permitir que el usuario
    // mueva el cursor al dropdown sin que se cierre
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 100) // 100ms de delay
  }

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/home" className="logo">
          <div className="logo-text">
            <span className="logo-first">{siteNameFirst}</span>{siteNameSecond}
          </div>
        </Link>
        <nav className="main-nav">
          {/* Press */}
          <div 
            className="nav-item dropdown"
            onMouseEnter={() => handleMouseEnter('press')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/press/articles" className="nav-link">Press</Link>
            {activeDropdown === 'press' && (
              <div className="dropdown-menu">
                <div className="dropdown-item has-submenu">
                  <Link to="/press/articles" className="dropdown-link">articles</Link>
                  <div className="sub-menu">{/* current */}
                    <Link to="/press/articles" className="sub-link">current</Link>
                    <Link to="/press/articles/past" className="sub-link">past</Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Exhibitions */}
          <div 
            className="nav-item dropdown"
            onMouseEnter={() => handleMouseEnter('exhibitions')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/exhibitions/current" className="nav-link">Exhibitions</Link>
            {activeDropdown === 'exhibitions' && (
              <div className="dropdown-menu">
                <Link to="/exhibitions/current" className="dropdown-link">current</Link>
                <Link to="/exhibitions/past" className="dropdown-link">past</Link>
                <Link to="/exhibitions/upcoming" className="dropdown-link">upcoming</Link>
              </div>
            )}
          </div>

          {/* Works */}
          <div 
            className="nav-item dropdown"
            onMouseEnter={() => handleMouseEnter('works')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/works" className="nav-link">Works</Link>
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

          {/* Resources */}
          <div 
            className="nav-item dropdown"
            onMouseEnter={() => handleMouseEnter('resources')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/resources" className="nav-link">Resources</Link>
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

          {/* Contacts */}
          <div className="nav-item">
            <Link to="/contact" className="nav-link">Contacts</Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
