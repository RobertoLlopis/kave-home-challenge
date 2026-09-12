import type { Metadata } from 'next'
import type { Product } from '@/services/catalog-api'
import { plainText } from '@/utils/plain-text'
import { productDetailConstants } from './constants'
import type { ProductPageMetadata, ProductQuery } from './types'

export function resolveProductQuery(query: ProductQuery) {
  return { sku: query.sku }
}

export function productCanonical(sku: string) {
  return `/products/${encodeURIComponent(sku)}`
}

export function productMetadataDescription(value: string) {
  return plainText(value).slice(0, productDetailConstants.descriptionLimit)
}

export function productMetadata(product: Product): ProductPageMetadata {
  return {
    title: `${product.title} · ${productDetailConstants.brand}`,
    description: productMetadataDescription(product.description),
    alternates: {
      canonical: productCanonical(product.sku),
    } satisfies Metadata['alternates'],
  }
}

export function productNotFoundMetadata(): ProductPageMetadata {
  return { title: productDetailConstants.notFoundMetadata }
}
