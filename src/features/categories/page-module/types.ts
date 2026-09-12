import type { Metadata } from 'next'
import type { Category } from '@/services/catalog-api'

export type CategoriesPageProps = { categories: Category[] }
export type CategoriesPageMetadata = Metadata
