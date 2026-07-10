import { useEffect, useRef, useState } from 'react'
import heroDetailingBay from '../assets/hero-detailing-bay.png'
import { WHATSAPP_BOOKING_URL } from '../utils/contact'
import './Hero.css'

const BUBBLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  size: 4 + Math.random() * 22,
  left: Math.random() * 100,
  delay: Math.random() * 12,
  duration: 8 + Math.random() * 14,
  opacity: 0.15 + Math.random() * 0.45,
}))

const STATS = [
  { value: '200+', label: 'Vehicles Detailed' },
  { value: '5.0', label: 'Client Rated' },
  { value: '7 days', label: 'Mobile Service' },
  { value: 'GTA', label: 'Service Area' },
]

const TRUST_ITEMS = ['Self-contained setup', 'Paint-safe products', '1-hour confirmation']

const SERVICE_HIGHLIGHTS = [
  'Interior shampoo and stain extraction',
  'Exterior foam wash and gloss finish',
  'At-home or office appointments',
]

const PROOF_POINTS = [
  { value: '01', label: 'Inspect' },
  { value: '02', label: 'Deep clean' },
  { value: '03', label: 'Protect' },
]

export default function Hero() {
  const [counted, setCounted] = useState(false)
  const statsRef = useRef(null)

  useEffect(() => {
    if (!statsRef.current) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCounted(true) },
      { threshold: 0.5 }
    )
    obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="hero" id="home" aria-label="Hero">
      <div className="hero__bubbles" aria-hidden="true">
        {BUBBLES.map((b) => (
          <span
            key={b.id}
            className="hero__bubble"
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: `${b.left}%`,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
              opacity: b.opacity,
            }}
          />
        ))}
      </div>

      <div className="hero__glow hero__glow--left" aria-hidden="true" />
      <div className="hero__glow hero__glow--right" aria-hidden="true" />

      <div className="container hero__content">
        <div className="hero__text">
          <p className="hero__eyebrow">
            <span className="hero__eyebrow-dot" />
            Premium Mobile Auto Detailing
          </p>

          <h1 className="hero__title font-display">
            <span className="text-chrome">DETAILING</span>
            <br />
            <span className="text-chrome">
              THAT<span className="hero__desktop-space"> </span>
              <br className="hero__mobile-break" />SHOWS
            </span>
          </h1>

          <p className="hero__script font-script">Auto Detailing</p>

          <p className="hero__tagline">
            Foam Fox brings <span className="text-blue">showroom-level care</span> to your driveway.
          </p>

          <p className="hero__desc">
            Professional interior shampoo, exterior foam wash, trim care, glass cleaning,
            and finishing touches handled by a fully mobile team across the GTA.
          </p>

          <div className="hero__proof-row" aria-label="Detailing process">
            {PROOF_POINTS.map((item) => (
              <span key={item.value} className="hero__proof-pill">
                <strong>{item.value}</strong>
                {item.label}
              </span>
            ))}
          </div>

          <div className="hero__trust" aria-label="Service highlights">
            {TRUST_ITEMS.map((item) => (
              <span key={item} className="hero__trust-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {item}
              </span>
            ))}
          </div>

          <div className="hero__ctas">
            <a
              href={WHATSAPP_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary hero__cta-main"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Book on WhatsApp
            </a>
            <a href="tel:4379292037" className="btn btn-outline hero__cta-call">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.07 10 19.79 19.79 0 011 1.4 2 2 0 013 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91A16 16 0 0013.09 14l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              437-929-2037
            </a>
          </div>

          <ul className="hero__service-list">
            {SERVICE_HIGHLIGHTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__photo-showcase">
            <div className="hero__photo-glow" />
            <img className="hero__car-photo" src={heroDetailingBay} alt="" />

            <div className="hero__visual-label">
              <span>Premium finish bay</span>
              <strong>Gloss, glass, trim, tires</strong>
            </div>

            <div className="hero__chip hero__chip--tl">
              <span />
              Mobile Service
            </div>
            <div className="hero__chip hero__chip--tr">
              <span />
              Gloss Finish
            </div>
            <div className="hero__chip hero__chip--bl">
              <span />
              Premium Products
            </div>
            <div className="hero__finish-panel">
              <span className="hero__finish-label">Current focus</span>
              <strong>Deep clean + paint-safe shine</strong>
              <span>Interior, exterior, glass, tires, trim</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__stats" ref={statsRef}>
        <div className="container">
          <div className="hero__stats-grid">
            {STATS.map(({ value, label }) => (
              <div key={label} className={`hero__stat ${counted ? 'counted' : ''}`}>
                <span className="hero__stat-value font-display">{value}</span>
                <span className="hero__stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <a href="#services" className="hero__scroll-cue" aria-label="Scroll to services">
        <div className="hero__scroll-wheel" />
      </a>
    </section>
  )
}
