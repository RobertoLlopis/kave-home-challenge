import { serviceFooterConstants } from './constants'

const dayPartsFormatter = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  timeZone: serviceFooterConstants.timeZone,
})
const deliveryDateFormatter = new Intl.DateTimeFormat(
  serviceFooterConstants.locale,
  {
    day: '2-digit',
    month: '2-digit',
    timeZone: serviceFooterConstants.timeZone,
  },
)

function madridCalendarDate(now: Date) {
  const parts = Object.fromEntries(
    dayPartsFormatter
      .formatToParts(now)
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, Number(part.value)]),
  )
  return new Date(Date.UTC(parts.year, parts.month - 1, parts.day, 12))
}

export function deliveryDateRange(now: Date, minDays: number, maxDays: number) {
  const day = madridCalendarDate(now)
  const addDays = (days: number) =>
    new Date(day.getTime() + days * 24 * 60 * 60 * 1000)
  return [addDays(minDays), addDays(maxDays)] as const
}

export function formatDeliveryDate(date: Date) {
  const parts = Object.fromEntries(
    deliveryDateFormatter
      .formatToParts(date)
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, part.value.padStart(2, '0')]),
  )
  return `${parts.day}/${parts.month}`
}
