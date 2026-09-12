import { ProductGrid } from '@/containers/product-grid'

import { favoritesListConstants } from './constants'

import type { FavoritesListProps } from './types'

export function FavoritesList({ products }: FavoritesListProps) {
  return <ProductGrid products={products} />
}

FavoritesList.Loading = function FavoritesListLoading() {
  return <ProductGrid.Loading count={favoritesListConstants.loadingCount} />
}
