import { commonStyles } from '@/styles/common'

export const productDetailStyles = {
  main: `${commonStyles.contentShell} grid gap-8 lg:grid-cols-2`,
  image: 'relative aspect-square bg-surface-subtle',
  panel: 'py-4',
  headingRow: 'flex items-start justify-between gap-4',
  title: commonStyles.pageTitle,
  price: 'mt-4 text-2xl',
  description: 'mt-6 max-w-prose whitespace-pre-line text-sm leading-6',
  cart: 'mt-8 w-full opacity-70',
  loadingPanel: 'py-4',
  loadingTitle: 'h-20 w-3/4',
  loadingPrice: 'mt-6 h-8 w-32',
  loadingDescription: 'mt-8 h-32 w-full',
} as const
