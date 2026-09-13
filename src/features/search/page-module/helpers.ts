import { routes } from '@/constants/routes'

import { searchCopy } from './messages'

import type { SearchPageMetadata, SearchQuery } from './types'

export function resolveSearchQuery(query: SearchQuery) {
  const value = Array.isArray(query.q) ? query.q[0] : query.q
  return value?.trim() ?? ''
}

export function searchHeading(query: string) {
  return query ? `Resultados para “${query}”` : searchCopy.heading
}

export function searchDescription(query: string, count: number) {
  if (!query) return searchCopy.description
  if (count === 1) return '1 producto encontrado.'
  return `${count} productos encontrados.`
}

export function searchMetadata(query: string): SearchPageMetadata {
  return {
    title: `${searchHeading(query)} · Kave Home`,
    description: searchCopy.description,
    alternates: { canonical: routes.search },
    robots: { index: false, follow: true },
  }
}
