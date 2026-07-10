import { useState } from 'react'
import { createWhatsAppUrl } from '../utils/contact'
import './Services.css'

const VEHICLE_GROUPS = [
  {
    id: 'five',
    label: '5-Seater Sedan/SUV',
    note: 'No pet hair',
  },
  {
    id: 'large',
    label: '7-Seater / Van / Pickup',
    note: 'No pet hair',
  },
]

const PACKAGES = [
  {
    id: 'basic-interior',
    icon: 'BI',
    name: 'Basic Interior',
    tagline: 'A clean interior reset for regular upkeep.',
    result: 'Fresh cabin, dust-free trim, clear glass',
    prices: { five: 90, large: 120 },
    color: 'blue',
    features: [
      'Complete interior vacuum',
      'Dashboard, center console, and door panels wiped down',
      'Cup holders cleaned',
      'Interior windows cleaned',
      'Floor mats vacuumed and cleaned',
      'Light dust and debris removal',
      'Air freshener',
    ],
  },
  {
    id: 'full-interior',
    icon: 'FI',
    name: 'Full Interior',
    tagline: 'Deeper cleaning for carpets, seats, mats, and trim.',
    result: 'Stain-focused reset for daily drivers',
    prices: { five: 120, large: 150 },
    color: 'blue',
    features: [
      'Everything in Basic Interior',
      'Deep cleaning of carpets, seats, and floor mats',
      'Steam cleaning where applicable',
      'Stain treatment with 80-90% removal where possible',
      'Vents, cup holders, and hard-to-reach areas detailed',
      'Door jambs cleaned',
      'UV protectant applied to interior surfaces',
      'Interior deodorized',
    ],
  },
  {
    id: 'basic-combo',
    icon: 'B+E',
    name: 'Basic Interior + Exterior',
    tagline: 'Interior refresh with a clean hand-washed exterior.',
    result: 'Best value for inside-out shine',
    prices: { five: 130, large: 160 },
    popular: true,
    color: 'gold',
    features: [
      'Everything in Basic Interior',
      'Hand wash',
      'Wheel and tire cleaning',
      'Tire shine',
      'Exterior windows cleaned',
      'Door jambs cleaned',
      'Hand towel dry',
    ],
  },
  {
    id: 'full-combo',
    icon: 'F+E',
    name: 'Full Interior + Exterior',
    tagline: 'Full interior detail plus exterior shine and protection.',
    result: 'Complete mobile detail with protection',
    prices: { five: 160, large: 190 },
    color: 'silver',
    features: [
      'Everything in Full Interior',
      'Premium hand wash',
      'Wheel, tire, and wheel well cleaning',
      'Tire shine',
      'Exterior windows cleaned',
      'Door jambs cleaned',
      'Spray wax for added shine and paint protection',
      'Final exterior wipe-down',
    ],
  },
]

const ADD_ONS = [
  { name: 'Pet Hair Removal', price: '$20-$50', note: 'Depends on amount of pet hair' },
  { name: 'Heavy Stain Removal', price: 'Starting at $20', note: 'Quoted by condition' },
  { name: 'Excessive Dirt/Sand Cleanup', price: 'Quoted upon inspection', note: 'For heavy soil, sand, or debris' },
]

const SERVICE_STANDARDS = [
  {
    title: 'Paint-safe exterior care',
    text: 'Gentle hand-wash process, wheel focus, towel dry, and gloss finish options.',
  },
  {
    title: 'Interior reset system',
    text: 'Vacuum, crevice work, trim wipe-down, mats, glass, deodorizing, and stain attention.',
  },
  {
    title: 'Mobile convenience',
    text: 'We arrive prepared for your driveway, office lot, or approved parking area.',
  },
]

function createPackageMessage(pkg, vehicleGroup) {
  const inclusions = pkg.features.map((feature) => `- ${feature}`).join('\n')
  const addOns = ADD_ONS.map((addon) => `- ${addon.name}: ${addon.price}`).join('\n')

  return [
    'Hi Foam Fox, I would like to book this detailing package:',
    '',
    `Package: ${pkg.name}`,
    `Vehicle group: ${vehicleGroup.label} (${vehicleGroup.note})`,
    `Price: $${pkg.prices[vehicleGroup.id]}`,
    '',
    'Includes:',
    inclusions,
    '',
    'Available add-ons:',
    addOns,
    '',
    'Please confirm availability and final pricing for my vehicle.',
  ].join('\n')
}

export default function Services() {
  const [vehicleGroup, setVehicleGroup] = useState('five')
  const activeGroup = VEHICLE_GROUPS.find((group) => group.id === vehicleGroup)

  return (
    <section className="services section section-dark" id="services">
      <div className="container">
        <div className="services__header reveal">
          <p className="eyebrow">Our Services</p>
          <h2 className="section-heading">
            Interior and Exterior <span className="text-blue">Packages</span>
          </h2>
          <p className="section-sub">
            Choose your vehicle group to see exact package pricing. Listed rates are for vehicles
            without pet hair or excessive soil.
          </p>
        </div>

        <div className="services__signature reveal delay-1">
          {SERVICE_STANDARDS.map((item, index) => (
            <div key={item.title} className="services__signature-item">
              <span className="services__signature-number">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="services__vehicle-tabs reveal delay-2">
          <p className="services__vehicle-label">Select your vehicle group</p>
          <div className="services__vehicle-pills">
            {VEHICLE_GROUPS.map((group) => (
              <button
                key={group.id}
                className={`services__pill ${vehicleGroup === group.id ? 'services__pill--active' : ''}`}
                onClick={() => setVehicleGroup(group.id)}
              >
                <span>{group.label}</span>
                <small>{group.note}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="services__grid">
          {PACKAGES.map((pkg, i) => (
            <div
              key={pkg.id}
              className={`services__card reveal delay-${i + 1} ${pkg.popular ? 'services__card--popular' : ''} services__card--${pkg.color}`}
            >
              {pkg.popular && (
                <div className="services__popular-badge">Popular</div>
              )}

              <div className="services__card-top">
                <span className="services__icon" aria-hidden="true">{pkg.icon}</span>
                <div>
                  <h3 className="services__name font-display">{pkg.name}</h3>
                  <p className="services__tagline">{pkg.tagline}</p>
                </div>
              </div>

              <p className="services__result">{pkg.result}</p>

              <div className="services__price-row">
                <div className="services__price">
                  <span className="services__price-from">for</span>
                  <span className="services__price-amount font-display">
                    ${pkg.prices[vehicleGroup]}
                  </span>
                </div>
                <div className="services__duration">
                  {activeGroup.label}
                </div>
              </div>

              <ul className="services__features">
                {pkg.features.map((feature) => (
                  <li key={feature} className="services__feature">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={createWhatsAppUrl(createPackageMessage(pkg, activeGroup))}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn ${pkg.popular ? 'btn-primary' : 'btn-outline'} services__btn`}
              >
                Book This Package
              </a>
            </div>
          ))}
        </div>

        <div className="services__addons reveal delay-4">
          <div>
            <p className="services__addons-label">Add-ons</p>
            <h3 className="services__addons-title">Extra cleanup when your vehicle needs more</h3>
          </div>
          <div className="services__addons-list">
            {ADD_ONS.map((addon) => (
              <div key={addon.name} className="services__addon">
                <div>
                  <strong>{addon.name}</strong>
                  <span>{addon.note}</span>
                </div>
                <p>{addon.price}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="services__disclaimer">
          Prices listed are for {activeGroup.label} vehicles with no pet hair. Final pricing may change
          for excessive dirt, sand, stains, or pet hair after inspection.
        </p>
      </div>
    </section>
  )
}
