import { cn } from '@/utils/classnames'
import { skeletonStyles } from './styles'
import type { SkeletonProps } from './types'

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(skeletonStyles, className)}
      {...props}
    />
  )
}
