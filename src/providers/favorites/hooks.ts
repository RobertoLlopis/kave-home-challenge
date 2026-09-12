'use client'

import { useEffect, useState } from 'react'

import {
  getFavoriteStorage,
  initialFavoritesState,
  loadFavorites,
  saveFavorites,
  toggleFavorite,
} from './helpers'

import type { FavoriteItem } from './types'

export function useFavoritesState(mediaHost: string) {
  const [items, setItems] = useState(initialFavoritesState.items)
  const [pending, setPending] = useState(initialFavoritesState.pending)

  useEffect(() => {
    queueMicrotask(() => {
      setItems(loadFavorites(getFavoriteStorage(), mediaHost))
      setPending(false)
    })
  }, [mediaHost])

  function toggle(item: FavoriteItem) {
    setItems((current) => {
      const next = toggleFavorite(current, item)
      saveFavorites(getFavoriteStorage(), next)
      return next
    })
  }

  function has(sku: string) {
    return items.some((item) => item.sku === sku)
  }

  return { has, items, pending, toggle }
}
