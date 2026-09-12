import { cn } from '@/utils/classnames'

const headerLink = 'inline-flex h-[var(--header-height)] items-center text-sm'

export const headerStyles = {
  siteHeader:
    'mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8',
  brand: cn(headerLink, 'font-normal tracking-[-0.03em]'),
  iconLink:
    'inline-flex h-[var(--header-height)] w-8 items-center justify-center [&_svg]:size-3.5 [&_svg]:stroke-[1.5]',
  nav: 'flex items-center',
} as const
