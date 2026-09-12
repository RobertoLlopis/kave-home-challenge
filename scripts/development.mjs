import { spawn } from 'node:child_process'
import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'

import {
  resolveCatalogSnapshot,
  snapshotCatalogSize,
} from '../development/catalog-snapshots/index.ts'

function sendJson(response, status, body) {
  response.writeHead(status, { 'content-type': 'application/json' })
  response.end(JSON.stringify(body))
}

const server = createServer((request, response) => {
  const requestUrl = new URL(
    request.url ?? '/',
    `http://${request.headers.host ?? '127.0.0.1'}`,
  )
  const snapshot = resolveCatalogSnapshot(
    requestUrl.toString(),
    requestUrl.origin,
  )
  sendJson(
    response,
    snapshot === undefined ? 404 : 200,
    snapshot ?? { detail: 'Not found' },
  )
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
  `Development catalog: ${snapshotCatalogSize.products} captured products (${snapshotCatalogSize.productPages} pages) and ${snapshotCatalogSize.categories} captured category details`,
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
