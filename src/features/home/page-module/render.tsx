import { redirect } from 'next/navigation'
import { connection } from 'next/server'

import { routes } from '@/constants/routes'
import { loadProductListing } from '@/containers/product-listing'
import { getCategories } from '@/services/catalog-api'

import { HomePage } from './index'

import type { HomeRouteProps } from './types'

export async function renderHomePage({ searchParams }: HomeRouteProps) {
  await connection()
  const query = await searchParams
  const [categories, result] = await Promise.all([
    getCategories(),
    loadProductListing(routes.home, query.page),
  ])
  if (result.destination) redirect(result.destination)
  return <HomePage categories={categories} listing={result.listing} />
}
