import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/primitives/button'
import { cn } from '@/utils/classnames'
import { paginationLabels, pageStatus } from './constants'
import { pageRange } from './helpers'
import { paginationStyles } from './styles'
import type {
  PaginationLinkProps,
  PaginationNextProps,
  PaginationPageProps,
  PaginationProps,
} from './types'

function PaginationLink({
  href,
  label,
  children,
  current = false,
}: PaginationLinkProps) {
  return (
    <Link
      data-slot="pagination-link"
      href={href}
      aria-current={current ? 'page' : undefined}
      aria-label={label}
      className={cn(
        paginationStyles.control,
        current && paginationStyles.current,
      )}
    >
      {current ? (
        <span className={paginationStyles.currentMarker}>{children}</span>
      ) : (
        children
      )}
    </Link>
  )
}

function PreviousLink({ page, href }: PaginationPageProps) {
  if (page <= 1)
    return (
      <Button
        type="button"
        nativeButton
        disabled
        aria-label={paginationLabels.previous}
        className={paginationStyles.control}
      >
        <ChevronLeft aria-hidden="true" />
      </Button>
    )
  return (
    <PaginationLink href={href(page - 1)} label={paginationLabels.previous}>
      <ChevronLeft aria-hidden="true" />
    </PaginationLink>
  )
}

function NextLink({ page, pages, href }: PaginationNextProps) {
  if (page >= pages)
    return (
      <Button
        type="button"
        nativeButton
        disabled
        aria-label={paginationLabels.next}
        className={paginationStyles.control}
      >
        <ChevronRight aria-hidden="true" />
      </Button>
    )
  return (
    <PaginationLink href={href(page + 1)} label={paginationLabels.next}>
      <ChevronRight aria-hidden="true" />
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
        {pageRange(page, pages).map((entry, index) =>
          entry === 'ellipsis' ? (
            <span
              key={`ellipsis-${index}`}
              aria-hidden="true"
              className={paginationStyles.ellipsis}
            >
              <MoreHorizontal />
            </span>
          ) : (
            <PaginationLink
              key={entry}
              href={href(entry)}
              label={paginationLabels.page(entry, entry === page)}
              current={entry === page}
            >
              {String(entry)}
            </PaginationLink>
          ),
        )}
        <NextLink page={page} pages={pages} href={href} />
        <span className={paginationStyles.status}>
          {pageStatus(page, pages)}
        </span>
      </div>
    </nav>
  )
}
