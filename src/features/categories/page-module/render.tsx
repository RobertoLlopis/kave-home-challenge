import { connection } from 'next/server'
import { getCategories } from '@/services/catalog-api'
import { CategoriesPage } from './index'

export async function renderCategoriesPage() {
  await connection()
  const categories = await getCategories()
  return <CategoriesPage categories={categories} />
}
