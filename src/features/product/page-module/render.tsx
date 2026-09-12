import { notFound } from 'next/navigation'
import { cache } from 'react'

import { getProduct } from '@/services/catalog-api'

import { resolveProductQuery } from './helpers'

import { ProductDetailPage } from './index'

import type { ProductRouteProps } from './types'

const cachedProduct = cache(getProduct)

export async function renderProductPage({ params }: ProductRouteProps) {
  const product = await cachedProduct(resolveProductQuery(await params).sku)
  if (!product) notFound()
  return <ProductDetailPage product={product} />
}
