import Link from 'next/link'

import { commonStyles } from '@/styles/common'
import { cn } from '@/utils/classnames'

import { serviceFooterConstants } from './constants'
import { serviceFooterStyles } from './styles'

export function ServiceFooter() {
  return (
    <footer className={serviceFooterStyles.root}>
      {serviceFooterConstants.services.map((service) => (
        <div
          className={cn(
            serviceFooterStyles.item,
            service.desktopHidden && serviceFooterStyles.desktopHidden,
          )}
          key={service.title}
        >
          <span className={commonStyles.spanSemibold}>{service.title}</span>
          <Link href={serviceFooterConstants.fallbackUrl}>{service.link}</Link>
        </div>
      ))}
    </footer>
  )
}

ServiceFooter.Loading = function ServiceFooterLoading() {
  return <div className={serviceFooterStyles.loading} aria-hidden="true" />
}
