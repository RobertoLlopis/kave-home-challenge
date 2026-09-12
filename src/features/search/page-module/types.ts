import type { Product } from '@/services/catalog-api'
import type { Metadata } from 'next'

export type SearchQuery = { q?: string | string[] }
export type SearchRouteProps = { searchParams: Promise<SearchQuery> }
export type SearchPageProps = { query: string; products: Product[] }
export type SearchPageMetadata = Metadata
