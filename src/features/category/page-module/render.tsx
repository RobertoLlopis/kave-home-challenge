import { cache } from 'react'
import { notFound } from 'next/navigation'
import { getCategory } from '@/services/catalog-api'
import { resolveCategoryParams } from './helpers'
import { CategoryPage } from './index'
import type { CategoryRouteProps } from './types'

const cachedCategory = cache(getCategory)

export async function renderCategoryPage({ params }: CategoryRouteProps) {
  const category = await cachedCategory(
    resolveCategoryParams(await params).slug,
  )
  if (!category) notFound()
  return <CategoryPage category={category} />
}
