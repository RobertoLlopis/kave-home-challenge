import assert from 'node:assert/strict'
import test from 'node:test'

import { parseEnvironment } from '@/config/environment'
import { mediaHost } from '@/test-support'

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
  assert.equal(parsed.snapshotFallback, false)
  assert.equal(
    parseEnvironment({ ...valid, KAVE_HOME_SNAPSHOT_FALLBACK: 'true' })
      .snapshotFallback,
    true,
  )
  assert.throws(
    () =>
      parseEnvironment({ ...valid, KAVE_HOME_SITE_URL: 'file:///tmp/site' }),
    /absolute HTTP\(S\) URL/,
  )
  assert.throws(
    () => parseEnvironment({ ...valid, KAVE_HOME_SNAPSHOT_FALLBACK: 'yes' }),
    /must be true or false/,
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
