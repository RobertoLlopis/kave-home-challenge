import assert from 'node:assert/strict'
import test from 'node:test'

import {
  categoryCanonical,
  categoryMetadata,
  categoryRobots,
} from '@/features/category/page-module/helpers'

test('category helpers resolve the editorial metadata and canonical', () => {
  assert.equal(categoryCanonical('sillas'), '/categories/sillas')
  const metadata = categoryMetadata({
    id: 699,
    name: 'Sillas',
    slug: 'sillas',
    highlightImage: null,
    description: '<p>Sillas de madera</p>',
    seoTitle: '',
    seoDescription: '',
    seoIndex: '',
    openGraphImages: [],
    children: [],
  })
  assert.equal(metadata.title, 'Sillas · Kave Home')
  assert.equal(metadata.description, 'Sillas de madera')
  assert.deepEqual(metadata.alternates, { canonical: '/categories/sillas' })
  assert.deepEqual(metadata.openGraph, {
    title: 'Sillas · Kave Home',
    description: 'Sillas de madera',
    type: 'website',
  })
})

test('category metadata prefers the SEO contract served by the API', () => {
  const seoTitle = 'Sillas de diseño, modernas y cómodas | Kave Home'
  const seoDescription =
    'Sillas de diseño de alta calidad creadas para acompañarte toda la vida.'
  const openGraphImages = ['https://d.media.kavehome.com/image/upload/x.jpg']
  const metadata = categoryMetadata({
    id: 699,
    name: 'Sillas',
    slug: 'sillas',
    highlightImage: null,
    description: '<p>Sillas de madera</p>',
    seoTitle,
    seoDescription,
    seoIndex: 'index,follow',
    openGraphImages,
    children: [],
  })
  assert.equal(metadata.title, seoTitle)
  assert.equal(metadata.description, seoDescription)
  assert.deepEqual(metadata.alternates, {
    canonical: '/categories/sillas',
  })
  assert.deepEqual(metadata.robots, { index: true, follow: true })
  assert.deepEqual(metadata.openGraph, {
    title: seoTitle,
    description: seoDescription,
    type: 'website',
    images: openGraphImages,
  })
})

test('category robots honours the directives the API sends', () => {
  const base = {
    id: 1,
    name: 'Mesas',
    slug: 'mesas',
    highlightImage: null,
    description: '',
    seoTitle: '',
    seoDescription: '',
    openGraphImages: [],
    children: [],
  }
  const robots = (seoIndex: string) => categoryRobots({ ...base, seoIndex })
  assert.deepEqual(robots('index,follow'), { index: true, follow: true })
  assert.deepEqual(robots(' index, follow '), { index: true, follow: true })
  assert.deepEqual(robots('noindex,follow'), { index: false, follow: true })
  assert.deepEqual(robots('noindex,nofollow'), {
    index: false,
    follow: false,
  })
  assert.equal(robots(''), null)
  assert.equal(robots('  '), null)
})
