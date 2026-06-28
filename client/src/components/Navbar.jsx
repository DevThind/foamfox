import { useState, useEffect, useCallback } from 'react'
import logo from '../assets/foamfox-logo-nav.jpeg'
import { WHATSAPP_BOOKING_URL } from '../utils/contact'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#why-us' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState(window.location.hash || '#home')

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    const onHashChange = () => setActiveLink(window.location.hash || '#home')
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const close = (e) => {
      if (!e.target.closest('.navbar')) setMenuOpen(false)
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [menuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (href) => {
    setActiveLink(href)
    setMenuOpen(false)
    if (window.location.hash === href) {
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    } else {
      window.location.hash = href
    }
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      <div className="container navbar__inner">
        <a
          href="#home"
          className="navbar__logo"
          onClick={(e) => { e.preventDefault(); handleNavClick('#home') }}
          aria-label="Foam Fox Auto Detailing - Home"
        >
          <img className="navbar__logo-img" src={logo} alt="Foam Fox Auto Detailing" />
        </a>

        <nav className="navbar__links" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`navbar__link ${activeLink === href ? 'navbar__link--active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick(href) }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="navbar__actions">
          <a href="tel:4379292037" className="navbar__phone">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.07 10 19.79 19.79 0 011 1.4 2 2 0 013 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.91A16 16 0 0013.09 14l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            437-929-2037
          </a>
          <a
            href={WHATSAPP_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary navbar__cta"
          >
            Book Now
          </a>
          <button
            className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`navbar__drawer ${menuOpen ? 'navbar__drawer--open' : ''}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`navbar__drawer-link ${activeLink === href ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick(href) }}
              tabIndex={menuOpen ? 0 : -1}
            >
              {label}
            </a>
          ))}
          <a href="tel:4379292037" className="navbar__drawer-phone">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.07 10 19.79 19.79 0 011 1.4 2 2 0 013 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.91A16 16 0 0013.09 14l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            437-929-2037
          </a>
          <a
            href={WHATSAPP_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.75rem' }}
            onClick={() => setMenuOpen(false)}
          >
            Book Now
          </a>
        </nav>
      </div>
    </header>
  )
}
