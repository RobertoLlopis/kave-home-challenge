import { favoritesCopy } from './constants'

import type { Metadata } from 'next'

export const favoritesMetadata: Metadata = {
  title: `${favoritesCopy.title} · Kave Home`,
  robots: { index: false, follow: false },
}
