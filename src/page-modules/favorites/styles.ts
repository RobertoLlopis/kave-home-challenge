import { commonStyles } from '@/styles/common'

export const favoritesStyles = {
  content: commonStyles.contentShell,
  title: commonStyles.pageTitle,
  intro: `mt-2 ${commonStyles.mutedText}`,
  empty: 'py-24 text-center',
  discover: 'mt-4',
} as const
