import { environment } from '@/config/environment/runtime'

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: new URL('/sitemap.xml', environment.siteUrl).toString(),
  }
}
