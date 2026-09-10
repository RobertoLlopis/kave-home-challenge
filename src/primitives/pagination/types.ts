export type PaginationLinkProps = {
  href: string
  children: string
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
