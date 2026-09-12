import Image from 'next/image'
import Link from 'next/link'

import { accessibility } from '@/constants/accessibility'
import { routes } from '@/constants/routes'
import { CategoryList } from '@/containers/category-list'
import { ProductListing } from '@/containers/product-listing'
import { EditorialCarousel } from '@/features/home/containers/editorial-carousel'
import { editorialUrl } from '@/features/home/containers/editorial-carousel/constants'
import { Button } from '@/primitives/button'

import { homeAssets, homeCopy } from './constants'
import { homeStyles } from './styles'

import type { HomePageProps } from './types'

export function HomePage({ categories, listing }: HomePageProps) {
  return (
    <main
      id={accessibility.mainContentId}
      tabIndex={accessibility.mainContentTabIndex}
    >
      <section className={homeStyles.hero}>
        <Image
          src={homeAssets.heroImage}
          alt=""
          fill
          sizes="100vw"
          className={homeStyles.heroImage}
          priority
        />
        <div className={homeStyles.heroOverlay} aria-hidden="true" />
        <div className={homeStyles.heroContent}>
          <div className={homeStyles.heroCopy}>
            <p className={homeStyles.heroEyebrow}>{homeCopy.eyebrow}</p>
            <h1 className={homeStyles.heroTitle}>
              {homeCopy.heroLines[0]}
              <br />
              {homeCopy.heroLines[1]}
            </h1>
          </div>
          <div className={homeStyles.heroActions}>
            <Button
              nativeButton={false}
              variant="secondary"
              render={<Link href={editorialUrl} />}
            >
              {homeCopy.editorialCta}
            </Button>
            <Button
              nativeButton={false}
              variant="secondary"
              render={<Link href={routes.products} />}
            >
              {homeCopy.productsCta}
            </Button>
          </div>
        </div>
      </section>
      <section className={homeStyles.content}>
        <h2 className={homeStyles.sectionTitle}>{homeCopy.categoriesTitle}</h2>
        <CategoryList categories={categories} />
      </section>
      <section className={homeStyles.content}>
        <header className={homeStyles.productsHeader}>
          <h2 className={homeStyles.productsTitle}>{homeCopy.productsTitle}</h2>
          <p className={homeStyles.productsDescription}>
            {homeCopy.productsDescription}
          </p>
        </header>
        <ProductListing {...listing} />
      </section>
      <section className={homeStyles.content}>
        <EditorialCarousel />
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
      </section>
      <section className={homeStyles.content}>
        <header className={homeStyles.productsHeader}>
          <h2 className={homeStyles.productsTitle}>{homeCopy.productsTitle}</h2>
          <p className={homeStyles.productsDescription}>
            {homeCopy.productsDescription}
          </p>
        </header>
        <ProductListing.Loading />
      </section>
      <section className={homeStyles.content}>
        <EditorialCarousel.Loading />
      </section>
    </main>
  )
}
