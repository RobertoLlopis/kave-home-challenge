import Image from 'next/image'
import Link from 'next/link'
import { Skeleton } from '@/primitives/skeleton'
import { categoryListConstants } from './constants'
import { categoryHref } from './helpers'
import { categoryListStyles } from './styles'
import { CategoryCarousel } from './category-carousel'
import type { CategoryImageProps, CategoryListProps } from './types'

function CategoryImage({ category }: CategoryImageProps) {
  if (!category.highlightImage) return null
  return (
    <Image
      src={category.highlightImage}
      alt=""
      width={400}
      height={500}
      sizes={categoryListConstants.imageSizes}
      className={categoryListStyles.image}
    />
  )
}

export function CategoryList({ categories }: CategoryListProps) {
  return (
    <CategoryCarousel>
      <ul className={categoryListStyles.row}>
        {categories.slice(0, categoryListConstants.limit).map((category) => (
          <li key={category.id} className={categoryListStyles.item}>
            <Link href={categoryHref(category.slug)}>
              <CategoryImage category={category} />
              <span className={categoryListStyles.label}>{category.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </CategoryCarousel>
  )
}

CategoryList.Loading = function CategoryListLoading() {
  return (
    <div className={categoryListStyles.row} aria-hidden="true">
      {Array.from({ length: categoryListConstants.limit }, (_, index) => (
        <div className={categoryListStyles.item} key={index}>
          <Skeleton className={categoryListStyles.image} />
        </div>
      ))}
    </div>
  )
}
