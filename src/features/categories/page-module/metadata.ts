import { categoriesMetadata } from './helpers'

import type { CategoriesPageMetadata } from './types'

export async function generateCategoriesMetadata(): Promise<CategoriesPageMetadata> {
  return categoriesMetadata()
}
