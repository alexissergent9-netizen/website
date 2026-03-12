import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import googleSheetsService from '../services/googleSheetsService'
import Loading from '../components/Loading'
import './Exhibitions.css'

function Exhibitions() {
  const { type = 'current' } = useParams()
  const [exhibitions, setExhibitions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadExhibitions()
  }, [type])

  const loadExhibitions = async () => {
    setLoading(true)
    try {
      const data = await googleSheetsService.getExhibitionsByType(type)
      setExhibitions(data)
    } catch (error) {
      console.error('Error loading exhibitions:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="exhibitions-page">
      <div className="exhibitions-header">
        <h1>EVENTS & EXHIBITIONS</h1>
        <div className="exhibition-tabs">
          <Link 
            to="/exhibitions/current" 
            className={`tab ${type === 'current' ? 'active' : ''}`}
          >
            current
          </Link>
          <span className="tab-separator">/</span>
          <Link 
            to="/exhibitions/past" 
            className={`tab ${type === 'past' ? 'active' : ''}`}
          >
            past
          </Link>
          <span className="tab-separator">/</span>
          <Link 
            to="/exhibitions/upcoming" 
            className={`tab ${type === 'upcoming' ? 'active' : ''}`}
          >
            upcoming
          </Link>
        </div>
      </div>

      {exhibitions.length === 0 ? (
        <div className="no-exhibitions">
          <p>No {type} exhibitions available.</p>
          <p className="hint">Add exhibitions to the Google Sheets with appropriate dates.</p>
        </div>
      ) : (
        <div className="exhibitions-list">
          {exhibitions.map((exhibition, index) => (
            <div key={index} className="exhibition-card">
              {exhibition.imageUrl && (
                <div className="exhibition-image-container">
                  <img 
                    src={exhibition.imageUrl} 
                    alt={exhibition.title} 
                    className="exhibition-image" 
                  />
                </div>
              )}
              <div className="exhibition-content">
                <h2 className="exhibition-title">{exhibition.title}</h2>
                <div className="exhibition-details">
                  <p className="venue">{exhibition.venue}</p>
                  <p className="location">{exhibition.location}</p>
                  {exhibition.startDate && exhibition.endDate && (
                    <p className="dates">
                      {new Date(exhibition.startDate).toLocaleDateString('en-US', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })} - {new Date(exhibition.endDate).toLocaleDateString('en-US', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  )}
                  {exhibition.description && (
                    <p className="description">{exhibition.description}</p>
                  )}
                  {exhibition.websiteUrl && (
                    <a 
                      href={exhibition.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="exhibition-link"
                    >
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Exhibitions
