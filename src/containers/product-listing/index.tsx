import { catalog } from '@/constants/catalog'
import { Pagination } from '@/containers/pagination'
import { ProductGrid } from '@/containers/product-grid'

import type { ProductListingProps } from './types'

export function ProductListing({
  products,
  page,
  pages,
  href,
}: ProductListingProps) {
  return (
    <>
      <ProductGrid products={products} />
      <Pagination page={page} pages={pages} href={href} />
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
