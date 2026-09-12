import assert from 'node:assert/strict'
import test from 'node:test'

import { pageRange } from '@/containers/pagination/helpers'

test('pagination page ranges cover boundaries without out-of-range entries', () => {
  assert.deepEqual(pageRange(1, 1), [1])
  assert.deepEqual(pageRange(1, 5), [1, 2, 3, 4, 5])
  assert.deepEqual(pageRange(1, 6), [1, 2, 3, 'ellipsis'])
  assert.deepEqual(pageRange(3, 1093), ['ellipsis', 2, 3, 4, 'ellipsis'])
  assert.deepEqual(pageRange(4, 1093), ['ellipsis', 3, 4, 5, 'ellipsis'])
  assert.deepEqual(pageRange(500, 1093), [
    'ellipsis',
    499,
    500,
    501,
    'ellipsis',
  ])
  assert.deepEqual(pageRange(1093, 1093), ['ellipsis', 1091, 1092, 1093])
})
