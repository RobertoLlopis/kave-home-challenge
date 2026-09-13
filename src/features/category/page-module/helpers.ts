import { categoryHref } from '@/containers/category-list/helpers'
import { plainText, truncateAtWord } from '@/utils/plain-text'

import { categoryConstants } from './constants'
import { categoryMessages } from './messages'

import type { CategoryPageMetadata, CategoryParams } from './types'
import type { Category } from '@/services/catalog-api'
import type { Metadata } from 'next'

export function resolveCategoryParams(params: CategoryParams) {
  return { slug: params.slug }
}

export function categoryCanonical(slug: string) {
  return categoryHref(slug)
}

export function categoryDescription(category: Category) {
  const text = plainText(category.description)
  return text || categoryMessages.fallbackDescription
}

export function categoryMetadataTitle(category: Category) {
  return (
    category.seoTitle.trim() || `${category.name} · ${categoryMessages.brand}`
  )
}

export function categoryMetadataDescription(category: Category) {
  if (category.seoDescription.trim()) return category.seoDescription.trim()
  const text = plainText(category.description)
  return text
    ? truncateAtWord(text, categoryConstants.descriptionLimit)
    : categoryMessages.fallbackDescription
}

// El API sirve `seo.index` como lista de directivas ("index,follow"). Se
// traduce al objeto que espera Next y se omite si no hay nada utilizable.
export function categoryRobots(category: Category): Metadata['robots'] | null {
  const directives = category.seoIndex
    .split(',')
    .map((directive) => directive.trim().toLowerCase())
    .filter(Boolean)
  if (directives.length === 0) return null
  return {
    index: !directives.includes('noindex'),
    follow: !directives.includes('nofollow'),
  }
}

export function categoryMetadata(category: Category): CategoryPageMetadata {
  const title = categoryMetadataTitle(category)
  const description = categoryMetadataDescription(category)
  const images = category.openGraphImages
  const robots = categoryRobots(category)
  const openGraph: Metadata['openGraph'] = {
    title,
    description,
    type: 'website',
    ...(images.length > 0 ? { images } : {}),
  }
  return {
    title,
    description,
    alternates: {
      canonical: categoryCanonical(category.slug),
    } satisfies Metadata['alternates'],
    openGraph,
    ...(robots === null ? {} : { robots }),
  }
}

export function categoryNotFoundMetadata(): CategoryPageMetadata {
  return { title: categoryMessages.notFoundMetadata }
}
