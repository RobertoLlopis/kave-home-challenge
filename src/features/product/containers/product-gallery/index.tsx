import { ProductDetailImage } from '@/containers/product-image'

import { productGalleryConstants } from './constants'
import { DesktopProductGallery } from './desktop-product-gallery'
import { productImages } from './helpers'
import { MobileProductGallery } from './mobile-product-gallery'
import { galleryStyles } from './styles'

import type { Product } from '@/services/catalog-api'

export function ProductGallery({ product }: { product: Product }) {
  const images = productImages(product)
  const sources = images.length
    ? images
    : [productGalleryConstants.placeholderPath]
  return (
    <div className={galleryStyles.root}>
      <MobileProductGallery images={sources} title={product.title} />
      <div className={galleryStyles.desktop}>
        <div className={galleryStyles.main}>
          <ProductDetailImage
            src={images[0] ?? null}
            alt={`${product.title}, imagen 1`}
            sizes={productGalleryConstants.imageSizes}
          />
        </div>
        {sources.length > 1 ? (
          <DesktopProductGallery
            images={sources.slice(1)}
            title={product.title}
          />
        ) : null}
      </div>
    </div>
  )
}

ProductGallery.Loading = function ProductGalleryLoading() {
  return <div className={galleryStyles.loading} aria-hidden="true" />
}
