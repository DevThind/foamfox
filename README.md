# 🦊 Foam Fox Auto Detailing — Full-Stack Website

A production-ready **MERN stack** (MongoDB, Express, React, Node.js) website for **Foam Fox Auto Detailing**, a premium mobile car detailing business serving the Greater Toronto Area.

---

## ✨ Features

### Frontend (React + Vite)
- 🎨 Custom dark theme — deep black, electric blue, chrome silver — matching the brand logo
- 🫧 Animated foam bubble particle hero section
- 💰 Interactive pricing cards with vehicle-type price calculator
- 🖼️ Before/after drag comparison gallery slider
- ⭐ Auto-rotating testimonials carousel
- 📋 Multi-field booking form with real-time validation
- ❓ Smooth accordion FAQ
- 🗺️ Service area coverage grid
- 📱 Fully responsive — mobile-first design
- ♿ Accessible (ARIA labels, keyboard navigation, focus management)
- 🎯 Scroll-reveal animations with IntersectionObserver
- 🔔 Toast notifications for form feedback
- 🍔 Mobile hamburger navigation drawer

### Backend (Node.js + Express + MongoDB)
- 📅 Booking submissions stored in MongoDB
- 📧 Automated email confirmations (client) + admin alerts (Nodemailer)
- ✅ Input validation with express-validator
- 🔒 Security: Helmet, CORS, rate limiting
- 📊 Admin API to list/update bookings (protected by secret header)
- 🔄 Automatic DB reconnect on disconnect
- 📝 Request logging with Morgan
- ⚡ Booking status management: pending → confirmed → completed

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18
- MongoDB Atlas account (free tier) → https://cloud.mongodb.com

### 1. Clone / Extract the project

```bash
cd foamfox-website
```

### 2. Install all dependencies

```bash
npm run install-all
```

This installs root + client + server dependencies in one command.

### 3. Configure the backend environment

```bash
cd server
cp .env.example .env
```

Edit `server/.env` and fill in:
- `MONGODB_URI` — your MongoDB Atlas connection string
- `ADMIN_SECRET` — a secure random string for admin API access
- `EMAIL_*` — Gmail credentials for email notifications (optional but recommended)
- `ADMIN_EMAIL` — where booking alerts are sent

### 4. Run in development mode

From the **root** directory:

```bash
npm run dev
```

This starts both:
- **Client** at http://localhost:3000
- **API** at http://localhost:5000

---

## 📁 Project Structure

```
foamfox-website/
├── client/                    # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx     # Sticky nav with mobile drawer
│   │   │   ├── Hero.jsx       # Full-screen hero with bubble animation
│   │   │   ├── Services.jsx   # Pricing packages with vehicle toggle
│   │   │   ├── WhyUs.jsx      # 6-feature benefits grid
│   │   │   ├── Gallery.jsx    # Before/after drag slider
│   │   │   ├── Testimonials.jsx # Auto-rotating review carousel
│   │   │   ├── ServiceAreas.jsx # GTA coverage grid
│   │   │   ├── BookingForm.jsx  # Full booking form with validation
│   │   │   ├── FAQ.jsx        # Accordion FAQ
│   │   │   └── Footer.jsx     # Links, contact, social
│   │   ├── App.jsx            # Root component + scroll observer
│   │   ├── index.css          # Global design tokens & animations
│   │   └── main.jsx           # React entry point
│   ├── index.html             # HTML with Google Fonts
│   ├── package.json
│   └── vite.config.js         # Vite + API proxy
│
├── server/                    # Node.js + Express backend
│   ├── models/
│   │   ├── Booking.js         # Booking schema (full fields)
│   │   └── Contact.js         # Contact message schema
│   ├── routes/
│   │   ├── bookings.js        # POST/GET/PATCH booking endpoints
│   │   └── contact.js         # POST contact form endpoint
│   ├── server.js              # Express app entry point
│   ├── .env.example           # Environment variables template
│   └── package.json
│
├── package.json               # Root scripts (concurrently)
└── README.md
```

---

## 🔧 Customization Guide

### Pricing
Edit `client/src/components/Services.jsx` — update `basePrice` in the `SERVICES` array:
```js
{ name: 'Exterior Detail', basePrice: 119, ... }
```

### Phone Number
Currently set to **437-929-2037**. To change, search and replace across all `.jsx` files.

### Gallery
Replace the CSS gradient placeholders in `Gallery.jsx` with real `before`/`after` photo URLs:
```js
before: 'url(/images/car-1-before.jpg) center/cover',
after:  'url(/images/car-1-after.jpg) center/cover',
```
Place photos in `client/public/images/`.

### Colors
All brand colors are CSS custom properties in `client/src/index.css` under `:root`. The main accents:
```css
--blue-400: #0094ff;   /* primary blue */
--blue-300: #33aaff;   /* hover / lighter */
```

### Social Links
Update in `Footer.jsx` and `Gallery.jsx`:
- Instagram: `https://www.instagram.com/foamfox_auto_detailing`
- Facebook / TikTok: replace placeholder `#` with real URLs

### Service Areas
Edit the `CITIES` array in `ServiceAreas.jsx`.

---

## 📦 Build for Production

```bash
# Build the frontend
npm run build
# Outputs to client/dist/

# Start the backend in production mode
cd server
NODE_ENV=production node server.js
```

### Deployment Options

**Frontend (Vercel — recommended for React)**
1. Push to GitHub
2. Import into Vercel → auto-deploys on push
3. Set `client/` as the root directory

**Backend (Railway / Render / Heroku)**
1. Deploy the `server/` folder
2. Set environment variables in the dashboard
3. Update `CLIENT_ORIGIN` in `.env` to your production frontend URL

**Full-stack on VPS (DigitalOcean / Linode)**
- Serve the `client/dist` build with Nginx
- Run the Express server with PM2
- Set up SSL with Certbot

---

## 🔑 Admin API

All admin endpoints require the `x-admin-secret` header matching your `.env` value.

```bash
# List all bookings
GET /api/bookings
Headers: { "x-admin-secret": "your-secret" }

# Filter by status and date
GET /api/bookings?status=pending&date=2025-08-15

# Update booking status
PATCH /api/bookings/:id/status
Headers: { "x-admin-secret": "your-secret" }
Body: { "status": "confirmed", "internalNote": "Called client at 10am" }
```

**Status values:** `pending` → `confirmed` → `completed` / `cancelled` / `no-show`

---

## 📧 Email Setup (Gmail)

1. Enable 2-Factor Authentication in your Google Account
2. Go to Google Account → Security → **App Passwords**
3. Create an App Password for "Mail" → "Other device"
4. Use that 16-character password as `EMAIL_PASS` in `.env`

---

## 📱 Mobile Optimised

The site is mobile-first responsive, collapsing to single-column layouts on phones. The mobile hamburger menu opens a full-height side drawer. Tested breakpoints: 1200px, 1024px, 900px, 768px, 600px, 480px.

---

## 🤝 Credits

Built for **Foam Fox Auto Detailing** · GTA & Surroundings · `437-929-2037`

Tech: React 18 · Vite 5 · Node.js · Express 4 · MongoDB / Mongoose · Nodemailer

---

*Last updated: 2025 · Production-ready MERN stack website*
