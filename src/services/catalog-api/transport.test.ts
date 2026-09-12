import assert from 'node:assert/strict'
import test from 'node:test'

import { CatalogApiError } from '@/services/catalog-api'
import { requestCatalog } from '@/services/catalog-api/transport'
import { fetcher, jsonResponse } from '@/test-support'

test('catalog transport preserves HTTP failures and status codes', async () => {
  await assert.rejects(
    requestCatalog('/products', {
      fetcher: fetcher(jsonResponse({ error: true }, 503)),
    }),
    (error: unknown) =>
      error instanceof CatalogApiError &&
      error.kind === 'http' &&
      error.status === 503,
  )
})

test('catalog transport rejects non-JSON responses at the boundary', async () => {
  await assert.rejects(
    requestCatalog('/products', {
      fetcher: fetcher(
        jsonResponse('<html>checkpoint</html>', 200, 'text/html'),
      ),
    }),
    (error: unknown) =>
      error instanceof CatalogApiError && error.kind === 'content-type',
  )
})

test('catalog transport maps malformed JSON to a contract error', async () => {
  await assert.rejects(
    requestCatalog('/products', {
      fetcher: fetcher(
        new Response('{bad', {
          status: 200,
          headers: { 'content-type': 'application/json' },
        }),
      ),
    }),
    (error: unknown) =>
      error instanceof CatalogApiError && error.kind === 'contract',
  )
})

test('catalog transport maps timeout and network errors and passes an abort signal', async () => {
  let receivedSignal: AbortSignal | undefined
  await assert.rejects(
    requestCatalog('/products', {
      timeoutMs: 1,
      fetcher: fetcher(
        new DOMException('timed out', 'TimeoutError'),
        (_input, init) => {
          receivedSignal = init?.signal as AbortSignal
        },
      ),
    }),
    (error: unknown) =>
      error instanceof CatalogApiError && error.kind === 'timeout',
  )
  assert.equal(receivedSignal instanceof AbortSignal, true)
  await assert.rejects(
    requestCatalog('/products', { fetcher: fetcher(new Error('offline')) }),
    (error: unknown) =>
      error instanceof CatalogApiError && error.kind === 'network',
  )
})
