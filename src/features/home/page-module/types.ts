import type { ProductListingProps } from '@/containers/product-listing'
import type { Category } from '@/services/catalog-api'
import type { Metadata } from 'next'

export type HomeRouteProps = { searchParams: Promise<{ page?: string }> }
export type HomePageProps = {
  categories: Category[]
  listing: ProductListingProps
}
export type HomePageMetadata = Metadata
