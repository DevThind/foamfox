import { WHATSAPP_BOOKING_URL } from '../utils/contact'
import './ServiceAreas.css'

const CITIES = [
  'Toronto', 'North York', 'Scarborough', 'Etobicoke',
  'Vaughan', 'Richmond Hill', 'Markham', 'Thornhill',
  'Mississauga', 'Brampton', 'Oakville', 'Newmarket',
  'Aurora', 'Woodbridge', 'Kleinburg', 'Ajax',
  'Pickering', 'Whitby', 'Oshawa', 'Stouffville',
  'King City', 'Caledon', 'Bolton', 'Georgetown',
]

export default function ServiceAreas() {
  return (
    <section className="areas section" id="areas">
      <div className="container">
        <div className="areas__layout">
          {/* Left text */}
          <div className="areas__text reveal-left">
            <p className="eyebrow">Service Coverage</p>
            <h2 className="section-heading">
              We Come to{' '}
              <span className="text-blue">Your Door</span>
            </h2>
            <p className="section-sub">
              Fully mobile and equipped - we travel across the Greater Toronto Area
              so your vehicle gets detailed wherever you are. Home, office, or anywhere
              in between.
            </p>

            <div className="areas__highlights">
              <div className="areas__highlight">
                <div className="areas__highlight-icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="areas__highlight-title">Serving 24+ Cities</p>
                  <p className="areas__highlight-desc">Across the Greater Toronto Area and beyond</p>
                </div>
              </div>
              <div className="areas__highlight">
                <div className="areas__highlight-icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 3h15v13H1z" />
                    <path d="M16 8h4l3 3v5h-7V8z" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <div>
                  <p className="areas__highlight-title">We Bring Everything</p>
                  <p className="areas__highlight-desc">Water, power, professional equipment - all included</p>
                </div>
              </div>
              <div className="areas__highlight">
                <div className="areas__highlight-icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.07 10 19.79 19.79 0 011 1.4 2 2 0 013 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.91A16 16 0 0013.09 14l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                <div>
                  <p className="areas__highlight-title">Not Sure? Just Call</p>
                  <p className="areas__highlight-desc">
                    <a href="tel:4379292037" className="areas__phone-link">437-929-2037</a>
                  </p>
                </div>
              </div>
            </div>

            <a
              href={WHATSAPP_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary areas__cta"
            >
              Check My Area & Book
            </a>
          </div>

          {/* Right: City tags */}
          <div className="areas__tags-wrap reveal-right">
            <div className="areas__map-bg" aria-hidden="true">
              {/* Decorative hexagon map */}
              <svg viewBox="0 0 400 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="areas__map-svg">
                {[
                  [200,60],[160,90],[240,90],[120,120],[200,120],[280,120],
                  [160,150],[240,150],[120,180],[200,180],[280,180],
                  [160,210],[240,210],[200,240],[160,270],[240,270],[200,300],
                ].map(([x,y],i)=>(
                  <polygon
                    key={i}
                    points={`${x},${y-22} ${x+19},${y-11} ${x+19},${y+11} ${x},${y+22} ${x-19},${y+11} ${x-19},${y-11}`}
                    stroke="rgba(0,148,255,0.12)"
                    strokeWidth="1"
                    fill={i % 5 === 0 ? 'rgba(0,148,255,0.05)' : 'none'}
                  />
                ))}
              </svg>
            </div>

            <div className="areas__tags">
              {CITIES.map((city, i) => (
                <span
                  key={city}
                  className="areas__tag reveal"
                  style={{ transitionDelay: `${(i % 6) * 0.07}s` }}
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
