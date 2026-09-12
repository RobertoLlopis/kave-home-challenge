'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import {
  editorialConstants,
  editorialItems,
} from '@/features/home/containers/editorial-carousel/constants'

export function useEditorialRotator() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [paused, setPaused] = useState(false)
  const [rotationCycle, restartRotation] = useState(0)
  const fadeTimer = useRef<number | undefined>(undefined)

  const advance = useCallback(() => {
    window.clearTimeout(fadeTimer.current)
    if (paused) {
      setIndex((current) => (current + 1) % editorialItems.length)
      return
    }
    setVisible(false)
    fadeTimer.current = window.setTimeout(() => {
      setIndex((current) => (current + 1) % editorialItems.length)
      setVisible(true)
    }, editorialConstants.fadeMs)
  }, [paused])

  useEffect(
    () => () => {
      window.clearTimeout(fadeTimer.current)
    },
    [],
  )

  useEffect(() => {
    if (paused) return
    const interval = window.setInterval(advance, editorialConstants.rotationMs)
    return () => window.clearInterval(interval)
  }, [advance, paused, rotationCycle])

  const advanceManually = useCallback(() => {
    restartRotation((current) => current + 1)
    advance()
  }, [advance])

  const togglePause = useCallback(() => setPaused((current) => !current), [])
  return {
    advanceManually,
    index,
    item: editorialItems[index],
    paused,
    togglePause,
    visible,
  }
}
