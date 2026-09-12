import assert from 'node:assert/strict'
import test from 'node:test'

import {
  loadProductListing,
  productListingCanonical,
  productListingHref,
} from '@/containers/product-listing'
import {
  jsonResponse,
  validEnvelope,
  validProduct,
  withFetch,
} from '@/test-support'

test('product listing module owns page policy for every listing route', async () => {
  assert.equal(productListingHref('/products', 1), '/products')
  assert.equal(productListingHref('/', 2), '/?page=2')
  assert.equal(productListingCanonical('/', undefined), '/')
  assert.equal(productListingCanonical('/products', '3'), '/products?page=3')
  assert.equal(productListingCanonical('/', '2'), '/?page=2')
  assert.equal(productListingCanonical('/', '0'), '/')

  const envelope = { ...validEnvelope([validProduct]), count: 45 }
  await withFetch(jsonResponse(envelope), async () => {
    const inRange = await loadProductListing('/products', '2')
    assert.equal(inRange.destination, null)
    assert.equal(inRange.listing.pages, 3)
    assert.equal(inRange.listing.page, 2)
    assert.equal(inRange.listing.basePath, '/products')
  })
  await withFetch(jsonResponse(envelope), async () => {
    const outOfRange = await loadProductListing('/products', '9')
    assert.equal(outOfRange.destination, '/products?page=3')
  })
  await withFetch(jsonResponse(envelope), async () => {
    const home = await loadProductListing('/', '9')
    assert.equal(home.destination, '/?page=3')
  })
})
