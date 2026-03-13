import { useState, useEffect } from 'react'
import googleSheetsService from '../services/googleSheetsService'
import './Home.css'

const DEFAULTS = {
  featuredImageUrl: 'https://www.hockney.com/img/gallery/home_images/19D03_850x316_72.jpg',
  featuredImageAlt: 'The Entrance',
  featuredCaption: 'The Entrance, 2019, acrylic on 2 canvases, 36 x 96 in. overall',
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
        <img
          src={config.featuredImageUrl}
          className="home-img-responsive"
          alt={config.featuredImageAlt}
          onError={(e) => { e.target.style.display = 'none' }}
        />
        <div className="home-caption">{config.featuredCaption}</div>
      </main>
    </div>
  )
}

export default Home
