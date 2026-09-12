import { FavoriteItem } from '@/providers/favorites'

export type FavoriteMarkProps = { active: boolean }
export type FavoriteButtonProps = {
  item: FavoriteItem
  className?: string
}
