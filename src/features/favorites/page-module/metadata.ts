import type { Metadata } from 'next'
import { favoritesCopy } from './constants'

export const favoritesMetadata: Metadata = {
  title: `${favoritesCopy.title} · Kave Home`,
  robots: { index: false, follow: false },
}
