import type { Metadata } from 'next'
import { routes } from '@/constants/routes'
import { categoriesCopy } from './constants'

export function categoriesMetadata(): Metadata {
  return {
    title: categoriesCopy.title,
    description: categoriesCopy.description,
    alternates: { canonical: routes.categories },
  }
}
