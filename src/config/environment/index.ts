import { environmentErrors, environmentNames } from './constants'
import { httpUrl, required } from './helpers'
import type { Environment, EnvironmentValues } from './types'

export function parseEnvironment(env: EnvironmentValues): Environment {
  const timeout = Number(
    required(environmentNames.apiTimeoutMs, env.KAVE_HOME_API_TIMEOUT_MS),
  )
  const mediaHost = required(
    environmentNames.mediaHost,
    env.KAVE_HOME_MEDIA_HOST,
  )
  if (!Number.isInteger(timeout) || timeout <= 0)
    throw new Error(environmentErrors.timeout)
  if (!/^[a-z0-9.-]+$/i.test(mediaHost))
    throw new Error(environmentErrors.mediaHost)
  return {
    apiBaseUrl: httpUrl(
      environmentNames.apiBaseUrl,
      env.KAVE_HOME_API_BASE_URL,
    ),
    siteUrl: httpUrl(environmentNames.siteUrl, env.KAVE_HOME_SITE_URL),
    mediaHost,
    apiTimeoutMs: timeout,
  }
}
