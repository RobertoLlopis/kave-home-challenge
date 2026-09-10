import Link from 'next/link'
import { Price } from '@/primitives/price'
import { FavoriteButton } from '@/primitives/button/favorite-button'
import { Card } from '@/primitives/card'
import { ProductImage } from '@/primitives/product-image'
import { productCardConstants } from './constants'
import { productCardHref } from './helpers'
import { productCardStyles } from './styles'
import type { ProductCardProps } from './types'

export function ProductCard({ product }: ProductCardProps) {
  const current = product.salePrice ?? product.price
  const previous = product.salePrice == null ? null : product.price
  return (
    <Card className={productCardStyles.card}>
      <div className={productCardStyles.image}>
        <ProductImage
          src={product.mainImage}
          alt={product.title}
          sizes={productCardConstants.imageSizes}
        />
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
      <div className={productCardStyles.body}>
        <Link
          href={productCardHref(product.sku)}
          className={productCardStyles.title}
        >
          {product.title}
        </Link>
        <Price value={current} previous={previous} ecoPart={product.ecoPart} />
      </div>
    </Card>
  )
}

ProductCard.Loading = function ProductCardLoading() {
  return (
    <Card className={productCardStyles.card} aria-hidden="true">
      <div className={productCardStyles.image}>
        <ProductImage.Loading />
      </div>
      <div className={productCardStyles.body}>
        <div className={productCardStyles.loadingTitle} />
        <Price.Loading />
      </div>
    </Card>
  )
}
