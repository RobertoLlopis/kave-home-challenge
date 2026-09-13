'use client'
import GalleryImage from '@/features/product/containers/product-gallery/gallery-image'
import { productGalleryMessages } from '@/features/product/containers/product-gallery/messages'
import { ProductGalleryImageProps } from '@/features/product/containers/product-gallery/types'

import { useInfiniteGalleryScroll } from './hooks'
import { mobileGalleryStyles } from './styles'

export function MobileProductGallery({
  images,
  title,
}: ProductGalleryImageProps) {
  const { loops, scheduleCorrection, slides, viewport } =
    useInfiniteGalleryScroll(images)

  return (
    <div
      role="region"
      aria-roledescription="carrusel"
      aria-label={productGalleryMessages.label}
      className={mobileGalleryStyles.mobile}
    >
      <div
        ref={viewport}
        className={mobileGalleryStyles.mobileTrack}
        onScroll={scheduleCorrection}
      >
        {slides.map((src, index) => {
          const clone = loops && (index === 0 || index === slides.length - 1)
          const imageIndex = loops
            ? (index - 1 + images.length) % images.length
            : index
          return (
            <div
              className={mobileGalleryStyles.mobileItem}
              key={`${clone ? 'clone' : 'image'}-${index}-${src}`}
              aria-hidden={clone || undefined}
            >
              <GalleryImage
                src={src}
                alt={
                  clone
                    ? ''
                    : `${title}, imagen ${imageIndex + 1} de ${images.length}`
                }
                priority={imageIndex === 0 && !clone}
                sizes="(max-width: 767px) 100vw, 1px"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
