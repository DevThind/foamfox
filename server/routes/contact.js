const express    = require('express')
const { body, validationResult } = require('express-validator')
const rateLimit   = require('express-rate-limit')
const nodemailer  = require('nodemailer')
const Contact     = require('../models/Contact')

const router = express.Router()

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 8,
  message: { success: false, message: 'Too many messages. Please try again later.' },
})

const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 120 }),
  body('email').trim().isEmail().withMessage('Valid email required').normalizeEmail(),
  body('phone').optional().trim().isLength({ max: 25 }),
  body('subject').optional().trim().isLength({ max: 200 }),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ min: 10, max: 2000 }),
]

/* POST /api/contact */
router.post('/', contactLimiter, contactValidation, async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: 'Validation failed.',
        errors:  errors.array().map((e) => ({ field: e.path, message: e.msg })),
      })
    }

    const contact = await Contact.create(req.body)

    /* Email admin */
    if (process.env.EMAIL_HOST) {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: process.env.EMAIL_PORT === '465',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      })

      transporter.sendMail({
        from:    `"Foam Fox Website" <${process.env.EMAIL_USER}>`,
        to:      process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        subject: `📬 Contact Form: ${contact.name} — ${contact.subject || 'General Inquiry'}`,
        html:    `<p><strong>From:</strong> ${contact.name} &lt;${contact.email}&gt;</p>
                  <p><strong>Phone:</strong> ${contact.phone || 'N/A'}</p>
                  <p><strong>Subject:</strong> ${contact.subject || 'N/A'}</p>
                  <p><strong>Message:</strong><br>${contact.message.replace(/\n/g, '<br>')}</p>`,
      }).catch(console.error)
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been received. We\'ll respond within 24 hours.',
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
