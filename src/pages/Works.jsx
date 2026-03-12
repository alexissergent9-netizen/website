import { Link } from 'react-router-dom'
import './Works.css'

const CATEGORIES = [
  { name: 'Digital Works', slug: 'digital' },
  { name: 'Drawings', slug: 'drawings' },
  { name: 'Graphics', slug: 'graphics' },
  { name: 'Paintings', slug: 'paintings' },
  { name: 'Photographs', slug: 'photos' },
  { name: 'Sketchbooks', slug: 'sketchbooks' },
  { name: 'Stage Design', slug: 'stage_design' },
  { name: 'Etcetera', slug: 'etcetera' },
]

function Works() {
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
            src="https://www.hockney.com/img/gallery/photos/collages/S35-A-LG.jpg"
            alt="Paint Trolley, L.A. 1985"
            className="works-featured-img"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <figure className="works-caption">
            Paint Trolley, L.A. 1985, <em>1985 - photographic collage 41x61 in.</em>
          </figure>
        </aside>

        {/* Columna derecha: fondo gris + descripción + categorías */}
        <main className="works-main-content">
          <p className="works-description">
            <em>
              This website represents an overview of David Hockney's work from the early
              1950's to the present day. It is organized by categories with sub-menus for
              each discipline.
            </em>
          </p>

          <ul className="works-categories-list">
            {CATEGORIES.map((cat) => (
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
