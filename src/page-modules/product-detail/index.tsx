import { ProductGallery } from '@/containers/product-gallery'
import { ProductPurchase } from '@/containers/product-purchase'
import { DeliveryMessage, ServiceFooter } from '@/containers/service-footer'
import { accessibility } from '@/constants/accessibility'
import { FavoriteButton } from '@/primitives/button/favorite-button'
import { Price } from '@/primitives/price'
import { Skeleton } from '@/primitives/skeleton'
import { productDetailConstants } from './constants'
import { productDetailStyles } from './styles'
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
      <div className={productDetailStyles.layout}>
        <ProductGallery product={product} />
        <section className={productDetailStyles.panel}>
          <span
            className={productDetailStyles.panelHandle}
            aria-hidden="true"
          />
          <div className={productDetailStyles.headingRow}>
            <h1 className={productDetailStyles.title}>{product.collection}</h1>
            <FavoriteButton
              className={productDetailStyles.favorite}
              item={{
                sku: product.sku,
                title: product.title,
                price: current,
                image: product.mainImage,
              }}
            />
          </div>
          <p className={productDetailStyles.description}>{product.title}</p>
          <Price
            value={current}
            previous={previous}
            className={productDetailStyles.price}
          />
          <ProductPurchase stock={product.stock} />
          <DeliveryMessage />
        </section>
      </div>
      <ServiceFooter />
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
      <div className={productDetailStyles.layout}>
        <ProductGallery.Loading />
        <section className={productDetailStyles.loadingPanel}>
          <DetailTitleLoading />
          <DetailDescriptionLoading />
          <div className={productDetailStyles.loadingPrice}>
            <Price.Loading />
          </div>
        </section>
      </div>
      <ServiceFooter.Loading />
    </main>
  )
}
