import assert from 'node:assert/strict'
import test from 'node:test'

import {
  deliveryDateRange,
  formatDeliveryDate,
} from '@/features/product/containers/delivery-message/helpers'

test('delivery range uses Spain calendar days deterministically', () => {
  const [minimum, maximum] = deliveryDateRange(
    new Date('2026-03-28T23:30:00.000Z'),
    3,
    10,
  )
  assert.equal(formatDeliveryDate(minimum), '01/04')
  assert.equal(formatDeliveryDate(maximum), '08/04')
})
