import { getCategories } from '@/services/catalog-api'
import { plainText, truncateAtWord } from '@/utils/plain-text'
import { productsConstants } from './constants'
import { productsMetadata, resolveProductsQuery } from './helpers'
import type { ProductsRouteProps, ProductsPageMetadata } from './types'

export async function generateProductsMetadata({
  searchParams,
}: ProductsRouteProps): Promise<ProductsPageMetadata> {
  const query = await searchParams
  const { page, category } = resolveProductsQuery(query)
  const categories = category ? await getCategories() : []
  const selected = categories.find((item) => item.slug === category)
  return productsMetadata(
    page,
    category,
    selected?.name,
    selected?.description
      ? truncateAtWord(
          plainText(selected.description),
          productsConstants.metadataDescriptionLimit,
        )
      : undefined,
  )
}
