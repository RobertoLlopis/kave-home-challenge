import { routes } from '@/constants/routes'

export function categoryHref(slug: string) {
  return `${routes.categoryPrefix}${encodeURIComponent(slug)}`
}
