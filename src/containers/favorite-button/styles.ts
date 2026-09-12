export const favoriteButtonStyles =
  'group/favorite absolute right-0 top-0 z-10 flex size-11 items-center justify-center rounded-none border-0 bg-transparent p-0 text-foreground hover:bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2'

export const favoriteIconStyles = {
  root: 'size-3.5 fill-transparent stroke-foreground transition-colors group-hover/favorite:fill-favorite group-hover/favorite:stroke-favorite md:size-4',
  active: 'fill-favorite stroke-favorite',
} as const
