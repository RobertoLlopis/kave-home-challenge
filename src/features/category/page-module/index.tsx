import Link from 'next/link'

import { accessibility } from '@/constants/accessibility'
import { routes } from '@/constants/routes'
import { CategoryList } from '@/containers/category-list'
import { Button } from '@/primitives/button'
import { Skeleton } from '@/primitives/skeleton'

import { categoryConstants } from './constants'
import { categoryDescription } from './helpers'
import { categoryStyles } from './styles'

import type { CategoryPageProps } from './types'

export function CategoryPage({ category }: CategoryPageProps) {
  const children = category.children
  return (
    <main
      id={accessibility.mainContentId}
      tabIndex={accessibility.mainContentTabIndex}
      className={categoryStyles.content}
    >
      <header className={categoryStyles.header}>
        <h1 className={categoryStyles.title}>{category.name}</h1>
        <p className={categoryStyles.description}>
          {categoryDescription(category)}
        </p>
      </header>
      <div className={categoryStyles.action}>
        <Button
          nativeButton={false}
          variant="secondary"
          render={<Link href={routes.products} />}
        >
          {categoryConstants.catalogCta}
        </Button>
      </div>
      {children.length > 0 ? (
        <section className={categoryStyles.section}>
          <h2 className={categoryStyles.sectionTitle}>
            {categoryConstants.childrenTitle}
          </h2>
          <CategoryList categories={children} limit={children.length} />
        </section>
      ) : null}
    </main>
  )
}

CategoryPage.Loading = function CategoryLoading() {
  return (
    <main
      id={accessibility.mainContentId}
      tabIndex={accessibility.mainContentTabIndex}
      className={categoryStyles.content}
      aria-busy="true"
      aria-label={categoryConstants.loadingLabel}
    >
      <header className={categoryStyles.header}>
        <Skeleton className={categoryStyles.loadingTitle} aria-hidden="true" />
        <Skeleton
          className={categoryStyles.loadingDescription}
          aria-hidden="true"
        />
      </header>
      <div className={categoryStyles.action} aria-hidden="true">
        <Skeleton className={categoryStyles.loadingAction} />
      </div>
      <section className={categoryStyles.section}>
        <Skeleton
          className={categoryStyles.loadingSectionTitle}
          aria-hidden="true"
        />
        <CategoryList.Loading />
      </section>
    </main>
  )
}
