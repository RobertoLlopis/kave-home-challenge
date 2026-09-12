export const buttonStyles =
  'inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-primary px-3 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground transition-colors outline-none hover:bg-primary/80 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50'

export const buttonVariantStyles = {
  secondary:
    'rounded-none bg-white px-4 py-2 text-xs font-normal text-foreground hover:bg-white/90',
  purchase:
    'h-12 rounded-none bg-[#353530] px-6 py-3 font-normal text-white hover:bg-[#171715] disabled:opacity-100',
  icon: 'size-11 rounded-none bg-transparent p-0 text-foreground hover:bg-transparent disabled:opacity-100 [&_svg]:size-4',
} as const
