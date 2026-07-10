import { WHATSAPP_BOOKING_URL } from '../utils/contact'
import './Contact.css'

const CONTACT_OPTIONS = [
  {
    label: 'Call or text',
    value: '437-929-2037',
    href: 'tel:4379292037',
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.07 10 19.79 19.79 0 011 1.4 2 2 0 013 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.91A16 16 0 0013.09 14l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    value: '@foamfox_auto_detailing',
    href: 'https://www.instagram.com/foamfox_auto_detailing',
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'Hours',
    value: 'Mon - Sun | 8 AM - 7 PM',
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
]

const STEPS = [
  'Send your vehicle type, city, and preferred package.',
  'We confirm availability, scope, and final pricing.',
  'Foam Fox arrives equipped at your home or office.',
]

export default function Contact() {
  return (
    <section className="contact section section-alt" id="contact">
      <div className="container">
        <div className="contact__layout">
          <div className="contact__intro reveal-left">
            <p className="eyebrow">Contact</p>
            <h2 className="section-heading">
              Book Direct. <span className="text-blue">No Form Needed.</span>
            </h2>
            <p className="section-sub">
              Reach out on WhatsApp, phone, or Instagram. We will confirm your service,
              timing, and final price before arriving.
            </p>
            <div className="contact__actions">
              <a
                href={WHATSAPP_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Message on WhatsApp
              </a>
              <a href="tel:4379292037" className="btn btn-outline">
                Call 437-929-2037
              </a>
            </div>
          </div>

          <div className="contact__panel reveal-right">
            <div className="contact__cards">
              {CONTACT_OPTIONS.map((option) => {
                const content = (
                  <>
                    <span className="contact__icon" aria-hidden="true">{option.icon}</span>
                    <span>
                      <small>{option.label}</small>
                      <strong>{option.value}</strong>
                    </span>
                  </>
                )

                return option.href ? (
                  <a
                    key={option.label}
                    href={option.href}
                    target={option.href.startsWith('http') ? '_blank' : undefined}
                    rel={option.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="contact__card"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={option.label} className="contact__card contact__card--static">
                    {content}
                  </div>
                )
              })}
            </div>

            <div className="contact__steps" aria-label="Booking process">
              {STEPS.map((step, index) => (
                <div key={step} className="contact__step">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
