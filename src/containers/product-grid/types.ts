import type { Product } from '@/services/catalog-api'

export type ProductGridProps = {
  products: Product[]
}
export type ProductGridLoadingProps = {
  count: number
}
