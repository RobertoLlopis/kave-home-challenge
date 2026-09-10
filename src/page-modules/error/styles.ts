import { commonStyles } from '@/styles/common'

export const errorStyles = {
  content: commonStyles.contentShell,
  title: commonStyles.pageTitle,
  message: 'mt-4 max-w-prose text-sm',
  action: 'mt-8',
} as const
