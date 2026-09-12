'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { categoryListConstants } from '@/containers/category-list/constants'

export function useCategoryCarousel() {
  const viewport = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(0)
  const [max, setMax] = useState(0)

  const syncPosition = useCallback(() => {
    const node = viewport.current
    if (node) {
      setPosition(node.scrollLeft)
      setMax(Math.max(0, node.scrollWidth - node.clientWidth))
    }
  }, [])

  useEffect(() => {
    const node = viewport.current
    if (!node) return
    syncPosition()
    const observer = new ResizeObserver(syncPosition)
    observer.observe(node)
    return () => observer.disconnect()
  }, [syncPosition])

  const move = (direction: number) => {
    const node = viewport.current
    if (!node) return
    const step =
      (node.querySelector('li')?.getBoundingClientRect().width ??
        node.clientWidth) + categoryListConstants.gapPixels
    node.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  return { max, move, position, syncPosition, viewport }
}
