import { useSiteData } from '../context/SiteDataContext'
import './Footer.css'

function Footer() {
  const { footerCopyright } = useSiteData()
  return (
    <footer className="container">
      <nav className="footer-nav">
        {footerCopyright}
      </nav>
      <div className="footer-dev">
        Site developed by{' '}
        <a href="https://luiscodev.com" target="_blank" rel="noopener noreferrer" className="footer-dev-link">
          luiscodev
        </a>
      </div>
    </footer>
  )
}

export default Footer
