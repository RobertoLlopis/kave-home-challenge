export const galleryStyles = {
  root: 'relative min-w-0',
  desktop: 'hidden min-w-0 md:block',
  main: 'relative aspect-[4/3] overflow-hidden bg-surface-subtle',
  thumb:
    'relative aspect-square basis-[calc((100%_-_0.125rem)/3)] shrink-0 snap-start overflow-hidden bg-surface-subtle',
  loading:
    'h-[calc(90dvh-var(--header-height))] animate-pulse bg-muted md:aspect-[4/3] md:h-auto',
} as const
