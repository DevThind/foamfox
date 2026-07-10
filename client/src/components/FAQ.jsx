import { useState } from 'react'
import { WHATSAPP_BOOKING_URL } from '../utils/contact'
import './FAQ.css'

const FAQS = [
  {
    q: 'What areas in the GTA do you service?',
    a: "We service Toronto and the Greater Toronto Area including Brampton, Mississauga, Vaughan, Markham, Richmond Hill, North York, Scarborough, Etobicoke, Newmarket, Aurora, Ajax, Pickering, Whitby, Oshawa, Oakville, and more. If you're unsure whether we cover your area, just call us at 437-929-2037.",
  },
  {
    q: 'Do you bring your own water and power?',
    a: "Yes. We arrive fully self-contained with our own water supply and portable power. You don't need to provide anything; we just need a safe place to work near your vehicle.",
  },
  {
    q: 'How long does a detailing appointment take?',
    a: 'It depends on the package, vehicle size, and condition. Basic Interior is the quickest option, while Full Interior + Exterior takes longer because it includes deep interior cleaning, premium hand wash, spray wax, and a final exterior wipe-down.',
  },
  {
    q: 'How do I book an appointment?',
    a: 'The easiest way is to message us on WhatsApp. You can also call or text 437-929-2037, or send us a DM on Instagram @foamfox_auto_detailing. We confirm all bookings within 1 hour.',
  },
  {
    q: 'What forms of payment do you accept?',
    a: 'We accept cash and Interac e-Transfer only. Payment is due upon completion of the service.',
  },
  {
    q: 'Do you work in bad weather or winter conditions?',
    a: "We work in most weather conditions. However, for the best results, we prefer temperatures above 5C for exterior work. In cases of heavy rain, snow, or extreme cold, we'll reschedule your appointment at no charge. We always confirm the weather 24 hours before your booking.",
  },
  {
    q: 'How often should I get my car detailed?',
    a: "We recommend a Full Interior + Exterior every 3-6 months for most drivers, with Basic Interior or Basic Interior + Exterior upkeep in between. If you drive frequently, have pets or kids, or deal with heavy salt, sand, or stains, more frequent detailing will preserve your vehicle's value.",
  },
  {
    q: "What's the difference between a car wash and detailing?",
    a: "A car wash is a quick surface clean. Detailing is a thorough interior and exterior cleaning process that can include stain treatment, steam cleaning, hard-to-reach areas, wheel cleaning, spray wax, and surface protection.",
  },
  {
    q: 'Is pet hair included in package pricing?',
    a: 'No. Listed package prices are for vehicles with no pet hair. Pet Hair Removal is an add-on from $20-$50 depending on the amount of pet hair.',
  },
  {
    q: 'Do you charge extra for heavy stains, sand, or excessive dirt?',
    a: 'Heavy Stain Removal starts at $20. Excessive dirt or sand cleanup is quoted upon inspection because the time needed can vary a lot by vehicle condition.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  const toggle = (i) => setOpen((o) => (o === i ? null : i))

  return (
    <section className="faq section section-dark" id="faq">
      <div className="container">
        <div className="faq__layout">
          <div className="faq__header reveal">
            <p className="eyebrow">FAQ</p>
            <h2 className="section-heading">
              Questions? <span className="text-blue">We've Got Answers.</span>
            </h2>
            <p className="section-sub">
              Everything you need to know about Foam Fox Auto Detailing.
              Can't find your answer? Give us a call.
            </p>
            <div className="faq__contact-strip">
              <a href="tel:4379292037" className="btn btn-primary faq__call-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.07 10 19.79 19.79 0 011 1.4 2 2 0 013 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.91A16 16 0 0013.09 14l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                Call Us
              </a>
              <a
                href={WHATSAPP_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline faq__book-btn"
              >
                Book Now
              </a>
            </div>
          </div>

          <div className="faq__list reveal delay-1">
            {FAQS.map((item, i) => (
              <div
                key={item.q}
                className={`faq__item ${open === i ? 'faq__item--open' : ''}`}
              >
                <button
                  className="faq__question"
                  onClick={() => toggle(i)}
                  aria-expanded={open === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="faq__q-text">{item.q}</span>
                  <span className="faq__icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  className="faq__answer"
                  role="region"
                  aria-hidden={open !== i}
                >
                  <div className="faq__answer-inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
