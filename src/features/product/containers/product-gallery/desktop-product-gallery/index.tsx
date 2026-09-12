'use client'

import GalleryImage from '@/features/product/containers/product-gallery/gallery-image'
import { galleryStyles } from '@/features/product/containers/product-gallery/styles'

import { useHorizontalWheelScroll } from './hooks'
import { desktopGalleryStyles } from './styles'

import type { ProductGalleryImageProps } from '@/features/product/containers/product-gallery/types'

export function DesktopProductGallery({
  images,
  title,
}: ProductGalleryImageProps) {
  const viewport = useHorizontalWheelScroll()

  return (
    <div className={desktopGalleryStyles.desktopCarousel}>
      <div ref={viewport} className={desktopGalleryStyles.desktopTrack}>
        {images.map((src, index) => (
          <div className={galleryStyles.thumb} key={src}>
            <GalleryImage
              src={src}
              alt={`${title}, imagen ${index + 2}`}
              sizes="(min-width:768px) 21vw,100vw"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
