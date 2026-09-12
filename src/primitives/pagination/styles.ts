export const paginationStyles = {
  root: 'flex justify-center py-10 text-sm text-foreground/70',
  inner: 'flex items-center justify-center gap-1 sm:gap-2',
  control:
    'inline-flex size-8 items-center justify-center rounded-none border-0 bg-transparent p-0 text-inherit no-underline hover:bg-transparent disabled:opacity-30 [&_svg]:size-3.5 [&_svg]:stroke-[1.5]',
  current: 'font-medium text-foreground',
  currentMarker:
    'relative after:absolute after:inset-x-0 after:-bottom-2 after:h-px after:bg-current',
  ellipsis:
    'inline-flex size-8 items-center justify-center text-inherit [&_svg]:size-4',
  status: 'sr-only',
} as const
