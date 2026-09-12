import { Heart } from 'lucide-react'
import Link from 'next/link'

import { accessibility } from '@/constants/accessibility'
import { routes } from '@/constants/routes'
import { SearchControl } from '@/containers/search-control'

import { headerConstants } from './constants'
import { headerStyles } from './styles'

export default function Header() {
  return (
    <header className={headerStyles.siteHeader}>
      <Link className={headerStyles.brand} href={routes.home}>
        {headerConstants.appName}
      </Link>
      <nav
        aria-label={accessibility.primaryNavLabel}
        className={headerStyles.nav}
      >
        <SearchControl />
        <Link
          className={headerStyles.iconLink}
          href={routes.favorites}
          aria-label={headerConstants.favoritesLabel}
        >
          <Heart aria-hidden="true" />
        </Link>
      </nav>
    </header>
  )
}
