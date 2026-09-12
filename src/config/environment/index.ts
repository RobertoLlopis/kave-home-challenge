import { tryCatchSync } from '../../utils/try-catch/index'

type Environment = {
  apiBaseUrl: URL
  siteUrl: URL
  mediaHost: string
  apiTimeoutMs: number
}

type EnvironmentValues = Record<string, string | undefined>

function required(name: string, value: string | undefined) {
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

function httpUrl(name: string, value: string | undefined) {
  const [url, error] = tryCatchSync(() => new URL(required(name, value)))
  if (
    error !== null ||
    url === null ||
    (url.protocol !== 'http:' && url.protocol !== 'https:')
  )
    throw new Error(`${name} must be an absolute HTTP(S) URL`)
  return url
}

function positiveInteger(name: string, value: string | undefined) {
  const parsed = Number(required(name, value))
  if (!Number.isInteger(parsed) || parsed <= 0)
    throw new Error(`${name} must be a positive integer`)
  return parsed
}

export function parseEnvironment(env: EnvironmentValues): Environment {
  const mediaHost = required('KAVE_HOME_MEDIA_HOST', env.KAVE_HOME_MEDIA_HOST)
  if (!/^[a-z0-9.-]+$/i.test(mediaHost))
    throw new Error('KAVE_HOME_MEDIA_HOST must be a valid host')

  return {
    apiBaseUrl: httpUrl('KAVE_HOME_API_BASE_URL', env.KAVE_HOME_API_BASE_URL),
    siteUrl: httpUrl('KAVE_HOME_SITE_URL', env.KAVE_HOME_SITE_URL),
    mediaHost,
    apiTimeoutMs: positiveInteger(
      'KAVE_HOME_API_TIMEOUT_MS',
      env.KAVE_HOME_API_TIMEOUT_MS,
    ),
  }
}
