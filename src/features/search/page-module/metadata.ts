import { resolveSearchQuery, searchMetadata } from './helpers'

import type { SearchRouteProps } from './types'

export async function generateSearchMetadata({
  searchParams,
}: SearchRouteProps) {
  return searchMetadata(resolveSearchQuery(await searchParams))
}
