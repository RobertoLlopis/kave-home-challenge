import { Metadata } from 'next'
import { routes } from '@/constants/routes'
import { homeCopy } from './constants'
import type { HomePageMetadata } from './types'

export function generateHomeMetadata(): HomePageMetadata {
  return {
    title: homeCopy.title,
    description: homeCopy.description,
    alternates: {
      canonical: routes.home,
    } satisfies Metadata['alternates'],
  }
}
