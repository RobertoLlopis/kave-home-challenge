export const catalogApiMessages = {
  fallbackCollection: 'Kave Home',
  http: (status: number) => `Catalog API responded ${status}`,
  contentType: 'Catalog API returned a non-JSON response',
  invalidJson: 'Catalog API returned invalid JSON',
  timeout: 'Catalog API timed out',
  network: 'Catalog API is unavailable',
  invalidProduct: 'Invalid product response',
  invalidCategory: 'Invalid category response',
  invalidSearch: 'Invalid search response',
  invalidResponse: 'Invalid API response',
  invalidEnvelope: 'Invalid API envelope',
  invalidPagination: 'Invalid pagination link',
} as const
