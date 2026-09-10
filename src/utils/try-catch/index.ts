import type { TryCatchResult } from './types'

export async function tryCatch<T, E = unknown>(
  promise: Promise<T>,
): Promise<TryCatchResult<T, E>> {
  try {
    return [await promise, null]
  } catch (error) {
    return [null, error as E]
  }
}

export function tryCatchSync<T, E = unknown>(
  operation: () => T,
): TryCatchResult<T, E> {
  try {
    return [operation(), null]
  } catch (error) {
    return [null, error as E]
  }
}
