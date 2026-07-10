const WHATSAPP_NUMBER = '14379292037'
const BOOKING_MESSAGE = 'Hi Foam Fox, I would like to book a car wash/detailing appointment.'

export function createWhatsAppUrl(message = BOOKING_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const WHATSAPP_BOOKING_URL = createWhatsAppUrl()
