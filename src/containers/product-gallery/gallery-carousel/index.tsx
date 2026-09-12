'use client'

import Image from 'next/image'
import { cn } from '@/utils/classnames'
import { productGalleryConstants } from '../constants'
import { galleryStyles } from '../styles'
import type { ProductGalleryImageProps } from '../types'
import { useHorizontalWheelScroll, useInfiniteGalleryScroll } from './hooks'

function GalleryImage({
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
        galleryStyles.image,
        src === productGalleryConstants.placeholderPath
          ? galleryStyles.placeholder
          : className,
      )}
    />
  )
}

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
      aria-label={productGalleryConstants.label}
      className={galleryStyles.mobile}
    >
      <div
        ref={viewport}
        className={galleryStyles.mobileTrack}
        onScroll={scheduleCorrection}
      >
        {slides.map((src, index) => {
          const clone = loops && (index === 0 || index === slides.length - 1)
          const imageIndex = loops
            ? (index - 1 + images.length) % images.length
            : index
          return (
            <div
              className={galleryStyles.mobileItem}
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
                className={galleryStyles.mobileImage}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function DesktopProductGallery({
  images,
  title,
}: ProductGalleryImageProps) {
  const viewport = useHorizontalWheelScroll()

  return (
    <div className={galleryStyles.desktopCarousel}>
      <div ref={viewport} className={galleryStyles.desktopTrack}>
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
