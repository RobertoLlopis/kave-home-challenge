import { cache } from 'react'

import { getProduct } from '@/services/catalog-api'

import {
  productMetadata,
  productNotFoundMetadata,
  resolveProductQuery,
} from './helpers'

import type { ProductPageMetadata, ProductRouteProps } from './types'

const cachedProduct = cache(getProduct)

export async function generateProductMetadata({
  params,
}: ProductRouteProps): Promise<ProductPageMetadata> {
  const product = await cachedProduct(resolveProductQuery(await params).sku)
  if (!product) return productNotFoundMetadata()
  return productMetadata(product)
}
