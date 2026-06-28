import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import ServiceAreas from './components/ServiceAreas'
import BookingForm from './components/BookingForm'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import './App.css'

const normalizeHash = () => window.location.hash || '#home'

function App() {
  const [route, setRoute] = useState(normalizeHash)

  useEffect(() => {
    const onHashChange = () => setRoute(normalizeHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const page = useMemo(() => {
    switch (route) {
      case '#services':
        return <Services />
      case '#gallery':
        return <Gallery />
      case '#testimonials':
        return <Testimonials />
      case '#areas':
        return <ServiceAreas />
      case '#booking':
        return <BookingForm />
      case '#contact':
        return (
          <div id="contact">
            <BookingForm />
          </div>
        )
      case '#faq':
        return <FAQ />
      case '#home':
      case '#why-us':
      default:
        return (
          <>
            <Hero />
            <WhyUs />
          </>
        )
    }
  }, [route])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [page])

  useEffect(() => {
    window.requestAnimationFrame(() => {
      const target = document.querySelector(route)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    })
  }, [route, page])

  return (
    <div className="app">
      <Navbar />
      <main>
        {page}
      </main>
      <Footer />
    </div>
  )
}

export default App
