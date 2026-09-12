import { connection } from 'next/server'
import { getCategories, getProducts } from '@/services/catalog-api'
import { totalPages } from '@/utils/pagination'
import { HomePage } from './index'
import { resolveHomeQuery } from './helpers'
import type { HomeRouteProps } from './types'

export async function renderHomePage({ searchParams }: HomeRouteProps) {
  await connection()
  const query = await searchParams
  const { page } = resolveHomeQuery(query)
  const [categories, data] = await Promise.all([
    getCategories(),
    getProducts(page),
  ])
  return (
    <HomePage
      categories={categories}
      products={data.results}
      page={page}
      pages={totalPages(data.count)}
    />
  )
}
