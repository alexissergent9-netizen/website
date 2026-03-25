import { useSiteData } from '../context/SiteDataContext'
import './Footer.css'

function Footer() {
  const { footerCopyright } = useSiteData()
  return (
    <footer className="container">
      <nav className="footer-nav">
        {footerCopyright}
      </nav>
    </footer>
  )
}

export default Footer
