const locale = 'es-ES'
const currency = 'EUR'

export const priceFormatter = new Intl.NumberFormat(locale, {
  style: 'currency',
  currency,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})
