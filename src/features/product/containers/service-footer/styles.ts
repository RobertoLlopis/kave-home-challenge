export const serviceFooterStyles = {
  root: 'grid grid-cols-1 gap-8 bg-surface-subtle px-6 py-10 text-center md:grid-cols-3 md:px-8',
  item: 'flex flex-col gap-1 text-sm [&_a]:underline [&_a]:underline-offset-2',
  desktopHidden: 'md:hidden',
  loading: 'mt-8 h-32 animate-pulse bg-muted',
} as const
