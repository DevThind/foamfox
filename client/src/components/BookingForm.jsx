import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import './BookingForm.css'

const SERVICES_LIST = [
  'Basic Interior',
  'Full Interior',
  'Basic Interior + Exterior',
  'Full Interior + Exterior',
  'Pet Hair Removal Add-On',
  'Heavy Stain Removal Add-On',
  'Not Sure - Need Advice',
]

const VEHICLE_TYPES = [
  '5-Seater Sedan',
  '5-Seater SUV',
  '7-Seater SUV',
  'Van',
  'Pickup Truck',
]

const TIME_SLOTS = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM', '6:00 PM',
]

const INITIAL = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  service: '',
  vehicleType: '',
  vehicleMakeModel: '',
  date: '',
  time: '',
  address: '',
  city: '',
  notes: '',
}

function validate(data) {
  const errs = {}
  if (!data.firstName.trim())        errs.firstName = 'First name is required'
  if (!data.lastName.trim())         errs.lastName = 'Last name is required'
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errs.email = 'A valid email is required'
  if (!data.phone.trim() || data.phone.replace(/\D/g,'').length < 10)
    errs.phone = 'A valid phone number is required'
  if (!data.service)                 errs.service = 'Please select a service'
  if (!data.vehicleType)             errs.vehicleType = 'Please select your vehicle type'
  if (!data.vehicleMakeModel.trim()) errs.vehicleMakeModel = 'Vehicle make & model is required'
  if (!data.date)                    errs.date = 'Please choose a date'
  if (!data.time)                    errs.time = 'Please choose a time slot'
  if (!data.address.trim())          errs.address = 'Service address is required'
  if (!data.city.trim())             errs.city = 'City is required'
  return errs
}

/* Get tomorrow's date string (no past booking) */
function minDate() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

export default function BookingForm() {
  const [form, setForm]       = useState(INITIAL)
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors((er) => { const n = { ...er }; delete n[field]; return n })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) {
      setErrors(errs)
      const first = document.querySelector('.form-input.error, .form-select.error')
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      toast.error('Please fix the highlighted fields.')
      return
    }

    setLoading(true)
    try {
      await axios.post('/api/bookings', form)
      setSuccess(true)
      toast.success('Booking request sent! We\'ll confirm within 1 hour.')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      const msg = err?.response?.data?.message || 'Something went wrong. Please call us directly.'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const F = (name) => ({
    value: form[name],
    onChange: set(name),
    className: `form-input${errors[name] ? ' error' : ''}`,
  })

  const FS = (name) => ({
    value: form[name],
    onChange: set(name),
    className: `form-select${errors[name] ? ' error' : ''}`,
  })

  if (success) {
    return (
      <section className="booking section section-alt" id="booking">
        <div className="container">
          <div className="booking__success">
            <div className="booking__success-icon" aria-hidden="true">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h2 className="booking__success-title font-display">Booking Request Sent!</h2>
            <p className="booking__success-sub">
              Thank you, <strong>{form.firstName}</strong>! We've received your booking request
              for <strong>{form.service}</strong> on <strong>{form.date}</strong> at <strong>{form.time}</strong>.
            </p>
            <p className="booking__success-note">
              We'll confirm your appointment via email or text within 1 hour.
              Questions? Call us at <a href="tel:4379292037">437-929-2037</a>.
            </p>
            <button className="btn btn-outline" onClick={() => { setSuccess(false); setForm(INITIAL) }}>
              Book Another
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="booking section section-alt" id="booking">
      <div className="container">
        <div className="booking__layout">
          {/* Left info panel */}
          <div className="booking__info reveal-left">
            <p className="eyebrow">Ready to Book?</p>
            <h2 className="section-heading">
              Schedule Your{' '}
              <span className="text-blue">Detail</span>
            </h2>
            <p className="section-sub">
              Fill out the form and we'll confirm your appointment within 1 hour.
              Same-day bookings available — just call us directly.
            </p>

            <div className="booking__contact-cards">
              <a href="tel:4379292037" className="booking__contact-card">
                <div className="booking__contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.07 10 19.79 19.79 0 011 1.4 2 2 0 013 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.91A16 16 0 0013.09 14l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                <div>
                  <p className="booking__contact-label">Call or Text</p>
                  <p className="booking__contact-value">437-929-2037</p>
                </div>
              </a>

              <a href="https://www.instagram.com/foamfox_auto_detailing" target="_blank" rel="noopener noreferrer" className="booking__contact-card">
                <div className="booking__contact-icon booking__contact-icon--ig">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </div>
                <div>
                  <p className="booking__contact-label">DM on Instagram</p>
                  <p className="booking__contact-value">@foamfox_auto_detailing</p>
                </div>
              </a>

              <div className="booking__contact-card booking__contact-card--hours">
                <div className="booking__contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <div>
                  <p className="booking__contact-label">Hours</p>
                  <p className="booking__contact-value">Mon – Sun · 8 AM – 7 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="booking__form-wrap reveal-right">
            <form className="booking__form" onSubmit={handleSubmit} noValidate>
              <div className="booking__form-header">
                <h3 className="booking__form-title font-display">Book Your Detail</h3>
                <p className="booking__form-sub">Confirmation within 1 hour</p>
              </div>

              {/* Name row */}
              <div className="booking__row">
                <div className="form-group">
                  <label className="form-label" htmlFor="firstName">First Name *</label>
                  <input id="firstName" type="text" placeholder="John" {...F('firstName')} />
                  {errors.firstName && <p className="form-error-msg">⚠ {errors.firstName}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="lastName">Last Name *</label>
                  <input id="lastName" type="text" placeholder="Smith" {...F('lastName')} />
                  {errors.lastName && <p className="form-error-msg">⚠ {errors.lastName}</p>}
                </div>
              </div>

              {/* Contact row */}
              <div className="booking__row">
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email *</label>
                  <input id="email" type="email" placeholder="john@email.com" {...F('email')} />
                  {errors.email && <p className="form-error-msg">⚠ {errors.email}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone *</label>
                  <input id="phone" type="tel" placeholder="(416) 555-0100" {...F('phone')} />
                  {errors.phone && <p className="form-error-msg">⚠ {errors.phone}</p>}
                </div>
              </div>

              {/* Service + Vehicle type */}
              <div className="booking__row">
                <div className="form-group">
                  <label className="form-label" htmlFor="service">Service *</label>
                  <select id="service" {...FS('service')}>
                    <option value="">Choose a service…</option>
                    {SERVICES_LIST.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.service && <p className="form-error-msg">⚠ {errors.service}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="vehicleType">Vehicle Type *</label>
                  <select id="vehicleType" {...FS('vehicleType')}>
                    <option value="">Select type…</option>
                    {VEHICLE_TYPES.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                  {errors.vehicleType && <p className="form-error-msg">⚠ {errors.vehicleType}</p>}
                </div>
              </div>

              {/* Vehicle make/model */}
              <div className="form-group">
                <label className="form-label" htmlFor="vehicleMakeModel">Vehicle Make & Model *</label>
                <input id="vehicleMakeModel" type="text" placeholder="e.g. 2022 Honda CR-V" {...F('vehicleMakeModel')} />
                {errors.vehicleMakeModel && <p className="form-error-msg">⚠ {errors.vehicleMakeModel}</p>}
              </div>

              {/* Date + Time */}
              <div className="booking__row">
                <div className="form-group">
                  <label className="form-label" htmlFor="date">Preferred Date *</label>
                  <input id="date" type="date" min={minDate()} {...F('date')} />
                  {errors.date && <p className="form-error-msg">⚠ {errors.date}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="time">Preferred Time *</label>
                  <select id="time" {...FS('time')}>
                    <option value="">Select time…</option>
                    {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.time && <p className="form-error-msg">⚠ {errors.time}</p>}
                </div>
              </div>

              {/* Address */}
              <div className="booking__row">
                <div className="form-group" style={{ flex: 2 }}>
                  <label className="form-label" htmlFor="address">Service Address *</label>
                  <input id="address" type="text" placeholder="123 Main St" {...F('address')} />
                  {errors.address && <p className="form-error-msg">⚠ {errors.address}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="city">City *</label>
                  <input id="city" type="text" placeholder="Toronto" {...F('city')} />
                  {errors.city && <p className="form-error-msg">⚠ {errors.city}</p>}
                </div>
              </div>

              {/* Notes */}
              <div className="form-group">
                <label className="form-label" htmlFor="notes">Additional Notes</label>
                <textarea
                  id="notes"
                  className="form-textarea"
                  rows={3}
                  placeholder="Any details about your vehicle's condition, special requests, or parking instructions…"
                  value={form.notes}
                  onChange={set('notes')}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary booking__submit"
                disabled={loading}
              >
                {loading ? (
                  <><span className="spinner" /> Submitting…</>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    Request Booking
                  </>
                )}
              </button>

              <p className="booking__disclaimer">
                By submitting, you agree to be contacted by Foam Fox Auto Detailing
                regarding your booking request. We'll never share your information.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

