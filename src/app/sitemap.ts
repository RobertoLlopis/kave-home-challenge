import type { MetadataRoute } from 'next'
import { environment } from '@/config/environment/runtime'
import { routes } from '@/constants/routes'

function absoluteUrl(path: string) {
  return new URL(path, environment.siteUrl).toString()
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [routes.home, routes.products].map((path) => ({
    url: absoluteUrl(path),
  }))
}
