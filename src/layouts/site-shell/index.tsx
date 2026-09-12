import { accessibility } from '@/constants/accessibility'
import { shellStyles } from './styles'
import type { SiteShellProps } from './types'
import Header from '@/containers/header'

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className={shellStyles.pageShell}>
      <a
        className={shellStyles.skipLink}
        href={`#${accessibility.mainContentId}`}
      >
        {accessibility.skipLinkLabel}
      </a>
      <Header />
      {children}
    </div>
  )
}
