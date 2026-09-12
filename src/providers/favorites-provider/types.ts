import type { ReactNode } from 'react'

export type FavoriteItem = {
  sku: string
  title: string
  price: number
  image: string | null
}
export type FavoriteStorage = Pick<Storage, 'getItem' | 'setItem'>
export type FavoriteStorageAccessor = () => FavoriteStorage
export type FavoriteStorageEnvelope = {
  version?: unknown
  items?: unknown
}
export type FavoritesState = {
  items: FavoriteItem[]
  pending: boolean
}
export type FavoritesProviderProps = {
  children: ReactNode
  mediaHost: string
}
export type FavoritesContextValue = {
  items: FavoriteItem[]
  pending: boolean
  toggle: (item: FavoriteItem) => void
  has: (sku: string) => boolean
}
