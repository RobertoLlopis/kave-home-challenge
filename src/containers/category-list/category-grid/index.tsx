import Link from 'next/link'

import CategoryImage from '@/containers/category-list/category-image'
import { categoryHref } from '@/containers/category-list/helpers'
import { categoryListStyles } from '@/containers/category-list/styles'
import { Skeleton } from '@/primitives/skeleton'

import { categoryGridStyles } from './styles'

import type { CategoryListProps } from '@/containers/category-list/types'

export default function CategoryGrid({ categories }: CategoryListProps) {
  return (
    <ul className={categoryGridStyles.desktopGrid}>
      {categories.map((category) => (
        <li key={category.id}>
          <Link href={categoryHref(category.slug)}>
            <CategoryImage category={category} />
            <span className={categoryListStyles.label}>{category.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

CategoryGrid.Loading = function CategoryGridLoading({
  count,
}: {
  count: number
}) {
  return (
    <div className={categoryGridStyles.desktopGrid} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <div key={index}>
          <CategoryImage.Loading />
          <Skeleton className={categoryListStyles.loadingLabel} />
        </div>
      ))}
    </div>
  )
}
