const express = require('express')
const { randomUUID } = require('crypto')
const { body, validationResult } = require('express-validator')
const rateLimit = require('express-rate-limit')
const nodemailer = require('nodemailer')

const router = express.Router()

/* Strict limiter for booking submission: 5 per hour per IP */
const bookingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many booking requests. Please call us at 437-929-2037.' },
})

/* ============================================================
   EMAIL HELPER
   ============================================================ */

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const getTransporter = () => {
  if (!process.env.EMAIL_HOST) return null
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

const sendBookingEmails = async (booking) => {
  const transporter = getTransporter()
  if (!transporter) return

  const clientHtml = `
    <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#07070f;color:#fff;border-radius:16px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#004fa3,#0094ff);padding:2rem;text-align:center;">
        <h1 style="font-family:Georgia,serif;font-size:2rem;margin:0;letter-spacing:0.1em;color:#fff;">FOAM FOX</h1>
        <p style="margin:0.5rem 0 0;color:rgba(255,255,255,0.8);font-size:0.9rem;letter-spacing:0.1em;">AUTO DETAILING</p>
      </div>
      <div style="padding:2rem;">
        <h2 style="color:#0094ff;margin-top:0;">Booking Request Received!</h2>
        <p>Hi ${escapeHtml(booking.firstName)},</p>
        <p>Thanks for booking with Foam Fox! Here's a summary of your request:</p>
        <table style="width:100%;border-collapse:collapse;margin:1.5rem 0;">
          <tr><td style="padding:0.6rem 0.8rem;border-bottom:1px solid #1a2a40;color:#8ab0cc;font-size:0.85rem;width:140px;">Service</td><td style="padding:0.6rem 0.8rem;border-bottom:1px solid #1a2a40;">${escapeHtml(booking.service)}</td></tr>
          <tr><td style="padding:0.6rem 0.8rem;border-bottom:1px solid #1a2a40;color:#8ab0cc;font-size:0.85rem;">Vehicle</td><td style="padding:0.6rem 0.8rem;border-bottom:1px solid #1a2a40;">${escapeHtml(booking.vehicleMakeModel)} (${escapeHtml(booking.vehicleType)})</td></tr>
          <tr><td style="padding:0.6rem 0.8rem;border-bottom:1px solid #1a2a40;color:#8ab0cc;font-size:0.85rem;">Date & Time</td><td style="padding:0.6rem 0.8rem;border-bottom:1px solid #1a2a40;">${escapeHtml(booking.date)} at ${escapeHtml(booking.time)}</td></tr>
          <tr><td style="padding:0.6rem 0.8rem;color:#8ab0cc;font-size:0.85rem;">Location</td><td style="padding:0.6rem 0.8rem;">${escapeHtml(booking.address)}, ${escapeHtml(booking.city)}</td></tr>
        </table>
        <p style="background:#0d1525;border:1px solid #1e3050;border-radius:8px;padding:1rem;">
          We'll confirm your appointment within <strong>1 hour</strong>. If you have questions, call or text us at <strong><a href="tel:4379292037" style="color:#0094ff;">437-929-2037</a></strong>.
        </p>
        <p style="color:#5a7898;font-size:0.85rem;">Foam Fox Auto Detailing - GTA & Surroundings - Mon-Sun 8AM-7PM</p>
      </div>
    </div>
  `

  const adminHtml = `
    <h2>New Booking - Foam Fox</h2>
    <p><strong>Name:</strong> ${escapeHtml(booking.fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(booking.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(booking.phone)}</p>
    <p><strong>Service:</strong> ${escapeHtml(booking.service)}</p>
    <p><strong>Vehicle:</strong> ${escapeHtml(booking.vehicleMakeModel)} (${escapeHtml(booking.vehicleType)})</p>
    <p><strong>Date:</strong> ${escapeHtml(booking.date)} @ ${escapeHtml(booking.time)}</p>
    <p><strong>Address:</strong> ${escapeHtml(booking.address)}, ${escapeHtml(booking.city)}</p>
    ${booking.notes ? `<p><strong>Notes:</strong> ${escapeHtml(booking.notes)}</p>` : ''}
    <p><em>Submitted at ${new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })} EST</em></p>
  `

  await Promise.allSettled([
    transporter.sendMail({
      from: `"Foam Fox Auto Detailing" <${process.env.EMAIL_USER}>`,
      to: booking.email,
      subject: `Booking Request Received - ${booking.service} on ${booking.date}`,
      html: clientHtml,
    }),
    transporter.sendMail({
      from: `"Foam Fox Website" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Booking: ${booking.fullName} - ${booking.service} on ${booking.date}`,
      html: adminHtml,
    }),
  ])
}

/* ============================================================
   VALIDATION RULES
   ============================================================ */

const bookingValidation = [
  body('firstName').trim().notEmpty().withMessage('First name is required').isLength({ max: 60 }),
  body('lastName').trim().notEmpty().withMessage('Last name is required').isLength({ max: 60 }),
  body('email').trim().isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('service').trim().notEmpty().withMessage('Service selection is required'),
  body('vehicleType').trim().notEmpty().withMessage('Vehicle type is required'),
  body('vehicleMakeModel').trim().notEmpty().withMessage('Vehicle make & model is required').isLength({ max: 80 }),
  body('date').notEmpty().withMessage('Date is required').isDate().withMessage('Invalid date'),
  body('time').trim().notEmpty().withMessage('Time is required'),
  body('address').trim().notEmpty().withMessage('Service address is required').isLength({ max: 200 }),
  body('city').trim().notEmpty().withMessage('City is required').isLength({ max: 80 }),
  body('notes').optional().trim().isLength({ max: 1000 }),
]

/* ============================================================
   ROUTES
   ============================================================ */

/* POST /api/bookings - create new booking request */
router.post('/', bookingLimiter, bookingValidation, async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: 'Validation failed. Please check your inputs.',
        errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
      })
    }

    const booking = {
      id: randomUUID(),
      ...req.body,
      fullName: `${req.body.firstName} ${req.body.lastName}`,
      status: 'pending',
      source: 'website',
      createdAt: new Date().toISOString(),
    }

    sendBookingEmails(booking).catch((err) =>
      console.error('[Email] Failed to send booking emails:', err.message)
    )

    res.status(201).json({
      success: true,
      message: 'Booking request received! We\'ll confirm within 1 hour.',
      booking: {
        id: booking.id,
        firstName: booking.firstName,
        service: booking.service,
        date: booking.date,
        time: booking.time,
        status: booking.status,
      },
    })
  } catch (err) {
    next(err)
  }
})

/* GET /api/bookings - admin list */
router.get('/', async (req, res) => {
  const secret = req.headers['x-admin-secret']
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ success: false, message: 'Unauthorized' })
  }

  res.status(501).json({
    success: false,
    message: 'Booking storage is disabled. New requests are sent by email only.',
  })
})

/* PATCH /api/bookings/:id/status - update booking status */
router.patch('/:id/status', async (req, res) => {
  const secret = req.headers['x-admin-secret']
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ success: false, message: 'Unauthorized' })
  }

  res.status(501).json({
    success: false,
    message: 'Booking storage is disabled, so booking statuses cannot be updated.',
  })
})

module.exports = router
