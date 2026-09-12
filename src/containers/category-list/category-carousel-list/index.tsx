import Link from 'next/link'
import { Skeleton } from '@/primitives/skeleton'
import { categoryHref } from '../helpers'
import CategoryImage from '../category-image'
import CategoryCarouselWrapper from '../category-carousel-wrapper'
import type { CategoryListProps } from '../types'
import { categoryListStyles } from '../styles'
import { categoryCarouselListStyles } from './styles'

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
