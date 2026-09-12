import type { Product } from '@/services/catalog-api'
import type { Metadata } from 'next'

export type ProductsQuery = { page?: string }
export type ProductsRouteProps = { searchParams: Promise<ProductsQuery> }
export type ProductsPageProps = {
  products: Product[]
  page: number
  pages: number
}
export type ProductsPageMetadata = Metadata
