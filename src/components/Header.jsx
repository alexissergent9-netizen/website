import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/home" className="logo">
          <h1>DAVIDHOCKNEY</h1>
        </Link>
        <nav className="main-nav">
          <Link to="/press" className="nav-link">Press</Link>
          <Link to="/exhibitions/current" className="nav-link">Exhibitions</Link>
          <Link to="/works" className="nav-link">Works</Link>
          <Link to="/resources" className="nav-link">Resources</Link>
          <Link to="/contact" className="nav-link">Contacts</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
