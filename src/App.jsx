import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { SiteDataProvider } from './context/SiteDataContext'
import Header from './components/Header'
import Footer from './components/Footer'
import ConsentNotice from './components/ConsentNotice'
import Home from './pages/Home'
import Works from './pages/Works'
import WorksCategory from './pages/WorksCategory'
import Exhibitions from './pages/Exhibitions'
import Resources from './pages/Resources'
import ResourcesSubpage from './pages/ResourcesSubpage'
import Press from './pages/Press'
import Contact from './pages/Contact'
import ContactSubpage from './pages/ContactSubpage'
import SetupGuide from './pages/SetupGuide'
import './styles/App.css'

function App() {
  return (
    <SiteDataProvider>
      <Router>
        <div className="app">
          <Header />
          <ConsentNotice />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/works" element={<Works />} />
              <Route path="/works/:category" element={<WorksCategory />} />
              <Route path="/works/:category/:subcategory" element={<WorksCategory />} />
              <Route path="/exhibitions/:type" element={<Exhibitions />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/resources/:section" element={<ResourcesSubpage />} />
              <Route path="/press" element={<Navigate to="/press/articles" replace />} />
              <Route path="/press/articles" element={<Press />} />
              <Route path="/press/articles/past" element={<Press />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/contact/:section" element={<ContactSubpage />} />
              <Route path="/setup" element={<SetupGuide />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </SiteDataProvider>
  )
}

export default App
