import { parsePage } from '@/utils/pagination'
import type { ProductsQuery } from '@/features/products/page-module/types'

export function resolveHomeQuery(query: ProductsQuery) {
  return { page: parsePage(query.page) }
}

export function homePageHref(page: number) {
  if (page <= 1) return '/'
  return `/?page=${page}`
}
