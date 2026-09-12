import { redirect } from 'next/navigation'

import { routes } from '@/constants/routes'
import { loadProductListing } from '@/containers/product-listing'

import { ProductsPage } from './index'

import type { ProductsRouteProps } from './types'

export async function renderProductsPage({ searchParams }: ProductsRouteProps) {
  const query = await searchParams
  const result = await loadProductListing(routes.products, query.page)
  if (result.destination) redirect(result.destination)
  return <ProductsPage listing={result.listing} />
}
