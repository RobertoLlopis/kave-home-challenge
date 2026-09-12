import { catalog } from '@/constants/catalog'

export function parsePage(value: unknown): number {
  if (typeof value !== 'string' || !/^\d+$/.test(value)) return 1
  const page = Number(value)
  return Number.isSafeInteger(page) && page > 0 ? page : 1
}

export function totalPages(count: number, pageSize = catalog.pageSize): number {
  return Math.max(1, Math.ceil(Math.max(0, count) / pageSize))
}

export function pageQuery(page: number): string {
  if (page <= 1) return ''
  return `?page=${page}`
}

export function listingPageDestination(
  base: string,
  page: number,
  pages: number,
  rawPage?: string,
): string | null {
  if (rawPage === undefined || (rawPage === String(page) && page <= pages))
    return null
  return `${base}${pageQuery(Math.min(page, pages))}`
}
