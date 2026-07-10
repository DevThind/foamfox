import { WHATSAPP_BOOKING_URL } from '../utils/contact'
import './WhyUs.css'

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 3h15v13H1z" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: 'We Come to You',
    desc: 'No drop-offs, no waiting rooms. We arrive fully equipped with water, power, and professional gear so you keep your day.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Premium-Grade Products',
    desc: 'pH-balanced, paint-safe, and environmentally responsible products that clean deep while protecting your investment.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
    title: 'Same-Day Appointments',
    desc: 'Need your car detailed today? We offer flexible scheduling 7 days a week, including same-day slots to fit your schedule.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: 'Results That Speak',
    desc: 'Our clients choose us for consistent, showroom-quality results. We obsess over every panel, every vent, every inch.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    title: '100% Satisfaction Guarantee',
    desc: "We don't leave until you're fully satisfied. If something isn't right, we make it right.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: 'At Your Home or Office',
    desc: 'Driveway, parking garage, office lot - wherever works for you. We adapt to your location without any hassle.',
  },
]

const PROMISES = [
  { value: '01', label: 'Assess', text: 'We inspect paint, trim, carpet, seats, and problem areas before starting.' },
  { value: '02', label: 'Restore', text: 'We clean in stages with paint-safe products and interior-specific tools.' },
  { value: '03', label: 'Protect', text: 'We review the finish, apply final touches, and walk the vehicle with you.' },
]

const QUALITY_POINTS = [
  'No-rush appointment windows',
  'Condition-based recommendations',
  'Final walkaround before payment',
]

export default function WhyUs() {
  return (
    <section className="whyus section" id="why-us">
      <div className="container">
        <div className="whyus__header reveal">
          <p className="eyebrow">Why Foam Fox</p>
          <h2 className="section-heading">
            Built Different. <span className="text-chrome">Driven by Detail.</span>
          </h2>
          <p className="section-sub">
            We are not just another car wash. We show up equipped,
            experienced, and committed to leaving your vehicle immaculate.
          </p>
        </div>

        <div className="whyus__proof">
          {PROMISES.map((item) => (
            <div key={item.value} className="whyus__proof-step">
              <span className="whyus__proof-number">{item.value}</span>
              <div>
                <h3>{item.label}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="whyus__standard reveal delay-1">
          <div>
            <p className="whyus__standard-kicker">Foam Fox standard</p>
            <h3>Every appointment is treated like a finish inspection.</h3>
          </div>
          <ul>
            {QUALITY_POINTS.map((point) => (
              <li key={point}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="whyus__grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="whyus__card">
              <div className="whyus__icon-wrap" aria-hidden="true">
                {f.icon}
              </div>
              <h3 className="whyus__title">{f.title}</h3>
              <p className="whyus__desc">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="whyus__cta">
          <p className="whyus__cta-text">
            Ready to experience the Foam Fox difference?
          </p>
          <a
            href={WHATSAPP_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Book Your Detail Today
          </a>
        </div>
      </div>
    </section>
  )
}
