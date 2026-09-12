import { resolveProductsQuery, productsMetadata } from './helpers'

import type { ProductsRouteProps, ProductsPageMetadata } from './types'

export async function generateProductsMetadata({
  searchParams,
}: ProductsRouteProps): Promise<ProductsPageMetadata> {
  const query = await searchParams
  const { page } = resolveProductsQuery(query)
  return productsMetadata(page)
}
