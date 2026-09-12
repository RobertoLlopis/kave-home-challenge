import type { Product } from '@/services/catalog-api'

export type ProductListingProps = {
  basePath: string
  products: Product[]
  page: number
  pages: number
}

export type ProductListingResult = {
  destination: string | null
  listing: ProductListingProps
}
