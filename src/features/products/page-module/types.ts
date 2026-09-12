import type { ProductListingProps } from '@/containers/product-listing'
import type { Metadata } from 'next'

export type ProductsQuery = { page?: string }
export type ProductsRouteProps = { searchParams: Promise<ProductsQuery> }
export type ProductsPageProps = { listing: ProductListingProps }
export type ProductsPageMetadata = Metadata
