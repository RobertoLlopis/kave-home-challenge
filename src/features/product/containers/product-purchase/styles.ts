export const purchaseStyles = {
  root: 'mt-6 md:mt-10',
  label: 'sr-only',
  row: 'flex items-start gap-3',
  selectWrapper: 'relative shrink-0',
  select:
    'h-12 w-20 appearance-none rounded-none border border-foreground/30 bg-background pl-3 pr-10 text-sm',
  selectIcon:
    'pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 stroke-[1.5]',
  cta: 'flex-1 text-xs',
  loadingSelect: 'h-12 w-20 shrink-0 rounded-none',
  loadingCta: 'h-12 flex-1 rounded-none',
} as const
