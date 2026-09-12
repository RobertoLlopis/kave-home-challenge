import type { Category } from '@/services/catalog-api'
import type { Metadata } from 'next'

export type CategoryParams = { slug: string }
export type CategoryRouteProps = { params: Promise<CategoryParams> }
export type CategoryPageProps = { category: Category }
export type CategoryPageMetadata = Metadata
