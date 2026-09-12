import { commonStyles } from '@/styles/common'
import { cn } from '@/utils/classnames'

export const favoritesStyles = {
  content: commonStyles.contentShell,
  title: commonStyles.pageTitle,
  intro: cn('mt-2', commonStyles.mutedText),
  list: 'mt-6',
  empty: 'py-24 text-center',
  discover: 'mt-4',
} as const
