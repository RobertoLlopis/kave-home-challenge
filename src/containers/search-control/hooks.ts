'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

import { routes } from '@/constants/routes'

import { searchControlConstants } from './constants'

import type { FocusEvent, FormEvent, KeyboardEvent } from 'react'

export function useDesktopSearchDisclosure() {
  const [open, setOpen] = useState(false)
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) input.current?.focus()
  }, [open])

  const closeOnEscape = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') setOpen(false)
  }

  const closeOnBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
  }

  return { closeOnBlur, closeOnEscape, input, open, setOpen }
}

export function useSearchNavigation(onNavigate?: () => void) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const navigate = useCallback(
    (value: string) => {
      const term = value.trim()
      if (!term) return
      const params = new URLSearchParams({ q: term })
      router.push(`${routes.search}?${params}`)
      onNavigate?.()
    },
    [onNavigate, router],
  )

  useEffect(() => {
    if (!query.trim()) return
    timer.current = setTimeout(
      () => navigate(query),
      searchControlConstants.debounceMs,
    )
    return () => clearTimeout(timer.current)
  }, [navigate, query])

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    clearTimeout(timer.current)
    navigate(query)
  }

  return { query, setQuery, submit }
}
