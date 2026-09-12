'use client'
import Link from 'next/link'

import { accessibility } from '@/constants/accessibility'
import { routes } from '@/constants/routes'
import { FavoritesList } from '@/features/favorites/containers/list'
import { Button } from '@/primitives/button'
import { useFavorites } from '@/providers/favorites'

import { favoritesCopy } from './constants'
import { favoriteProduct } from './helpers'
import { favoritesStyles } from './styles'

import type { FavoritesViewProps } from './types'

export function FavoritesView({ loading }: FavoritesViewProps) {
  const { items, pending } = useFavorites()
  if (pending) return loading
  if (items.length === 0)
    return (
      <main
        id={accessibility.mainContentId}
        tabIndex={accessibility.mainContentTabIndex}
        className={favoritesStyles.content}
      >
        <h1 className={favoritesStyles.title}>{favoritesCopy.title}</h1>
        <div className={favoritesStyles.empty}>
          <p>{favoritesCopy.emptyMessage}</p>
          <Button
            nativeButton={false}
            render={<Link href={routes.products} />}
            className={favoritesStyles.discover}
          >
            {favoritesCopy.discoverProductsLabel}
          </Button>
        </div>
      </main>
    )
  return (
    <main
      id={accessibility.mainContentId}
      tabIndex={accessibility.mainContentTabIndex}
      className={favoritesStyles.content}
    >
      <h1 className={favoritesStyles.title}>{favoritesCopy.title}</h1>
      <p className={favoritesStyles.intro}>{favoritesCopy.intro}</p>
      <div className={favoritesStyles.list}>
        <FavoritesList products={items.map(favoriteProduct)} />
      </div>
    </main>
  )
}
