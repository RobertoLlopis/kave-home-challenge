import { environment } from '@/config/environment/runtime'
import categoriesSnapshot from '@development/catalog-snapshots/categories.json'
import categorySillasSnapshot from '@development/catalog-snapshots/category-sillas.json'
import productPages from '@development/catalog-snapshots/products.json'

const products = productPages.flatMap((page) => page.results)

function searchableText(value: string) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
}

function snapshotSearch(query: string) {
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

function snapshotProducts(url: URL) {
  const page = Math.max(1, Number(url.searchParams.get('page')) || 1)
  return productPages[(page - 1) % productPages.length]
}

export function snapshotCatalog(path: string): unknown | undefined {
  let url: URL
  try {
    url = new URL(path, environment.apiBaseUrl)
  } catch {
    return undefined
  }

  if (url.pathname.endsWith('/products/search/'))
    return snapshotSearch(url.searchParams.get('query') ?? '')

  if (url.pathname.endsWith('/products/')) return snapshotProducts(url)

  const productMatch = url.pathname.match(/\/products\/([^/]+)\/$/)
  if (productMatch) {
    const sku = decodeURIComponent(productMatch[1])
    return products.find((product) => product.sku === sku)
  }

  const categoryMatch = url.pathname.match(/\/nextjs\/categories\/([^/]+)\/$/)
  if (categoryMatch) {
    const slug = decodeURIComponent(categoryMatch[1])
    if (slug === categorySillasSnapshot.slug) return categorySillasSnapshot
    return categoriesSnapshot.results.find((category) => category.slug === slug)
  }

  if (url.pathname.endsWith('/categories/')) return categoriesSnapshot

  return undefined
}
