import { environment } from '@/config/environment/runtime'
import { tryCatch } from '@/utils/try-catch'
import { catalogApiConstants } from './constants'
import { CatalogApiError } from './error'
import type { CatalogRequestOptions } from './types'

export type { CatalogFetcher, CatalogRequestOptions } from './types'

function requestFailure(error: unknown): CatalogApiError {
  if (error instanceof DOMException && error.name === 'TimeoutError')
    return new CatalogApiError(catalogApiConstants.messages.timeout, 'timeout')
  return new CatalogApiError(catalogApiConstants.messages.network, 'network')
}

export async function requestCatalog(
  path: string,
  options: CatalogRequestOptions = {},
): Promise<unknown> {
  const fetcher = options.fetcher ?? fetch
  const timeoutMs = options.timeoutMs ?? environment.apiTimeoutMs
  const [response, requestError] = await tryCatch(
    fetcher(path, {
      signal: AbortSignal.timeout(timeoutMs),
      next: { revalidate: catalogApiConstants.revalidateSeconds },
    }),
  )

  if (requestError !== null || response === null)
    throw requestFailure(requestError)
  if (!response.ok)
    throw new CatalogApiError(
      catalogApiConstants.messages.http(response.status),
      'http',
      response.status,
    )
  if (!response.headers.get('content-type')?.includes('application/json'))
    throw new CatalogApiError(
      catalogApiConstants.messages.contentType,
      'content-type',
    )

  const [payload, parseError] = await tryCatch(response.json())
  if (parseError !== null)
    throw new CatalogApiError(
      catalogApiConstants.messages.invalidJson,
      'contract',
    )
  return payload
}
