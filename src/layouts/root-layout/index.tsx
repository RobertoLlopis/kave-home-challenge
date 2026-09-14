import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Poppins } from 'next/font/google'

import { environment } from '@/config/environment/runtime'
import { SiteShell } from '@/layouts/site-shell'
import { FavoritesProvider } from '@/providers/favorites'
import { cn } from '@/utils/classnames'

import { rootLayoutConstants } from './constants'
import { rootLayoutMessages } from './messages'
import { rootLayoutStyles } from './styles'

import type { RootLayoutProps } from './types'
import type { Metadata } from 'next'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  metadataBase: environment.siteUrl,
  title: rootLayoutMessages.defaultMetadataTitle,
  description: rootLayoutMessages.defaultMetadataDescription,
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
