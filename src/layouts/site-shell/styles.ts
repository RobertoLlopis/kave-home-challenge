const headerLink = 'inline-flex min-h-11 items-center text-sm'

export const shellStyles = {
  pageShell: 'min-h-screen bg-background',
  skipLink:
    'fixed left-4 top-2 z-10 -translate-y-20 bg-primary px-4 py-3 text-sm text-primary-foreground transition-transform focus:translate-y-0',
  siteHeader:
    'flex min-h-12 items-center justify-between border-b border-border px-4 sm:px-6 lg:px-8',
  navLink: `${headerLink} underline-offset-4 hover:underline`,
  brand: `${headerLink} font-medium`,
  nav: 'flex gap-4',
} as const
