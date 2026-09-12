import { catalog } from '@/constants/catalog'

export function parsePage(value: unknown): number {
  if (typeof value !== 'string' || !/^\d+$/.test(value)) return 1
  const page = Number(value)
  return Number.isSafeInteger(page) && page > 0 ? page : 1
}

export function totalPages(count: number, pageSize = catalog.pageSize): number {
  return Math.max(1, Math.ceil(Math.max(0, count) / pageSize))
}

export function pageQuery(page: number, category?: string): string {
  const query = new URLSearchParams()
  if (page > 1) query.set('page', String(page))
  if (category) query.set('category', category)
  const value = query.toString()
  if (!value) return ''
  return `?${value}`
}
