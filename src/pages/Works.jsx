import { Link } from 'react-router-dom'
import './Works.css'

function Works() {
  const categories = [
    { name: 'Digital Works', slug: 'digital' },
    { name: 'Drawings', slug: 'drawings' },
    { name: 'Graphics', slug: 'graphics' },
    { name: 'Paintings', slug: 'paintings' },
    { name: 'Photographs', slug: 'photos' },
    { name: 'Sketchbooks', slug: 'sketchbooks' },
    { name: 'Stage Design', slug: 'stage_design' },
    { name: 'Etcetera', slug: 'etcetera' }
  ]

  return (
    <div className="works-page">
      <div className="works-header">
        <h1>WORKS</h1>
        <p className="works-description">
          This website represents an overview of David Hockney's work from the early
          1950's to the present day. It is organized by categories with sub-menus for each
          discipline.
        </p>
      </div>

      <div className="categories-grid">
        {categories.map((category) => (
          <Link
            key={category.slug}
            to={`/works/${category.slug}`}
            className="category-card"
          >
            <h3>{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Works
