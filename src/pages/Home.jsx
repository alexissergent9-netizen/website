import { useState, useEffect } from 'react'
import googleSheetsService from '../services/googleSheetsService'
import Loading from '../components/Loading'
import './Home.css'

function Home() {
  const [featuredWork, setFeaturedWork] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFeaturedWork()
  }, [])

  const loadFeaturedWork = async () => {
    try {
      const works = await googleSheetsService.getWorks()
      // Obtener una obra aleatoria o la primera para mostrar
      if (works.length > 0) {
        setFeaturedWork(works[0])
      }
    } catch (error) {
      console.error('Error loading featured work:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="home-page">
      {featuredWork && featuredWork.imageUrl ? (
        <div className="featured-work">
          <img 
            src={featuredWork.imageUrl} 
            alt={featuredWork.title || 'Featured artwork'}
            className="featured-image"
          />
          <div className="featured-caption">
            {featuredWork.title && <h2>{featuredWork.title}</h2>}
            {featuredWork.year && <p className="work-year">{featuredWork.year}</p>}
            {featuredWork.medium && <p className="work-medium">{featuredWork.medium}</p>}
            {featuredWork.dimensions && <p className="work-dimensions">{featuredWork.dimensions}</p>}
          </div>
        </div>
      ) : (
        <div className="home-default">
          <div className="home-hero">
            <h1>DAVID HOCKNEY</h1>
            <p className="home-subtitle">Artista británico contemporáneo</p>
          </div>
          <div className="home-description">
            <p>
              Este sitio web representa una visión general del trabajo de David Hockney desde
              principios de los años 50 hasta la actualidad. Está organizado por categorías con
              submenús para cada disciplina.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
