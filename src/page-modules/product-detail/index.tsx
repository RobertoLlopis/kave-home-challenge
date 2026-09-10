import { accessibility } from '@/constants/accessibility'
import { Button } from '@/primitives/button'
import { FavoriteButton } from '@/primitives/button/favorite-button'
import { Price } from '@/primitives/price'
import { ProductDetailImage } from '@/primitives/product-image'
import { Skeleton } from '@/primitives/skeleton'
import { productDetailStyles } from './styles'
import { productDetailConstants } from './constants'
import { readableDescription } from './helpers'
import type { ProductDetailPageProps } from './types'

export function ProductDetailPage({ product }: ProductDetailPageProps) {
  const current = product.salePrice ?? product.price
  const previous = product.salePrice == null ? null : product.price
  return (
    <main
      id={accessibility.mainContentId}
      tabIndex={accessibility.mainContentTabIndex}
      className={productDetailStyles.main}
    >
      <div className={productDetailStyles.image}>
        <ProductDetailImage
          src={product.mainImage}
          alt={product.title}
          sizes={productDetailConstants.imageSizes}
        />
      </div>
      <section className={productDetailStyles.panel}>
        <div className={productDetailStyles.headingRow}>
          <h1 className={productDetailStyles.title}>{product.title}</h1>
          <FavoriteButton
            item={{
              sku: product.sku,
              title: product.title,
              price: current,
              image: product.mainImage,
              ecoPart: product.ecoPart,
            }}
          />
        </div>
        <div className={productDetailStyles.price}>
          <Price
            value={current}
            previous={previous}
            ecoPart={product.ecoPart}
          />
        </div>
        <p className={productDetailStyles.description}>
          {readableDescription(product.description)}
        </p>
        <Button
          disabled
          className={productDetailStyles.cart}
          aria-label={productDetailConstants.cartUnavailableLabel}
        >
          {productDetailConstants.cartUnavailableText}
        </Button>
      </section>
    </main>
  )
}
function DetailTitleLoading() {
  return (
    <Skeleton className={productDetailStyles.loadingTitle} aria-hidden="true" />
  )
}
function DetailDescriptionLoading() {
  return (
    <Skeleton
      className={productDetailStyles.loadingDescription}
      aria-hidden="true"
    />
  )
}
ProductDetailPage.Loading = function ProductDetailLoading() {
  return (
    <main
      id={accessibility.mainContentId}
      tabIndex={accessibility.mainContentTabIndex}
      className={productDetailStyles.main}
      aria-busy="true"
      aria-label={productDetailConstants.loadingLabel}
    >
      <div className={productDetailStyles.image}>
        <ProductDetailImage.Loading />
      </div>
      <section className={productDetailStyles.loadingPanel}>
        <DetailTitleLoading />
        <div className={productDetailStyles.loadingPrice}>
          <Price.Loading />
        </div>
        <DetailDescriptionLoading />
      </section>
    </main>
  )
}
