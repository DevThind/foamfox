const WHATSAPP_NUMBER = '14379292037'
const BOOKING_MESSAGE = 'Hi Foam Fox, I would like to book a car wash/detailing appointment.'

export const WHATSAPP_BOOKING_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(BOOKING_MESSAGE)}`
