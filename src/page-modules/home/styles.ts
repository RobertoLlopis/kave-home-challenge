import { commonStyles } from '@/styles/common'

export const homeStyles = {
  hero: 'mx-auto flex min-h-[clamp(28rem,65vw,42rem)] max-w-screen-2xl flex-col justify-end bg-[#263f53] px-6 py-12 text-white sm:px-10 lg:px-16',
  heroEyebrow: 'text-sm',
  heroTitle:
    'max-w-3xl text-[clamp(2.25rem,6vw,5rem)] font-medium leading-[.95] tracking-[-.05em]',
  content: commonStyles.contentShell,
  sectionTitle: 'mb-4 text-sm font-medium',
  sectionTop: 'mt-16',
  loadingHero: `${commonStyles.skeletonLine} w-2/3`,
} as const
