import assert from 'node:assert/strict'
import test from 'node:test'

import { formatPrice } from '@/utils/format-price'

test('formatPrice uses the Spanish currency format', () => {
  assert.equal(formatPrice(399), '399 €')
  assert.equal(formatPrice(1234.5), '1234,50 €')
})
