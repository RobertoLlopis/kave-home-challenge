import { commonStyles } from '@/styles/common'

export const categoryStyles = {
  content: commonStyles.contentShell,
  header: commonStyles.listingHeader,
  title: commonStyles.listingTitle,
  description: commonStyles.listingDescription,
  action: 'mt-6',
  section: 'mt-12',
  sectionTitle: 'mb-4 text-sm font-normal',
  loadingTitle: 'h-12 w-64',
  loadingDescription: 'mt-4 h-4 w-full max-w-md',
  loadingAction: 'h-10 w-36',
  loadingSectionTitle: 'mb-4 h-4 w-40',
} as const
