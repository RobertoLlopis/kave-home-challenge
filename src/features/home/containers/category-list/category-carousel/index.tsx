'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '@/primitives/button'
import { categoryListConstants } from '../constants'
import { categoryListStyles } from '../styles'
import { useCategoryCarousel } from './hooks'

export function CategoryCarousel({ children }: { children: ReactNode }) {
  const { max, move, position, syncPosition, viewport } = useCategoryCarousel()

  return (
    <div
      role="region"
      aria-label={categoryListConstants.carouselLabel}
      aria-roledescription="carousel"
      className={categoryListStyles.carousel}
    >
      <div className={categoryListStyles.controls}>
        <Button
          type="button"
          nativeButton
          aria-label={categoryListConstants.previousLabel}
          disabled={position <= 1}
          onClick={() => move(-1)}
        >
          <ArrowLeft aria-hidden="true" />
        </Button>
        <Button
          type="button"
          nativeButton
          aria-label={categoryListConstants.nextLabel}
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
