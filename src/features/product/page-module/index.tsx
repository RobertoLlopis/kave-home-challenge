import { accessibility } from '@/constants/accessibility/constants'
import { FavoriteButton } from '@/containers/favorite-button'
import { Price } from '@/containers/price'
import { DeliveryMessage } from '@/features/product/containers/delivery-message'
import { ProductGallery } from '@/features/product/containers/product-gallery'
import { ProductPurchase } from '@/features/product/containers/product-purchase'
import { ServiceFooter } from '@/features/product/containers/service-footer'
import { Skeleton } from '@/primitives/skeleton'

import { productDetailMessages } from './messages'
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
            <h1 className={productDetailStyles.title}>{product.title}</h1>
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
          <p className={productDetailStyles.description}>
            {product.collection}
          </p>
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
      aria-label={productDetailMessages.loadingLabel}
    >
      <div className={productDetailStyles.layout}>
        <ProductGallery.Loading />
        <section className={productDetailStyles.panel}>
          <span
            className={productDetailStyles.panelHandle}
            aria-hidden="true"
          />
          <div className={productDetailStyles.headingRow}>
            <DetailTitleLoading />
            <Skeleton
              className={productDetailStyles.loadingFavorite}
              aria-hidden="true"
            />
          </div>
          <DetailDescriptionLoading />
          <div className={productDetailStyles.loadingPrice}>
            <Price.Loading />
          </div>
          <ProductPurchase.Loading />
          <DeliveryMessage.Loading />
        </section>
      </div>
      <ServiceFooter.Loading />
    </main>
  )
}
