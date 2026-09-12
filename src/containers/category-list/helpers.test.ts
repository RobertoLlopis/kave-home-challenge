import assert from 'node:assert/strict'
import test from 'node:test'

import { categoryHref } from '@/containers/category-list/helpers'

test('category hrefs encode reserved characters', () => {
  assert.equal(
    categoryHref('chairs & tables'),
    '/categories/chairs%20%26%20tables',
  )
})
