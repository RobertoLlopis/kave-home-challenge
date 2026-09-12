import type { Metadata } from 'next'
import { routes } from '@/constants/routes'
import {
  listingPageDestination,
  pageQuery,
  parsePage,
} from '@/utils/pagination'
import { productsCopy } from './constants'
import type { ProductsPageMetadata, ProductsQuery } from './types'

export function resolveProductsQuery(query: ProductsQuery) {
  return { page: parsePage(query.page) }
}

export function productsPageHref(page: number) {
  return `${routes.products}${pageQuery(page)}`
}

export function productsCanonical(page: number) {
  return productsPageHref(page)
}

export function productsRedirectTarget(
  query: ProductsQuery,
  page: number,
  pages: number,
) {
  return listingPageDestination(routes.products, page, pages, query.page)
}

export function productsMetadata(page: number): ProductsPageMetadata {
  return {
    title: productsCopy.title,
    description: productsCopy.description,
    alternates: {
      canonical: productsCanonical(page),
    } satisfies Metadata['alternates'],
  }
}
