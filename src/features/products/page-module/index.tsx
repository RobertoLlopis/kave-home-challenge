import { accessibility } from '@/constants/accessibility'
import { ProductListing } from '@/containers/product-listing'

import { productsCopy } from './constants'
import { productsStyles } from './styles'

import type { ProductsPageProps } from './types'

export function ProductsPage({ listing }: ProductsPageProps) {
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
      <ProductListing {...listing} />
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
