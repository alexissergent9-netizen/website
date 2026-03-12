import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ConsentNotice from './components/ConsentNotice'
import Home from './pages/Home'
import Works from './pages/Works'
import WorksCategory from './pages/WorksCategory'
import Exhibitions from './pages/Exhibitions'
import Resources from './pages/Resources'
import Press from './pages/Press'
import Contact from './pages/Contact'
import './styles/App.css'

function App() {
  return (
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
            <Route path="/exhibitions/:type" element={<Exhibitions />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/press" element={<Navigate to="/press/articles" replace />} />
            <Route path="/press/articles" element={<Press />} />
            <Route path="/press/articles/past" element={<Press />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
