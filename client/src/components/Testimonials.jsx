import { useState, useEffect, useCallback } from 'react'
import './Testimonials.css'

const REVIEWS = [
  {
    id: 1,
    name: 'Harpreet S.',
    city: 'Brampton, ON',
    rating: 5,
    service: 'Full Interior + Exterior',
    text: "Foam Fox is hands down the best detailing service I've used. My Audi looked showroom-new after the full detail. The bubbles and foam cannon were impressive to watch — totally professional. Will be booking monthly!",
    initial: 'H',
    color: '#0094ff',
  },
  {
    id: 2,
    name: 'Priya M.',
    city: 'Mississauga, ON',
    rating: 5,
    service: 'Full Interior',
    text: "I have two kids and a dog — my SUV interior was a disaster. After Foam Fox worked their magic, the seats looked brand new and the car smelled fresh. Booked same-day and they were on time. Highly recommend!",
    initial: 'P',
    color: '#9b59b6',
  },
  {
    id: 3,
    name: 'Jatin K.',
    city: 'Toronto, ON',
    rating: 5,
    service: 'Basic Interior + Exterior',
    text: "Incredible value and quality. They came to my office parking lot, were quick and efficient, and my BMW looked absolutely stunning. The attention to the wheels and trim was exceptional. 5 stars, no question.",
    initial: 'J',
    color: '#27ae60',
  },
  {
    id: 4,
    name: 'Simran T.',
    city: 'Vaughan, ON',
    rating: 5,
    service: 'Full Interior + Exterior',
    text: "I was skeptical about mobile detailing but Foam Fox completely changed my mind. The ceramic coating they applied is phenomenal — water beads right off. My Tesla has never looked this good. Truly premium service.",
    initial: 'S',
    color: '#e67e22',
  },
  {
    id: 5,
    name: 'Ravi N.',
    city: 'Markham, ON',
    rating: 5,
    service: 'Full Interior + Exterior',
    text: "I've tried 4 different detailing services in GTA. Foam Fox is in a league of their own. Super professional, great communication, and the results speak for themselves. My F-150 has never been this clean.",
    initial: 'R',
    color: '#c0392b',
  },
]

function StarRating({ count }) {
  return (
    <div className="stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < count ? '#ffd060' : 'none'}
          stroke={i < count ? '#ffd060' : '#5a7898'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setActive((a) => (a + 1) % REVIEWS.length)
  }, [])

  const prev = useCallback(() => {
    setActive((a) => (a - 1 + REVIEWS.length) % REVIEWS.length)
  }, [])

  /* Auto-advance every 5s unless paused */
  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [next, paused])

  const featured = REVIEWS[active]

  return (
    <section className="testimonials section section-dark" id="testimonials">
      <div className="container">
        {/* Header */}
        <div className="testimonials__header reveal">
          <p className="eyebrow">Reviews</p>
          <h2 className="section-heading">
            What Our Clients{' '}
            <span className="text-blue">Are Saying</span>
          </h2>
          <div className="testimonials__meta">
            <StarRating count={5} />
            <span className="testimonials__avg">5.0 average · 200+ reviews</span>
          </div>
        </div>

        {/* Main featured review */}
        <div
          className="testimonials__featured reveal delay-1"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="testimonials__quote-icon" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M8 28V20c0-4.4 1.8-8 5.4-10.8l2.4 2.4C13.6 13.6 12.4 16 12 18.4h6.4V28H8zm16 0V20c0-4.4 1.8-8 5.4-10.8l2.4 2.4C29.6 13.6 28.4 16 28 18.4h6.4V28H24z" fill="rgba(0,148,255,0.2)"/>
            </svg>
          </div>

          <blockquote className="testimonials__quote">
            "{featured.text}"
          </blockquote>

          <div className="testimonials__reviewer">
            <div
              className="testimonials__avatar"
              style={{ background: `linear-gradient(135deg, ${featured.color}33, ${featured.color}88)`, borderColor: `${featured.color}55` }}
            >
              <span style={{ color: featured.color }}>{featured.initial}</span>
            </div>
            <div className="testimonials__reviewer-info">
              <p className="testimonials__name">{featured.name}</p>
              <p className="testimonials__city">{featured.city}</p>
            </div>
            <div className="testimonials__service-tag">
              <span>{featured.service}</span>
            </div>
            <StarRating count={featured.rating} />
          </div>

          {/* Navigation */}
          <div className="testimonials__nav">
            <button
              className="testimonials__nav-btn"
              onClick={prev}
              aria-label="Previous review"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <div className="testimonials__dots">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  className={`testimonials__dot ${i === active ? 'testimonials__dot--active' : ''}`}
                  onClick={() => setActive(i)}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
            <button
              className="testimonials__nav-btn"
              onClick={next}
              aria-label="Next review"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Reviewer thumbnail strip */}
        <div className="testimonials__strip reveal delay-2">
          {REVIEWS.map((r, i) => (
            <button
              key={r.id}
              className={`testimonials__thumb ${i === active ? 'testimonials__thumb--active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`View review from ${r.name}`}
            >
              <div
                className="testimonials__thumb-avatar"
                style={{
                  background: `linear-gradient(135deg, ${r.color}33, ${r.color}88)`,
                  borderColor: i === active ? r.color : 'transparent',
                }}
              >
                {r.initial}
              </div>
              <span className="testimonials__thumb-name">{r.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
