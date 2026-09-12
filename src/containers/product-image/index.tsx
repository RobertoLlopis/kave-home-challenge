import Image from 'next/image'

import { Skeleton } from '@/primitives/skeleton'
import { cn } from '@/utils/classnames'

import { productImageConstants } from './constants'
import { productImageLoadingStyles, productImageStyles } from './styles'

import type { ProductImageProps } from './types'

function sourceFor(src: string | null) {
  if (src) return src
  return productImageConstants.placeholderPath
}

function altFor(src: string | null, alt: string) {
  if (src) return alt
  return `${productImageConstants.fallbackPrefix}${alt}`
}

export function ProductImage({
  src,
  alt,
  sizes,
  loading = 'lazy',
}: ProductImageProps) {
  return (
    <Image
      src={sourceFor(src)}
      alt={altFor(src, alt)}
      fill
      sizes={sizes}
      className={cn(
        productImageStyles.root,
        src === null && productImageStyles.placeholder,
      )}
      loading={loading}
    />
  )
}

export function ProductDetailImage({ src, alt, sizes }: ProductImageProps) {
  return (
    <Image
      src={sourceFor(src)}
      alt={altFor(src, alt)}
      fill
      sizes={sizes}
      className={cn(
        productImageStyles.root,
        src === null && productImageStyles.placeholder,
      )}
      priority
    />
  )
}

ProductImage.Loading = function ProductImageLoading() {
  return <Skeleton className={productImageLoadingStyles} aria-hidden="true" />
}

ProductDetailImage.Loading = ProductImage.Loading
