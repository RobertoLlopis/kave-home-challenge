import { ProductCard } from '@/containers/product-card'
import { productGridConstants } from './constants'
import { productGridStyles } from './styles'
import type { ProductGridLoadingProps, ProductGridProps } from './types'

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0)
    return (
      <p role="status" className={productGridStyles.empty}>
        {productGridConstants.emptyMessage}
      </p>
    )
  return (
    <div className={productGridStyles.grid}>
      {products.map((product, index) => (
        <ProductCard
          key={product.sku}
          product={product}
          eagerImage={index < productGridConstants.eagerImageCount}
        />
      ))}
    </div>
  )
}

ProductGrid.Loading = function ProductGridLoading({
  count,
}: ProductGridLoadingProps) {
  return (
    <div className={productGridStyles.grid} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <ProductCard.Loading key={index} />
      ))}
    </div>
  )
}
