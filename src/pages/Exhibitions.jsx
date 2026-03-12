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

  const getTypeLabel = () => {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="exhibitions-container">
      {/* Breadcrumb */}
      <ol className="exhibitions-breadcrumb">
        <li className="title">
          <Link to="/exhibitions/current">EVENTS & EXHIBITIONS</Link>
        </li>
        <li className="title">
          <Link to={`/exhibitions/${type}`}>{getTypeLabel().toUpperCase()}</Link>
        </li>
      </ol>

      {/* Sub Navigation */}
      <ol className="exhibitions-subnav">
        <li>
          <Link 
            to="/exhibitions/current" 
            className={type === 'current' ? 'active' : ''}
          >
            CURRENT
          </Link>
        </li>
        <li>
          <Link 
            to="/exhibitions/past" 
            className={type === 'past' ? 'active' : ''}
          >
            PAST
          </Link>
        </li>
        <li>
          <Link 
            to="/exhibitions/upcoming" 
            className={type === 'upcoming' ? 'active' : ''}
          >
            UPCOMING
          </Link>
        </li>
      </ol>

      <hr className="exhibitions-divider" />

      {/* Main Content */}
      <main className="exhibitions-main">
        <article className="exhibitions-main-content">
          {exhibitions.length === 0 ? (
            <div className="no-exhibitions">
              <p>No {type} exhibitions available.</p>
            </div>
          ) : (
            exhibitions.map((exhibition, index) => (
              <div key={index} className="exhibition-row">
                <div className="exhibition-image-column">
                  {exhibition.imageUrl && (
                    <>
                      <img 
                        src={exhibition.imageUrl} 
                        alt={exhibition.title} 
                        className="exhibition-img" 
                      />
                      {exhibition.description && (
                        <figure>{exhibition.description}</figure>
                      )}
                    </>
                  )}
                </div>
                <div className="exhibition-text-column">
                  <div className="exhibition-vertical-center">
                    <h3>{exhibition.title}</h3>
                    <p className="exhibition-location">
                      <b>{exhibition.location}</b>
                    </p>
                    {exhibition.startDate && (
                      <p className="exhibition-dates">
                        <b>
                          {new Date(exhibition.startDate).toLocaleDateString('en-US', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                          {exhibition.endDate && (
                            <> - {new Date(exhibition.endDate).toLocaleDateString('en-US', { 
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric' 
                            })}</>
                          )}
                        </b>
                      </p>
                    )}
                    {exhibition.url && (
                      <a 
                        href={exhibition.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="exhibition-link"
                      >
                        {new URL(exhibition.url).hostname.replace('www.', '')}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </article>
      </main>
    </div>
  )
}

export default Exhibitions
