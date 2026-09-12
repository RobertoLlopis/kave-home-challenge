export type PageRangeEntry = number | 'ellipsis'

export function pageRange(page: number, pages: number): PageRangeEntry[] {
  if (pages <= 5)
    return Array.from({ length: Math.max(1, pages) }, (_, index) => index + 1)
  if (page <= 2) return [1, 2, 3, 'ellipsis']
  if (page >= pages - 1) return ['ellipsis', pages - 2, pages - 1, pages]
  return ['ellipsis', page - 1, page, page + 1, 'ellipsis']
}
