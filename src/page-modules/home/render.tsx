import { connection } from 'next/server'
import { getCategories } from '@/services/catalog-api'
import { HomePage } from './index'

export async function renderHomePage() {
  await connection()
  const categories = await getCategories()
  return <HomePage categories={categories} />
}
