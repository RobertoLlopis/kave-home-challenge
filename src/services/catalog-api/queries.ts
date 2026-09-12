import { tryCatch } from '@/utils/try-catch'
import {
  categoriesEndpoint,
  productEndpoint,
  productsEndpoint,
  searchEndpoint,
} from './endpoints'
import { CatalogApiError } from './error'
import {
  normalizeCategoriesEnvelope,
  normalizeProductsEnvelope,
  normalizeRequiredProduct,
  normalizeSearchHits,
} from './normalization'
import { requestCatalog } from './transport'

async function query<T extends object>(
  path: string,
  normalize: (value: unknown) => T,
) {
  return normalize(await requestCatalog(path))
}

export async function getProducts(page = 1, category?: string) {
  const params = new URLSearchParams({ page: String(page) })
  if (category) params.set('category', category)
  const data = await query(
    `${productsEndpoint()}?${params}`,
    normalizeProductsEnvelope,
  )
  return { results: data.results, count: data.count }
}

export async function searchProducts(searchTerm: string) {
  const term = searchTerm.trim()
  if (!term) return []
  const hits = await query(searchEndpoint(term), normalizeSearchHits)
  const skus = [...new Set(hits.map((hit) => hit.sku))]
  const products = await Promise.all(skus.map(getProduct))
  return products.filter((product) => product !== null)
}

export async function getProduct(sku: string) {
  const result = await tryCatch(
    query(productEndpoint(sku), normalizeRequiredProduct),
  )
  if (result[0] !== null) return result[0]
  if (result[1] instanceof CatalogApiError && result[1].status === 404)
    return null
  throw result[1]
}

export async function getCategories() {
  const data = await query(categoriesEndpoint(), normalizeCategoriesEnvelope)
  return data.results
}
