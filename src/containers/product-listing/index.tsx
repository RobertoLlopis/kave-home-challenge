import { catalog } from '@/constants/catalog'
import { Pagination } from '@/containers/pagination'
import { ProductGrid } from '@/containers/product-grid'

import { productListingHref } from './logic'

import type { ProductListingProps } from './types'

export {
  loadProductListing,
  productListingCanonical,
  productListingHref,
} from './logic'
export type { ProductListingProps } from './types'

export function ProductListing({
  basePath,
  products,
  page,
  pages,
}: ProductListingProps) {
  return (
    <>
      <ProductGrid products={products} />
      <Pagination
        page={page}
        pages={pages}
        href={(target) => productListingHref(basePath, target)}
      />
    </>
  )
}

ProductListing.Loading = function ProductListingLoading() {
  return (
    <>
      <ProductGrid.Loading count={catalog.pageSize} />
      <Pagination.Loading />
    </>
  )
}
