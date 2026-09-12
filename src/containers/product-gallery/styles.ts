export const galleryStyles = {
  root: 'relative min-w-0',
  mobile: 'relative h-[calc(90dvh-var(--header-height))] w-full md:hidden',
  mobileTrack:
    'flex size-full snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
  mobileItem:
    'relative h-full min-w-full snap-center overflow-hidden bg-surface-subtle',
  desktop: 'hidden min-w-0 md:block',
  main: 'relative aspect-[4/3] overflow-hidden bg-surface-subtle',
  desktopCarousel: 'relative mt-px overflow-hidden',
  desktopTrack:
    'flex snap-x snap-mandatory gap-px overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
  thumb:
    'relative aspect-square basis-[calc((100%_-_0.125rem)/3)] shrink-0 snap-start overflow-hidden bg-surface-subtle',
  loading:
    'h-[calc(90dvh-var(--header-height))] animate-pulse bg-muted md:aspect-[4/3] md:h-auto',
  image: 'object-cover',
  mobileImage: 'scale-[1.2]',
  placeholder: 'object-contain',
} as const
