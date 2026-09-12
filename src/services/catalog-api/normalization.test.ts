import assert from 'node:assert/strict'
import test from 'node:test'

import { CatalogApiError, normalizeProduct } from '@/services/catalog-api'
import {
  normalizeCategoriesEnvelope,
  normalizeCategory,
  normalizeEnvelope,
  normalizeProductsEnvelope,
  normalizeRequiredProduct,
} from '@/services/catalog-api/normalization'

test('category mapper reads the SEO contract and drops unsafe open graph images', () => {
  const category = normalizeCategory({
    id: 699,
    name: 'Sillas',
    slug: 'sillas',
    seo: {
      seoTitle: 'Título SEO',
      seoDescription: 'Descripción SEO',
      index: 'index,follow',
      alternates: [{ rel: 'canonical', href: '/es/es/o/sillas' }],
    },
    openGraphImages: [
      'https://d.media.kavehome.com/image/upload/ok.jpg',
      'https://evil.test/bad.jpg',
    ],
  })
  assert.equal(category?.seoTitle, 'Título SEO')
  assert.equal(category?.seoDescription, 'Descripción SEO')
  assert.equal(category?.seoIndex, 'index,follow')
  assert.deepEqual(category?.openGraphImages, [
    'https://d.media.kavehome.com/image/upload/ok.jpg',
  ])
})

test('category mapper falls back to empty SEO values when the API omits them', () => {
  const category = normalizeCategory({ id: 1, name: 'Mesas', slug: 'mesas' })
  assert.equal(category?.seoTitle, '')
  assert.equal(category?.seoDescription, '')
  assert.deepEqual(category?.openGraphImages, [])
  assert.deepEqual(category?.children, [])
})

test('category mapper keeps only safe subcategories from mainChildren', () => {
  const category = normalizeCategory({
    id: 699,
    name: 'Sillas',
    slug: 'sillas',
    mainChildren: [
      {
        id: 718,
        name: 'Sillas de comedor',
        slug: 'sillas-comedor',
        highlightImage: 'https://d.media.kavehome.com/image/upload/ok.jpg',
      },
      {
        id: 719,
        name: 'Taburetes',
        slug: 'taburetes',
        highlightImage: 'https://evil.test/bad.jpg',
      },
      { name: 'Sin identificador' },
    ],
  })
  assert.deepEqual(
    category?.children.map((child) => child.slug),
    ['sillas-comedor', 'taburetes'],
  )
  assert.equal(
    category?.children[0]?.highlightImage,
    'https://d.media.kavehome.com/image/upload/ok.jpg',
  )
  assert.equal(category?.children[1]?.highlightImage, null)
})

test('catalog normalization validates pagination links and preserves null links', () => {
  const normalized = normalizeEnvelope({
    count: 2,
    next: 'https://kavehome.com/products?page=2',
    previous: null,
    results: [{ id: 1 }],
  })
  assert.equal(normalized.count, 2)
  assert.equal(normalized.previous, null)
  assert.throws(
    () =>
      normalizeEnvelope({
        count: 1,
        next: 'javascript:alert(1)',
        previous: null,
        results: [],
      }),
    (error: unknown) =>
      error instanceof CatalogApiError && error.kind === 'contract',
  )
  assert.throws(
    () =>
      normalizeEnvelope({
        count: 1,
        next: 'https://user:pass@evil.test/x',
        previous: null,
        results: [],
      }),
    /pagination link/,
  )
})

test('catalog product and category boundaries reject invalid records', () => {
  assert.throws(
    () =>
      normalizeProductsEnvelope({
        count: 1,
        next: null,
        previous: null,
        results: [null],
      }),
    (error: unknown) =>
      error instanceof CatalogApiError && error.kind === 'contract',
  )
  assert.throws(
    () => normalizeRequiredProduct(null),
    (error: unknown) =>
      error instanceof CatalogApiError && error.kind === 'contract',
  )
  assert.throws(
    () =>
      normalizeCategoriesEnvelope({
        count: 1,
        next: null,
        previous: null,
        results: [{}],
      }),
    (error: unknown) =>
      error instanceof CatalogApiError && error.kind === 'contract',
  )
})

test('product mapper preserves API image objects and removes unsafe images', () => {
  assert.equal(normalizeProduct(null), null)
  const product = normalizeProduct({
    sku: 'X',
    title: 'X',
    price: 10,
    stock: 1,
    mainImage: {
      code: 'X_1V01',
      url: 'https://d.media.kavehome.com/main.jpg',
    },
    images: [
      { url: 'https://d.media.kavehome.com/detail.jpg' },
      { url: 'https://evil.test/x' },
    ],
  })
  assert.equal(product?.mainImage, 'https://d.media.kavehome.com/main.jpg')
  assert.deepEqual(product?.images, ['https://d.media.kavehome.com/detail.jpg'])
})
