import { routes } from '@/constants/routes'

import { categoriesCopy } from './constants'

import type { Metadata } from 'next'

export function categoriesMetadata(): Metadata {
  return {
    title: categoriesCopy.title,
    description: categoriesCopy.description,
    alternates: { canonical: routes.categories },
  }
}
