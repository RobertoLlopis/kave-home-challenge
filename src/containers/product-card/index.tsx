import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Price } from '@/primitives/price'
import { Button } from '@/primitives/button'
import { FavoriteButton } from '@/primitives/button/favorite-button'
import { Card } from '@/primitives/card'
import { ProductImage } from '@/primitives/product-image'
import { productCardConstants } from './constants'
import { productCardHref } from './helpers'
import { productCardStyles } from './styles'
import type { ProductCardProps } from './types'

export function ProductCard({ product, eagerImage = false }: ProductCardProps) {
  const current = product.salePrice ?? product.price
  const previous = product.salePrice == null ? null : product.price
  return (
    <Card className={productCardStyles.card}>
      <div className={productCardStyles.image}>
        <Link
          href={productCardHref(product.sku)}
          className={productCardStyles.imageLink}
        >
          <ProductImage
            src={product.mainImage}
            alt={product.title}
            sizes={productCardConstants.imageSizes}
            loading={eagerImage ? 'eager' : 'lazy'}
          />
        </Link>
        <FavoriteButton
          className={productCardStyles.favorite}
          item={{
            sku: product.sku,
            title: product.title,
            price: current,
            image: product.mainImage,
          }}
        />
      </div>
      <div className={productCardStyles.body}>
        <div className={productCardStyles.nameRow}>
          <span className={productCardStyles.collection}>
            {product.collection}
          </span>
          <Button
            type="button"
            aria-label="Añadir a la cesta no disponible"
            disabled
            variant="icon"
            className={productCardStyles.addToCart}
          >
            <Plus aria-hidden="true" />
          </Button>
        </div>
        <Link
          href={productCardHref(product.sku)}
          className={productCardStyles.title}
        >
          {product.title}
        </Link>
        <Price value={current} previous={previous} />
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
