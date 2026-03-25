import { useState, useEffect } from 'react'
import googleSheetsService from '../services/googleSheetsService'
import './Home.css'

const DEFAULTS = {
  featuredImageUrl: '',
  featuredImageAlt: '',
  featuredCaption: '',
}

function Home() {
  const [config, setConfig] = useState(DEFAULTS)

  useEffect(() => {
    googleSheetsService.getPageConfig('home')
      .then(data => { if (Object.keys(data).length > 0) setConfig({ ...DEFAULTS, ...data }) })
      .catch(() => {})
  }, [])

  return (
    <div className="home-container">
      <main className="home-main-content">
        {config.featuredImageUrl && (
          <img
            src={config.featuredImageUrl}
            className="home-img-responsive"
            alt={config.featuredImageAlt}
            onError={(e) => { e.target.style.display = 'none' }}
          />
        )}
        <div className="home-caption">{config.featuredCaption}</div>
      </main>
    </div>
  )
}

export default Home
