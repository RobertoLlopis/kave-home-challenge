import assert from 'node:assert/strict'
import test from 'node:test'

import { productCardHref } from '@/containers/product-card/helpers'

test('product card hrefs encode reserved characters', () => {
  assert.equal(productCardHref('A/B 1'), '/products/A%2FB%201')
})
