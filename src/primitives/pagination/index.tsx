import { Button } from '@/primitives/button'
import { paginationLabels, pageStatus } from './constants'
import { paginationStyles } from './styles'
import type {
  PaginationLinkProps,
  PaginationNextProps,
  PaginationPageProps,
  PaginationProps,
} from './types'

function PaginationLink({ href, children }: PaginationLinkProps) {
  return (
    <Button
      nativeButton={false}
      render={<a data-slot="pagination-link" href={href} />}
    >
      {children}
    </Button>
  )
}
function PreviousLink({ page, href }: PaginationPageProps) {
  if (page <= 1) return null
  return (
    <PaginationLink href={href(page - 1)}>
      {paginationLabels.previous}
    </PaginationLink>
  )
}
function NextLink({ page, pages, href }: PaginationNextProps) {
  if (page >= pages) return null
  return (
    <PaginationLink href={href(page + 1)}>
      {paginationLabels.next}
    </PaginationLink>
  )
}
export function Pagination({ page, pages, href }: PaginationProps) {
  return (
    <nav
      aria-label={paginationLabels.navigation}
      data-slot="pagination"
      className={paginationStyles.root}
    >
      <div className={paginationStyles.inner}>
        <PreviousLink page={page} href={href} />
        <span aria-current="page">{pageStatus(page, pages)}</span>
        <NextLink page={page} pages={pages} href={href} />
      </div>
    </nav>
  )
}
