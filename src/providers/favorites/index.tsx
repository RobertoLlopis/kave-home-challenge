'use client'

import { createContext, useContext } from 'react'

import { useFavoritesState } from './hooks'
import { favoritesMessages } from './messages'

import type { FavoritesContextValue, FavoritesProviderProps } from './types'
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
  const value = useFavoritesState(mediaHost)

  return <Context value={value}>{children}</Context>
}

export function useFavorites() {
  const context = useContext(Context)
  if (!context) throw new Error(favoritesMessages.contextError)
  return context
}
