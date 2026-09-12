import { resolveHomeQuery } from './helpers'
import { homeCopy } from './constants'
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
