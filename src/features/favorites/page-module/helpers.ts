import { Product } from '@/services/catalog-api/types'

import type { FavoriteItem } from '@/providers/favorites'

export function favoriteProduct(item: FavoriteItem): Product {
  return {
    sku: item.sku,
    title: item.title,
    collection: item.title.split(' ')[0] ?? item.sku,
    price: item.price,
    salePrice: null,
    mainImage: item.image,
    images: [],
    slug: item.sku,
    description: '',
    stock: 0,
  }
}
