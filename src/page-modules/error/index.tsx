'use client'
import { accessibility } from '@/constants/accessibility'
import { Button } from '@/primitives/button'

import { errorCopy } from './constants'
import { errorStyles } from './styles'

import type { ErrorPageProps } from './types'

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main
      id={accessibility.mainContentId}
      tabIndex={accessibility.mainContentTabIndex}
      className={errorStyles.content}
    >
      <h1 className={errorStyles.title}>{errorCopy.title}</h1>
      <p className={errorStyles.message}>{errorCopy.message}</p>
      <Button className={errorStyles.action} onClick={reset}>
        {errorCopy.retryLabel}
      </Button>
    </main>
  )
}
