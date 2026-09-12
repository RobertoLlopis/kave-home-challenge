import assert from 'node:assert/strict'
import test from 'node:test'

import { availableQuantities } from '@/features/product/containers/product-purchase/helpers'

test('purchase quantities honor available stock up to fifty units', () => {
  assert.deepEqual(availableQuantities(3), [1, 2, 3])
  assert.equal(availableQuantities(80).length, 50)
  assert.equal(availableQuantities(0).length, 50)
})
