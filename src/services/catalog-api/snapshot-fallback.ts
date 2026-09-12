import { environment } from '@/config/environment/runtime'
import { resolveCatalogSnapshot } from '@development/catalog-snapshots'

export function snapshotCatalog(path: string): unknown | undefined {
  return resolveCatalogSnapshot(path, environment.apiBaseUrl.toString())
}
