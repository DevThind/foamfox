import { useState, useRef, useCallback } from 'react'
import interiorBefore from '../assets/gallery/interior-before.jpeg'
import interiorAfter from '../assets/gallery/interior-after.jpeg'
import exteriorBefore from '../assets/gallery/exterior-before.jpeg'
import exteriorAfter from '../assets/gallery/exterior-after.jpeg'
import './Gallery.css'

/* Before/after items */
const BEFORE_AFTER = [
  {
    id: 1,
    label: 'Interior Shampoo',
    vehicle: 'SUV',
    service: 'Full Interior',
    before: interiorBefore,
    after: interiorAfter,
    beforeLabel: 'Before',
    afterLabel: 'After',
  },
  {
    id: 2,
    label: 'Exterior Foam',
    vehicle: 'SUV',
    service: 'Basic Interior + Exterior',
    before: exteriorBefore,
    after: exteriorAfter,
    beforeLabel: 'Before',
    afterLabel: 'After',
  },
]

const RESULT_STATS = [
  { value: '2', label: 'Live sliders' },
  { value: '80-90%', label: 'Stain lift where possible' },
  { value: '100%', label: 'Walkaround before we leave' },
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
        style={{ '--gallery-image': `url(${item.before})` }}
      >
        <span className="ba-label ba-label--before">{item.beforeLabel}</span>
      </div>

      {/* After layer (clipped) */}
      <div
        className="ba-layer ba-after"
        style={{ '--gallery-image': `url(${item.after})`, clipPath: `inset(0 ${100 - split}% 0 0)` }}
      >
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
            Drag the slider to reveal the transformation. Every vehicle gets a finish-focused process.
          </p>
        </div>

        <div className="gallery__stats reveal delay-1">
          {RESULT_STATS.map((stat) => (
            <div key={stat.label} className="gallery__stat">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Main slider */}
        <div className="gallery__main reveal delay-2">
          <div className="gallery__main-badge">Before / After</div>
          <BeforeAfterSlider item={BEFORE_AFTER[activeIdx]} />
        </div>

        {/* Thumbnails */}
        <div className="gallery__thumbs reveal delay-3">
          {BEFORE_AFTER.map((item, i) => (
            <button
              key={item.id}
              className={`gallery__thumb ${activeIdx === i ? 'gallery__thumb--active' : ''}`}
              onClick={() => setActiveIdx(i)}
              aria-label={`View ${item.label} transformation`}
            >
              <div
                className="gallery__thumb-preview"
                style={{ backgroundImage: `url(${item.after})` }}
              />
              <div className="gallery__thumb-info">
                <p className="gallery__thumb-label">{item.label}</p>
                <p className="gallery__thumb-vehicle">{item.vehicle}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="gallery__instagram reveal delay-4">
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
