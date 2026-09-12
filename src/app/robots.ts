import type { MetadataRoute } from 'next'
import { environment } from '@/config/environment/runtime'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: new URL('/sitemap.xml', environment.siteUrl).toString(),
  }
}
