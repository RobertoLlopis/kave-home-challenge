import { commonStyles } from '@/styles/common'

export const productsStyles = {
  content: commonStyles.contentShell,
  header: 'mb-8 max-w-4xl',
  title:
    'text-[clamp(1.75rem,4vw,3rem)] font-medium leading-none tracking-[-.05em]',
  description: 'mt-3 text-xs leading-4 text-foreground',
} as const
