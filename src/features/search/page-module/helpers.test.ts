import assert from 'node:assert/strict'
import test from 'node:test'

import {
  resolveSearchQuery,
  searchMetadata,
} from '@/features/search/page-module/helpers'

test('search query and metadata keep internal results canonical and noindex', () => {
  assert.equal(resolveSearchQuery({ q: '  sofá  ' }), 'sofá')
  assert.equal(resolveSearchQuery({ q: ['mesa', 'silla'] }), 'mesa')
  const metadata = searchMetadata('sofá')
  assert.equal(metadata.alternates?.canonical, '/search')
  assert.deepEqual(metadata.robots, { index: false, follow: true })
})
