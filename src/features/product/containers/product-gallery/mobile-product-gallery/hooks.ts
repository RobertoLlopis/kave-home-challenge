'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'

export function useInfiniteGalleryScroll(images: string[]) {
  const viewport = useRef<HTMLDivElement>(null)
  const correctionTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const loops = images.length > 1
  const slides = loops
    ? [images.at(-1) as string, ...images, images[0] as string]
    : images

  const jumpTo = (index: number) => {
    const node = viewport.current
    if (!node) return
    node.style.scrollBehavior = 'auto'
    node.scrollLeft = index * node.clientWidth
    requestAnimationFrame(() => node.style.removeProperty('scroll-behavior'))
  }

  const correctLoop = () => {
    const node = viewport.current
    if (!node || !loops || node.clientWidth === 0) return
    const index = Math.round(node.scrollLeft / node.clientWidth)
    if (index === 0) jumpTo(images.length)
    if (index === images.length + 1) jumpTo(1)
  }

  const scheduleCorrection = () => {
    clearTimeout(correctionTimer.current)
    correctionTimer.current = setTimeout(correctLoop, 80)
  }

  useLayoutEffect(() => {
    if (loops) jumpTo(1)
  }, [loops])

  useEffect(
    () => () => {
      clearTimeout(correctionTimer.current)
    },
    [],
  )

  return { loops, scheduleCorrection, slides, viewport }
}
