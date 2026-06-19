const express  = require('express')
const mongoose = require('mongoose')
const cors     = require('cors')
const helmet   = require('helmet')
const morgan   = require('morgan')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const bookingRoutes = require('./routes/bookings')
const contactRoutes = require('./routes/contact')

const app  = express()
const PORT = process.env.PORT || 5000

/* ============================================================
   MIDDLEWARE
   ============================================================ */

/* Security headers */
app.use(helmet())

/* CORS — allow client origin */
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

/* Body parsing */
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

/* Logging */
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
}

/* Global rate limiter — 100 req / 15 min per IP */
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again shortly.' },
})
app.use('/api/', globalLimiter)

/* ============================================================
   DATABASE CONNECTION
   ============================================================ */

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
    console.log(`✅  MongoDB connected: ${conn.connection.host}`)
  } catch (err) {
    console.error('❌  MongoDB connection error:', err.message)
    /* Retry after 5s instead of crashing */
    setTimeout(connectDB, 5000)
  }
}
connectDB()

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected — attempting reconnect…')
  setTimeout(connectDB, 5000)
})

/* ============================================================
   ROUTES
   ============================================================ */

app.use('/api/bookings', bookingRoutes)
app.use('/api/contact',  contactRoutes)

/* Health check */
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status:  'ok',
    service: 'Foam Fox API',
    dbState: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime:  process.uptime().toFixed(1) + 's',
    ts:      new Date().toISOString(),
  })
})

/* ============================================================
   ERROR HANDLERS
   ============================================================ */

/* 404 */
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.path}` })
})

/* Global error handler */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500
  console.error(`[${new Date().toISOString()}] ${status} — ${err.message}`)

  res.status(status).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? (status < 500 ? err.message : 'An unexpected error occurred. Please try again.')
      : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  })
})

/* ============================================================
   START
   ============================================================ */

app.listen(PORT, () => {
  console.log(`\n🚀  Foam Fox API running on port ${PORT}`)
  console.log(`   Environment : ${process.env.NODE_ENV || 'development'}`)
  console.log(`   Health      : http://localhost:${PORT}/api/health\n`)
})

module.exports = app
