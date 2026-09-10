export type Environment = {
  apiBaseUrl: URL
  siteUrl: URL
  mediaHost: string
  apiTimeoutMs: number
}

export type EnvironmentValues = Record<string, string | undefined>
