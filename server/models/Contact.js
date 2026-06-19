const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true, maxlength: 120 },
    email:   { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
    phone:   { type: String, trim: true, maxlength: 25, default: '' },
    subject: { type: String, trim: true, maxlength: 200, default: 'General Inquiry' },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    read:    { type: Boolean, default: false },
    repliedAt: { type: Date },
  },
  { timestamps: true }
)

contactSchema.index({ createdAt: -1 })
contactSchema.index({ read: 1 })

module.exports = mongoose.model('Contact', contactSchema)
