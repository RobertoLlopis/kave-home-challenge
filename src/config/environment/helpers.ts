import { tryCatchSync } from '../../utils/try-catch/index'
import { environmentErrors, environmentProtocols } from './constants'

export function required(name: string, value: string | undefined): string {
  if (!value) throw new Error(environmentErrors.required(name))
  return value
}

export function httpUrl(name: string, value: string | undefined): URL {
  const raw = required(name, value)
  const [parsed, error] = tryCatchSync(() => new URL(raw))
  if (error !== null || parsed === null)
    throw new Error(environmentErrors.httpUrl(name))
  if (!environmentProtocols.some((protocol) => protocol === parsed.protocol))
    throw new Error(environmentErrors.httpUrl(name))
  return parsed
}
