import assert from 'node:assert/strict'
import test from 'node:test'

import {
  getCategories,
  getCategory,
  getProduct,
  getProducts,
  searchProducts,
} from '@/services/catalog-api'
import { normalizeSearchHits } from '@/services/catalog-api/normalization'
import {
  jsonResponse,
  validEnvelope,
  validProduct,
  withFetch,
  withFetchResponses,
} from '@/test-support'

test('public catalog queries normalize valid responses and preserve facade errors', async () => {
  await withFetch(jsonResponse(validEnvelope([validProduct])), async () => {
    const products = await getProducts()
    assert.equal(products.results[0]?.sku, 'X')
  })
  await withFetch(
    jsonResponse(validEnvelope([{ id: 1, name: 'Mesas' }])),
    async () => {
      const categories = await getCategories()
      assert.equal(categories[0]?.name, 'Mesas')
    },
  )
  await withFetch(jsonResponse(validProduct), async () => {
    assert.equal((await getProduct('X'))?.sku, 'X')
  })
  await withFetch(jsonResponse({ id: 1, name: 'Mesas' }), async () => {
    assert.equal((await getCategory('mesas'))?.name, 'Mesas')
  })
})

test('search validates and enriches every unique hit in server order', async () => {
  const uniqueHits = Array.from({ length: 6 }, (_, index) => ({
    title: `Producto ${index}`,
    sku: `SKU-${index}`,
    url: `https://kavehome.com/es/es/p/producto-${index}`,
  }))
  const hits = [...uniqueHits, uniqueHits[0]]
  assert.throws(() => normalizeSearchHits([{ title: 'Mesa' }]), {
    name: 'CatalogApiError',
  })
  await withFetchResponses(
    [
      jsonResponse(hits),
      ...uniqueHits.map((hit) =>
        jsonResponse({ ...validProduct, sku: hit.sku, title: hit.title }),
      ),
    ],
    async () => {
      assert.deepEqual(
        (await searchProducts(' producto ')).map((product) => product.sku),
        uniqueHits.map((hit) => hit.sku),
      )
    },
  )
  await withFetch(jsonResponse([], 200), async () => {
    assert.deepEqual(await searchProducts(''), [])
  })
})

test('getProduct maps a genuine 404 to absence', async () => {
  await withFetch(jsonResponse({}, 404), async () => {
    assert.equal(await getProduct('missing'), null)
  })
})
