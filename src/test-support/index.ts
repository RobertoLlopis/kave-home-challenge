import assert from 'node:assert/strict'

import type { CatalogFetcher } from '@/services/catalog-api/transport'

// Utilidades compartidas entre tests. Nunca se importan desde la aplicación.

export const mediaHost = 'd.media.kavehome.com'

export const favoriteItem = {
  sku: 'A',
  title: 'Mesa',
  price: 10,
  image: null,
}

export const validProduct = {
  sku: 'X',
  title: 'Mesa',
  price: 10,
  salePrice: null,
  stock: 1,
  images: [],
  mainImage: null,
}

export const validEnvelope = (results: unknown[]) => ({
  count: results.length,
  next: null,
  previous: null,
  results,
})

export function jsonResponse(
  body: unknown,
  status = 200,
  contentType = 'application/json',
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': contentType },
  })
}

export const fetcher =
  (
    response: Response | Error,
    seen?: (input: RequestInfo | URL, init?: RequestInit) => void,
  ): CatalogFetcher =>
  async (input, init) => {
    seen?.(input, init)
    if (response instanceof Error) throw response
    return response
  }

export async function withFetchResponses(
  responses: Array<Response | Error>,
  callback: () => Promise<void>,
) {
  const original = globalThis.fetch
  let index = 0
  globalThis.fetch = (async () => {
    const response = responses[index++]
    if (response instanceof Error) throw response
    assert.ok(response)
    return response
  }) as typeof fetch
  try {
    await callback()
  } finally {
    globalThis.fetch = original
  }
}

export async function withFetch(
  response: Response | Error,
  callback: () => Promise<void>,
) {
  const original = globalThis.fetch
  globalThis.fetch = (async () => {
    if (response instanceof Error) throw response
    return response
  }) as typeof fetch
  try {
    await callback()
  } finally {
    globalThis.fetch = original
  }
}
