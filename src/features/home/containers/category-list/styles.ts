export const categoryListStyles = {
  carousel: 'relative',
  controls:
    'absolute right-0 top-[-2.5rem] z-10 flex gap-1 [&_[data-slot=button]]:size-8 [&_[data-slot=button]]:rounded-none [&_[data-slot=button]]:border-0 [&_[data-slot=button]]:bg-transparent [&_[data-slot=button]]:p-0 [&_[data-slot=button]]:text-foreground [&_[data-slot=button]]:hover:bg-transparent [&_svg]:size-5 [&_svg]:stroke-[1.5]',
  viewport:
    'snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
  row: 'flex gap-2 pb-2',
  item: 'min-w-[46%] snap-start md:min-w-[22.5%]',
  label: 'block bg-background pt-2 text-sm font-normal',
} as const
