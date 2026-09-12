import { Input as InputPrimitive } from '@base-ui/react/input'
import { cn } from '@/utils/classnames'
import { inputStyles } from './styles'
import type { InputProps } from './types'

export function Input({ className, ...props }: InputProps) {
  return <InputPrimitive className={cn(inputStyles, className)} {...props} />
}
