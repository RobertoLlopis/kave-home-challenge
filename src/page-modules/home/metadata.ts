import { homeMetadata, resolveHomeQuery } from './helpers'
import type { HomeRouteProps, HomePageMetadata } from './types'

export async function generateHomeMetadata({
  searchParams,
}: HomeRouteProps): Promise<HomePageMetadata> {
  const query = await searchParams
  return homeMetadata(resolveHomeQuery(query).page)
}
