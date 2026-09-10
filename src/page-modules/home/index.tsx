import Link from 'next/link'
import { Button } from '@/primitives/button'
import { CategoryList } from '@/containers/category-list'
import { ProductGrid } from '@/containers/product-grid'
import { Pagination } from '@/primitives/pagination'
import { catalog } from '@/constants/catalog'
import { accessibility } from '@/constants/accessibility'
import { routes } from '@/constants/routes'
import { homeCopy } from './constants'
import { homePageHref } from './helpers'
import { homeStyles } from './styles'
import type { HomePageProps } from './types'

export function HomePage({ categories, products, page, pages }: HomePageProps) {
  return (
    <main
      id={accessibility.mainContentId}
      tabIndex={accessibility.mainContentTabIndex}
    >
      <section className={homeStyles.hero}>
        <p className={homeStyles.heroEyebrow}>{homeCopy.eyebrow}</p>
        <h1 className={homeStyles.heroTitle}>
          {homeCopy.heroLines[0]}
          <br />
          {homeCopy.heroLines[1]}
        </h1>
        <Button nativeButton={false} render={<Link href={routes.products} />}>
          {homeCopy.cta}
        </Button>
      </section>
      <section className={homeStyles.content}>
        <h2 className={homeStyles.sectionTitle}>{homeCopy.categoriesTitle}</h2>
        <CategoryList categories={categories} />
        <h2 className={`${homeStyles.sectionTitle} ${homeStyles.sectionTop}`}>
          {homeCopy.featuredTitle}
        </h2>
        <ProductGrid products={products} />
        <Pagination page={page} pages={pages} href={homePageHref} />
      </section>
    </main>
  )
}
HomePage.Loading = function HomeLoading() {
  return (
    <main
      id={accessibility.mainContentId}
      tabIndex={accessibility.mainContentTabIndex}
      aria-busy="true"
      aria-label={homeCopy.loadingLabel}
    >
      <section className={homeStyles.hero} aria-hidden="true">
        <div className={homeStyles.loadingHero} />
      </section>
      <section className={homeStyles.content}>
        <h2 className={homeStyles.sectionTitle}>{homeCopy.categoriesTitle}</h2>
        <CategoryList.Loading />
        <h2 className={`${homeStyles.sectionTitle} ${homeStyles.sectionTop}`}>
          {homeCopy.featuredTitle}
        </h2>
        <ProductGrid.Loading count={catalog.pageSize} />
      </section>
    </main>
  )
}
