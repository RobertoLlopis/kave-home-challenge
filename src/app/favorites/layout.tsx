import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { favoritesCopy } from '@/page-modules/favorites/constants'

export const metadata: Metadata = {
  title: `${favoritesCopy.title} · Kave Home`,
  robots: { index: false, follow: false },
}
export default function FavoritesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children
}
