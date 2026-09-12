import Link from 'next/link'
import { Heart } from 'lucide-react'
import { SearchControl } from '@/containers/search-control'
import { accessibility } from '@/constants/accessibility'
import { routes } from '@/constants/routes'
import { siteShellConstants } from './constants'
import { shellStyles } from './styles'
import type { SiteShellProps } from './types'

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className={shellStyles.pageShell}>
      <a
        className={shellStyles.skipLink}
        href={`#${accessibility.mainContentId}`}
      >
        {accessibility.skipLinkLabel}
      </a>
      <header className={shellStyles.siteHeader}>
        <Link className={shellStyles.brand} href={routes.home}>
          {siteShellConstants.appName}
        </Link>
        <nav
          aria-label={accessibility.primaryNavLabel}
          className={shellStyles.nav}
        >
          <SearchControl />
          <Link
            className={shellStyles.iconLink}
            href={routes.favorites}
            aria-label={siteShellConstants.favoritesLabel}
          >
            <Heart aria-hidden="true" />
          </Link>
        </nav>
      </header>
      {children}
    </div>
  )
}
