import Image from 'next/image'

import { productGalleryConstants } from '@/features/product/containers/product-gallery/constants'
import { cn } from '@/utils/classnames'

import { galleryImageStyles } from './styles'

export default function GalleryImage({
  src,
  alt,
  priority = false,
  sizes,
  className,
}: {
  src: string
  alt: string
  priority?: boolean
  sizes: string
  className?: string
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={cn(
        galleryImageStyles.image,
        src === productGalleryConstants.placeholderPath
          ? galleryImageStyles.placeholder
          : className,
      )}
    />
  )
}
