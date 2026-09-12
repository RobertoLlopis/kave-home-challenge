import { environment } from '@/config/environment/runtime'
import { tryCatchSync } from '@/utils/try-catch'

import { catalogApiConstants } from './constants'
import { CatalogApiError } from './error'

import type { Category, Envelope, Product, SearchHit } from './types'

const validAmount = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value >= 0

const validStock = (value: unknown): value is number =>
  validAmount(value) && Number.isInteger(value)

const validCatalogUrl = (value: unknown): value is string | null => {
  if (value === null) return true
  if (typeof value !== 'string') return false
  const [url, error] = tryCatchSync(() => new URL(value))
  if (error !== null || url === null) return false
  return (
    catalogApiConstants.protocols.some(
      (protocol) => protocol === url.protocol,
    ) &&
    !url.username &&
    !url.password &&
    !url.hash
  )
}

export function safeImage(value: unknown): string | null {
  const source =
    value && typeof value === 'object'
      ? (value as Record<string, unknown>).url
      : value
  if (typeof source !== 'string') return null
  const [url, error] = tryCatchSync(() => new URL(source))
  if (error !== null || url === null) return null
  if (
    url.protocol !== 'https:' ||
    url.hostname !== environment.mediaHost ||
    url.port ||
    url.username ||
    url.password
  )
    return null
  return url.toString()
}

export function normalizeProduct(value: unknown): Product | null {
  if (!value || typeof value !== 'object') return null
  const product = value as Record<string, unknown>
  if (
    typeof product.sku !== 'string' ||
    typeof product.title !== 'string' ||
    !validAmount(product.price) ||
    (product.salePrice != null && !validAmount(product.salePrice)) ||
    !validStock(product.stock)
  )
    return null
  const images = Array.isArray(product.images)
    ? product.images
        .map(safeImage)
        .filter((item): item is string => item !== null)
    : []
  return {
    sku: product.sku,
    title: product.title,
    collection:
      typeof product.collection === 'string' && product.collection.trim()
        ? product.collection
        : catalogApiConstants.fallbackCollection,
    slug:
      typeof product.slug === 'string'
        ? product.slug
        : product.sku.toLowerCase(),
    price: product.price,
    salePrice: product.salePrice == null ? null : product.salePrice,
    mainImage: safeImage(product.mainImage) ?? images[0] ?? null,
    images,
    description:
      typeof product.description === 'string' ? product.description : '',
    stock: product.stock,
  }
}

function requiredProduct(value: unknown): Product {
  const product = normalizeProduct(value)
  if (!product)
    throw new CatalogApiError(
      catalogApiConstants.messages.invalidProduct,
      'contract',
    )
  return product
}

export function normalizeEnvelope(value: unknown): Envelope<unknown> {
  if (!value || typeof value !== 'object')
    throw new CatalogApiError(
      catalogApiConstants.messages.invalidResponse,
      'contract',
    )
  const envelope = value as Record<string, unknown>
  if (
    !Array.isArray(envelope.results) ||
    typeof envelope.count !== 'number' ||
    !Number.isFinite(envelope.count) ||
    envelope.count < 0
  )
    throw new CatalogApiError(
      catalogApiConstants.messages.invalidEnvelope,
      'contract',
    )
  if (!validCatalogUrl(envelope.next) || !validCatalogUrl(envelope.previous))
    throw new CatalogApiError(
      catalogApiConstants.messages.invalidPagination,
      'contract',
    )
  return {
    count: envelope.count,
    next: envelope.next,
    previous: envelope.previous,
    results: envelope.results,
  }
}

export function normalizeProductsEnvelope(value: unknown): Envelope<Product> {
  const envelope = normalizeEnvelope(value)
  return { ...envelope, results: envelope.results.map(requiredProduct) }
}

export function normalizeCategory(value: unknown): Category | null {
  if (!value || typeof value !== 'object') return null
  const category = value as Record<string, unknown>
  if (typeof category.id !== 'number' || typeof category.name !== 'string')
    return null
  const seo =
    category.seo && typeof category.seo === 'object'
      ? (category.seo as Record<string, unknown>)
      : {}
  return {
    id: category.id,
    name: category.name,
    slug:
      typeof category.slug === 'string'
        ? category.slug
        : String(category.pimCode ?? ''),
    highlightImage: safeImage(category.highlightImage),
    description:
      typeof category.description === 'string' ? category.description : '',
    seoTitle: typeof seo.seoTitle === 'string' ? seo.seoTitle : '',
    seoDescription:
      typeof seo.seoDescription === 'string' ? seo.seoDescription : '',
    seoIndex: typeof seo.index === 'string' ? seo.index : '',
    openGraphImages: Array.isArray(category.openGraphImages)
      ? category.openGraphImages
          .map(safeImage)
          .filter((item): item is string => item !== null)
      : [],
    children: Array.isArray(category.mainChildren)
      ? category.mainChildren
          .map(normalizeCategory)
          .filter((item): item is Category => item !== null)
      : [],
  }
}

function requiredCategory(value: unknown): Category {
  const category = normalizeCategory(value)
  if (!category)
    throw new CatalogApiError(
      catalogApiConstants.messages.invalidCategory,
      'contract',
    )
  return category
}

export function normalizeCategoriesEnvelope(
  value: unknown,
): Envelope<Category> {
  const envelope = normalizeEnvelope(value)
  return { ...envelope, results: envelope.results.map(requiredCategory) }
}

export function normalizeRequiredProduct(value: unknown): Product {
  return requiredProduct(value)
}

export function normalizeRequiredCategory(value: unknown): Category {
  return requiredCategory(value)
}

export function normalizeSearchHits(value: unknown): SearchHit[] {
  if (!Array.isArray(value))
    throw new CatalogApiError(
      catalogApiConstants.messages.invalidSearch,
      'contract',
    )
  return value.map((item) => {
    if (!item || typeof item !== 'object')
      throw new CatalogApiError(
        catalogApiConstants.messages.invalidSearch,
        'contract',
      )
    const hit = item as Record<string, unknown>
    if (
      typeof hit.title !== 'string' ||
      !hit.title.trim() ||
      typeof hit.sku !== 'string' ||
      !hit.sku.trim() ||
      typeof hit.url !== 'string' ||
      !validCatalogUrl(hit.url)
    )
      throw new CatalogApiError(
        catalogApiConstants.messages.invalidSearch,
        'contract',
      )
    return { title: hit.title, sku: hit.sku, url: hit.url }
  })
}
