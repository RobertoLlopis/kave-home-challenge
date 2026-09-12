import assert from 'node:assert/strict'
import test from 'node:test'
import { parseEnvironment } from '../src/config/environment'
import { categoryHref } from '../src/containers/category-list/helpers'
import { productCardHref } from '../src/containers/product-card/helpers'
import { availableQuantities } from '../src/containers/product-purchase/helpers'
import {
  deliveryDateRange,
  formatDeliveryDate,
} from '../src/containers/service-footer/helpers'
import {
  resolveSearchQuery,
  searchMetadata,
} from '../src/page-modules/search/helpers'
import {
  productsCanonical,
  productsPageDestination,
} from '../src/page-modules/products/helpers'
import {
  getFavoriteStorage,
  initialFavoritesState,
  isFavoriteImage,
  loadFavorites,
  readFavorites,
  saveFavorites,
  toggleFavorite,
} from '../src/providers/favorites-provider'
import { pageRange } from '../src/primitives/pagination/helpers'
import {
  CatalogApiError,
  getCategories,
  getProduct,
  getProducts,
  normalizeProduct,
  searchProducts,
} from '../src/services/catalog-api'
import {
  normalizeCategoriesEnvelope,
  normalizeEnvelope,
  normalizeProductsEnvelope,
  normalizeRequiredProduct,
  normalizeSearchHits,
} from '../src/services/catalog-api/normalization'
import {
  requestCatalog,
  type CatalogFetcher,
} from '../src/services/catalog-api/transport'
import { formatPrice } from '../src/utils/format-price'
import { pageQuery, parsePage, totalPages } from '../src/utils/pagination'

const mediaHost = 'd.media.kavehome.com'
const item = { sku: 'A', title: 'Mesa', price: 10, image: null }

function jsonResponse(
  body: unknown,
  status = 200,
  contentType = 'application/json',
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': contentType },
  })
}

const fetcher =
  (
    response: Response | Error,
    seen?: (input: RequestInfo | URL, init?: RequestInit) => void,
  ): CatalogFetcher =>
  async (input, init) => {
    seen?.(input, init)
    if (response instanceof Error) throw response
    return response
  }

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

test('pagination helpers normalize pages and produce canonical query strings', () => {
  assert.equal(parsePage('2'), 2)
  assert.equal(parsePage('1.5'), 1)
  assert.equal(parsePage('-2'), 1)
  assert.equal(parsePage('nope'), 1)
  assert.equal(totalPages(0), 1)
  assert.equal(pageQuery(2, 'chairs'), '?page=2&category=chairs')
  assert.equal(productsPageDestination(1, 4, '1', 'chairs'), null)
  assert.equal(productsPageDestination(2, 4, '2', 'chairs'), null)
  assert.equal(
    productsCanonical(2, 'chairs'),
    '/products?page=2&category=chairs',
  )
  assert.equal(productCardHref('A/B 1'), '/products/A%2FB%201')
  assert.equal(
    categoryHref('chairs & tables'),
    '/products?category=chairs+%26+tables',
  )
})

test('environment parser requires valid HTTP URLs and positive timeout', () => {
  const valid = {
    KAVE_HOME_API_BASE_URL: 'https://kavehome.com/api/',
    KAVE_HOME_SITE_URL: 'http://localhost:3000',
    KAVE_HOME_MEDIA_HOST: mediaHost,
    KAVE_HOME_API_TIMEOUT_MS: '8000',
  }
  const parsed = parseEnvironment(valid)
  assert.equal(parsed.apiBaseUrl.href, valid.KAVE_HOME_API_BASE_URL)
  assert.equal(parsed.siteUrl.href, `${valid.KAVE_HOME_SITE_URL}/`)
  assert.equal(parsed.apiTimeoutMs, 8000)
  assert.throws(
    () =>
      parseEnvironment({ ...valid, KAVE_HOME_SITE_URL: 'file:///tmp/site' }),
    /absolute HTTP\(S\) URL/,
  )
  assert.throws(
    () => parseEnvironment({ ...valid, KAVE_HOME_API_TIMEOUT_MS: '0' }),
    /positive integer/,
  )
  assert.throws(
    () =>
      parseEnvironment({ ...valid, KAVE_HOME_MEDIA_HOST: 'https://evil.test' }),
    /valid host/,
  )
})

test('purchase quantities honor available stock up to fifty units', () => {
  assert.deepEqual(availableQuantities(3), [1, 2, 3])
  assert.equal(availableQuantities(80).length, 50)
  assert.equal(availableQuantities(0).length, 50)
})

test('delivery range uses Spain calendar days deterministically', () => {
  const [minimum, maximum] = deliveryDateRange(
    new Date('2026-03-28T23:30:00.000Z'),
    3,
    10,
  )
  assert.equal(formatDeliveryDate(minimum), '01/04')
  assert.equal(formatDeliveryDate(maximum), '08/04')
})

const validProduct = {
  sku: 'X',
  title: 'Mesa',
  price: 10,
  salePrice: null,
  stock: 1,
  images: [],
  mainImage: null,
}
const validEnvelope = (results: unknown[]) => ({
  count: results.length,
  next: null,
  previous: null,
  results,
})

async function withFetchResponses(
  responses: Array<Response | Error>,
  callback: () => Promise<void>,
) {
  const original = globalThis.fetch
  let index = 0
  globalThis.fetch = (async () => {
    const response = responses[index++]
    if (response instanceof Error) throw response
    assert.ok(response)
    return response
  }) as typeof fetch
  try {
    await callback()
  } finally {
    globalThis.fetch = original
  }
}

async function withFetch(
  response: Response | Error,
  callback: () => Promise<void>,
) {
  const original = globalThis.fetch
  globalThis.fetch = (async () => {
    if (response instanceof Error) throw response
    return response
  }) as typeof fetch
  try {
    await callback()
  } finally {
    globalThis.fetch = original
  }
}

test('public catalog queries normalize valid responses and preserve facade errors', async () => {
  await withFetch(jsonResponse(validEnvelope([validProduct])), async () => {
    const products = await getProducts()
    assert.equal(products.results[0]?.sku, 'X')
  })
  await withFetch(
    jsonResponse(validEnvelope([{ id: 1, name: 'Mesas' }])),
    async () => {
      const categories = await getCategories()
      assert.equal(categories[0]?.name, 'Mesas')
    },
  )
  await withFetch(jsonResponse(validProduct), async () => {
    assert.equal((await getProduct('X'))?.sku, 'X')
  })
})

test('search validates and enriches every unique hit in server order', async () => {
  const uniqueHits = Array.from({ length: 6 }, (_, index) => ({
    title: `Producto ${index}`,
    sku: `SKU-${index}`,
    url: `https://kavehome.com/es/es/p/producto-${index}`,
  }))
  const hits = [...uniqueHits, uniqueHits[0]]
  assert.deepEqual(normalizeSearchHits(hits), hits)
  assert.throws(() => normalizeSearchHits([{ title: 'Mesa' }]), {
    name: 'CatalogApiError',
  })
  await withFetchResponses(
    [
      jsonResponse(hits),
      ...uniqueHits.map((hit) =>
        jsonResponse({ ...validProduct, sku: hit.sku, title: hit.title }),
      ),
    ],
    async () => {
      assert.deepEqual(
        (await searchProducts(' producto ')).map((product) => product.sku),
        uniqueHits.map((hit) => hit.sku),
      )
    },
  )
  await withFetch(jsonResponse([], 200), async () => {
    assert.deepEqual(await searchProducts(''), [])
  })
})

test('search query and metadata keep internal results canonical and noindex', () => {
  assert.equal(resolveSearchQuery({ q: '  sofá  ' }), 'sofá')
  assert.equal(resolveSearchQuery({ q: ['mesa', 'silla'] }), 'mesa')
  const metadata = searchMetadata('sofá')
  assert.equal(metadata.alternates?.canonical, '/search')
  assert.deepEqual(metadata.robots, { index: false, follow: true })
})

test('getProduct maps a genuine 404 to absence', async () => {
  await withFetch(jsonResponse({}, 404), async () => {
    assert.equal(await getProduct('missing'), null)
  })
})

test('catalog transport preserves HTTP failures and status codes', async () => {
  await assert.rejects(
    requestCatalog('/products', {
      fetcher: fetcher(jsonResponse({ error: true }, 503)),
    }),
    (error: unknown) =>
      error instanceof CatalogApiError &&
      error.kind === 'http' &&
      error.status === 503,
  )
})

test('catalog transport rejects non-JSON responses at the boundary', async () => {
  await assert.rejects(
    requestCatalog('/products', {
      fetcher: fetcher(
        jsonResponse('<html>checkpoint</html>', 200, 'text/html'),
      ),
    }),
    (error: unknown) =>
      error instanceof CatalogApiError && error.kind === 'content-type',
  )
})

test('catalog transport maps malformed JSON to a contract error', async () => {
  await assert.rejects(
    requestCatalog('/products', {
      fetcher: fetcher(
        new Response('{bad', {
          status: 200,
          headers: { 'content-type': 'application/json' },
        }),
      ),
    }),
    (error: unknown) =>
      error instanceof CatalogApiError && error.kind === 'contract',
  )
})

test('catalog transport maps timeout and network errors and passes an abort signal', async () => {
  let receivedSignal: AbortSignal | undefined
  await assert.rejects(
    requestCatalog('/products', {
      timeoutMs: 1,
      fetcher: fetcher(
        new DOMException('timed out', 'TimeoutError'),
        (_input, init) => {
          receivedSignal = init?.signal as AbortSignal
        },
      ),
    }),
    (error: unknown) =>
      error instanceof CatalogApiError && error.kind === 'timeout',
  )
  assert.equal(receivedSignal instanceof AbortSignal, true)
  await assert.rejects(
    requestCatalog('/products', { fetcher: fetcher(new Error('offline')) }),
    (error: unknown) =>
      error instanceof CatalogApiError && error.kind === 'network',
  )
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

test('formatPrice uses the Spanish currency format', () => {
  assert.equal(formatPrice(399), '399 €')
  assert.equal(formatPrice(1234.5), '1234,50 €')
})

test('favorites envelope rejects corrupt, legacy and untrusted records', () => {
  assert.deepEqual(readFavorites('{bad', mediaHost), [])
  assert.deepEqual(readFavorites(JSON.stringify([item]), mediaHost), [])
  assert.deepEqual(
    readFavorites(
      JSON.stringify({
        version: 1,
        items: [{ ...item, image: 'https://evil.test/x' }],
      }),
      mediaHost,
    ),
    [],
  )
  const saved = {
    ...item,
    image: 'https://d.media.kavehome.com/x.jpg',
  }
  assert.deepEqual(
    readFavorites(JSON.stringify({ version: 1, items: [saved] }), mediaHost),
    [saved],
  )
  assert.deepEqual(
    readFavorites(JSON.stringify({ version: 2, items: [saved] }), mediaHost),
    [],
  )
})

test('favorites image validation requires the exact configured HTTPS host', () => {
  assert.equal(
    isFavoriteImage('https://d.media.kavehome.com/x.jpg', mediaHost),
    true,
  )
  assert.equal(
    isFavoriteImage('https://cdn.d.media.kavehome.com/x.jpg', mediaHost),
    false,
  )
  assert.equal(
    isFavoriteImage('https://d.media.kavehome.com:444/x.jpg', mediaHost),
    false,
  )
  assert.equal(
    isFavoriteImage('http://d.media.kavehome.com/x.jpg', mediaHost),
    false,
  )
})

test('favorites storage accessor tolerates a blocked global getter', () => {
  assert.equal(
    getFavoriteStorage(() => {
      throw new DOMException('blocked', 'SecurityError')
    }),
    null,
  )
})

test('favorites storage tolerates blocked reads and writes and preserves envelope writes', () => {
  assert.deepEqual(loadFavorites(null, mediaHost), [])
  assert.deepEqual(
    loadFavorites(
      {
        getItem: () => {
          throw new Error('blocked')
        },
        setItem: () => undefined,
      },
      mediaHost,
    ),
    [],
  )
  let key = ''
  let value = ''
  saveFavorites(
    {
      getItem: () => null,
      setItem: (nextKey, nextValue) => {
        key = nextKey
        value = nextValue
      },
    },
    [item],
  )
  assert.equal(key, 'kave-home-favorites')
  assert.deepEqual(JSON.parse(value), { version: 1, items: [item] })
  assert.doesNotThrow(() =>
    saveFavorites(
      {
        getItem: () => null,
        setItem: () => {
          throw new Error('quota')
        },
      },
      [item],
    ),
  )
})

test('favorites state starts pending before the first storage read and toggles idempotently', () => {
  assert.equal(initialFavoritesState.pending, true)
  const added = toggleFavorite([], item)
  assert.deepEqual(added, [item])
  assert.deepEqual(toggleFavorite(added, item), [])
})
