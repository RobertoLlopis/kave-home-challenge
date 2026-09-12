import { productsMetadata } from './helpers'

import type { ProductsRouteProps, ProductsPageMetadata } from './types'

export async function generateProductsMetadata({
  searchParams,
}: ProductsRouteProps): Promise<ProductsPageMetadata> {
  const query = await searchParams
  return productsMetadata(query.page)
}
