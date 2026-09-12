import { environment } from '@/config/environment/runtime'
import { catalogApiConstants } from './constants'

const endpoint = (path: string) =>
  new URL(path, environment.apiBaseUrl).toString()
export function productsEndpoint() {
  return endpoint(catalogApiConstants.productsPath)
}

export function searchEndpoint(query: string) {
  const url = new URL('search/', productsEndpoint())
  url.search = new URLSearchParams({ query }).toString()
  return url.toString()
}

export function productEndpoint(sku: string) {
  return endpoint(
    `${catalogApiConstants.productsPath}${encodeURIComponent(sku)}/`,
  )
}

export function categoriesEndpoint() {
  return endpoint(catalogApiConstants.categoriesPath)
}
