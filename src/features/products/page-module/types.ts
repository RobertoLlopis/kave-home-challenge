import type { Metadata } from 'next'
import type { Product } from '@/services/catalog-api'

export type ProductsQuery = { page?: string }
export type ProductsRouteProps = { searchParams: Promise<ProductsQuery> }
export type ProductsPageProps = {
  products: Product[]
  page: number
  pages: number
}
export type ProductsPageMetadata = Metadata
