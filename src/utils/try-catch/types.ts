export type TryCatchResult<T, E = unknown> =
  readonly [data: T, error: null] | readonly [data: null, error: E]
