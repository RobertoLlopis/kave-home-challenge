import type { Metadata } from 'next'
import { routes } from '@/constants/routes'
import { pageQuery, parsePage } from '@/utils/pagination'
import { homeCopy } from './constants'
import type { HomePageMetadata, HomeQuery } from './types'

export function resolveHomeQuery(query: HomeQuery) {
  return { page: parsePage(query.page), rawPage: query.page }
}
export function homePageDestination(
  page: number,
  pages: number,
  rawPage?: string,
): string | null {
  if (rawPage === undefined || (rawPage === String(page) && page <= pages))
    return null
  return `${routes.home}${pageQuery(Math.min(page, pages))}`
}
export function homeRedirectTarget(
  query: HomeQuery,
  page: number,
  pages: number,
) {
  return homePageDestination(page, pages, query.page)
}
export function homePageHref(page: number) {
  return `${routes.home}${pageQuery(page)}`
}
export function homeCanonical(page: number) {
  return homePageHref(page)
}
export function homeMetadata(page: number): HomePageMetadata {
  return {
    title: homeCopy.title,
    alternates: {
      canonical: homeCanonical(page),
    } satisfies Metadata['alternates'],
  }
}
