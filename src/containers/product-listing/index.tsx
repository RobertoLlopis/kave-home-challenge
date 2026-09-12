import { ProductGrid } from '@/containers/product-grid'
import { Pagination } from '@/containers/pagination'
import { catalog } from '@/constants/catalog'
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
