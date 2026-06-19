const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
  {
    /* Client info */
    firstName:       { type: String, required: true, trim: true, maxlength: 60 },
    lastName:        { type: String, required: true, trim: true, maxlength: 60 },
    email:           { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
    phone:           { type: String, required: true, trim: true, maxlength: 25 },

    /* Service details */
    service: {
      type: String,
      required: true,
      enum: [
        'Exterior Detail',
        'Interior Detail',
        'Full Detail',
        'Premium Package',
        'Not Sure — Need Advice',
      ],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ['Sedan', 'SUV (5-Seater)', 'SUV (7-Seater)', 'Minivan', 'Pickup Truck', 'Van / Sprinter'],
    },
    vehicleMakeModel: { type: String, required: true, trim: true, maxlength: 80 },

    /* Scheduling */
    date: { type: String, required: true },   /* ISO date string YYYY-MM-DD */
    time: { type: String, required: true },   /* e.g. "10:00 AM"            */

    /* Location */
    address: { type: String, required: true, trim: true, maxlength: 200 },
    city:    { type: String, required: true, trim: true, maxlength: 80 },

    /* Optional */
    notes: { type: String, trim: true, maxlength: 1000, default: '' },

    /* Internal tracking */
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no-show'],
      default: 'pending',
    },
    confirmedAt:  { type: Date },
    completedAt:  { type: Date },
    internalNote: { type: String, trim: true, maxlength: 500 },
    source:       { type: String, default: 'website', trim: true },
  },
  {
    timestamps: true,
    toJSON:   { virtuals: true },
    toObject: { virtuals: true },
  }
)

/* Virtual: full name */
bookingSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`
})

/* Index for querying bookings by date/status */
bookingSchema.index({ date: 1, status: 1 })
bookingSchema.index({ email: 1 })
bookingSchema.index({ createdAt: -1 })

module.exports = mongoose.model('Booking', bookingSchema)
