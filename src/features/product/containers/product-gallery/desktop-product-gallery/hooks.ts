'use client'

import { useEffect, useRef } from 'react'

export function useHorizontalWheelScroll() {
  const viewport = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = viewport.current
    if (!node) return

    const moveWithWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
      const maximum = node.scrollWidth - node.clientWidth
      const canMove =
        event.deltaY > 0 ? node.scrollLeft < maximum - 1 : node.scrollLeft > 1
      if (!canMove) return
      event.preventDefault()
      node.scrollLeft += event.deltaY
    }

    node.addEventListener('wheel', moveWithWheel, { passive: false })
    return () => node.removeEventListener('wheel', moveWithWheel)
  }, [])

  return viewport
}
