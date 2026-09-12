import type { ReactNode } from 'react'

export type PaginationLinkProps = {
  href: string
  label: string
  children: ReactNode
  current?: boolean
}
export type PaginationPageProps = {
  page: number
  href: (page: number) => string
}
export type PaginationNextProps = {
  page: number
  pages: number
  href: (page: number) => string
}
export type PaginationProps = PaginationNextProps
