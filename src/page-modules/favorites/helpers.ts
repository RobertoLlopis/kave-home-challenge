import type { Product } from '@/services/catalog-api'
import type { FavoriteItem } from '@/providers/favorites-provider'
export function favoriteProduct(item: FavoriteItem): Product {
  return {
    sku: item.sku,
    title: item.title,
    price: item.price,
    salePrice: null,
    ecoPart: item.ecoPart ?? null,
    mainImage: item.image,
    images: [],
    slug: item.sku,
    description: '',
    stock: 0,
  }
}
