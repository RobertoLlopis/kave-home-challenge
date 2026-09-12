import { searchProducts } from '@/services/catalog-api'
import { resolveSearchQuery } from './helpers'
import { SearchPage } from './index'
import type { SearchRouteProps } from './types'

export async function renderSearchPage({ searchParams }: SearchRouteProps) {
  const query = resolveSearchQuery(await searchParams)
  const products = query ? await searchProducts(query) : []
  return <SearchPage query={query} products={products} />
}
