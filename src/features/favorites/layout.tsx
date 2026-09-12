import type { ReactNode } from 'react'
import { favoritesMetadata } from './page-module/metadata'

export const metadata = favoritesMetadata

export default function FavoritesLayout({ children }: { children: ReactNode }) {
  return children
}
