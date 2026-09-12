export const mobileGalleryStyles = {
  mobile: 'relative h-[calc(90dvh-var(--header-height))] w-full md:hidden',
  mobileTrack:
    'flex size-full snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
  mobileItem:
    'relative h-full min-w-full snap-center overflow-hidden bg-surface-subtle',
  mobileImage: 'scale-[1.2]',
} as const
