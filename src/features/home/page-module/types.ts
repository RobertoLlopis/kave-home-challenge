import type { Metadata } from 'next'
import type { Category } from '@/services/catalog-api'

export type HomePageProps = { categories: Category[] }
export type HomePageMetadata = Metadata
