import categoryDetails from './category-details.json'
import categoriesSnapshot from './categories.json'
import productPages from './products.json'

type SnapshotPage = {
  count: number
  next: string | null
  previous: string | null
  results: unknown[]
}

const products = productPages.flatMap((page) => page.results)

function searchableText(value: string) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
}

function pageNumber(value: string | null) {
  if (!value || !/^\d+$/.test(value)) return 1
  const page = Number(value)
  return Number.isSafeInteger(page) && page > 0 ? page : 1
}

function pageLink(page: number, url: URL) {
  const target = new URL(url)
  target.searchParams.set('page', String(page))
  return target.toString()
}

function paginatedSnapshot(pages: readonly SnapshotPage[], url: URL) {
  const page = pageNumber(url.searchParams.get('page'))
  const snapshot = pages[(page - 1) % pages.length]
  if (!snapshot) return undefined
  // With a single captured page there is no verifiable page size, so the
  // declared total is served as one page and `next` stays null.
  const pageSize = pages[0]?.results.length || snapshot.count || 1
  const lastPage =
    pages.length > 1 ? Math.max(1, Math.ceil(snapshot.count / pageSize)) : 1
  return {
    ...snapshot,
    previous: page > 1 ? pageLink(page - 1, url) : null,
    next: page < lastPage ? pageLink(page + 1, url) : null,
  }
}

function searchSnapshot(query: string) {
  const term = searchableText(query.trim())
  if (!term) return []
  return products
    .filter((product) => searchableText(product.title).includes(term))
    .map((product) => ({
      title: product.title,
      sku: product.sku,
      url: `https://kavehome.com/es/es/p/${product.slug}`,
    }))
}

export function resolveCatalogSnapshot(
  path: string,
  baseUrl: string,
): unknown | undefined {
  let url: URL
  try {
    url = new URL(path, baseUrl)
  } catch {
    return undefined
  }

  if (url.pathname.endsWith('/products/search/'))
    return searchSnapshot(url.searchParams.get('query') ?? '')

  if (url.pathname.endsWith('/products/'))
    return paginatedSnapshot(productPages, url)

  const productMatch = url.pathname.match(/\/products\/([^/]+)\/$/)
  if (productMatch) {
    const sku = decodeURIComponent(productMatch[1])
    return products.find((product) => product.sku === sku)
  }

  const categoryMatch = url.pathname.match(/\/nextjs\/categories\/([^/]+)\/$/)
  if (categoryMatch) {
    const slug = decodeURIComponent(categoryMatch[1])
    return categoryDetails.find((category) => category.slug === slug)
  }

  if (url.pathname.endsWith('/categories/'))
    return paginatedSnapshot([categoriesSnapshot], url)

  return undefined
}

export const snapshotCatalogSize = {
  categories: categoryDetails.length,
  productPages: productPages.length,
  products: products.length,
}
