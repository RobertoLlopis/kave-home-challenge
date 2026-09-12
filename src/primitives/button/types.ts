import type { Button as ButtonPrimitive } from '@base-ui/react/button'
import type { FavoriteItem } from '@/providers/favorites-provider'

export type ButtonVariant = 'secondary' | 'purchase' | 'icon'
export type ButtonProps = ButtonPrimitive.Props & { variant?: ButtonVariant }
export type FavoriteMarkProps = { active: boolean }
export type FavoriteButtonProps = {
  item: FavoriteItem
  className?: string
}
