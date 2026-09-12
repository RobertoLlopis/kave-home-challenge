import { commonStyles } from '@/styles/common'

export const searchStyles = {
  content: commonStyles.contentShell,
  header: 'mb-8 max-w-4xl',
  title: commonStyles.pageTitle,
  description: 'mt-3 text-sm leading-5 text-foreground',
  empty: 'py-16 text-sm text-muted-foreground',
} as const
