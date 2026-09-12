import { cache } from 'react'

import { getCategory } from '@/services/catalog-api'

import {
  categoryMetadata,
  categoryNotFoundMetadata,
  resolveCategoryParams,
} from './helpers'

import type { CategoryPageMetadata, CategoryRouteProps } from './types'

const cachedCategory = cache(getCategory)

export async function generateCategoryMetadata({
  params,
}: CategoryRouteProps): Promise<CategoryPageMetadata> {
  const category = await cachedCategory(
    resolveCategoryParams(await params).slug,
  )
  if (!category) return categoryNotFoundMetadata()
  return categoryMetadata(category)
}
