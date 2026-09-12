import { Button as ButtonPrimitive } from '@base-ui/react/button'

import { cn } from '@/utils/classnames'

import { buttonStyles, buttonVariantStyles } from './styles'

import type { ButtonProps } from './types'

function Button({ className, variant, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(
        buttonStyles,
        variant ? buttonVariantStyles[variant] : undefined,
        className,
      )}
      {...props}
    />
  )
}
export { Button }
