import { useState, useEffect } from 'react'
import googleSheetsService from '../services/googleSheetsService'
import Loading from '../components/Loading'
import './Press.css'

function Press() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPress()
  }, [])

  const loadPress = async () => {
    try {
      const data = await googleSheetsService.getPress()
      // Ordenar por fecha (más reciente primero)
      const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date))
      setArticles(sorted)
    } catch (error) {
      console.error('Error loading press:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="press-page">
      <div className="press-header">
        <h1>PRESS</h1>
      </div>

      {articles.length === 0 ? (
        <div className="no-press">
          <p>No press articles available yet.</p>
          <p className="hint">Add press articles to the Google Sheets "Press" tab.</p>
        </div>
      ) : (
        <div className="press-list">
          {articles.map((article, index) => (
            <div key={index} className="press-item">
              <div className="press-date">
                {article.date && new Date(article.date).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
              <h2 className="press-title">{article.title}</h2>
              {article.source && (
                <p className="press-source">{article.source}</p>
              )}
              {article.description && (
                <p className="press-description">{article.description}</p>
              )}
              {article.linkUrl && (
                <a 
                  href={article.linkUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="press-link"
                >
                  Read More →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Press
