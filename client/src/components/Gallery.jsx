import { useState, useRef, useCallback } from 'react'
import './Gallery.css'

/* Before/After items — using CSS gradients as placeholders (replace with real photos) */
const BEFORE_AFTER = [
  {
    id: 1,
    label: 'Interior Shampoo',
    vehicle: 'SUV',
    service: 'Interior Detail',
    before: 'linear-gradient(135deg, #2a1a0a 0%, #3d2510 50%, #1f1208 100%)',
    after:  'linear-gradient(135deg, #1a2535 0%, #243040 50%, #0e1a28 100%)',
    beforeLabel: 'Stained & Worn',
    afterLabel:  'Like-New Finish',
  },
  {
    id: 2,
    label: 'Exterior Wash',
    vehicle: 'Sedan',
    service: 'Exterior Detail',
    before: 'linear-gradient(135deg, #1e1e14 0%, #2a2a18 50%, #111108 100%)',
    after:  'linear-gradient(135deg, #0a1622 0%, #122030 50%, #060e18 100%)',
    beforeLabel: 'Road Grime & Bugs',
    afterLabel:  'Showroom Shine',
  },
  {
    id: 3,
    label: 'Full Detail',
    vehicle: 'Truck',
    service: 'Premium Package',
    before: 'linear-gradient(135deg, #251510 0%, #301a10 50%, #180c08 100%)',
    after:  'linear-gradient(135deg, #0c1820 0%, #142433 50%, #080f18 100%)',
    beforeLabel: 'Heavy Build-Up',
    afterLabel:  'Ceramic Protected',
  },
]

/* Drag-to-reveal before/after slider */
function BeforeAfterSlider({ item }) {
  const [split, setSplit] = useState(50)
  const containerRef = useRef(null)
  const dragging = useRef(false)

  const updateSplit = useCallback((clientX) => {
    if (!containerRef.current) return
    const { left, width } = containerRef.current.getBoundingClientRect()
    const pct = Math.min(100, Math.max(0, ((clientX - left) / width) * 100))
    setSplit(pct)
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (!dragging.current) return
    updateSplit(e.clientX)
  }, [updateSplit])

  const handleTouchMove = useCallback((e) => {
    updateSplit(e.touches[0].clientX)
  }, [updateSplit])

  return (
    <div
      className="ba-slider"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={() => { dragging.current = false }}
      onMouseLeave={() => { dragging.current = false }}
      onTouchMove={handleTouchMove}
      role="img"
      aria-label={`Before and after: ${item.label}`}
    >
      {/* Before layer */}
      <div
        className="ba-layer ba-before"
        style={{ background: item.before }}
      >
        <div className="ba-car-silhouette ba-car--dirty" />
        <span className="ba-label ba-label--before">{item.beforeLabel}</span>
      </div>

      {/* After layer (clipped) */}
      <div
        className="ba-layer ba-after"
        style={{ background: item.after, clipPath: `inset(0 ${100 - split}% 0 0)` }}
      >
        <div className="ba-car-silhouette ba-car--clean" />
        <span className="ba-label ba-label--after">{item.afterLabel}</span>
      </div>

      {/* Divider handle */}
      <div
        className="ba-divider"
        style={{ left: `${split}%` }}
        onMouseDown={(e) => { e.preventDefault(); dragging.current = true }}
        onTouchStart={() => {}}
      >
        <div className="ba-handle">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M7 9l-4 3 4 3M17 9l4 3-4 3"/>
          </svg>
        </div>
      </div>

      {/* Badge */}
      <div className="ba-badge">
        <span className="ba-badge-service">{item.service}</span>
        <span className="ba-badge-vehicle">{item.vehicle}</span>
      </div>
    </div>
  )
}

export default function Gallery() {
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <section className="gallery section section-alt" id="gallery">
      <div className="container">
        {/* Header */}
        <div className="gallery__header reveal">
          <p className="eyebrow">Results</p>
          <h2 className="section-heading">
            See the{' '}
            <span className="text-blue">Foam Fox</span> Difference
          </h2>
          <p className="section-sub">
            Drag the slider to reveal the transformation. Every job tells a story.
          </p>
        </div>

        {/* Main slider */}
        <div className="gallery__main reveal delay-1">
          <BeforeAfterSlider item={BEFORE_AFTER[activeIdx]} />
        </div>

        {/* Thumbnails */}
        <div className="gallery__thumbs reveal delay-2">
          {BEFORE_AFTER.map((item, i) => (
            <button
              key={item.id}
              className={`gallery__thumb ${activeIdx === i ? 'gallery__thumb--active' : ''}`}
              onClick={() => setActiveIdx(i)}
              aria-label={`View ${item.label} transformation`}
            >
              <div
                className="gallery__thumb-preview"
                style={{ background: item.after }}
              />
              <div className="gallery__thumb-info">
                <p className="gallery__thumb-label">{item.label}</p>
                <p className="gallery__thumb-vehicle">{item.vehicle}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="gallery__instagram reveal delay-3">
          <div className="gallery__ig-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </div>
          <div className="gallery__ig-text">
            <p className="gallery__ig-heading">Follow Our Work</p>
            <p className="gallery__ig-sub">
              Real transformations, updated daily on Instagram
            </p>
          </div>
          <a
            href="https://www.instagram.com/foamfox_auto_detailing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline gallery__ig-btn"
          >
            @foamfox_auto_detailing
          </a>
        </div>
      </div>
    </section>
  )
}
