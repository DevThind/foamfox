import { useState } from 'react'
import { WHATSAPP_BOOKING_URL } from '../utils/contact'
import './Services.css'

const VEHICLE_TYPES = ['Sedan', 'SUV (5-Seat)', 'SUV (7-Seat)', 'Minivan', 'Truck']

const PRICE_MULT = {
  Sedan: 1,
  'SUV (5-Seat)': 1.15,
  'SUV (7-Seat)': 1.25,
  Minivan: 1.3,
  Truck: 1.35,
}

const SERVICES = [
  {
    id: 'exterior',
    icon: 'EXT',
    name: 'Exterior Detail',
    tagline: 'Clean paint, clear glass, dressed tires.',
    basePrice: 119,
    duration: '1 - 1.5 hrs',
    color: 'blue',
    features: [
      'Hand wash and hand dry',
      'Wheel, rim, and brake dust removal',
      'Bug and tar removal from paint',
      'Exterior trim and door jamb cleaning',
      'Streak-free glass on all windows',
      'Tire dressing and sheen coat',
    ],
  },
  {
    id: 'interior',
    icon: 'INT',
    name: 'Interior Detail',
    tagline: 'A reset for seats, carpets, vents, and trim.',
    basePrice: 149,
    duration: '1.5 - 2 hrs',
    color: 'blue',
    features: [
      'Full vacuum for seats, carpets, and trunk',
      'Salt and stain extraction',
      'Interior shampoo and carpet steam',
      'Upholstery and leather cleaning',
      'Dashboard, vents, and console detail',
      'Streak-free interior windows',
    ],
  },
  {
    id: 'full',
    icon: 'FULL',
    name: 'Full Detail',
    tagline: 'The complete Foam Fox interior and exterior package.',
    basePrice: 229,
    duration: '2.5 - 3 hrs',
    popular: true,
    color: 'gold',
    features: [
      'Everything in Interior and Exterior',
      'Premium paint sealant application',
      'Paint decontamination treatment',
      'High-gloss protective finish',
      'Complimentary leather conditioning',
      'Full steam sanitation treatment',
      'Interior and exterior finishing touches',
    ],
  },
  {
    id: 'premium',
    icon: 'PRO',
    name: 'Premium Package',
    tagline: 'Showroom finish with deeper correction and protection.',
    basePrice: 399,
    duration: '4 - 5 hrs',
    color: 'silver',
    features: [
      'Everything in Full Detail',
      'Single-stage paint correction',
      'Ceramic coating protection layer',
      'Engine bay deep clean',
      'Pet hair and odour elimination',
      'Bi-weekly maintenance option',
      'Priority scheduling guaranteed',
    ],
  },
]

function formatPrice(base, vehicle) {
  return Math.round(base * PRICE_MULT[vehicle])
}

export default function Services() {
  const [vehicle, setVehicle] = useState('Sedan')

  return (
    <section className="services section section-dark" id="services">
      <div className="container">
        <div className="services__header reveal">
          <p className="eyebrow">Our Services</p>
          <h2 className="section-heading">
            Packages Built for <span className="text-blue">Every Need</span>
          </h2>
          <p className="section-sub">
            From a quick exterior refresh to a full ceramic-coated showroom finish,
            choose the package that fits your vehicle and goals.
          </p>
        </div>

        <div className="services__vehicle-tabs reveal delay-1">
          <p className="services__vehicle-label">Select your vehicle</p>
          <div className="services__vehicle-pills">
            {VEHICLE_TYPES.map((v) => (
              <button
                key={v}
                className={`services__pill ${vehicle === v ? 'services__pill--active' : ''}`}
                onClick={() => setVehicle(v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="services__grid">
          {SERVICES.map((svc, i) => (
            <div
              key={svc.id}
              className={`services__card reveal delay-${i + 1} ${svc.popular ? 'services__card--popular' : ''} services__card--${svc.color}`}
            >
              {svc.popular && (
                <div className="services__popular-badge">Most Popular</div>
              )}

              <div className="services__card-top">
                <span className="services__icon" aria-hidden="true">{svc.icon}</span>
                <div>
                  <h3 className="services__name font-display">{svc.name}</h3>
                  <p className="services__tagline">{svc.tagline}</p>
                </div>
              </div>

              <div className="services__price-row">
                <div className="services__price">
                  <span className="services__price-from">from</span>
                  <span className="services__price-amount font-display">
                    ${formatPrice(svc.basePrice, vehicle)}
                  </span>
                  <span className="services__price-unit">+ tax</span>
                </div>
                <div className="services__duration">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                  </svg>
                  {svc.duration}
                </div>
              </div>

              <ul className="services__features">
                {svc.features.map((f) => (
                  <li key={f} className="services__feature">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={WHATSAPP_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn ${svc.popular ? 'btn-primary' : 'btn-outline'} services__btn`}
              >
                Book This Package
              </a>
            </div>
          ))}
        </div>

        <p className="services__disclaimer">
          * Prices listed are starting rates for a {vehicle}. Final price may vary based on vehicle condition.
          Contact us for a free quote.
        </p>
      </div>
    </section>
  )
}
