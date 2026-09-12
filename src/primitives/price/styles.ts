import { commonStyles } from '@/styles/common'
import { cn } from '@/utils/classnames'

export const priceStyles = {
  root: 'block',
  previous: 'ml-2',
  eco: 'ml-2 block text-muted-foreground',
  loading: cn(commonStyles.skeletonLine, 'mt-2 w-2/3'),
} as const
