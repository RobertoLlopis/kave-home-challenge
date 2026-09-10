export const paginationLabels = {
  navigation: 'Paginación',
  previous: 'Anterior',
  next: 'Siguiente',
} as const

export function pageStatus(page: number, pages: number) {
  return `Página ${page} de ${pages}`
}
