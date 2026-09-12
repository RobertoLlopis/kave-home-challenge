import { priceFormatter } from './constants'
export function formatPrice(value: number) {
  return priceFormatter.format(value).replace(/,00\s?€$/, ' €')
}
