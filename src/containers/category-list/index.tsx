import { categoryListConstants } from './constants'
import CategoryGrid from './category-grid'
import CategoryCarouselList from './category-carousel-list'
import { categoryListStyles } from './styles'
import type { CategoryListProps } from './types'

export function CategoryList({
  categories,
  limit = categoryListConstants.limit,
}: CategoryListProps) {
  const visible = categories.slice(0, limit)
  return (
    <>
      <div className={categoryListStyles.mobileOnly}>
        <CategoryCarouselList categories={visible} />
      </div>
      <div className={categoryListStyles.desktopOnly}>
        <CategoryGrid categories={visible} />
      </div>
    </>
  )
}

CategoryList.Loading = function CategoryListLoading({
  limit = categoryListConstants.limit,
}: Pick<CategoryListProps, 'limit'> = {}) {
  return (
    <>
      <div className={categoryListStyles.mobileOnly}>
        <CategoryCarouselList.Loading count={limit} />
      </div>
      <div className={categoryListStyles.desktopOnly}>
        <CategoryGrid.Loading count={limit} />
      </div>
    </>
  )
}
