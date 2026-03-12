import { useState, useEffect } from 'react'
import './ConsentNotice.css'

function ConsentNotice() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Verificar si el usuario ya aceptó o rechazó las cookies
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="cookie-banner">
      <p className="cookie-text">
        We use cookies to analyze our traffic. Please decide if you are willing to
        accept cookies from our website.
      </p>
      <div className="cookie-buttons">
        <button onClick={handleAccept} className="cookie-btn accept">
          ACCEPT
        </button>
        <button onClick={handleDecline} className="cookie-btn decline">
          DECLINE
        </button>
      </div>
    </div>
  )
}

export default ConsentNotice
