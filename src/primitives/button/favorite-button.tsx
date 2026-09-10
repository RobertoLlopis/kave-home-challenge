'use client'
import { useFavorites } from '@/providers/favorites-provider'
import { Button } from './index'
import { favoriteLabels } from './constants'
import { favoriteButtonStyles } from './styles'
import type { FavoriteButtonProps, FavoriteMarkProps } from './types'

function FavoriteMark({ active }: FavoriteMarkProps) {
  if (active) return <>♥</>
  return <>♡</>
}
function favoriteLabel(active: boolean) {
  if (active) return favoriteLabels.remove
  return favoriteLabels.add
}
export function FavoriteButton({ item }: FavoriteButtonProps) {
  const { has, toggle } = useFavorites()
  const active = has(item.sku)
  return (
    <Button
      type="button"
      aria-label={favoriteLabel(active)}
      aria-pressed={active}
      onClick={() => toggle(item)}
      className={favoriteButtonStyles}
    >
      <FavoriteMark active={active} />
    </Button>
  )
}
