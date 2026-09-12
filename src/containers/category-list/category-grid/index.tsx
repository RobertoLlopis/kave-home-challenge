import Link from 'next/link'
import { Skeleton } from '@/primitives/skeleton'
import { categoryHref } from '../helpers'
import CategoryImage from '../category-image'
import type { CategoryListProps } from '../types'
import { categoryListStyles } from '../styles'
import { categoryGridStyles } from './styles'

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
