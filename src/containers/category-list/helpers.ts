import { routes } from '@/constants/routes'

export function categoryHref(slug: string) {
  const query = new URLSearchParams({ category: slug })
  return `${routes.products}?${query.toString()}`
}
