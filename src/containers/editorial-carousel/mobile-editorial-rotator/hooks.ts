'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { editorialConstants, editorialItems } from '../constants'

export function useEditorialRotator() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const fadeTimer = useRef<number | undefined>(undefined)

  const advance = useCallback(() => {
    window.clearTimeout(fadeTimer.current)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIndex((current) => (current + 1) % editorialItems.length)
      return
    }
    setVisible(false)
    fadeTimer.current = window.setTimeout(() => {
      setIndex((current) => (current + 1) % editorialItems.length)
      setVisible(true)
    }, editorialConstants.fadeMs)
  }, [])

  useEffect(() => {
    const interval = window.setInterval(advance, editorialConstants.rotationMs)
    return () => {
      window.clearInterval(interval)
      window.clearTimeout(fadeTimer.current)
    }
  }, [advance])

  return { advance, index, item: editorialItems[index], visible }
}
