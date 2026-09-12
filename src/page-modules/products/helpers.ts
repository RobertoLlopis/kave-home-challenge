import type { Metadata } from 'next'
import { routes } from '@/constants/routes'
import { pageQuery, parsePage } from '@/utils/pagination'
import { productsCopy } from './constants'
import type { ProductsPageMetadata, ProductsQuery } from './types'

export function resolveProductsQuery(query: ProductsQuery) {
  return { page: parsePage(query.page), category: query.category }
}

export function productsPageDestination(
  page: number,
  pages: number,
  rawPage?: string,
  category?: string,
): string | null {
  if (rawPage === undefined || (rawPage === String(page) && page <= pages))
    return null
  return `${routes.products}${pageQuery(Math.min(page, pages), category)}`
}

export function productsPageHref(page: number, category?: string) {
  return `${routes.products}${pageQuery(page, category)}`
}

export function productsCanonical(page: number, category?: string) {
  return productsPageHref(page, category)
}

export function productsRedirectTarget(
  query: ProductsQuery,
  page: number,
  pages: number,
) {
  return productsPageDestination(page, pages, query.page, query.category)
}

export function productsHeading(category?: string) {
  if (!category) return productsCopy.heading
  return category
    .split('-')
    .filter(Boolean)
    .map((word) => `${word[0]?.toUpperCase() ?? ''}${word.slice(1)}`)
    .join(' ')
}

export function productsMetadata(
  page: number,
  category?: string,
): ProductsPageMetadata {
  const heading = productsHeading(category)
  return {
    title: `${heading} · Kave Home`,
    description: productsCopy.description,
    alternates: {
      canonical: productsCanonical(page, category),
    } satisfies Metadata['alternates'],
  }
}

export function productsDescription() {
  return productsCopy.description
}
