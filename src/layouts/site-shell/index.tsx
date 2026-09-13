import { accessibility } from '@/constants/accessibility/constants'
import { accessibilityMessages } from '@/constants/accessibility/messages'
import Header from '@/containers/header'

import { shellStyles } from './styles'

import type { SiteShellProps } from './types'

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className={shellStyles.pageShell}>
      <a
        className={shellStyles.skipLink}
        href={`#${accessibility.mainContentId}`}
      >
        {accessibilityMessages.skipLinkLabel}
      </a>
      <Header />
      {children}
    </div>
  )
}
