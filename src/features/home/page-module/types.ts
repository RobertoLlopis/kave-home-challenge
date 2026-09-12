import type { Category, Product } from '@/services/catalog-api'
import type { Metadata } from 'next'

export type HomeRouteProps = { searchParams: Promise<{ page?: string }> }
export type HomePageProps = {
  categories: Category[]
  products: Product[]
  page: number
  pages: number
}
export type HomePageMetadata = Metadata
