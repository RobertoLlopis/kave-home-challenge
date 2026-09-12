import { spawn } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'

const snapshotsDirectory = new URL(
  '../development/catalog-snapshots/',
  import.meta.url,
)
const [productPages, categoriesSnapshot] = await Promise.all([
  readFile(new URL('products.json', snapshotsDirectory), 'utf8').then(
    JSON.parse,
  ),
  readFile(new URL('categories.json', snapshotsDirectory), 'utf8').then(
    JSON.parse,
  ),
])

const productCatalog = productPages.flatMap((page) => page.results)
const pagesByCollection = {
  products: productPages,
  categories: [categoriesSnapshot],
}

function sendJson(response, status, body) {
  response.writeHead(status, { 'content-type': 'application/json' })
  response.end(JSON.stringify(body))
}

function searchableText(value) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
}

function searchSnapshot(requestUrl) {
  const query = searchableText(requestUrl.searchParams.get('query') ?? '')
  if (!query) return []
  return productCatalog
    .filter((product) => searchableText(product.title).includes(query))
    .map((product) => ({
      title: product.title,
      sku: product.sku,
      url: `https://kavehome.com/es/es/p/${product.slug}`,
    }))
}

function pageLink(index, offset, pages, requestUrl) {
  const target = ((index + offset + pages.length) % pages.length) + 1
  const url = new URL(requestUrl)
  url.searchParams.set('page', String(target))
  return url.toString()
}

// Sólo hay 3 páginas de productos capturadas: la 4ª y siguientes vuelven a la
// primera.
function paginatedSnapshot(collection, requestUrl) {
  const pages = pagesByCollection[collection]
  const page = Math.max(1, Number(requestUrl.searchParams.get('page')) || 1)
  const index = (page - 1) % pages.length
  return {
    ...pages[index],
    previous: pageLink(index, -1, pages, requestUrl),
    next: pageLink(index, 1, pages, requestUrl),
  }
}

const server = createServer((request, response) => {
  const requestUrl = new URL(
    request.url ?? '/',
    `http://${request.headers.host ?? '127.0.0.1'}`,
  )
  if (requestUrl.pathname === '/products/search/') {
    sendJson(response, 200, searchSnapshot(requestUrl))
    return
  }
  if (requestUrl.pathname === '/products/') {
    sendJson(response, 200, paginatedSnapshot('products', requestUrl))
    return
  }
  if (requestUrl.pathname === '/categories/') {
    sendJson(response, 200, paginatedSnapshot('categories', requestUrl))
    return
  }
  const categoryMatch = requestUrl.pathname.match(
    /^\/nextjs\/categories\/([^/]+)\/$/,
  )
  if (categoryMatch) {
    const slug = decodeURIComponent(categoryMatch[1])
    const category = categoriesSnapshot.results.find(
      (item) => item.slug === slug,
    )
    sendJson(
      response,
      category ? 200 : 404,
      category ?? { detail: 'Not found' },
    )
    return
  }
  const productMatch = requestUrl.pathname.match(/^\/products\/([^/]+)\/$/)
  if (productMatch) {
    const sku = decodeURIComponent(productMatch[1])
    const product = productCatalog.find((item) => item.sku === sku)
    sendJson(response, product ? 200 : 404, product ?? { detail: 'Not found' })
    return
  }
  sendJson(response, 404, { detail: 'Not found' })
})

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const address = server.address()
if (!address || typeof address === 'string')
  throw new Error('Could not start the development catalog')

const nextBin = fileURLToPath(
  new URL('../node_modules/next/dist/bin/next', import.meta.url),
)
const next = spawn(
  process.execPath,
  [nextBin, 'dev', ...process.argv.slice(2)],
  {
    env: {
      ...process.env,
      KAVE_HOME_API_BASE_URL: `http://127.0.0.1:${address.port}/`,
    },
    stdio: 'inherit',
  },
)

console.log(
  `Development catalog: ${productCatalog.length} captured products (${productPages.length} pages) and ${categoriesSnapshot.results.length} captured categories`,
)

let stopping = false
function stop(signal) {
  if (stopping) return
  stopping = true
  next.kill(signal)
  server.close()
}
process.once('SIGINT', () => stop('SIGINT'))
process.once('SIGTERM', () => stop('SIGTERM'))
next.once('error', (error) => {
  console.error(error)
  server.close(() => process.exit(1))
})
next.once('exit', (code) => {
  server.close(() => process.exit(code ?? 0))
})
