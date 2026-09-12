import { redirect } from 'next/navigation'
import { getCategories, getProducts } from '@/services/catalog-api'
import { totalPages } from '@/utils/pagination'
import { plainText } from '@/utils/plain-text'
import {
  productsDescription,
  productsHeading,
  productsRedirectTarget,
  resolveProductsQuery,
} from './helpers'
import { ProductsPage } from './index'
import type { ProductsRouteProps } from './types'

export async function renderProductsPage({ searchParams }: ProductsRouteProps) {
  const query = await searchParams
  const { page, category } = resolveProductsQuery(query)
  const [data, categories] = await Promise.all([
    getProducts(page, category),
    category ? getCategories() : Promise.resolve([]),
  ])
  const selectedCategory = categories.find((item) => item.slug === category)
  const pages = totalPages(data.count)
  const destination = productsRedirectTarget(query, page, pages)
  if (destination) redirect(destination)
  return (
    <ProductsPage
      products={data.results}
      page={page}
      category={category}
      heading={selectedCategory?.name ?? productsHeading(category)}
      description={
        selectedCategory?.description
          ? plainText(selectedCategory.description)
          : productsDescription()
      }
      pages={pages}
    />
  )
}
