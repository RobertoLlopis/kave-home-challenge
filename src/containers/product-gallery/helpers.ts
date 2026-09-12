import type { Product } from '@/services/catalog-api'

export function productImages(product: Product): string[] {
  return Array.from(
    new Set(
      [product.mainImage, ...product.images].filter(
        (image): image is string => image !== null,
      ),
    ),
  )
}
