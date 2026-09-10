import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cn } from '@/utils/classnames'
import { buttonStyles } from './styles'
import type { ButtonProps } from './types'

function Button({ className, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonStyles, className)}
      {...props}
    />
  )
}
export { Button }
