import { routes } from '@/constants/routes'
import { productListingCanonical } from '@/containers/product-listing'

import { productsCopy } from './messages'

import type { ProductsPageMetadata } from './types'
import type { Metadata } from 'next'

export function productsMetadata(
  rawPage: string | undefined,
): ProductsPageMetadata {
  return {
    title: productsCopy.title,
    description: productsCopy.description,
    alternates: {
      canonical: productListingCanonical(routes.products, rawPage),
    } satisfies Metadata['alternates'],
  }
}
