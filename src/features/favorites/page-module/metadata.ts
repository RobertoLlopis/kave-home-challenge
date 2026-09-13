import { favoritesCopy } from './messages'

import type { Metadata } from 'next'

export const favoritesMetadata: Metadata = {
  title: `${favoritesCopy.title} · Kave Home`,
  robots: { index: false, follow: false },
}
