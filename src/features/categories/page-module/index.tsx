import { accessibility } from '@/constants/accessibility/constants'
import { CategoryList } from '@/containers/category-list'

import { categoriesCopy } from './messages'
import { categoriesStyles } from './styles'

import type { CategoriesPageProps } from './types'

export function CategoriesPage({ categories }: CategoriesPageProps) {
  return (
    <main
      id={accessibility.mainContentId}
      tabIndex={accessibility.mainContentTabIndex}
      className={categoriesStyles.content}
    >
      <header className={categoriesStyles.header}>
        <h1 className={categoriesStyles.title}>{categoriesCopy.heading}</h1>
        <p className={categoriesStyles.description}>
          {categoriesCopy.description}
        </p>
      </header>
      <CategoryList categories={categories} limit={categories.length} />
    </main>
  )
}

CategoriesPage.Loading = function CategoriesLoading() {
  return (
    <main
      id={accessibility.mainContentId}
      tabIndex={accessibility.mainContentTabIndex}
      className={categoriesStyles.content}
      aria-busy="true"
      aria-label={categoriesCopy.loadingLabel}
    >
      <header className={categoriesStyles.header}>
        <h1 className={categoriesStyles.title}>{categoriesCopy.heading}</h1>
        <p className={categoriesStyles.description}>
          {categoriesCopy.description}
        </p>
      </header>
      <CategoryList.Loading />
    </main>
  )
}
