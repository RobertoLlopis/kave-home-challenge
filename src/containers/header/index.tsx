import { Heart } from 'lucide-react'
import Link from 'next/link'

import { accessibilityMessages } from '@/constants/accessibility/messages'
import { routes } from '@/constants/routes'
import { SearchControl } from '@/containers/search-control'

import { headerMessages } from './messages'
import { headerStyles } from './styles'

export default function Header() {
  return (
    <header className={headerStyles.siteHeader}>
      <Link className={headerStyles.brand} href={routes.home}>
        {headerMessages.appName}
      </Link>
      <nav
        aria-label={accessibilityMessages.primaryNavLabel}
        className={headerStyles.nav}
      >
        <SearchControl />
        <Link
          className={headerStyles.iconLink}
          href={routes.favorites}
          aria-label={headerMessages.favoritesLabel}
        >
          <Heart aria-hidden="true" />
        </Link>
      </nav>
    </header>
  )
}
