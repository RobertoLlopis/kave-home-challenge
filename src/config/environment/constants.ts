export const environmentNames = {
  apiBaseUrl: 'KAVE_HOME_API_BASE_URL',
  siteUrl: 'KAVE_HOME_SITE_URL',
  mediaHost: 'KAVE_HOME_MEDIA_HOST',
  apiTimeoutMs: 'KAVE_HOME_API_TIMEOUT_MS',
} as const

export const environmentProtocols = ['http:', 'https:'] as const

export const environmentErrors = {
  required: (name: string) => `Missing required environment variable: ${name}`,
  httpUrl: (name: string) => `${name} must be an absolute HTTP(S) URL`,
  timeout: 'KAVE_HOME_API_TIMEOUT_MS must be a positive integer',
  mediaHost: 'KAVE_HOME_MEDIA_HOST must be a valid host',
} as const
