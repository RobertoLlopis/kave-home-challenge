export const editorialStyles = {
  root: '-mx-4 mt-8 sm:-mx-6 md:mt-10 lg:-mx-8',
  card: 'relative flex h-[min(125vw,100dvh)] w-full flex-col justify-between overflow-hidden bg-muted p-5 text-white md:aspect-[4/5] md:h-auto',
  image:
    'z-0 object-cover transition-opacity duration-500 ease-in-out motion-reduce:transition-none',
  overlay: 'absolute inset-0 z-10 bg-black/20',
  title:
    'pointer-events-none relative z-20 max-w-sm text-2xl font-normal tracking-[-0.03em]',
  cta: 'relative z-30 w-fit bg-white px-3 py-2 text-xs font-normal text-foreground no-underline',
  advance:
    'absolute inset-0 z-20 size-auto rounded-none bg-transparent p-0 hover:bg-transparent',
  pause:
    'relative z-30 w-fit bg-white px-3 py-2 text-xs font-normal text-foreground hidden motion-reduce:block',
  visible: 'opacity-100',
  hidden: 'opacity-0',
  loading:
    '-mx-4 mt-8 h-[min(125vw,100dvh)] w-full animate-pulse bg-muted sm:-mx-6 md:mt-10 md:aspect-[4/5] md:h-auto lg:-mx-8',
  mobileOnly: 'md:hidden',
  desktopOnly: 'hidden md:grid md:grid-cols-3',
} as const
