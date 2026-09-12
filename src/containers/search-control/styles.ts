export const searchControlStyles = {
  icon: 'size-4 stroke-[1.5]',
  headerIcon: 'size-3.5 stroke-[1.5]',
  desktopRoot: 'relative hidden h-[var(--header-height)] items-center md:flex',
  desktopForm:
    'flex origin-right items-center gap-1 overflow-hidden transition-[width,opacity] duration-300 ease-out',
  desktopFormOpen: 'w-[min(20rem,50vw)] opacity-100',
  desktopFormClosed: 'pointer-events-none w-0 opacity-0',
  desktopInput: 'h-[var(--header-height)] pr-2 text-xs placeholder:text-xs',
  headerIconButton:
    'h-[var(--header-height)] w-8 [&_svg]:size-3.5 [&_svg]:stroke-[1.5]',
  desktopTrigger:
    'h-[var(--header-height)] w-8 transition-opacity duration-200 [&_svg]:size-3.5 [&_svg]:stroke-[1.5]',
  desktopTriggerHidden: 'pointer-events-none absolute opacity-0',
  mobileRoot: 'md:hidden',
  mobileTrigger:
    'inline-flex h-[var(--header-height)] w-8 items-center justify-center bg-transparent text-foreground',
  backdrop:
    'fixed inset-0 bg-black/20 opacity-[calc(1-var(--drawer-swipe-progress))] transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0',
  viewport: 'fixed inset-0 z-50 flex items-start',
  popup:
    'w-full border-b border-border bg-background px-4 pb-5 pt-[max(1rem,env(safe-area-inset-top))] shadow-sm outline-none [transform:translateY(var(--drawer-swipe-movement-y))] transition-transform duration-300 ease-out data-ending-style:-translate-y-full data-starting-style:-translate-y-full',
  mobileHeader: 'flex items-center justify-between gap-4',
  drawerTitle: 'text-base font-medium',
  drawerDescription: 'sr-only',
  mobileForm: 'mt-3 flex items-center gap-2',
  mobileInput: 'flex-1',
  iconButton:
    'inline-flex size-11 shrink-0 items-center justify-center bg-transparent text-foreground',
} as const
