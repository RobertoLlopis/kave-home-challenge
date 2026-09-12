export const commonStyles = {
  contentShell:
    'mx-auto w-full max-w-screen-2xl px-4 py-[clamp(2rem,5vw,5rem)] sm:px-6 lg:px-8',
  listingHeader: 'mb-8 max-w-4xl',
  listingTitle:
    'text-[clamp(1.75rem,4vw,3rem)] font-medium leading-none tracking-[-.05em]',
  listingDescription: 'mt-3 text-xs leading-4 text-foreground',
  pageTitle:
    'text-[clamp(2rem,5vw,4rem)] font-medium leading-none tracking-[-.05em]',
  mutedText: 'text-sm text-muted-foreground',
  skeletonLine: 'h-4 rounded-md bg-muted',
  spanSemibold: 'font-semibold',
} as const
