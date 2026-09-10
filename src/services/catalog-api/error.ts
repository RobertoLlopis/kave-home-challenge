import { catalogApiConstants } from './constants'
import type { CatalogErrorKind } from './types'

export class CatalogApiError extends Error {
  constructor(
    message: string,
    readonly kind: CatalogErrorKind,
    readonly status?: number,
  ) {
    super(message)
    this.name = catalogApiConstants.errorName
  }
}
