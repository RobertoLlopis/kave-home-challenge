import { cn } from '@/utils/classnames'
import { cardStyles } from './styles'
import type { CardProps } from './types'

export function Card({ className, ...props }: CardProps) {
  return (
    <div data-slot="card" className={cn(cardStyles, className)} {...props} />
  )
}
