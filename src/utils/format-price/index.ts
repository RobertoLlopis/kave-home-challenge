import { priceFormatter } from './constants'
export function formatPrice(value: number) {
  return priceFormatter.format(value)
}
