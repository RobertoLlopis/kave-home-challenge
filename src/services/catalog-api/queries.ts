import { tryCatch } from '@/utils/try-catch'
import {
  categoriesEndpoint,
  productEndpoint,
  productsEndpoint,
} from './endpoints'
import { CatalogApiError } from './error'
import {
  normalizeCategoriesEnvelope,
  normalizeProductsEnvelope,
  normalizeRequiredProduct,
} from './normalization'
import { requestCatalog } from './transport'

export async function getProducts(page = 1, category?: string) {
  const params = new URLSearchParams({ page: String(page) })
  if (category) params.set('category', category)
  const data = normalizeProductsEnvelope(
    await requestCatalog(`${productsEndpoint()}?${params}`),
  )
  return { results: data.results, count: data.count }
}

export async function getProduct(sku: string) {
  const [data, error] = await tryCatch(requestCatalog(productEndpoint(sku)))
  if (error instanceof CatalogApiError && error.status === 404) return null
  if (error !== null) throw error
  return normalizeRequiredProduct(data)
}

export async function getCategories() {
  const data = normalizeCategoriesEnvelope(
    await requestCatalog(categoriesEndpoint()),
  )
  return data.results
}
