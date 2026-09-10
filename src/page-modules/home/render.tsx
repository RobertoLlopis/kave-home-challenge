import { redirect } from 'next/navigation'
import { getCategories, getProducts } from '@/services/catalog-api'
import { totalPages } from '@/utils/pagination'
import { homeRedirectTarget, resolveHomeQuery } from './helpers'
import { HomePage } from './index'
import type { HomeRouteProps } from './types'

export async function renderHomePage({ searchParams }: HomeRouteProps) {
  const query = await searchParams
  const { page } = resolveHomeQuery(query)
  const [categories, data] = await Promise.all([
    getCategories(),
    getProducts(page),
  ])
  const pages = totalPages(data.count)
  const destination = homeRedirectTarget(query, page, pages)
  if (destination) redirect(destination)
  return (
    <HomePage
      categories={categories}
      products={data.results}
      page={page}
      pages={pages}
    />
  )
}
