import { routes } from '@/constants/routes'
import { productListingCanonical } from '@/containers/product-listing'

import { homeCopy } from './constants'

import type { HomeRouteProps, HomePageMetadata } from './types'

export async function generateHomeMetadata({
  searchParams,
}: HomeRouteProps): Promise<HomePageMetadata> {
  const query = await searchParams
  return {
    title: homeCopy.title,
    description: homeCopy.description,
    alternates: {
      canonical: productListingCanonical(routes.home, query.page),
    },
  }
}
