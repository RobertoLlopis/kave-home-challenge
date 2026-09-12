'use client'

import { galleryStyles } from '../styles'
import { desktopGalleryStyles } from './styles'
import type { ProductGalleryImageProps } from '../types'
import { useHorizontalWheelScroll } from './hooks'
import GalleryImage from '../gallery-image'

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
