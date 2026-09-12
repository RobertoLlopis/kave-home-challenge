import { ProductGrid } from '@/containers/product-grid'
import { Pagination } from '@/primitives/pagination'
import { catalog } from '@/constants/catalog'
import { accessibility } from '@/constants/accessibility'
import { productsPageHref } from './helpers'
import { productsCopy } from './constants'
import { productsStyles } from './styles'
import type { ProductsPageProps } from './types'

export function ProductsPage({
  products,
  page,
  category,
  heading,
  description,
  pages,
}: ProductsPageProps) {
  return (
    <main
      id={accessibility.mainContentId}
      tabIndex={accessibility.mainContentTabIndex}
      className={productsStyles.content}
    >
      <header className={productsStyles.header}>
        <h1 className={productsStyles.title}>{heading}</h1>
        <p className={productsStyles.description}>{description}</p>
      </header>
      <ProductGrid products={products} />
      <Pagination
        page={page}
        pages={pages}
        href={(next) => productsPageHref(next, category)}
      />
    </main>
  )
}

ProductsPage.Loading = function ProductsLoading() {
  return (
    <main
      id={accessibility.mainContentId}
      tabIndex={accessibility.mainContentTabIndex}
      className={productsStyles.content}
      aria-busy="true"
      aria-label={productsCopy.loadingLabel}
    >
      <header className={productsStyles.header}>
        <h1 className={productsStyles.title}>{productsCopy.heading}</h1>
        <p className={productsStyles.description}>{productsCopy.title}</p>
      </header>
      <ProductGrid.Loading count={catalog.pageSize} />
    </main>
  )
}
