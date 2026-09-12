export const productDetailStyles = {
  main: 'w-full',
  layout:
    'grid min-w-0 md:grid-cols-[minmax(0,5fr)_minmax(18rem,3fr)] md:gap-8 md:px-6 md:pb-8 lg:px-8',
  panel:
    'relative z-10 -mt-4 bg-background px-4 pb-6 pt-8 md:mt-0 md:px-0 md:py-4 md:pr-2',
  panelHandle:
    'absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-foreground/35 md:hidden',
  headingRow: 'flex items-start justify-between gap-3',
  favorite: 'static -mr-2 -mt-3 shrink-0 before:bg-transparent [&_svg]:size-4',
  title: 'text-2xl font-medium leading-tight tracking-[-0.03em] md:text-3xl',
  description: 'mt-2 text-xs font-normal leading-4',
  price: 'mt-4 text-2xl font-normal [&_strong]:font-medium',
  loadingTitle: 'h-12 w-3/4',
  loadingFavorite: 'size-4 shrink-0 rounded-full',
  loadingPrice: 'mt-4 h-8 w-32',
  loadingDescription: 'mt-2 h-4 w-32',
} as const
