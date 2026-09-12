import { cn } from '@/utils/classnames'

const headerLink = 'inline-flex h-[var(--header-height)] items-center text-sm'

export const shellStyles = {
  pageShell: 'min-h-screen bg-background',
  skipLink:
    'fixed left-4 top-2 z-50 -translate-y-20 bg-primary px-4 py-3 text-sm text-primary-foreground transition-transform focus:translate-y-0',
  siteHeader:
    'mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8',
  iconLink:
    'inline-flex h-[var(--header-height)] w-8 items-center justify-center [&_svg]:size-3.5 [&_svg]:stroke-[1.5]',
  brand: cn(headerLink, 'font-normal tracking-[-0.03em]'),
  nav: 'flex items-center',
} as const
