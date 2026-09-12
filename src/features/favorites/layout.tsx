import { favoritesMetadata } from './page-module/metadata'

import type { ReactNode } from 'react'

export const metadata = favoritesMetadata

export default function FavoritesLayout({ children }: { children: ReactNode }) {
  return children
}
