import { routes } from '@/constants/routes'

export function productCardHref(sku: string) {
  return `${routes.productPrefix}${encodeURIComponent(sku)}`
}
