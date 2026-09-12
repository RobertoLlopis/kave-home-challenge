import type { Product } from '@/services/catalog-api'

export type ProductListingProps = {
  products: Product[]
  page: number
  pages: number
  href: (page: number) => string
}
