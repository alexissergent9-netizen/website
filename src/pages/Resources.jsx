import { useState, useEffect } from 'react'
import googleSheetsService from '../services/googleSheetsService'
import Loading from '../components/Loading'
import './Resources.css'

function Resources() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadResources()
  }, [])

  const loadResources = async () => {
    try {
      const data = await googleSheetsService.getResources()
      setResources(data)
    } catch (error) {
      console.error('Error loading resources:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  // Recursos predeterminados si la hoja está vacía
  const defaultResources = [
    {
      title: 'The David Hockney Foundation',
      linkUrl: 'http://www.thedavidhockneyfoundation.org/',
      type: 'external'
    },
    {
      title: 'Galleries',
      linkUrl: '/resources/galleries',
      type: 'internal'
    },
    {
      title: "Making 'Works'",
      linkUrl: '/resources/making_works',
      type: 'internal'
    },
    {
      title: 'Publications',
      linkUrl: '/resources/publications',
      type: 'internal'
    },
    {
      title: 'Works In Public Collections',
      linkUrl: '/resources/public_collections',
      type: 'internal'
    }
  ]

  const displayResources = resources.length > 0 ? resources : defaultResources

  return (
    <div className="resources-page">
      <div className="resources-header">
        <h1>RESOURCES</h1>
        <p className="resources-description">
          This website represents an overview of David Hockney's work from the early
          1950's to the present day. It is organized by categories with sub-menus for each
          discipline.
        </p>
        <p className="resources-subdescription">
          Although not exhaustive it is thorough and you can find current and past events,
          exhibitions, biographical and reference data.
        </p>
      </div>

      <div className="resources-list">
        <h2 className="section-title">RESOURCES</h2>
        {displayResources.map((resource, index) => (
          <div key={index} className="resource-item">
            {resource.type === 'external' || resource.linkUrl?.startsWith('http') ? (
              <a 
                href={resource.linkUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="resource-link"
              >
                {resource.title}
              </a>
            ) : (
              <a href={resource.linkUrl} className="resource-link">
                {resource.title}
              </a>
            )}
            {resource.description && (
              <p className="resource-description">{resource.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Resources
