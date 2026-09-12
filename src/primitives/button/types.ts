import type { Button as ButtonPrimitive } from '@base-ui/react/button'

export type ButtonVariant = 'secondary' | 'purchase' | 'icon'
export type ButtonProps = ButtonPrimitive.Props & { variant?: ButtonVariant }
