import type { Button as ButtonPrimitive } from '@base-ui/react/button'
import type { FavoriteItem } from '@/providers/favorites-provider'

export type ButtonProps = ButtonPrimitive.Props
export type FavoriteMarkProps = { active: boolean }
export type FavoriteButtonProps = { item: FavoriteItem }
