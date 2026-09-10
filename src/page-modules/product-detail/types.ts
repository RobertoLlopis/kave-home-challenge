import type { Metadata } from 'next'
import type { Product } from '@/services/catalog-api'

export type ProductQuery = { sku: string }
export type ProductRouteProps = { params: Promise<ProductQuery> }
export type ProductDetailPageProps = { product: Product }
export type ProductPageMetadata = Metadata
