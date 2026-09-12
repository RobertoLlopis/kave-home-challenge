import type { Metadata } from 'next'
import { routes } from '@/constants/routes'
import { homeCopy } from './constants'
import type { HomePageMetadata } from './types'

export function homeMetadata(): HomePageMetadata {
  return {
    title: homeCopy.title,
    alternates: {
      canonical: routes.home,
    } satisfies Metadata['alternates'],
  }
}
