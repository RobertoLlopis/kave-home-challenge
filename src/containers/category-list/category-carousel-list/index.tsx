import Link from 'next/link'

import CategoryCarouselWrapper from '@/containers/category-list/category-carousel-wrapper'
import CategoryImage from '@/containers/category-list/category-image'
import { categoryHref } from '@/containers/category-list/helpers'
import { categoryListStyles } from '@/containers/category-list/styles'
import { Skeleton } from '@/primitives/skeleton'

import { categoryCarouselListStyles } from './styles'

import type { CategoryListProps } from '@/containers/category-list/types'

export default function CategoryCarouselList({
  categories,
}: CategoryListProps) {
  return (
    <CategoryCarouselWrapper>
      <ul className={categoryCarouselListStyles.row}>
        {categories.map((category) => (
          <li key={category.id} className={categoryCarouselListStyles.item}>
            <Link href={categoryHref(category.slug)}>
              <CategoryImage category={category} />
              <span className={categoryListStyles.label}>{category.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </CategoryCarouselWrapper>
  )
}

CategoryCarouselList.Loading = function CategoryCarouselListLoading({
  count,
}: {
  count: number
}) {
  return (
    <div className={categoryCarouselListStyles.row} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <div className={categoryCarouselListStyles.item} key={index}>
          <CategoryImage.Loading />
          <Skeleton className={categoryListStyles.loadingLabel} />
        </div>
      ))}
    </div>
  )
}
