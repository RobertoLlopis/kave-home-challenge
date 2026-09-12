import { getProducts } from '@/services/catalog-api'
import {
  listingPageDestination,
  pageQuery,
  parsePage,
  totalPages,
} from '@/utils/pagination'

import type { ProductListingResult } from './types'

export function productListingHref(basePath: string, page: number) {
  return `${basePath}${pageQuery(page)}`
}

export function productListingCanonical(
  basePath: string,
  rawPage: string | undefined,
) {
  return productListingHref(basePath, parsePage(rawPage))
}

export async function loadProductListing(
  basePath: string,
  rawPage: string | undefined,
): Promise<ProductListingResult> {
  const page = parsePage(rawPage)
  const data = await getProducts(page)
  const pages = totalPages(data.count)
  return {
    destination: listingPageDestination(basePath, page, pages, rawPage),
    listing: { basePath, page, pages, products: data.results },
  }
}
