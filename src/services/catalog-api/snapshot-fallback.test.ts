import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

import { snapshotCatalog } from '@/services/catalog-api/snapshot-fallback'
import { snapshotCatalogSize } from '@development/catalog-snapshots'

test('snapshot fallback resolves captured catalog endpoints', () => {
  const products = snapshotCatalog(
    'https://kavehome.com/es/es/api/v2/products/?page=1',
  ) as { results: Array<{ sku: string }>; previous: unknown }
  assert.equal(products.results[0]?.sku, 'S81321ZF38')
  assert.equal(products.previous, null)

  const product = snapshotCatalog(
    'https://kavehome.com/es/es/api/v2/products/S81321ZF38/',
  ) as { sku: string }
  assert.equal(product.sku, 'S81321ZF38')

  const search = snapshotCatalog(
    'https://kavehome.com/es/es/api/v2/products/search/?query=sofa',
  ) as Array<{ sku: string }>
  assert.equal(
    search.some((hit) => hit.sku === 'S81321ZF38'),
    true,
  )

  const category = snapshotCatalog(
    'https://kavehome.com/es/es/api/v2/nextjs/categories/sillas/',
  ) as { slug: string; mainChildren: unknown[] }
  assert.equal(category.slug, 'sillas')
  assert.equal(category.mainChildren.length > 0, true)

  assert.equal(
    snapshotCatalog('https://kavehome.com/es/es/api/v2/nope/'),
    undefined,
  )
  assert.equal(snapshotCatalog('not a url'), undefined)
  assert.equal(
    snapshotCatalog(
      'https://kavehome.com/es/es/api/v2/nextjs/categories/missing/',
    ),
    undefined,
  )
})

test('snapshot pagination stays cyclic and keeps links inside the range', () => {
  const page = (value: number) =>
    snapshotCatalog(
      `https://kavehome.com/es/es/api/v2/products/?page=${value}`,
    ) as { next: string | null; previous: string | null; results: unknown[] }

  const first = page(1)
  assert.equal(first.previous, null)
  assert.equal(first.next?.endsWith('?page=2'), true)
  assert.deepEqual(
    page(snapshotCatalogSize.productPages + 1).results,
    first.results,
  )

  const last = page(1093)
  assert.equal(last.next, null)
  assert.equal(last.previous?.endsWith('?page=1092'), true)

  const categories = snapshotCatalog(
    'https://kavehome.com/es/es/api/v2/categories/',
  ) as { next: unknown; previous: unknown }
  assert.equal(categories.previous, null)
  assert.equal(categories.next, null)
  assert.equal(
    (
      snapshotCatalog(
        'https://kavehome.com/es/es/api/v2/products/?page=nope',
      ) as { previous: unknown }
    ).previous,
    null,
  )
})

test('development and contingency consume one snapshot implementation', async () => {
  const script = await readFile('scripts/development.mjs', 'utf8')
  const fallback = await readFile(
    'src/services/catalog-api/snapshot-fallback.ts',
    'utf8',
  )
  assert.match(script, /development\/catalog-snapshots\/index\.ts/)
  assert.match(fallback, /@development\/catalog-snapshots/)
  assert.equal(snapshotCatalogSize.categories > 0, true)
  const category = snapshotCatalog(
    'https://kavehome.com/es/es/api/v2/nextjs/categories/taburetes-bar/',
  ) as { slug: string; seo?: unknown }
  assert.equal(category.slug, 'taburetes-bar')
  assert.notEqual(category.seo, undefined)
})
