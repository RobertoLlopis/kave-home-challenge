export const paginationLabels = {
  navigation: 'Paginación',
  previous: 'Página anterior',
  next: 'Página siguiente',
  page: (page: number, current: boolean) =>
    current ? `Página actual: ${page}` : `Página ${page}`,
} as const

export function pageStatus(page: number, pages: number) {
  return `Página ${page} de ${pages}`
}
