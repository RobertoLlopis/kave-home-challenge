import type { EcoPart } from '@/types/catalog'
import { tryCatchSync } from '@/utils/try-catch'
import { favoritesConstants } from './constants'
import type {
  FavoriteItem,
  FavoriteStorage,
  FavoriteStorageAccessor,
  FavoriteStorageEnvelope,
  FavoritesState,
} from './types'

export function getFavoriteStorage(
  accessStorage: FavoriteStorageAccessor = () => localStorage,
): FavoriteStorage | null {
  const [storage, error] = tryCatchSync(accessStorage)
  if (error !== null || storage === null) return null
  return storage
}

export function isFavoriteImage(
  value: unknown,
  mediaHost: string,
): value is string | null {
  if (value === null) return true
  if (typeof value !== 'string') return false
  const [url, urlError] = tryCatchSync(() => new URL(value))
  const [configured, configuredError] = tryCatchSync(
    () => new URL(`https://${mediaHost}`),
  )
  if (
    urlError !== null ||
    configuredError !== null ||
    url === null ||
    configured === null
  )
    return false
  return (
    url.protocol === 'https:' &&
    url.hostname === configured.hostname &&
    url.port === configured.port &&
    !url.username &&
    !url.password
  )
}

function isEcoPart(value: unknown): value is EcoPart {
  if (value === undefined || value === null) return true
  if (!value || typeof value !== 'object') return false
  const part = value as Record<string, unknown>
  return (
    typeof part.amount === 'number' &&
    Number.isFinite(part.amount) &&
    part.amount >= 0 &&
    typeof part.currency === 'string' &&
    part.currency.length > 0
  )
}

export function isFavoriteItem(
  value: unknown,
  mediaHost: string,
): value is FavoriteItem {
  if (!value || typeof value !== 'object') return false
  const item = value as Record<string, unknown>
  return (
    typeof item.sku === 'string' &&
    item.sku.length > 0 &&
    typeof item.title === 'string' &&
    item.title.length > 0 &&
    typeof item.price === 'number' &&
    Number.isFinite(item.price) &&
    isFavoriteImage(item.image, mediaHost) &&
    isEcoPart(item.ecoPart)
  )
}

export function readFavorites(
  value: string | null,
  mediaHost: string,
): FavoriteItem[] {
  const [parsed, error] = tryCatchSync<unknown>(() => JSON.parse(value || '{}'))
  if (
    error !== null ||
    !parsed ||
    typeof parsed !== 'object' ||
    Array.isArray(parsed)
  )
    return []
  const envelope = parsed as FavoriteStorageEnvelope
  if (
    envelope.version !== favoritesConstants.schemaVersion ||
    !Array.isArray(envelope.items)
  )
    return []
  return envelope.items.filter((item) => isFavoriteItem(item, mediaHost))
}

export function loadFavorites(
  storage: FavoriteStorage | null,
  mediaHost: string,
): FavoriteItem[] {
  if (!storage) return []
  const [value, error] = tryCatchSync(() =>
    storage.getItem(favoritesConstants.storageKey),
  )
  if (error !== null) return []
  return readFavorites(value, mediaHost)
}

export function saveFavorites(
  storage: FavoriteStorage | null,
  items: FavoriteItem[],
): void {
  if (!storage) return
  const envelope = JSON.stringify({
    version: favoritesConstants.schemaVersion,
    items,
  })
  tryCatchSync(() => storage.setItem(favoritesConstants.storageKey, envelope))
}

export function toggleFavorite(
  items: FavoriteItem[],
  item: FavoriteItem,
): FavoriteItem[] {
  if (items.some((current) => current.sku === item.sku))
    return items.filter((current) => current.sku !== item.sku)
  return [...items, item]
}

export const initialFavoritesState: FavoritesState = {
  items: [],
  pending: true,
}
