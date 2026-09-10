import { redirect } from 'next/navigation'
import { getProducts } from '@/services/catalog-api'
import { totalPages } from '@/utils/pagination'
import { productsRedirectTarget, resolveProductsQuery } from './helpers'
import { ProductsPage } from './index'
import type { ProductsRouteProps } from './types'

export async function renderProductsPage({ searchParams }: ProductsRouteProps) {
  const query = await searchParams
  const { page, category } = resolveProductsQuery(query)
  const data = await getProducts(page, category)
  const pages = totalPages(data.count)
  const destination = productsRedirectTarget(query, page, pages)
  if (destination) redirect(destination)
  return (
    <ProductsPage
      products={data.results}
      page={page}
      category={category}
      pages={pages}
    />
  )
}
