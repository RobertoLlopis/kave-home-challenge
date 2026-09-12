import { ProductListing } from '@/containers/product-listing'
import { accessibility } from '@/constants/accessibility'
import { productsPageHref } from './helpers'
import { productsCopy } from './constants'
import { productsStyles } from './styles'
import type { ProductsPageProps } from './types'

export function ProductsPage({ products, page, pages }: ProductsPageProps) {
  return (
    <main
      id={accessibility.mainContentId}
      tabIndex={accessibility.mainContentTabIndex}
      className={productsStyles.content}
    >
      <header className={productsStyles.header}>
        <h1 className={productsStyles.title}>{productsCopy.heading}</h1>
        <p className={productsStyles.description}>{productsCopy.description}</p>
      </header>
      <ProductListing
        products={products}
        page={page}
        pages={pages}
        href={productsPageHref}
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
        <p className={productsStyles.description}>{productsCopy.description}</p>
      </header>
      <ProductListing.Loading />
    </main>
  )
}
