import { commonStyles } from '@/styles/common'

export const productCardStyles = {
  card: 'border-0 rounded-none ring-0',
  image: 'relative aspect-square bg-surface-subtle',
  body: 'p-3',
  title: 'text-sm font-medium hover:underline',
  loadingTitle: `${commonStyles.skeletonLine} mb-2 h-4 w-3/4`,
} as const
