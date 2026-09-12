import type { Metadata } from 'next'
import type { Category } from '@/services/catalog-api'

export type CategoryParams = { slug: string }
export type CategoryRouteProps = { params: Promise<CategoryParams> }
export type CategoryPageProps = { category: Category }
export type CategoryPageMetadata = Metadata
