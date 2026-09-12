import { homeMetadata } from './helpers'
import type { HomePageMetadata } from './types'

export function generateHomeMetadata(): HomePageMetadata {
  return homeMetadata()
}
