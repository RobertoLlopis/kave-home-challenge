import { accessibility } from '@/constants/accessibility/constants'
import { ProductGrid } from '@/containers/product-grid'

import { searchConstants } from './constants'
import { searchDescription, searchHeading } from './helpers'
import { searchCopy } from './messages'
import { searchStyles } from './styles'

import type { SearchPageProps } from './types'

export function SearchPage({ query, products }: SearchPageProps) {
  const emptyMessage = query ? searchCopy.noResults : searchCopy.emptyQuery
  return (
    <main
      id={accessibility.mainContentId}
      tabIndex={accessibility.mainContentTabIndex}
      className={searchStyles.content}
    >
      <header className={searchStyles.header}>
        <h1 className={searchStyles.title}>{searchHeading(query)}</h1>
        <p className={searchStyles.description}>
          {searchDescription(query, products.length)}
        </p>
      </header>
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p role="status" className={searchStyles.empty}>
          {emptyMessage}
        </p>
      )}
    </main>
  )
}

SearchPage.Loading = function SearchPageLoading() {
  return (
    <main
      id={accessibility.mainContentId}
      tabIndex={accessibility.mainContentTabIndex}
      className={searchStyles.content}
      aria-busy="true"
      aria-label={searchCopy.loadingLabel}
    >
      <header className={searchStyles.header}>
        <h1 className={searchStyles.title}>{searchCopy.heading}</h1>
        <p className={searchStyles.description}>{searchCopy.description}</p>
      </header>
      <ProductGrid.Loading count={searchConstants.loadingResultCount} />
    </main>
  )
}
