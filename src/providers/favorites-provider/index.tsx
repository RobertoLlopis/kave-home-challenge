'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { favoritesConstants } from './constants'
import {
  getFavoriteStorage,
  initialFavoritesState,
  loadFavorites,
  saveFavorites,
  toggleFavorite,
} from './helpers'
import type {
  FavoriteItem,
  FavoritesContextValue,
  FavoritesProviderProps,
} from './types'
export type { FavoriteItem } from './types'
export {
  getFavoriteStorage,
  initialFavoritesState,
  isFavoriteImage,
  isFavoriteItem,
  loadFavorites,
  readFavorites,
  saveFavorites,
  toggleFavorite,
} from './helpers'

const Context = createContext<FavoritesContextValue | null>(null)

export function FavoritesProvider({
  children,
  mediaHost,
}: FavoritesProviderProps) {
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
  return (
    <Context
      value={{
        items,
        pending,
        toggle,
        has: (sku) => items.some((item) => item.sku === sku),
      }}
    >
      {children}
    </Context>
  )
}

export function useFavorites() {
  const context = useContext(Context)
  if (!context) throw new Error(favoritesConstants.contextError)
  return context
}
