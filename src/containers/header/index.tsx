import Link from 'next/link'
import { Heart } from 'lucide-react'
import { SearchControl } from '@/containers/search-control'
import { accessibility } from '@/constants/accessibility'
import { routes } from '@/constants/routes'
import { headerStyles } from './styles'
import { headerConstants } from './constants'

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
