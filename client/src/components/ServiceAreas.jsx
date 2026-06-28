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
              Fully mobile and equipped — we travel across the Greater Toronto Area
              so your vehicle gets detailed wherever you are. Home, office, or anywhere
              in between.
            </p>

            <div className="areas__highlights">
              <div className="areas__highlight">
                <div className="areas__highlight-icon">📍</div>
                <div>
                  <p className="areas__highlight-title">Serving 24+ Cities</p>
                  <p className="areas__highlight-desc">Across the Greater Toronto Area and beyond</p>
                </div>
              </div>
              <div className="areas__highlight">
                <div className="areas__highlight-icon">🚚</div>
                <div>
                  <p className="areas__highlight-title">We Bring Everything</p>
                  <p className="areas__highlight-desc">Water, power, professional equipment — all included</p>
                </div>
              </div>
              <div className="areas__highlight">
                <div className="areas__highlight-icon">📞</div>
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
