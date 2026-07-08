import { WHATSAPP_BOOKING_URL } from '../utils/contact'
import './Footer.css'

const LINKS = {
  Services: [
    { label: 'Basic Interior', href: '#services' },
    { label: 'Full Interior', href: '#services' },
    { label: 'Basic Interior + Exterior', href: '#services' },
    { label: 'Full Interior + Exterior', href: '#services' },
  ],
  Company: [
    { label: 'Why Foam Fox',  href: '#why-us' },
    { label: 'Gallery',       href: '#gallery' },
    { label: 'Testimonials',  href: '#testimonials' },
    { label: 'FAQ',           href: '#faq' },
  ],
  Areas: [
    { label: 'Toronto & North York', href: '#areas' },
    { label: 'Brampton & Mississauga', href: '#areas' },
    { label: 'Vaughan & Richmond Hill', href: '#areas' },
    { label: 'Markham & Scarborough', href: '#areas' },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollTo = (e, href) => {
    e.preventDefault()
    if (window.location.hash === href) {
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    } else {
      window.location.hash = href
    }
  }

  return (
    <footer className="footer" id="footer-contact">
      {/* Top CTA banner */}
      <div className="footer__banner">
        <div className="container footer__banner-inner">
          <div className="footer__banner-text">
            <h3 className="footer__banner-title font-display">
              Ready for a Showroom Finish?
            </h3>
            <p className="footer__banner-sub">
              Book today and experience premium mobile detailing at your door.
            </p>
          </div>
          <div className="footer__banner-actions">
            <a
              href={WHATSAPP_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Book Now
            </a>
            <a href="tel:4379292037" className="btn btn-outline footer__call-btn">
              437-929-2037
            </a>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            {/* Brand column */}
            <div className="footer__brand">
              <div className="footer__logo">
                <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
                  <path d="M18 2L32 10V26L18 34L4 26V10L18 2Z" stroke="#0094ff" strokeWidth="1.5" fill="rgba(0,148,255,0.08)"/>
                  <path d="M18 8L26 12.5V21.5L18 26L10 21.5V12.5L18 8Z" fill="rgba(0,148,255,0.15)"/>
                  <circle cx="18" cy="17" r="4" fill="#0094ff" opacity="0.9"/>
                </svg>
                <div>
                  <p className="footer__logo-name font-display">FOAM FOX</p>
                  <p className="footer__logo-sub font-script">Auto Detailing</p>
                </div>
              </div>
              <p className="footer__tagline">
                Premium Care. Immaculate Results.
              </p>
              <p className="footer__desc">
                Professional mobile auto detailing serving the Greater Toronto Area.
                We come to you — fully equipped, always on time.
              </p>

              {/* Social links */}
              <div className="footer__social">
                <a
                  href="https://www.instagram.com/foamfox_auto_detailing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link"
                  aria-label="Follow on Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link"
                  aria-label="Follow on Facebook"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link"
                  aria-label="Follow on TikTok"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.75a4.83 4.83 0 01-1-.06z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(LINKS).map(([heading, links]) => (
              <div key={heading} className="footer__col">
                <h4 className="footer__col-heading">{heading}</h4>
                <ul className="footer__col-links">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="footer__link"
                        onClick={(e) => scrollTo(e, href)}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact column */}
            <div className="footer__col">
              <h4 className="footer__col-heading">Contact</h4>
              <div className="footer__contact-list">
                <a href="tel:4379292037" className="footer__contact-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.07 10 19.79 19.79 0 011 1.4 2 2 0 013 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.91A16 16 0 0013.09 14l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  437-929-2037
                </a>
                <a href="https://www.instagram.com/foamfox_auto_detailing" target="_blank" rel="noopener noreferrer" className="footer__contact-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/>
                  </svg>
                  @foamfox_auto_detailing
                </a>
                <div className="footer__contact-item footer__contact-item--muted">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                  </svg>
                  Mon – Sun · 8 AM – 7 PM
                </div>
                <div className="footer__contact-item footer__contact-item--muted">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  GTA & Surroundings, ON
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copyright">
            © {year} Foam Fox Auto Detailing. All rights reserved.
          </p>
          <p className="footer__credit">
            Designed & built with ❤️ for Foam Fox
          </p>
          <div className="footer__bottom-links">
            <a href="#home" onClick={(e) => scrollTo(e, '#home')}>Privacy</a>
            <a href="#home" onClick={(e) => scrollTo(e, '#home')}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
