import { homeCopy } from './constants'
import { resolveHomeQuery } from './helpers'

import type { HomeRouteProps, HomePageMetadata } from './types'

export async function generateHomeMetadata({
  searchParams,
}: HomeRouteProps): Promise<HomePageMetadata> {
  const query = await searchParams
  resolveHomeQuery(query)
  return {
    title: homeCopy.title,
    description: homeCopy.description,
    alternates: { canonical: '/' },
  }
}
