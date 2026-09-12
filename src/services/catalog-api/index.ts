export type { Category, Product } from './types'
export { CatalogApiError } from './error'
export { normalizeProduct } from './normalization'
export {
  getCategories,
  getProduct,
  getProducts,
  searchProducts,
} from './queries'
