import assert from 'node:assert/strict'
import test from 'node:test'

import {
  listingPageDestination,
  pageQuery,
  parsePage,
  totalPages,
} from '@/utils/pagination'

test('pagination helpers normalize pages and produce canonical query strings', () => {
  assert.equal(parsePage('2'), 2)
  assert.equal(parsePage('1.5'), 1)
  assert.equal(parsePage('-2'), 1)
  assert.equal(parsePage('nope'), 1)
  assert.equal(totalPages(0), 1)
  assert.equal(pageQuery(1), '')
  assert.equal(pageQuery(2), '?page=2')
  assert.equal(
    listingPageDestination('/categories/sillas', 1, 1, '3'),
    '/categories/sillas',
  )
})
