export const galleryStyles = {
  root: 'relative min-w-0',
  desktop: 'hidden min-w-0 md:block',
  main: 'relative aspect-[4/5] overflow-hidden bg-muted',
  thumb:
    'relative aspect-[4/5] basis-[calc((100%_-_0.125rem)/3)] shrink-0 snap-start overflow-hidden bg-muted',
  loading: 'aspect-[4/5] animate-pulse bg-muted',
} as const
