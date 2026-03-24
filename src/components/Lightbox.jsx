import { useEffect, useCallback, useState, useRef } from 'react'
import './Lightbox.css'

function Lightbox({ works, index, onClose, onChangeIndex }) {
  const [scale, setScale] = useState(1)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)

  const overlayRef = useRef(null)
  const dragStart = useRef(null)
  const currentOffset = useRef({ x: 0, y: 0 })
  const hasDragged = useRef(false)

  const work = works[index]
  const total = works.length

  const caption = work
    ? [
        work.title,
        [work.year, work.medium, work.dimensions].filter(Boolean).join(' - '),
      ]
        .filter(Boolean)
        .join(', ')
    : ''

  const resetPosition = () => {
    setOffset({ x: 0, y: 0 })
    currentOffset.current = { x: 0, y: 0 }
  }

  const goNext = useCallback(() => {
    if (index < total - 1) {
      setScale(1)
      setImgLoaded(false)
      resetPosition()
      onChangeIndex(index + 1)
    }
  }, [index, total, onChangeIndex])

  const goPrev = useCallback(() => {
    if (index > 0) {
      setScale(1)
      setImgLoaded(false)
      resetPosition()
      onChangeIndex(index - 1)
    }
  }, [index, onChangeIndex])

  const zoomIn = () => setScale(s => Math.min(s * 1.3, 5))
  const zoomOut = () => setScale(s => {
    const next = Math.max(s / 1.3, 0.3)
    if (next <= 1) resetPosition()
    return next
  })
  const zoomReset = () => { setScale(1); resetPosition() }

  // Keyboard
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === '+' || e.key === '=') zoomIn()
      if (e.key === '-') zoomOut()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [goNext, goPrev, onClose])

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Global mouse move/up for drag
  useEffect(() => {
    const onMove = (e) => {
      if (!dragStart.current) return
      hasDragged.current = true
      const newX = e.clientX - dragStart.current.x
      const newY = e.clientY - dragStart.current.y
      currentOffset.current = { x: newX, y: newY }
      setOffset({ x: newX, y: newY })
    }
    const onUp = () => {
      dragStart.current = null
      setDragging(false)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  // Reset on image change
  useEffect(() => {
    setScale(1)
    setImgLoaded(false)
    resetPosition()
  }, [index])

  // Scroll wheel zoom
  const handleWheel = (e) => {
    e.preventDefault()
    if (e.deltaY < 0) zoomIn()
    else zoomOut()
  }

  // Start drag (only when zoomed in)
  const handleMouseDown = (e) => {
    if (scale <= 1) return
    e.preventDefault()
    hasDragged.current = false
    dragStart.current = {
      x: e.clientX - currentOffset.current.x,
      y: e.clientY - currentOffset.current.y,
    }
    setDragging(true)
  }

  // Close overlay — only if user didn't drag
  const handleOverlayClick = (e) => {
    if (hasDragged.current) { hasDragged.current = false; return }
    if (e.target === overlayRef.current) onClose()
  }

  const cursor = scale > 1 ? (dragging ? 'grabbing' : 'grab') : 'default'

  if (!work) return null

  return (
    <div
      className="lb-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      {/* Close */}
      <button className="lb-close" onClick={onClose} aria-label="Close">✕</button>

      {/* Counter */}
      <div className="lb-counter">{index + 1} / {total}</div>

      {/* Zoom controls */}
      <div className="lb-zoom-controls">
        <button className="lb-zoom-btn" onClick={zoomOut} title="Zoom out">−</button>
        <button className="lb-zoom-btn" onClick={zoomReset} title="Reset zoom">⊙</button>
        <button className="lb-zoom-btn" onClick={zoomIn} title="Zoom in">+</button>
      </div>

      {/* Prev arrow */}
      {index > 0 && (
        <button className="lb-arrow lb-arrow-prev" onClick={goPrev} aria-label="Previous">‹</button>
      )}

      {/* Image container */}
      <div
        className="lb-image-wrap"
        style={{ cursor }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
      >
        {!imgLoaded && <div className="lb-spinner" />}
        <img
          key={work.imageUrl}
          src={work.imageUrl}
          alt={work.title}
          className="lb-image"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            opacity: imgLoaded ? 1 : 0,
            transition: dragging ? 'opacity 0.25s ease' : 'transform 0.2s ease, opacity 0.25s ease',
          }}
          onLoad={() => setImgLoaded(true)}
          draggable={false}
        />
      </div>

      {/* Next arrow */}
      {index < total - 1 && (
        <button className="lb-arrow lb-arrow-next" onClick={goNext} aria-label="Next">›</button>
      )}

      {/* Caption */}
      {caption && (
        <div className="lb-caption">{caption}</div>
      )}
    </div>
  )
}

export default Lightbox
