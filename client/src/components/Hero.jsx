import { useEffect, useRef, useState } from 'react'
import './Hero.css'

/* Bubble config — generated once */
const BUBBLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  size: 4 + Math.random() * 22,
  left: Math.random() * 100,
  delay: Math.random() * 12,
  duration: 8 + Math.random() * 14,
  opacity: 0.15 + Math.random() * 0.45,
}))

const STATS = [
  { value: '200+', label: 'Happy Clients' },
  { value: '5★',  label: 'Rated Service' },
  { value: 'Same', label: 'Day Booking' },
  { value: 'GTA',  label: '& Surroundings' },
]

export default function Hero() {
  const [counted, setCounted] = useState(false)
  const statsRef = useRef(null)

  /* trigger stat counter once visible */
  useEffect(() => {
    if (!statsRef.current) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCounted(true) },
      { threshold: 0.5 }
    )
    obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  const scroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="home" aria-label="Hero">
      {/* Animated bubble particles */}
      <div className="hero__bubbles" aria-hidden="true">
        {BUBBLES.map((b) => (
          <span
            key={b.id}
            className="hero__bubble"
            style={{
              width:  `${b.size}px`,
              height: `${b.size}px`,
              left:   `${b.left}%`,
              animationDelay:    `${b.delay}s`,
              animationDuration: `${b.duration}s`,
              opacity: b.opacity,
            }}
          />
        ))}
      </div>

      {/* Radial glow backdrop */}
      <div className="hero__glow hero__glow--left"  aria-hidden="true" />
      <div className="hero__glow hero__glow--right" aria-hidden="true" />

      {/* Main content */}
      <div className="container hero__content">
        <div className="hero__text">
          {/* Eyebrow */}
          <p className="hero__eyebrow">
            <span className="hero__eyebrow-dot" />
            Premium Mobile Car Detailing
          </p>

          {/* Brand name */}
          <h1 className="hero__title font-display">
            <span className="text-chrome">FOAM</span>
            <br />
            <span className="text-chrome">FOX</span>
          </h1>

          {/* Script subtitle */}
          <p className="hero__script font-script">
            Auto Detailing
          </p>

          {/* Tagline */}
          <p className="hero__tagline">
            Premium Care.{' '}
            <span className="text-blue">Immaculate Results.</span>
          </p>

          {/* Description */}
          <p className="hero__desc">
            We bring the detail shop to your driveway. Professional-grade equipment,
            premium products, and an obsession with perfection — every single time.
          </p>

          {/* CTAs */}
          <div className="hero__ctas">
            <button className="btn btn-primary hero__cta-main" onClick={() => scroll('booking')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8"  y1="2" x2="8"  y2="6"/>
                <line x1="3"  y1="10" x2="21" y2="10"/>
              </svg>
              Book Your Detail
            </button>
            <a href="tel:4379292037" className="btn btn-outline hero__cta-call">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.07 10 19.79 19.79 0 011 1.4 2 2 0 013 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91A16 16 0 0013.09 14l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              437-929-2037
            </a>
          </div>
        </div>

        {/* Visual panel */}
        <div className="hero__visual" aria-hidden="true">
          <div className="hero__car-frame">
            <div className="hero__car-glow" />
            {/* Stylised car silhouette in SVG */}
            <svg className="hero__car-svg" viewBox="0 0 420 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Car body */}
              <path
                d="M30 140 Q60 100 120 90 L160 70 Q200 55 240 60 L320 65 Q370 68 400 90 L415 130 Q415 155 390 158 L50 158 Q24 155 30 140Z"
                fill="url(#carBody)"
                stroke="rgba(0,148,255,0.5)"
                strokeWidth="1.5"
              />
              {/* Windshield */}
              <path d="M175 90 L220 62 L310 65 L330 88Z" fill="url(#glass)" stroke="rgba(0,148,255,0.4)" strokeWidth="1"/>
              {/* Roof */}
              <path d="M155 90 L175 90 L330 88 L355 90 Q340 80 310 65 L220 62 L175 90Z" fill="url(#roof)" />
              {/* Wheels */}
              <circle cx="110" cy="158" r="30" fill="#0a0f1f" stroke="rgba(0,148,255,0.5)" strokeWidth="2"/>
              <circle cx="110" cy="158" r="18" fill="#0c1420" stroke="rgba(0,148,255,0.4)" strokeWidth="1.5"/>
              <circle cx="110" cy="158" r="7"  fill="#0094ff" opacity="0.7"/>
              <circle cx="320" cy="158" r="30" fill="#0a0f1f" stroke="rgba(0,148,255,0.5)" strokeWidth="2"/>
              <circle cx="320" cy="158" r="18" fill="#0c1420" stroke="rgba(0,148,255,0.4)" strokeWidth="1.5"/>
              <circle cx="320" cy="158" r="7"  fill="#0094ff" opacity="0.7"/>
              {/* Headlights */}
              <ellipse cx="50" cy="128" rx="12" ry="6" fill="#0094ff" opacity="0.9" filter="url(#glow)"/>
              <ellipse cx="390" cy="128" rx="12" ry="6" fill="#0094ff" opacity="0.5"/>
              {/* Water droplets / foam */}
              {[50,90,150,200,260,320,370].map((x, i) => (
                <circle key={i} cx={x} cy={100 + (i % 3) * 15} r={2 + (i % 3)} fill="rgba(0,200,255,0.6)" opacity="0.7"/>
              ))}
              {/* Defs */}
              <defs>
                <linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#1a2a3a"/>
                  <stop offset="100%" stopColor="#080d18"/>
                </linearGradient>
                <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="rgba(0,148,255,0.25)"/>
                  <stop offset="100%" stopColor="rgba(0,80,200,0.15)"/>
                </linearGradient>
                <linearGradient id="roof" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#1e3048"/>
                  <stop offset="100%" stopColor="#0c1a28"/>
                </linearGradient>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
            </svg>

            {/* Spray water effect */}
            <div className="hero__spray" />

            {/* Feature chips */}
            <div className="hero__chip hero__chip--tl">
              <span>✦</span> Mobile Service
            </div>
            <div className="hero__chip hero__chip--tr">
              <span>✦</span> Same Day
            </div>
            <div className="hero__chip hero__chip--bl">
              <span>✦</span> Premium Products
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
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

      {/* Scroll cue */}
      <a href="#services" className="hero__scroll-cue" aria-label="Scroll to services">
        <div className="hero__scroll-wheel" />
      </a>
    </section>
  )
}
