import type { Category } from '@/services/catalog-api'
import type { Metadata } from 'next'

export type CategoriesPageProps = { categories: Category[] }
export type CategoriesPageMetadata = Metadata
