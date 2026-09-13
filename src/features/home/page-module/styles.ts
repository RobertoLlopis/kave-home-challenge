import { commonStyles } from '@/styles/common'
import { cn } from '@/utils/classnames'

export const homeStyles = {
  hero: 'relative isolate mx-auto flex min-h-[calc(100dvh-var(--header-height))] max-w-screen-2xl items-end overflow-hidden bg-[#f1f0ed] px-5 py-10 text-white sm:px-10 lg:px-16',
  heroImage: 'z-0 object-cover',
  heroOverlay:
    'absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent',
  heroContent:
    'relative z-20 flex w-full flex-col gap-6 md:flex-row md:items-end md:justify-between',
  heroCopy: 'max-w-4xl',
  heroEyebrow: 'mb-2 text-xs font-normal',
  heroTitle:
    'text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[.98] tracking-[-.05em]',
  heroActions: 'flex shrink-0 flex-wrap gap-2 md:grid md:grid-cols-2',
  content: commonStyles.contentShell,
  sectionTitle: 'mb-4 text-sm font-normal',
  productsHeader: 'mb-8 max-w-4xl',
  productsTitle:
    'text-[clamp(1.75rem,4vw,3rem)] font-medium leading-none tracking-[-.05em]',
  productsDescription: 'mt-3 text-xs leading-4 text-foreground',
  loadingHero: cn(commonStyles.skeletonLine, 'h-20 w-2/3'),
} as const
