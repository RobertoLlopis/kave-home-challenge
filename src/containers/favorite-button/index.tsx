'use client'
import { Heart } from 'lucide-react'
import { useFavorites } from '@/providers/favorites'
import { Button } from '@/primitives/button'
import { cn } from '@/utils/classnames'
import { favoriteLabels } from './constants'
import { favoriteButtonStyles, favoriteIconStyles } from './styles'
import type { FavoriteButtonProps, FavoriteMarkProps } from './types'

function FavoriteMark({ active }: FavoriteMarkProps) {
  return (
    <Heart
      aria-hidden="true"
      className={cn(
        favoriteIconStyles.root,
        active && favoriteIconStyles.active,
      )}
      strokeWidth={1.75}
    />
  )
}

function favoriteLabel(active: boolean) {
  if (active) return favoriteLabels.remove
  return favoriteLabels.add
}

export function FavoriteButton({ item, className }: FavoriteButtonProps) {
  const { has, toggle } = useFavorites()
  const active = has(item.sku)
  return (
    <Button
      type="button"
      aria-label={favoriteLabel(active)}
      aria-pressed={active}
      onClick={() => toggle(item)}
      className={cn(favoriteButtonStyles, className)}
    >
      <FavoriteMark active={active} />
    </Button>
  )
}
