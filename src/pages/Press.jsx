import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import googleSheetsService from '../services/googleSheetsService'
import { useSiteData } from '../context/SiteDataContext'
import Loading from '../components/Loading'
import './Press.css'

const DEFAULT_CONFIG = {
  featuredImageUrl: '',
  featuredImageAlt: '',
  featuredCaption: '',
}

function Press() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [pressConfig, setPressConfig] = useState(DEFAULT_CONFIG)
  const location = useLocation()
  const { navSubitems } = useSiteData()

  const isPast = location.pathname.includes('/past')
  const type = isPast ? 'past' : 'current'

  const pressArticleItems = navSubitems
    .filter(i => i.section === 'press' && (i.parent || '') === 'articles')
    .filter(i => {
      const val = String(i.enabled ?? 'true').toLowerCase().trim()
      return val !== 'false' && val !== '0' && val !== 'no'
    })

  useEffect(() => {
    googleSheetsService.getPageConfig('press')
      .then(data => { if (Object.keys(data).length > 0) setPressConfig({ ...DEFAULT_CONFIG, ...data }) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    loadPress()
  }, [type])

  const loadPress = async () => {
    setLoading(true)
    try {
      const data = await googleSheetsService.getPressByType(type)
      const sorted = data.sort((a, b) => {
        const yearDiff = b.year - a.year
        if (yearDiff !== 0) return yearDiff
        return new Date(b.date) - new Date(a.date)
      })
      setArticles(sorted)
    } catch (error) {
      console.error('Error loading press:', error)
    } finally {
      setLoading(false)
    }
  }

  const groupByYear = (articles) => {
    const grouped = {}
    articles.forEach(article => {
      const year = article.year || new Date(article.date).getFullYear()
      if (!grouped[year]) grouped[year] = []
      grouped[year].push(article)
    })
    return grouped
  }

  if (loading) return <Loading />

  const articlesByYear = groupByYear(articles)
  const years = Object.keys(articlesByYear).sort((a, b) => b - a)

  return (
    <div className="press-page">
      {/* Breadcrumb */}
      <ol className="breadcrumb breadcrumb-main">
        <li className="title">
          <Link to="/press/articles">PRESS</Link>
        </li>
        <li className="title">
          <Link to="/press/articles">ARTICLES</Link>
        </li>
      </ol>

      <hr className="press-divider" />

      <div className="press-layout">
        {/* Columna izquierda - Imagen */}
        <main className="press-main">
          <article className="press-main-content">
            {pressConfig.featuredImageUrl && (
              <img
                src={pressConfig.featuredImageUrl}
                alt={pressConfig.featuredImageAlt}
                onError={(e) => { e.target.style.display = 'none' }}
              />
            )}
            <figure>{pressConfig.featuredCaption}</figure>
          </article>
        </main>

        {/* Columna derecha - Artículos */}
        <aside className="press-aside">
          <div className="press-aside-content">
            <h2>Articles</h2>

            <ul className="pagination-list">
              {pressArticleItems.map(item => (
                <li key={item.key}>
                  <Link to={item.url} className={location.pathname === item.url ? 'active' : ''}>
                    {item.label.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>

            {articles.length === 0 ? (
              <div className="no-press">
                <p>No {type} articles available yet.</p>
              </div>
            ) : (
              <div className="articles-content">
                {years.map(year => (
                  <div key={year} className="year-section">
                    <h3>{year}</h3>
                    <ul className="information-list">
                      {articlesByYear[year].map((article, index) => (
                        <li key={index}>
                          <h4>{article.title}</h4>
                          {article.linkText && article.url && (
                            <p>
                              <a href={article.url} target="_blank" rel="noopener noreferrer">
                                {article.linkText}
                              </a>
                            </p>
                          )}
                          {(article.author || article.source || article.date) && (
                            <p>
                              {article.author && <span>{article.author}</span>}
                              {article.author && article.source && <span> / </span>}
                              {article.source && <span>{article.source}</span>}
                              {(article.author || article.source) && article.date && <span> / </span>}
                              {article.date && (
                                <span>
                                  {new Date(article.date).toLocaleDateString('en-US', {
                                    day: 'numeric', month: 'long', year: 'numeric'
                                  })}
                                </span>
                              )}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Press
