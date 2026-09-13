'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'

import { categoryListMessages } from '@/containers/category-list/messages'
import { categoryListStyles } from '@/containers/category-list/styles'
import { Button } from '@/primitives/button'

import { useCategoryCarousel } from './hooks'

import type { ReactNode } from 'react'

export default function CategoryCarouselWrapper({
  children,
}: {
  children: ReactNode
}) {
  const { max, move, position, syncPosition, viewport } = useCategoryCarousel()

  return (
    <div
      role="region"
      aria-label={categoryListMessages.carouselLabel}
      aria-roledescription="carousel"
      className={categoryListStyles.carousel}
    >
      <div className={categoryListStyles.controls}>
        <Button
          type="button"
          nativeButton
          aria-label={categoryListMessages.previousLabel}
          disabled={position <= 1}
          onClick={() => move(-1)}
        >
          <ArrowLeft aria-hidden="true" />
        </Button>
        <Button
          type="button"
          nativeButton
          aria-label={categoryListMessages.nextLabel}
          disabled={position >= max - 1}
          onClick={() => move(1)}
        >
          <ArrowRight aria-hidden="true" />
        </Button>
      </div>
      <div
        ref={viewport}
        className={categoryListStyles.viewport}
        onScroll={syncPosition}
      >
        {children}
      </div>
    </div>
  )
}
