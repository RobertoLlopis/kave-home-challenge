import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { FavoritesProvider } from '@/providers/favorites-provider'
import { SiteShell } from '@/layouts/site-shell'
import { environment } from '@/config/environment/runtime'
import { cn } from '@/utils/classnames'
import { rootLayoutConstants } from './constants'
import { rootLayoutStyles } from './styles'
import type { RootLayoutProps } from './types'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  metadataBase: environment.siteUrl,
  title: rootLayoutConstants.defaultMetadataTitle,
  description: rootLayoutConstants.defaultMetadataDescription,
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang={rootLayoutConstants.htmlLang}
      className={cn(poppins.variable, rootLayoutStyles.html)}
    >
      <body className={rootLayoutStyles.body}>
        <FavoritesProvider mediaHost={environment.mediaHost}>
          <SiteShell>{children}</SiteShell>
        </FavoritesProvider>
      </body>
    </html>
  )
}
