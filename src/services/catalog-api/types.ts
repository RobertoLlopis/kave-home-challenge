import type { EcoPart } from '@/types/catalog'

export type { EcoPart } from '@/types/catalog'
export type Category = {
  id: number
  name: string
  slug: string
  highlightImage: string | null
  description: string
}
export type Envelope<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}
export type CatalogErrorKind =
  'http' | 'content-type' | 'timeout' | 'network' | 'contract'
export type CatalogFetcher = typeof fetch
export type CatalogRequestOptions = {
  fetcher?: CatalogFetcher
  timeoutMs?: number
}
export type Product = {
  sku: string
  title: string
  slug: string
  price: number
  salePrice: number | null
  ecoPart: EcoPart
  mainImage: string | null
  images: string[]
  description: string
  stock: number
}
