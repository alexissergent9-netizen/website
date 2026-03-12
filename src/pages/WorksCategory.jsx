import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import googleSheetsService from '../services/googleSheetsService'
import Loading from '../components/Loading'
import './WorksCategory.css'

function WorksCategory() {
  const { category } = useParams()
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadWorks()
  }, [category])

  const loadWorks = async () => {
    setLoading(true)
    try {
      const data = await googleSheetsService.getWorksByCategory(category)
      setWorks(data)
    } catch (error) {
      console.error('Error loading works:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryTitle = () => {
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="works-category-page">
      <div className="breadcrumb">
        <Link to="/works">WORKS</Link> / <span>{getCategoryTitle().toUpperCase()}</span>
      </div>

      <h1 className="category-title">{getCategoryTitle()}</h1>

      {works.length === 0 ? (
        <div className="no-works">
          <p>No works available in this category yet.</p>
          <p className="hint">Add works to the Google Sheets under category: "{category}"</p>
        </div>
      ) : (
        <div className="works-grid">
          {works.map((work, index) => (
            <div key={index} className="work-card">
              {work.imageUrl && (
                <div className="work-image-container">
                  <img src={work.imageUrl} alt={work.title} className="work-image" />
                </div>
              )}
              <div className="work-info">
                {work.title && <h3 className="work-title">{work.title}</h3>}
                {work.year && <p className="work-year">{work.year}</p>}
                {work.medium && <p className="work-medium">{work.medium}</p>}
                {work.dimensions && <p className="work-dimensions">{work.dimensions}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default WorksCategory
