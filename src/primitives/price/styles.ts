import { commonStyles } from '@/styles/common'

export const priceStyles = {
  root: 'block text-sm',
  previous: 'ml-2',
  eco: 'ml-2 block text-muted-foreground',
  loading: `${commonStyles.skeletonLine} mt-2 w-2/3`,
} as const
