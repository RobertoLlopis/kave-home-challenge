import { commonStyles } from '@/styles/common'
import { cn } from '@/utils/classnames'

export const productCardStyles = {
  card: 'rounded-none border-0 ring-0',
  image: 'relative aspect-square bg-surface-subtle',
  imageLink: 'absolute inset-0 no-underline',
  favorite: '[&_svg]:-translate-y-1.5 [&_svg]:translate-x-1.5',
  body: 'p-2 [&_[data-slot=price]]:mt-1 [&_[data-slot=price]]:text-[11px] md:[&_[data-slot=price]]:text-xs',
  nameRow: 'flex min-h-5 items-start justify-between gap-1',
  collection: 'text-[11px] font-semibold leading-[1.25] md:text-xs',
  title:
    'line-clamp-2 text-[11px] font-normal leading-[1.25] no-underline md:line-clamp-1 md:text-xs',
  addToCart:
    'size-6 shrink-0 items-start bg-transparent p-0 text-foreground disabled:opacity-100 md:hidden [&_svg]:-translate-y-px [&_svg]:size-3.5 [&_svg]:stroke-[1.5]',
  loadingTitle: cn(commonStyles.skeletonLine, 'mb-2 h-4 w-3/4'),
} as const
